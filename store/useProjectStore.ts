import { create } from "zustand";
import { Node, Edge } from "@xyflow/react";

export interface Architecture {
    id: string;
    workspace_id: string;
    name: string;
    description: string | null;
    logo_url: string | null;
    visibility: string;
    created_by: string;
    created_at: string;
    updated_at: string;
}

interface ProjectState {
    /** The fetched architecture metadata */
    architecture: Architecture | null;

    /** The last-saved snapshot of nodes (from the server) */
    savedNodes: Node[];
    /** The last-saved snapshot of edges (from the server) */
    savedEdges: Node[];

    /** Set architecture + initial canvas data after fetch */
    setProject: (
        architecture: Architecture,
        nodes: Node[],
        edges: Edge[],
    ) => void;

    /** Clear everything (on unmount / navigation) */
    clearProject: () => void;

    /** Check whether current canvas differs from the saved snapshot */
    hasChanges: (currentNodes: Node[], currentEdges: Edge[]) => boolean;
}

/**
 * Deterministic serialisation used to compare canvas snapshots.
 * We only keep the fields the server cares about so that transient
 * React Flow internal properties (selected, dragging …) don't
 * trigger a false-positive "unsaved changes" flag.
 */
function canonicalise(items: any[]): string {
    const stripped = items.map((item) => ({
        id: item.id,
        type: item.type,
        position: item.position,
        data: item.data,
        source: item.source,
        target: item.target,
        style: item.style,
    }));
    // Sort by id for stable comparison
    stripped.sort((a, b) => (a.id > b.id ? 1 : -1));
    return JSON.stringify(stripped);
}

const useProjectStore = create<ProjectState>((set, get) => ({
    architecture: null,
    savedNodes: [],
    savedEdges: [],

    setProject: (architecture, nodes, edges) => {
        set({
            architecture,
            savedNodes: nodes,
            savedEdges: edges as any,
        });
    },

    clearProject: () => {
        set({
            architecture: null,
            savedNodes: [],
            savedEdges: [],
        });
    },

    hasChanges: (currentNodes, currentEdges) => {
        const { savedNodes, savedEdges } = get();
        return (
            canonicalise(currentNodes) !== canonicalise(savedNodes) ||
            canonicalise(currentEdges) !== canonicalise(savedEdges)
        );
    },
}));

export default useProjectStore;
