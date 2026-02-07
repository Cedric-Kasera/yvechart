"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ConfigField } from "@/lib/nodes";

interface NodeConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (configValues: Record<string, string | number | boolean>) => void;
  nodeName: string;
  nodeIcon: string;
  config: ConfigField[];
}

export default function NodeConfigDialog({
  open,
  onClose,
  onAdd,
  nodeName,
  nodeIcon,
  config,
}: NodeConfigDialogProps) {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({});

  useEffect(() => {
    if (open) {
      const defaults: Record<string, string | number | boolean> = {};
      config.forEach((field) => {
        defaults[field.key] = field.defaultValue;
      });
      setValues(defaults);
    }
  }, [open, config]);

  const handleChange = (key: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = () => {
    onAdd(values);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
              <i className={`ci ci-${nodeIcon} ci-2x`} />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                {nodeName}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Configure node settings
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {config.length > 0 && (
          <div className="space-y-3 max-h-72 overflow-y-auto py-2">
            {config.map((field) => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-600">
                  {field.label}
                  {field.unit && (
                    <span className="text-gray-400 ml-1">({field.unit})</span>
                  )}
                </label>

                {field.type === "boolean" ? (
                  <button
                    type="button"
                    onClick={() => handleChange(field.key, !values[field.key])}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      values[field.key] ? "bg-primary-500" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform ${
                        values[field.key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                ) : field.type === "number" ? (
                  <input
                    type="number"
                    value={values[field.key] as number}
                    onChange={(e) =>
                      handleChange(
                        field.key,
                        e.target.value === "" ? 0 : parseFloat(e.target.value),
                      )
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={values[field.key] as string}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {config.length === 0 && (
          <p className="text-sm text-gray-500 py-4 text-center">
            No configuration settings for this node.
          </p>
        )}

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            className="bg-primary-500 hover:bg-primary-600 text-white cursor-pointer"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
