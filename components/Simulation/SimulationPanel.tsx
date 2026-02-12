"use client";

import React, { useState, useCallback } from "react";
import {
  XMarkIcon,
  PlayIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import type { Node, Edge } from "@xyflow/react";
import type { SimulationResult, FailureScenario } from "@/lib/simulation/types";
import { buildSimulationRequest } from "@/lib/simulation/normalize";
import { runSimulation } from "@/api/simulation";
import useUserStore from "@/store/useUserStore";
import SimulationResults from "./SimulationResults";

interface SimulationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  architectureId: string;
  nodes: Node[];
  edges: Edge[];
  onSimulationComplete?: (result: SimulationResult) => void;
}

export default function SimulationPanel({
  isOpen,
  onClose,
  architectureId,
  nodes,
  edges,
  onSimulationComplete,
}: SimulationPanelProps) {
  const token = useUserStore((s) => s.token);

  // Input state
  const [incomingRps, setIncomingRps] = useState(1000);
  const [durationSeconds, setDurationSeconds] = useState(60);
  const [failureNodeId, setFailureNodeId] = useState("");
  const [failureScenarios, setFailureScenarios] = useState<FailureScenario[]>([]);

  // Run state
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const addFailureScenario = useCallback(() => {
    if (!failureNodeId.trim()) return;
    if (failureScenarios.some((f) => f.node_id === failureNodeId)) return;
    setFailureScenarios((prev) => [...prev, { node_id: failureNodeId }]);
    setFailureNodeId("");
  }, [failureNodeId, failureScenarios]);

  const removeFailureScenario = useCallback((nodeId: string) => {
    setFailureScenarios((prev) => prev.filter((f) => f.node_id !== nodeId));
  }, []);

  const handleRun = useCallback(async () => {
    if (!token || !architectureId) return;
    if (nodes.length === 0) {
      setError("Add at least one node to the canvas before simulating.");
      return;
    }

    setIsRunning(true);
    setError(null);
    setResult(null);

    try {
      const request = buildSimulationRequest(architectureId, nodes, edges, {
        incoming_rps: incomingRps,
        duration_seconds: durationSeconds,
        failure_scenarios: failureScenarios,
      });

      if (request.entry_node_ids.length === 0) {
        setError(
          "No entry nodes detected. Entry nodes are nodes with no incoming edges. Check your architecture connections."
        );
        setIsRunning(false);
        return;
      }

      const res = await runSimulation(token, request);

      if (res.success && res.data) {
        setResult(res.data.simulation);
        onSimulationComplete?.(res.data.simulation);
      } else {
        setError(res.message || "Simulation failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsRunning(false);
    }
  }, [
    token,
    architectureId,
    nodes,
    edges,
    incomingRps,
    durationSeconds,
    failureScenarios,
    onSimulationComplete,
  ]);

  // Get node labels for the failure scenario selector
  const nodeOptions = nodes.map((n) => ({
    id: n.id,
    label: (n.data as Record<string, unknown>).label as string || n.id,
  }));

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-105 bg-white border-l border-gray-200 shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <BoltIcon className="w-5 h-5 text-primary-500" />
          <h2 className="text-sm font-semibold text-gray-900">Simulation</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Input Section */}
        <div className="p-4 space-y-4 border-b border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Parameters
          </h3>

          {/* Incoming RPS */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              Incoming Traffic (rps)
            </label>
            <input
              type="number"
              min={1}
              value={incomingRps}
              onChange={(e) => setIncomingRps(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
            />
            <p className="text-xs text-gray-400">
              Total requests per second entering the system
            </p>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              Duration (seconds)
            </label>
            <input
              type="number"
              min={1}
              value={durationSeconds}
              onChange={(e) =>
                setDurationSeconds(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          {/* Failure Scenarios */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              Failure Scenarios{" "}
              <span className="text-gray-400">(optional)</span>
            </label>
            <div className="flex gap-2">
              <select
                value={failureNodeId}
                onChange={(e) => setFailureNodeId(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="">Select a node to fail...</option>
                {nodeOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                onClick={addFailureScenario}
                disabled={!failureNodeId}
                className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Add
              </button>
            </div>

            {failureScenarios.length > 0 && (
              <div className="space-y-1 mt-2">
                {failureScenarios.map((f) => {
                  const nodeLabel =
                    nodeOptions.find((n) => n.id === f.node_id)?.label ||
                    f.node_id;
                  return (
                    <div
                      key={f.node_id}
                      className="flex items-center justify-between px-3 py-1.5 bg-red-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-700">{nodeLabel}</span>
                      </div>
                      <button
                        onClick={() => removeFailureScenario(f.node_id)}
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-4 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && <SimulationResults result={result} />}
      </div>

      {/* Footer — Run button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleRun}
          disabled={isRunning || nodes.length === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isRunning ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Running Simulation...
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4" />
              Run Simulation
            </>
          )}
        </button>
      </div>
    </div>
  );
}
