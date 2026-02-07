const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ─── localStorage Helper ───

function storeWorkspaceLocally(responseData: any) {
  try {
    if (responseData?.data?.workspace) {
      localStorage.setItem("yve_workspace", JSON.stringify(responseData.data.workspace));
    }
  } catch (error) {
    console.error("Failed to store workspace in localStorage:", error);
  }
}

// ─── Workspace Management (Bearer token required) ───

export async function createWorkspace(
  token: string,
  data: { name: string; description?: string; slug: string },
) {
  const res = await fetch(`${BASE_URL}/workspace/create`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const result = await res.json();
  storeWorkspaceLocally(result);
  return result;
}

export async function getWorkspace(token: string, id: string) {
  const res = await fetch(`${BASE_URL}/workspace/${id}`, {
    method: "GET",
    headers: authHeaders(token),
  });
  const result = await res.json();
  storeWorkspaceLocally(result);
  return result;
}

export async function updateWorkspace(
  token: string,
  id: string,
  data: Partial<{ name: string; description: string }>,
) {
  const res = await fetch(`${BASE_URL}/workspace/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const result = await res.json();
  storeWorkspaceLocally(result);
  return result;
}

export async function deleteWorkspace(token: string, id: string) {
  const res = await fetch(`${BASE_URL}/workspace/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return res.json();
}

// Export helper for use in auth flows
export { storeWorkspaceLocally };
