import type { Node, Edge } from "@xyflow/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// =====================
// AI Architecture Generation API (SSE)
// =====================

export type AiStage = "analyzing" | "planning" | "generating" | "validating" | "complete" | "error";

export interface AiStageUpdate {
    stage?: AiStage;
    data?: {
        message: string;
        nodes: Node[];
        edges: Edge[];
    };
    error?: string;
    remaining_credits?: number;
}

/**
 * Send a prompt to the AI architecture generation endpoint.
 * Streams SSE events and calls onEvent for each stage update.
 *
 * @param token - Auth token
 * @param prompt - User's architecture description
 * @param onEvent - Callback for each SSE stage event
 * @param signal - Optional AbortSignal for cancellation
 * @returns The final architecture result
 */
export async function generateArchitecture(
    token: string,
    prompt: string,
    onEvent: (update: AiStageUpdate) => void,
    signal?: AbortSignal,
    options?: { workspaceId?: string; title?: string },
): Promise<AiStageUpdate["data"] | null> {
    const res = await fetch(`${BASE_URL}/ai/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            prompt,
            workspace_id: options?.workspaceId,
            title: options?.title,
        }),
        signal,
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        throw new Error(`AI generation failed: ${res.status} ${errorText}`);
    }

    if (!res.body) {
        throw new Error("No response body for SSE stream");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let finalResult: AiStageUpdate["data"] | null = null;

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }

            buffer += decoder.decode(value, { stream: true });

            // Process complete SSE lines
            const lines = buffer.split("\n");
            // Keep the last incomplete line in the buffer
            buffer = lines.pop() || "";

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed) continue;

                if (!trimmed.startsWith("data: ")) continue;

                const payload = trimmed.slice(6); // Remove "data: " prefix

                // Check for done sentinel
                if (payload === "[DONE]") {
                    return finalResult;
                }

                try {
                    const update: AiStageUpdate = JSON.parse(payload);
                    onEvent(update);

                    if (update.stage === "complete" && update.data) {
                        finalResult = update.data;
                    }

                    if (update.stage === "error") {
                        throw new Error(update.error || "AI generation failed");
                    }
                } catch (parseError) {
                    // If it's a rethrown error from above, rethrow it
                    if (parseError instanceof Error && parseError.message.includes("AI generation")) {
                        throw parseError;
                    }
                    // Otherwise ignore malformed SSE lines
                    console.warn("Failed to parse SSE event:", trimmed);
                }
            }
        }
    } finally {
        reader.releaseLock();
    }

    return finalResult;
}

// =====================
// AI Credits API
// =====================

/**
 * Fetch the authenticated user's current AI credit balance.
 */
export async function getAiCredits(token: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/ai/credits`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch AI credits: ${res.status}`);
    }

    const json = await res.json();
    return json.data?.ai_credits ?? 0;
}
