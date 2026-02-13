import type { Node, Edge } from '@xyflow/react';
import type { NodeInstance, SimulationEdge, SimulationRequest, SimulationParams } from './types';
import {
    CONFIG_KEY_MAP,
    DEFAULT_LATENCY,
    DEFAULT_MAX_RPS,
    DEFAULT_COST,
    FALLBACK_LATENCY,
    FALLBACK_MAX_RPS,
    FALLBACK_COST,
} from './defaults';

// =====================
// Node Normalization
// =====================

/**
 * Resolves the node metadata type id from canvas node data.
 * The node's `data.icon` field corresponds to the metadata id
 * used in `nodes.ts` (e.g., "postgresql", "nginx", "aws").
 */
function resolveNodeType(canvasNode: Node): string {
    const data = canvasNode.data as Record<string, unknown>;
    return (data.icon as string) || (data.label as string) || canvasNode.type || 'unknown';
}

/**
 * Extracts the config values from a canvas node's data.
 * After migration 008, config is stored as:
 *   { configValues: { key: value }, configFields: [...] }
 */
function getConfigValues(canvasNode: Node): Record<string, unknown> {
    const data = canvasNode.data as Record<string, unknown>;
    if (data.configValues && typeof data.configValues === 'object') {
        return data.configValues as Record<string, unknown>;
    }
    return {};
}

/**
 * Converts a single canvas node into a standardized NodeInstance
 * for simulation. Uses config key mapping where available, then
 * falls back to default lookup tables.
 */
export function normalizeNode(canvasNode: Node): NodeInstance {
    const nodeType = resolveNodeType(canvasNode);
    const configValues = getConfigValues(canvasNode);
    const keyMap = CONFIG_KEY_MAP[nodeType] || {};

    // 1. latency_ms
    let latency_ms: number;
    if (keyMap.latency_ms && configValues[keyMap.latency_ms] !== undefined) {
        latency_ms = Number(configValues[keyMap.latency_ms]);
    } else {
        latency_ms = DEFAULT_LATENCY[nodeType] ?? FALLBACK_LATENCY;
    }

    // 2. max_rps
    let max_rps: number;
    if (keyMap.max_rps && configValues[keyMap.max_rps] !== undefined) {
        max_rps = Number(configValues[keyMap.max_rps]);
    } else {
        max_rps = DEFAULT_MAX_RPS[nodeType] ?? FALLBACK_MAX_RPS;
    }

    // 3. replicas
    let replicas: number;
    if (keyMap.replicas && configValues[keyMap.replicas] !== undefined) {
        replicas = Math.max(1, Math.round(Number(configValues[keyMap.replicas])));
    } else {
        replicas = 1;
    }

    // 4. failure_rate — no nodes define this, always 0
    const failure_rate = 0;

    // 5. cost_per_hour — no nodes define this, always from defaults
    const cost_per_hour = DEFAULT_COST[nodeType] ?? FALLBACK_COST;

    const data = canvasNode.data as Record<string, unknown>;

    return {
        id: canvasNode.id,
        type: nodeType,
        name: (data.label as string) || nodeType,
        latency_ms,
        max_rps,
        replicas,
        failure_rate,
        cost_per_hour,
        incoming_rps: 0,
        status: 'healthy',
    };
}

// =====================
// Edge Normalization
// =====================

/**
 * Extracts the minimal source/target representation from React Flow edges.
 */
export function normalizeEdges(canvasEdges: Edge[]): SimulationEdge[] {
    return canvasEdges.map((edge) => ({
        source: edge.source,
        target: edge.target,
    }));
}

// =====================
// Entry Point Detection
// =====================

/**
 * Identifies entry nodes — nodes with zero incoming edges (in-degree 0).
 * These are the sources where traffic enters the architecture.
 */
export function findEntryNodes(nodes: NodeInstance[], edges: SimulationEdge[]): string[] {
    const targetSet = new Set(edges.map((e) => e.target));
    const entryIds = nodes
        .filter((node) => !targetSet.has(node.id))
        .map((node) => node.id);
    return entryIds;
}

// =====================
// Request Builder
// =====================

/**
 * Builds a complete SimulationRequest from raw canvas data and user params.
 * This is the single entry point the UI calls before sending to the backend.
 */
export function buildSimulationRequest(
    architectureId: string,
    canvasNodes: Node[],
    canvasEdges: Edge[],
    params: SimulationParams,
): SimulationRequest {
    const nodes = canvasNodes.map(normalizeNode);
    const edges = normalizeEdges(canvasEdges);
    const entry_node_ids = findEntryNodes(nodes, edges);

    return {
        architecture_id: architectureId,
        nodes,
        edges,
        params,
        entry_node_ids,
    };
}
