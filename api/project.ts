const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function authHeaders(token: string) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

// ─── Architecture / Project Management (Bearer token required) ───

export async function createArchitecture(
    token: string,
    data: { workspace_id: string; name: string; description?: string; logo_url?: string },
) {
    const res = await fetch(`${BASE_URL}/architectures/create`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function getArchitecturesByWorkspace(token: string, workspaceId: string) {
    const res = await fetch(`${BASE_URL}/architectures/workspace/${workspaceId}`, {
        method: "GET",
        headers: authHeaders(token),
    });
    return res.json();
}

export async function getArchitecture(token: string, id: string) {
    const res = await fetch(`${BASE_URL}/architectures/${id}`, {
        method: "GET",
        headers: authHeaders(token),
    });
    return res.json();
}

export async function updateArchitecture(
    token: string,
    id: string,
    data: Partial<{ name: string; description: string; logo_url: string }>,
) {
    const res = await fetch(`${BASE_URL}/architectures/${id}`, {
        method: "PATCH",
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteArchitecture(token: string, id: string) {
    const res = await fetch(`${BASE_URL}/architectures/${id}`, {
        method: "DELETE",
        headers: authHeaders(token),
    });
    return res.json();
}

export async function saveArchitecture(
    token: string,
    id: string,
    data: { nodes: any[]; edges: any[] },
) {
    const res = await fetch(`${BASE_URL}/architectures/${id}/save`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    return res.json();
}
