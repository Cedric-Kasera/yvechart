"use client";

import React from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import IconNode from "@/components/Project/IconNode";

const nodeTypes = { icon: IconNode };

const sampleNodes: Node[] = [
  {
    id: "1",
    type: "icon",
    position: { x: 250, y: 0 },
    data: { label: "Next.js", icon: "nextjs" },
  },
  {
    id: "2",
    type: "icon",
    position: { x: 0, y: 160 },
    data: { label: "Docker", icon: "docker" },
  },
  {
    id: "3",
    type: "icon",
    position: { x: 500, y: 160 },
    data: { label: "Kubernetes", icon: "kubernetes" },
  },
  {
    id: "4",
    type: "icon",
    position: { x: 100, y: 340 },
    data: { label: "PostgreSQL", icon: "postgresql" },
  },
  {
    id: "5",
    type: "icon",
    position: { x: 400, y: 340 },
    data: { label: "Redis", icon: "redis" },
  },
];

const sampleEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    style: { stroke: "#9ca3af", strokeWidth: 2 },
    animated: true,
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    style: { stroke: "#9ca3af", strokeWidth: 2 },
    animated: true,
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    style: { stroke: "#9ca3af", strokeWidth: 2 },
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    style: { stroke: "#9ca3af", strokeWidth: 2 },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    style: { stroke: "#9ca3af", strokeWidth: 2 },
  },
];

export default function HeroCanvas() {
  const [nodes, , onNodesChange] = useNodesState(sampleNodes);
  const [edges] = useEdgesState(sampleEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes}
      nodesDraggable={true}
      nodesConnectable={false}
      elementsSelectable={false}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      preventScrolling={false}
      defaultEdgeOptions={{
        style: { stroke: "#9ca3af", strokeWidth: 2 },
      }}
      fitView
      fitViewOptions={{ padding: 0.3 }}
      proOptions={{ hideAttribution: true }}
      className="bg-transparent!"
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={16}
        size={1}
        color="#d1d5db"
      />
    </ReactFlow>
  );
}
