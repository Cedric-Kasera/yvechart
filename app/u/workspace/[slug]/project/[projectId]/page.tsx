"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import ProjectHeader from "@/components/Project/ProjectHeader";
import ProjectSidebar from "@/components/Project/ProjectSidebar";
import ProjectCanvas from "@/components/Project/ProjectCanvas";
import NodeConfigDialog from "@/components/Project/NodeConfigDialog";
import UnsavedChangesModal from "@/components/Project/UnsavedChangesModal";
import { getNodeById, type ConfigField } from "@/lib/nodes";
import { getArchitecture, saveArchitecture } from "@/api/project";
import useUserStore from "@/store/useUserStore";
import useProjectStore from "@/store/useProjectStore";
import { toast } from "sonner";

let nodeId = 0;
const getId = () => `node_${nodeId++}`;

function ProjectPageInner() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const reactFlowRef = useRef<HTMLDivElement | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const token = useUserStore((s) => s.token);
  const { architecture, setProject, clearProject, hasChanges } =
    useProjectStore();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Change-detection flag (recomputed every render)
  const canvasHasChanges = hasChanges(nodes, edges);

  // Unsaved-changes modal state
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [isSavingBeforeLeave, setIsSavingBeforeLeave] = useState(false);
  // Stores the action to run after user decides on unsaved changes
  const pendingAction = useRef<"back" | null>(null);

  // ── Fetch project data ──
  useEffect(() => {
    const fetchProject = async () => {
      if (!token || !projectId) return;

      try {
        const res = await getArchitecture(token, projectId);
        if (res.success && res.data) {
          const arch = res.data.architecture;
          const canvas = res.data.canvas || { nodes: [], edges: [] };

          const fetchedNodes: Node[] = (canvas.nodes || []).map((n: any) => ({
            id: n.id,
            type: n.type || "icon",
            position: n.position,
            data: n.data,
            style: n.style,
            measured: n.measured,
          }));

          const fetchedEdges: Edge[] = (canvas.edges || []).map((e: any) => ({
            id: e.id,
            source: e.source,
            target: e.target,
            style: e.style,
          }));

          // Set node id counter past existing IDs to avoid collisions
          const maxNumericId = fetchedNodes.reduce((max, n) => {
            const match = n.id.match(/^node_(\d+)$/);
            return match ? Math.max(max, parseInt(match[1], 10)) : max;
          }, -1);
          if (maxNumericId >= 0) nodeId = maxNumericId + 1;

          setNodes(fetchedNodes);
          setEdges(fetchedEdges);
          setProject(arch, fetchedNodes, fetchedEdges);
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };

    fetchProject();

    return () => {
      clearProject();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, projectId]);

  // ── Browser beforeunload guard ──
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (canvasHasChanges) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [canvasHasChanges]);

  // Dialog state for node config
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingNode, setPendingNode] = useState<{
    nodeType: string;
    label: string;
    icon: string;
    config: ConfigField[];
    position: { x: number; y: number };
  } | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("application/reactflow-label");
      const icon = event.dataTransfer.getData("application/reactflow-icon");

      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeMeta = getNodeById(nodeType);
      const config = nodeMeta?.config || [];

      setPendingNode({ nodeType, label, icon, config, position });
      setDialogOpen(true);
    },
    [screenToFlowPosition],
  );

  const handleDialogAdd = useCallback(
    (configValues: Record<string, string | number | boolean>) => {
      if (!pendingNode) return;

      const newNode: Node = {
        id: getId(),
        type: "icon",
        position: pendingNode.position,
        data: {
          label: pendingNode.label || pendingNode.nodeType,
          icon: pendingNode.icon || "",
          configValues,
          configFields: pendingNode.config,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setDialogOpen(false);
      setPendingNode(null);
    },
    [pendingNode, setNodes],
  );

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    setPendingNode(null);
  }, []);

  // ── Save handler ──
  const handleSave = useCallback(async () => {
    if (!token || !projectId) return;

    try {
      const res = await saveArchitecture(token, projectId, { nodes, edges });
      if (res.success) {
        // Update the saved snapshot so change detection resets
        setProject(architecture!, nodes, edges);
      }
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  }, [token, projectId, nodes, edges, architecture, setProject]);

  // ── Back button handler ──
  const handleBack = useCallback(() => {
    if (canvasHasChanges) {
      pendingAction.current = "back";
      setShowUnsavedModal(true);
    } else {
      router.back();
    }
  }, [canvasHasChanges, router]);

  // ── Unsaved modal actions ──
  const handleUnsavedSave = useCallback(async () => {
    setIsSavingBeforeLeave(true);
    try {
      await handleSave();
    } finally {
      setIsSavingBeforeLeave(false);
      setShowUnsavedModal(false);
      if (pendingAction.current === "back") {
        router.back();
      }
      pendingAction.current = null;
    }
  }, [handleSave, router]);

  const handleUnsavedDiscard = useCallback(() => {
    setShowUnsavedModal(false);
    if (pendingAction.current === "back") {
      router.back();
    }
    pendingAction.current = null;
  }, [router]);

  const handleUnsavedCancel = useCallback(() => {
    setShowUnsavedModal(false);
    pendingAction.current = null;
  }, []);

  const handleAIChat = () => {
    toast.info("AI Chat coming soon!", { duration: 3000 });
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <ProjectHeader
        projectName={architecture?.name || "Project"}
        projectLogo={architecture?.logo_url || "/default_logo.svg"}
        onSave={handleSave}
        onAIChat={handleAIChat}
        onBack={handleBack}
        hasChanges={canvasHasChanges}
      />

      <div className="flex flex-1 overflow-hidden">
        <ProjectSidebar />
        <ProjectCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          reactFlowRef={reactFlowRef}
        />
      </div>

      <NodeConfigDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onAdd={handleDialogAdd}
        nodeName={pendingNode?.label || ""}
        nodeIcon={pendingNode?.icon || ""}
        config={pendingNode?.config || []}
      />

      <UnsavedChangesModal
        isOpen={showUnsavedModal}
        onSave={handleUnsavedSave}
        onDiscard={handleUnsavedDiscard}
        onCancel={handleUnsavedCancel}
        isSaving={isSavingBeforeLeave}
      />
    </div>
  );
}

export default function ProjectPage() {
  return (
    <ReactFlowProvider>
      <ProjectPageInner />
    </ReactFlowProvider>
  );
}
