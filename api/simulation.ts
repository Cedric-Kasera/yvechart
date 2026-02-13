import type { SimulationRequest, SimulationResult } from '@/lib/simulation/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function authHeaders(token: string) {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

/**
 * Run a simulation against the backend engine.
 */
export async function runSimulation(
    token: string,
    data: SimulationRequest,
): Promise<{ success: boolean; message: string; data?: { simulation: SimulationResult } }> {
    const res = await fetch(`${BASE_URL}/simulations/run`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    return res.json();
}

/**
 * Retrieve a past simulation result by ID.
 */
export async function getSimulation(
    token: string,
    simulationId: string,
): Promise<{ success: boolean; message: string; data?: { simulation: SimulationResult } }> {
    const res = await fetch(`${BASE_URL}/simulations/${simulationId}`, {
        method: 'GET',
        headers: authHeaders(token),
    });
    return res.json();
}

/**
 * List all simulations for an architecture.
 */
export async function getSimulationsByArchitecture(
    token: string,
    architectureId: string,
): Promise<{ success: boolean; message: string; data?: { simulations: SimulationResult[]; count: number } }> {
    const res = await fetch(`${BASE_URL}/simulations/architecture/${architectureId}`, {
        method: 'GET',
        headers: authHeaders(token),
    });
    return res.json();
}

// ── AI Interpretation ──

export interface InterpretationResult {
    interpretation: string;
    recommendations: string[];
}

/**
 * Get an AI interpretation of a simulation result.
 */
export async function interpretSimulation(
    token: string,
    result: SimulationResult,
): Promise<{ success: boolean; message: string; data?: InterpretationResult }> {
    const res = await fetch(`${BASE_URL}/ai/interpret`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(result),
    });
    return res.json();
}
