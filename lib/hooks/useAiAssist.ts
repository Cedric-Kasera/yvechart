import { useState, useCallback, useRef } from "react";
import { generateArchitecture, type AiStage, type AiStageUpdate } from "@/api/ai";
import useUserStore from "@/store/useUserStore";
import type { Node, Edge } from "@xyflow/react";

// =====================
// AI Assist Hook
// =====================

/** Human-readable stage messages */
const STAGE_MESSAGES: Record<AiStage, string> = {
    analyzing: "Analyzing your system idea…",
    planning: "Planning system components…",
    generating: "Designing system components…",
    validating: "Finalizing connections…",
    complete: "",
    error: "",
};

/** A single chat message (user or AI) */
export interface ChatMessage {
    id: string;
    role: "user" | "ai";
    content: string;
    timestamp: Date;
    /** AI-specific: current stage during generation */
    stage?: AiStage | null;
    /** AI-specific: the generated architecture data */
    data?: { nodes: Node[]; edges: Edge[]; message: string } | null;
    /** Whether this message is still being generated */
    isLoading?: boolean;
    /** Error message if generation failed */
    error?: string | null;
}

export interface AiAssistState {
    /** Whether the AI pipeline is currently running */
    isGenerating: boolean;
    /** The current pipeline stage */
    stage: AiStage | null;
    /** Human-readable message for the current stage */
    stageMessage: string;
    /** Error message if generation failed */
    error: string | null;
    /** The AI-generated summary message */
    resultMessage: string | null;
    /** Chat message history */
    messages: ChatMessage[];
}

export interface UseAiAssistReturn extends AiAssistState {
    /** Trigger AI architecture generation */
    generate: (
        token: string,
        prompt: string,
        options?: { workspaceId?: string; title?: string },
    ) => Promise<{ nodes: Node[]; edges: Edge[]; message: string } | null>;
    /** Cancel an in-progress generation */
    cancel: () => void;
    /** Reset state to initial */
    reset: () => void;
}

const INITIAL_STATE: AiAssistState = {
    isGenerating: false,
    stage: null,
    stageMessage: "",
    error: null,
    resultMessage: null,
    messages: [],
};

let messageIdCounter = 0;
function nextId() {
    return `msg-${Date.now()}-${++messageIdCounter}`;
}

export function useAiAssist(): UseAiAssistReturn {
    const [state, setState] = useState<AiAssistState>(INITIAL_STATE);
    const abortRef = useRef<AbortController | null>(null);
    const aiMessageIdRef = useRef<string | null>(null);

    const generate = useCallback(
        async (
            token: string,
            prompt: string,
            options?: { workspaceId?: string; title?: string },
        ) => {
            // Cancel any existing generation
            if (abortRef.current) {
                abortRef.current.abort();
            }

            const controller = new AbortController();
            abortRef.current = controller;

            // Create user message
            const userMsg: ChatMessage = {
                id: nextId(),
                role: "user",
                content: prompt,
                timestamp: new Date(),
            };

            // Create AI placeholder message
            const aiMsgId = nextId();
            aiMessageIdRef.current = aiMsgId;
            const aiMsg: ChatMessage = {
                id: aiMsgId,
                role: "ai",
                content: "",
                timestamp: new Date(),
                stage: "analyzing",
                isLoading: true,
            };

            // ── Credit pre-check ──
            const user = useUserStore.getState().user;
            if (user && user.ai_credits <= 0) {
                const creditError = "AI limit reached \u2014 0 credits available. Kindly upgrade to continue using AI Assist.";
                const errorMsg: ChatMessage = {
                    id: aiMsgId,
                    role: "ai",
                    content: creditError,
                    timestamp: new Date(),
                    stage: "error",
                    isLoading: false,
                    error: creditError,
                };
                setState((prev) => ({
                    ...prev,
                    isGenerating: false,
                    stage: "error",
                    stageMessage: "",
                    error: creditError,
                    messages: [...prev.messages, userMsg, errorMsg],
                }));
                return null;
            }

            setState((prev) => ({
                ...prev,
                isGenerating: true,
                stage: "analyzing",
                stageMessage: STAGE_MESSAGES.analyzing,
                error: null,
                resultMessage: null,
                messages: [...prev.messages, userMsg, aiMsg],
            }));

            try {
                const result = await generateArchitecture(
                    token,
                    prompt,
                    (update: AiStageUpdate) => {
                        // Handle remaining credits event
                        if (update.remaining_credits !== undefined) {
                            const currentUser = useUserStore.getState().user;
                            if (currentUser) {
                                useUserStore.getState().setUser({
                                    ...currentUser,
                                    ai_credits: update.remaining_credits,
                                });
                            }
                            return;
                        }

                        if (update.stage === "error") {
                            setState((prev) => ({
                                ...prev,
                                isGenerating: false,
                                stage: "error",
                                stageMessage: "",
                                error: update.error || "Generation failed",
                                messages: prev.messages.map((m) =>
                                    m.id === aiMsgId
                                        ? {
                                            ...m,
                                            isLoading: false,
                                            stage: "error",
                                            error: update.error || "Generation failed",
                                            content: update.error || "Generation failed",
                                        }
                                        : m,
                                ),
                            }));
                            return;
                        }

                        if (update.stage === "complete") {
                            setState((prev) => ({
                                ...prev,
                                isGenerating: false,
                                stage: "complete",
                                stageMessage: "",
                                resultMessage: update.data?.message || null,
                                messages: prev.messages.map((m) =>
                                    m.id === aiMsgId
                                        ? {
                                            ...m,
                                            isLoading: false,
                                            stage: "complete",
                                            content: update.data?.message || "Architecture generated successfully.",
                                            data: update.data
                                                ? {
                                                    nodes: update.data.nodes as Node[],
                                                    edges: update.data.edges as Edge[],
                                                    message: update.data.message,
                                                }
                                                : null,
                                        }
                                        : m,
                                ),
                            }));
                            return;
                        }

                        // Progress update
                        if (update.stage) {
                            setState((prev) => ({
                                ...prev,
                                stage: update.stage as AiStage,
                                stageMessage: STAGE_MESSAGES[update.stage as AiStage] || "",
                                messages: prev.messages.map((m) =>
                                    m.id === aiMsgId
                                        ? { ...m, stage: update.stage as AiStage }
                                        : m,
                                ),
                            }));
                        }
                    },
                    controller.signal,
                    options,
                );

                if (result) {
                    return {
                        nodes: result.nodes as Node[],
                        edges: result.edges as Edge[],
                        message: result.message,
                    };
                }

                return null;
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    setState((prev) => ({
                        ...prev,
                        isGenerating: false,
                        stage: null,
                        stageMessage: "",
                        error: null,
                        messages: prev.messages.filter((m) => m.id !== aiMsgId),
                    }));
                    return null;
                }

                const errorMessage = err instanceof Error ? err.message : "Generation failed";
                setState((prev) => ({
                    ...prev,
                    isGenerating: false,
                    stage: "error",
                    stageMessage: "",
                    error: errorMessage,
                    messages: prev.messages.map((m) =>
                        m.id === aiMsgId
                            ? {
                                ...m,
                                isLoading: false,
                                stage: "error" as AiStage,
                                error: errorMessage,
                                content: errorMessage,
                            }
                            : m,
                    ),
                }));
                return null;
            } finally {
                abortRef.current = null;
                aiMessageIdRef.current = null;
            }
        },
        [],
    );

    const cancel = useCallback(() => {
        if (abortRef.current) {
            abortRef.current.abort();
            abortRef.current = null;
        }
    }, []);

    const reset = useCallback(() => {
        cancel();
        setState(INITIAL_STATE);
    }, [cancel]);

    return {
        ...state,
        generate,
        cancel,
        reset,
    };
}
