const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ─── User Profile (Bearer token required) ───

export async function getProfile(token: string) {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "GET",
    headers: authHeaders(token),
  });
  return res.json();
}

export async function updateProfile(
  token: string,
  data: Partial<{ name: string; avatar_url: string }>,
) {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProfile(token: string) {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return res.json();
}

export async function deleteWorkspace(token: string) {
  const res = await fetch(`${BASE_URL}/auth/workspace`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return res.json();
}
