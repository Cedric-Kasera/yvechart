"use client";

import React from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ConfigField } from "@/lib/nodes";

interface IconNodeData {
  label: string;
  icon: string;
  configValues?: Record<string, string | number | boolean>;
  configFields?: ConfigField[];
  simulationStatus?: "healthy" | "overloaded" | "failed";
  [key: string]: unknown;
}

function formatValue(value: string | number | boolean): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") {
    return value >= 1000
      ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
      : String(value);
  }
  return String(value);
}

export default function IconNode({ data, selected }: NodeProps) {
  const { label, icon, configValues, configFields, simulationStatus } =
    data as IconNodeData;

  const hasConfig = configFields && configFields.length > 0 && configValues;

  // Determine border & ring styling based on simulation status
  let borderClass = selected
    ? "border-primary-500 shadow-md ring-1 ring-primary-500"
    : "border-gray-200 hover:border-gray-300";
  let statusIndicator: React.ReactNode = null;

  if (simulationStatus === "overloaded") {
    borderClass = selected
      ? "border-amber-500 shadow-md ring-1 ring-amber-500"
      : "border-amber-500 shadow-sm";
    statusIndicator = (
      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-sm" title="Overloaded" />
    );
  } else if (simulationStatus === "failed") {
    borderClass = selected
      ? "border-red-500 shadow-md ring-1 ring-red-500"
      : "border-red-500 shadow-sm";
    statusIndicator = (
      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-sm" title="Failed" />
    );
  } else if (simulationStatus === "healthy") {
    borderClass = selected
      ? "border-emerald-500 shadow-md ring-1 ring-emerald-500"
      : "border-emerald-400 shadow-sm";
    statusIndicator = (
      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm" title="Healthy" />
    );
  }

  return (
    <div
      className={`relative flex flex-col bg-white rounded-xl shadow-sm border transition-all duration-200 w-56 ${borderClass}`}
    >
      {statusIndicator}

      {/* Target Handle (Top) */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3! h-3! bg-white! border-2! border-gray-400! -top-1.5! hover:border-primary-500! hover:bg-primary-50! transition-colors z-10"
      />

      {/* Main Node Body (Horizontal Layout) */}
      <div className="flex items-center p-3 gap-3">
        {/* Icon Container */}
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 shrink-0 shadow-sm">
          <i className={`ci ci-${icon} ci-2x text-gray-700`} />
        </div>

        {/* Text Container */}
        <div className="flex flex-col overflow-hidden justify-center min-w-0">
          <span className="text-sm font-semibold text-gray-900 truncate" title={label}>
            {label}
          </span>
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider truncate" title={icon}>
            {icon.replace(/-/g, " ")}
          </span>
        </div>
      </div>

      {/* Configuration Footer */}
      {hasConfig && (
        <div className="w-full border-t border-gray-100 bg-gray-50/80 rounded-b-xl px-3 py-2 space-y-1">
          {configFields.map((field) => {
            const val = configValues[field.key];
            if (val === undefined) return null;
            return (
              <div
                key={field.key}
                className="flex items-center justify-between gap-2 text-[10px] leading-tight"
              >
                <span className="text-gray-500 truncate" title={field.label}>{field.label}</span>
                <span className="text-gray-700 font-medium whitespace-nowrap">
                  {formatValue(val)}
                  {field.unit && (
                    <span className="text-gray-400 ml-0.5">{field.unit}</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Source Handle (Bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3! h-3! bg-white! border-2! border-gray-400! -bottom-1.5! hover:border-primary-500! hover:bg-primary-50! transition-colors z-10"
      />
    </div>
  );
}
