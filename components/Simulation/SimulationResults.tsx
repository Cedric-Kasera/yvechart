"use client";

import React, { useState, useCallback } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CurrencyDollarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import type { SimulationResult } from "@/lib/simulation/types";
import { interpretSimulation, type InterpretationResult } from "@/api/simulation";
import useUserStore from "@/store/useUserStore";

interface SimulationResultsProps {
  result: SimulationResult;
}

function StatusBadge({ status }: { status: string }) {
  if (status === "healthy") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">
        <CheckCircleIcon className="w-3 h-3" />
        Healthy
      </span>
    );
  }
  if (status === "overloaded") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700">
        <ExclamationCircleIcon className="w-3 h-3" />
        Overloaded
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">
      <XCircleIcon className="w-3 h-3" />
      Failed
    </span>
  );
}

export default function SimulationResults({ result }: SimulationResultsProps) {
  const { summary, nodes, bottlenecks, critical_path, failure_analysis, cost_breakdown } = result;
  const token = useUserStore((s) => s.token);

  const [interpretation, setInterpretation] = useState<InterpretationResult | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [interpretError, setInterpretError] = useState<string | null>(null);

  const handleInterpret = useCallback(async () => {
    if (!token) return;
    setIsInterpreting(true);
    setInterpretError(null);

    try {
      const res = await interpretSimulation(token, result);
      if (res.success && res.data) {
        setInterpretation(res.data);
      } else {
        setInterpretError(res.message || "Failed to interpret simulation");
      }
    } catch {
      setInterpretError("Network error while interpreting simulation");
    } finally {
      setIsInterpreting(false);
    }
  }, [token, result]);

  return (
    <div className="p-4 space-y-5">
      {/* Summary Cards */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Summary
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <ClockIcon className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-blue-600 font-medium">Avg Latency</span>
            </div>
            <span className="text-lg font-semibold text-blue-900">
              {summary.avg_latency_ms.toFixed(1)} ms
            </span>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <ClockIcon className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-purple-600 font-medium">Max Latency</span>
            </div>
            <span className="text-lg font-semibold text-purple-900">
              {summary.max_latency_ms.toFixed(1)} ms
            </span>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <CurrencyDollarIcon className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">Cost/Hour</span>
            </div>
            <span className="text-lg font-semibold text-green-900">
              ${summary.total_cost_per_hour.toFixed(2)}
            </span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <CurrencyDollarIcon className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-600 font-medium">Cost/Month</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              ${summary.total_cost_per_month.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Node Status Counts */}
        <div className="flex items-center gap-4 mt-3 px-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">
              {summary.healthy_count} healthy
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs text-gray-600">
              {summary.overloaded_count} overloaded
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs text-gray-600">
              {summary.failed_count} failed
            </span>
          </div>
        </div>
      </div>

      {/* Bottlenecks */}
      {bottlenecks.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Bottlenecks
          </h3>
          <div className="space-y-2">
            {bottlenecks.map((b) => (
              <div
                key={b.node_id}
                className="p-3 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-amber-900">
                    {b.name}
                  </span>
                  <span className="text-xs text-amber-600">
                    {b.overload_ratio.toFixed(1)}x over
                  </span>
                </div>
                <div className="text-xs text-amber-700">
                  {b.incoming_rps.toLocaleString()} rps → capacity{" "}
                  {b.effective_capacity.toLocaleString()} rps
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Path */}
      {critical_path && critical_path.path.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Critical Path
          </h3>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-1.5 mb-2">
              <ArrowTrendingUpIcon className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium text-purple-700">
                {critical_path.total_latency_ms.toFixed(1)} ms total
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {critical_path.path.map((nodeId, idx) => {
                const node = nodes.find((n) => n.id === nodeId);
                return (
                  <React.Fragment key={nodeId}>
                    <span className="text-xs px-2 py-0.5 bg-white rounded border border-purple-200 text-purple-800">
                      {node?.name || nodeId}
                    </span>
                    {idx < critical_path.path.length - 1 && (
                      <span className="text-purple-400 text-xs">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Per-Node Results */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Node Details
        </h3>
        <div className="space-y-1.5">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {node.name}
                  </span>
                  <StatusBadge status={node.status} />
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {node.incoming_rps.toLocaleString()} rps ·{" "}
                  {node.utilization_percent.toFixed(0)}% util · {node.latency_ms}ms
                </div>
              </div>
              <div className="text-xs text-gray-400 ml-2">
                ${node.cost_per_hour.toFixed(2)}/hr
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Failure Analysis */}
      {failure_analysis && failure_analysis.failed_nodes.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Failure Analysis
          </h3>
          {failure_analysis.cascade_effects.length > 0 && (
            <div className="space-y-1.5">
              {failure_analysis.cascade_effects.map((effect, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="text-xs text-red-800">
                    <span className="font-medium">{effect.node_id}</span>:{" "}
                    {effect.before_status} → {effect.after_status}
                  </div>
                  <div className="text-xs text-red-600 mt-0.5">
                    {effect.reason}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cost Breakdown */}
      {cost_breakdown.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Cost Breakdown
          </h3>
          <div className="space-y-1">
            {cost_breakdown.map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between px-2.5 py-1.5"
              >
                <span className="text-xs text-gray-600 capitalize">
                  {item.category}
                </span>
                <span className="text-xs font-medium text-gray-900">
                  ${item.cost_per_hour.toFixed(2)}/hr
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Interpretation */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            AI Interpretation
          </h3>
          {!interpretation && (
            <button
              onClick={handleInterpret}
              disabled={isInterpreting}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 disabled:opacity-50 transition-colors"
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              {isInterpreting ? "Analyzing..." : "Interpret"}
            </button>
          )}
        </div>

        {interpretError && (
          <p className="text-xs text-red-600 mb-2">{interpretError}</p>
        )}

        {interpretation && (
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-700 leading-relaxed whitespace-pre-line">
              {interpretation.interpretation}
            </div>

            {interpretation.recommendations.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-1.5">
                  Recommendations
                </h4>
                <ul className="space-y-1.5">
                  {interpretation.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 p-2 bg-purple-50 rounded-md text-xs text-purple-800 leading-relaxed"
                    >
                      <SparklesIcon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-purple-500" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
