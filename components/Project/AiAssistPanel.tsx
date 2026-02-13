"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  XMarkIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useAiAssist, type ChatMessage } from "@/lib/hooks/useAiAssist";
import useUserStore from "@/store/useUserStore";
import useProjectStore from "@/store/useProjectStore";
import type { Node, Edge } from "@xyflow/react";

// =====================
// AI Assist Panel — Chat-bubble interface
// =====================

interface AiAssistPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onArchitectureGenerated: (
    nodes: Node[],
    edges: Edge[],
    message: string,
  ) => void;
}

const STAGE_ICONS: Record<string, string> = {
  analyzing: "/magnifier.svg",
  planning: "/clipboard-list.svg",
  generating: "/stars.svg",
  validating: "/check-read.svg",
};

const STAGE_LABELS: Record<string, string> = {
  analyzing: "Analyzing your system idea…",
  planning: "Planning system components…",
  generating: "Designing architecture…",
  validating: "Finalizing connections…",
};

// ── Shimmer Skeleton ──────────────────────────────────────
function ShimmerSkeleton({ stage }: { stage?: string | null }) {
  return (
    <div className="space-y-3">
      {/* Stage indicator */}
      {stage && STAGE_ICONS[stage] && (
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 shrink-0">
            <Image
              src={STAGE_ICONS[stage]}
              alt={stage}
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
          <span className="text-xs font-medium text-gray-500">
            {STAGE_LABELS[stage] || "Processing…"}
          </span>
        </div>
      )}
      {/* Shimmer bars */}
      <div className="space-y-2">
        <div className="chat-shimmer h-3 w-full rounded" />
        <div className="chat-shimmer h-3 w-4/5 rounded" />
        <div className="chat-shimmer h-3 w-3/5 rounded" />
      </div>
    </div>
  );
}

// ── User Bubble ───────────────────────────────────────────
function UserBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] px-4 py-3 bg-primary-500 text-white rounded-2xl rounded-br-md shadow-sm">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <p className="text-[10px] text-white/60 mt-1.5 text-right">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

// ── AI Bubble ─────────────────────────────────────────────
function AiBubble({
  message,
  onViewArchitecture,
}: {
  message: ChatMessage;
  onViewArchitecture?: () => void;
}) {
  const isError = message.stage === "error";
  const isComplete = message.stage === "complete" && !message.isLoading;

  // SSE loading — subtle text indicator, no bubble
  if (message.isLoading) {
    const stage = message.stage;
    return (
      <div className="flex items-center gap-2 pl-1 py-1">
        {stage && STAGE_ICONS[stage] && (
          <div className="w-4 h-4 shrink-0">
            <Image
              src={STAGE_ICONS[stage]}
              alt={stage}
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
        )}
        <span className="text-sm text-gray-400 italic">
          {(stage && STAGE_LABELS[stage]) || "Processing…"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-2.5">
      {/* Avatar */}
      <div className="shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
        <Image
          src="/yvechart_logo.svg"
          alt="AI"
          width={16}
          height={16}
          className="object-contain"
        />
      </div>

      {/* Bubble — w-fit so it hugs content, max-w clamps long text */}
      <div
        className={`w-fit max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-md shadow-sm ${isError
            ? "bg-red-50 border border-red-100"
            : "bg-gray-50 border border-gray-100"
          }`}
      >
        {/* Error state */}
        {isError && (
          <div className="flex items-start gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-700">
                Generation failed
              </p>
              <p className="text-xs text-red-500 mt-0.5">
                {message.error || message.content}
              </p>
            </div>
          </div>
        )}

        {/* Complete state */}
        {isComplete && (
          <div>
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
            {message.data && (
              <button
                onClick={onViewArchitecture}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                <SparklesIcon className="w-3.5 h-3.5" />
                View Architecture
              </button>
            )}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-[10px] text-gray-400 mt-1.5">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

// ── Example Prompts ───────────────────────────────────────
const EXAMPLES = [
  "Build a real-time chat application with authentication",
  "Design a scalable e-commerce platform like Shopify",
  "Create a video streaming service with low bandwidth support",
  "Build a SaaS analytics dashboard with multi-tenancy",
];

function EmptyState({
  onSelectExample,
}: {
  onSelectExample: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
        <Image
          src="/yvechart_logo.svg"
          alt="AI Architect"
          width={28}
          height={28}
          className="object-contain"
        />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">
        AI Architect
      </h3>
      <p className="text-xs text-gray-500 mb-6 max-w-[240px]">
        Describe the system you want to build and I&apos;ll generate the
        architecture diagram for you.
      </p>
      <div className="w-full space-y-2">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider text-left">
          Try an example
        </p>
        {EXAMPLES.map((example) => (
          <button
            key={example}
            onClick={() => onSelectExample(example)}
            className="w-full text-left px-3.5 py-2.5 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl transition-colors leading-relaxed cursor-pointer"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main Panel ────────────────────────────────────────────
export default function AiAssistPanel({
  isOpen,
  onClose,
  onArchitectureGenerated,
}: AiAssistPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [visible, setVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const token = useUserStore((s) => s.token);
  const aiCredits = useUserStore((s) => s.user?.ai_credits ?? 0);
  const architecture = useProjectStore((s) => s.architecture);
  const hasCredits = aiCredits > 0;

  const {
    isGenerating,
    stage,
    messages,
    generate,
    cancel,
    reset,
  } = useAiAssist();

  // Animate in
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }
  }, [isOpen]);

  // Auto-focus textarea
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 104)}px`;
    }
  }, [prompt, isOpen]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, stage]);

  const handleSubmit = async () => {
    if (!prompt.trim() || isGenerating || !token) return;

    const currentPrompt = prompt.trim();
    setPrompt("");

    const result = await generate(token, currentPrompt, {
      workspaceId: architecture?.workspace_id,
      title: architecture?.name || "AI Generation",
    });

    if (result) {
      onArchitectureGenerated(result.nodes, result.edges, result.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClose = () => {
    if (isGenerating) cancel();
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleNewPrompt = () => {
    reset();
    setPrompt("");
    textareaRef.current?.focus();
  };

  const handleViewArchitecture = (msg: ChatMessage) => {
    if (msg.data) {
      onArchitectureGenerated(msg.data.nodes, msg.data.edges, msg.data.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ display: isOpen ? undefined : "none" }}
    >
      {/* Sheet */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center p-1.5">
              <Image
                src="/yvechart_logo.svg"
                alt="AI Architect"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                AI Architect
              </h3>
              <p className="text-[11px] text-gray-400">
                {isGenerating ? (
                  <span className="text-primary-500 font-medium">
                    Generating…
                  </span>
                ) : (
                  "Describe your system idea"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Credit Badge */}
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium ${hasCredits
                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                  : "bg-red-50 text-red-500 border border-red-100"
                }`}
              title={`${aiCredits.toFixed(2)} AI credits remaining`}
            >
              <SparklesIcon className="w-3 h-3" />
              {aiCredits.toFixed(2)} Credits
            </div>
            {messages.length > 0 && (
              <button
                onClick={handleNewPrompt}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                title="New conversation"
              >
                <ArrowPathIcon className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <EmptyState onSelectExample={(ex) => setPrompt(ex)} />
          ) : (
            <div className="space-y-4">
              {messages.map((msg) =>
                msg.role === "user" ? (
                  <UserBubble key={msg.id} message={msg} />
                ) : (
                  <AiBubble
                    key={msg.id}
                    message={msg}
                    onViewArchitecture={() => handleViewArchitecture(msg)}
                  />
                ),
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 border-t border-gray-100 bg-white">
          {/* Zero-credits banner */}
          {!hasCredits && (
            <div className="mb-2.5 flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl">
              <ExclamationTriangleIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 leading-relaxed">
                <span className="font-semibold">AI limit reached</span> — 0.00 credits available. Kindly upgrade to continue using AI Assist.
              </p>
            </div>
          )}
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={hasCredits ? "Describe the system you want to build…" : "No credits remaining"}
              disabled={isGenerating || !hasCredits}
              rows={1}
              className="ai-textarea flex-1 px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={isGenerating ? cancel : handleSubmit}
              disabled={!isGenerating && (!prompt.trim() || !token || !hasCredits)}
              className={`shrink-0 p-2.5 rounded-xl transition-colors cursor-pointer ${isGenerating
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed"
                }`}
              title={isGenerating ? "Stop generation" : hasCredits ? "Generate architecture" : "No credits remaining"}
            >
              {isGenerating ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <PaperAirplaneIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="mt-1.5 text-[10px] text-gray-400 text-center">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Thin scrollbar styles */}
      <style jsx global>{`
        .ai-textarea {
          overflow-y: auto;
        }
        .ai-textarea::-webkit-scrollbar {
          width: 3px;
        }
        .ai-textarea::-webkit-scrollbar-track {
          background: transparent;
        }
        .ai-textarea::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 3px;
        }
        .ai-textarea::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
