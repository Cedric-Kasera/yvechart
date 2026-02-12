// =====================
// Simulation Types
// =====================

/**
 * Standardized runtime representation of a node for simulation.
 * Every node on the canvas is normalized into this shape before
 * being sent to the backend, regardless of its original config fields.
 */
export interface NodeInstance {
    id: string;
    type: string;
    name: string;

    // Standardized runtime fields
    latency_ms: number;
    max_rps: number;
    replicas: number;
    failure_rate: number;
    cost_per_hour: number;

    // Populated during simulation (initialized by frontend)
    incoming_rps: number;
    status: 'healthy' | 'overloaded' | 'failed';
}

/**
 * Minimal edge representation for simulation.
 */
export interface SimulationEdge {
    source: string;
    target: string;
}

/**
 * A failure scenario: force a specific node to fail.
 */
export interface FailureScenario {
    node_id: string;
}

/**
 * Parameters the user provides to configure a simulation run.
 */
export interface SimulationParams {
    incoming_rps: number;
    duration_seconds: number;
    failure_scenarios: FailureScenario[];
}

/**
 * Full request payload sent from frontend to backend.
 */
export interface SimulationRequest {
    architecture_id: string;
    nodes: NodeInstance[];
    edges: SimulationEdge[];
    params: SimulationParams;
    entry_node_ids: string[];
}

// =====================
// Simulation Result Types
// =====================

export interface SimulationSummary {
    avg_latency_ms: number;
    max_latency_ms: number;
    min_latency_ms: number;
    p95_latency_ms: number;
    total_cost_per_hour: number;
    total_cost_per_month: number;
    total_nodes: number;
    healthy_count: number;
    overloaded_count: number;
    failed_count: number;
}

export interface SimulationNodeResult {
    id: string;
    name: string;
    type: string;
    status: 'healthy' | 'overloaded' | 'failed';
    incoming_rps: number;
    effective_capacity: number;
    utilization_percent: number;
    latency_ms: number;
    cost_per_hour: number;
}

export interface Bottleneck {
    node_id: string;
    name: string;
    type: string;
    incoming_rps: number;
    effective_capacity: number;
    overload_ratio: number;
}

export interface CriticalPath {
    path: string[];
    total_latency_ms: number;
}

export interface CascadeEffect {
    node_id: string;
    before_status: string;
    after_status: string;
    reason: string;
}

export interface FailureAnalysis {
    failed_nodes: string[];
    cascade_effects: CascadeEffect[];
    post_failure_summary: SimulationSummary;
}

export interface CostBreakdownItem {
    category: string;
    cost_per_hour: number;
}

export interface SimulationResult {
    id?: string;
    summary: SimulationSummary;
    nodes: SimulationNodeResult[];
    bottlenecks: Bottleneck[];
    critical_path: CriticalPath;
    failure_analysis: FailureAnalysis | null;
    cost_breakdown: CostBreakdownItem[];
}
