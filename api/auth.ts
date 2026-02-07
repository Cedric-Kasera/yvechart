const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import { storeWorkspaceLocally } from "./workspace";

// ─── Authentication (no token required) ───

export async function signup(data: { name: string; email: string; password: string, terms_accepted: boolean }) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  storeWorkspaceLocally(result);
  return result;
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  storeWorkspaceLocally(result);
  return result;
}

export async function forgotPassword(data: { email: string }) {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function resetPassword(data: { token: string; password: string }) {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function activateAccount(token: string) {
  const res = await fetch(`${BASE_URL}/auth/activate/${token}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
