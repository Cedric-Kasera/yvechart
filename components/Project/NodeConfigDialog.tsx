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
  onSave: (name: string, configValues: Record<string, string | number | boolean>) => void;
  nodeName: string;
  nodeIcon: string;
  config: ConfigField[];
  initialValues?: Record<string, string | number | boolean>;
}

export default function NodeConfigDialog({
  open,
  onClose,
  onSave,
  nodeName,
  nodeIcon,
  config,
  initialValues,
}: NodeConfigDialogProps) {
  const [name, setName] = useState(nodeName);
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({});

  useEffect(() => {
    if (open) {
      setName(nodeName);
      if (initialValues && Object.keys(initialValues).length > 0) {
        setValues(initialValues);
      } else {
        const defaults: Record<string, string | number | boolean> = {};
        config.forEach((field) => {
          defaults[field.key] = field.defaultValue;
        });
        setValues(defaults);
      }
    }
  }, [open, nodeName, config, initialValues]);

  const handleChange = (key: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), values);
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

        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
          {/* Node Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Node Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="e.g. My Database"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>

          {config.length > 0 && (
            <>
              <div className="h-px bg-gray-100 my-2" />
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-700">Configuration</h4>
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
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${values[field.key] ? "bg-primary-500" : "bg-gray-200"
                          }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform ${values[field.key] ? "translate-x-5" : "translate-x-0"
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
            </>
          )}

          {config.length === 0 && (
            <p className="text-sm text-gray-500 pt-4 pb-2 text-center italic">
              No additional configuration settings are available for this node type.
            </p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-2 pt-2 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name.trim()}
            className="bg-primary-500 hover:bg-primary-600 text-white cursor-pointer"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
