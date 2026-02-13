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
    ? "border-primary-500 shadow-md"
    : "border-gray-200";
  let statusIndicator: React.ReactNode = null;

  if (simulationStatus === "overloaded") {
    borderClass = "border-amber-500 ring-2 ring-amber-200 shadow-md";
    statusIndicator = (
      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white" />
    );
  } else if (simulationStatus === "failed") {
    borderClass = "border-red-500 ring-2 ring-red-200 shadow-md";
    statusIndicator = (
      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
    );
  } else if (simulationStatus === "healthy") {
    borderClass = selected
      ? "border-primary-500 shadow-md"
      : "border-emerald-400 ring-2 ring-emerald-100 shadow-sm";
    statusIndicator = (
      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-2 transition-colors shadow-sm min-w-20 ${borderClass}`}
    >
      {statusIndicator}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2.5! h-2.5! bg-gray-600! border-2! border-white! -top-1.5!"
      />

      <div className="w-8 h-8 flex items-center justify-center">
        <i className={`ci ci-${icon} ci-3x`} />
      </div>
      <span className="text-xs font-semibold text-gray-800 text-center leading-tight max-w-28 truncate">
        {label}
      </span>

      {hasConfig && (
        <div className="w-full border-t border-gray-100 pt-1.5 mt-0.5 space-y-0.5">
          {configFields.map((field) => {
            const val = configValues[field.key];
            if (val === undefined) return null;
            return (
              <div
                key={field.key}
                className="flex items-center justify-between gap-2 text-[8px] leading-tight"
              >
                <span className="text-gray-400 truncate">{field.label}</span>
                <span className="text-gray-600 font-medium whitespace-nowrap">
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

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2.5! h-2.5! bg-gray-600! border-2! border-white! -bottom-1.5!"
      />
    </div>
  );
}
