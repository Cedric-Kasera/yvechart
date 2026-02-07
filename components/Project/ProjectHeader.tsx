"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
  PlayIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

interface ProjectHeaderProps {
  projectName?: string;
  projectLogo?: string;
  onSave?: () => void;
  onAIChat?: () => void;
  onBack?: () => void;
  hasChanges?: boolean;
}

export default function ProjectHeader({
  projectName = "Untitled Project",
  projectLogo = "/default_logo.svg",
  onSave,
  onAIChat,
  onBack,
  hasChanges = false,
}: ProjectHeaderProps) {
  const router = useRouter();
  const { getNodes } = useReactFlow();

  const [downloading, setDownloading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const imageWidth = 1024;
  const imageHeight = 768;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onDownload = useCallback(async () => {
    const nodes = getNodes();
    if (nodes.length === 0) return;

    const nodesBounds = getNodesBounds(nodes);
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0.2,
    );

    const viewportElement = document.querySelector<HTMLElement>(
      ".react-flow__viewport",
    );
    if (!viewportElement) return;

    setDownloading(true);

    // Fetch external CSS and inject inline so icons render in the export.
    // Cross-origin <link> stylesheets cause a SecurityError when
    // html-to-image tries to read cssRules, so we filter them out
    // and replace with an inlined <style> that gets cloned with the node.
    let inlineStyle: HTMLStyleElement | null = null;
    try {
      const cssUrl =
        "https://cdn.jsdelivr.net/gh/dheereshag/coloured-icons@master/app/ci.min.css";
      const res = await fetch(cssUrl);
      let cssText = await res.text();

      // Resolve relative URLs in the CSS to absolute CDN paths
      const baseUrl = cssUrl.substring(0, cssUrl.lastIndexOf("/") + 1);
      cssText = cssText.replace(
        /url\(['"]?(?!data:|https?:|\/\/)(.*?)['"]?\)/g,
        (_match, path) => `url('${baseUrl}${path}')`,
      );

      inlineStyle = document.createElement("style");
      inlineStyle.textContent = cssText;
      viewportElement.appendChild(inlineStyle);
    } catch {
      console.warn("Failed to inline CSS for image export");
    }

    try {
      const dataUrl = await toPng(viewportElement, {
        backgroundColor: "#f9fafb",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
        filter: (node) => {
          // Skip cross-origin link stylesheets to prevent SecurityError
          if (
            node instanceof HTMLLinkElement &&
            node.tagName === "LINK" &&
            node.rel === "stylesheet"
          ) {
            return false;
          }
          return true;
        },
      });

      const a = document.createElement("a");
      a.setAttribute("download", `${projectName}.png`);
      a.setAttribute("href", dataUrl);
      a.click();
    } finally {
      if (inlineStyle) inlineStyle.remove();
      setDownloading(false);
      setDropdownOpen(false);
    }
  }, [getNodes, projectName]);

  const handleSaveClick = useCallback(async () => {
    setSaving(true);
    try {
      if (onSave) {
        await Promise.resolve(onSave());
      }
    } finally {
      setSaving(false);
      setDropdownOpen(false);
    }
  }, [onSave]);

  return (
    <header className="h-[10vh] min-h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack || (() => router.back())}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
            <Image
              src={projectLogo}
              alt={projectName}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {projectName}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* <button
          onClick={onDownload}
          disabled={downloading}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloading ? (
            <svg
              className="w-5 h-5 animate-spin"
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
          ) : (
            <ArrowDownTrayIcon className="w-5 h-5" />
          )}
          <span className="hidden sm:inline">
            {downloading ? "Downloading..." : "Download"}
          </span>
        </button> */}

        <button
          onClick={onAIChat}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg border-2 transition-colors cursor-pointer"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          <span className="hidden sm:inline">AI Chat</span>
        </button>

        <button
          onClick={() => {
            toast.info("Simulation coming soon!", { duration: 3000 });
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors cursor-pointer"
        >
          <PlayIcon className="w-5 h-5 font-semibold" />
          <span className="hidden sm:inline">Simulate</span>
        </button>

        {/* Save & Export Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors cursor-pointer"
          >
            <span>Save & Export</span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {/* Description */}
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Save your project or download your architecture diagram as a
                  PNG image to share.
                </p>
              </div>

              {/* Options */}
              <div className="p-2 space-y-1">
                {/* Save Button */}
                <button
                  onClick={handleSaveClick}
                  disabled={saving || !hasChanges}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left cursor-pointer"
                >
                  {saving ? (
                    <svg
                      className="w-5 h-5 animate-spin text-primary-500"
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
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                    </svg>
                  )}
                  <div className="flex-1">
                    <div className="font-medium">Save Project</div>
                    <div className="text-xs text-gray-500">
                      Save to database
                    </div>
                  </div>
                </button>

                {/* Download Button */}
                <button
                  onClick={onDownload}
                  disabled={downloading}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left cursor-pointer"
                >
                  {downloading ? (
                    <svg
                      className="w-5 h-5 animate-spin text-primary-500"
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
                  ) : (
                    <ArrowDownTrayIcon className="w-5 h-5 text-gray-400" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">Download PNG</div>
                    <div className="text-xs text-gray-500">
                      Export diagram as PNG
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
