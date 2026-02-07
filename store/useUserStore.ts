import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  type: string;
  activation: string;
  created_at: string;
  updated_at: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;

  /** Set user + token (login / signup) and persist to localStorage */
  setAuth: (user: User, token: string) => void;

  /** Update user only (profile get / update) and persist to localStorage */
  setUser: (user: User) => void;

  /** Clear everything (logout / delete account) */
  clearAuth: () => void;

  /** Hydrate from localStorage on app boot */
  hydrate: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isHydrated: false,

  setAuth: (user, token) => {
    localStorage.setItem("yve_user", JSON.stringify(user));
    localStorage.setItem("yve_token", token);
    set({ user, token });
  },

  setUser: (user) => {
    localStorage.setItem("yve_user", JSON.stringify(user));
    set({ user });
  },

  clearAuth: () => {
    localStorage.removeItem("yve_user");
    localStorage.removeItem("yve_token");
    localStorage.removeItem("yve_workspace");
    set({ user: null, token: null });
  },

  hydrate: () => {
    try {
      const storedUser = localStorage.getItem("yve_user");
      const storedToken = localStorage.getItem("yve_token");
      set({
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken ?? null,
        isHydrated: true,
      });
    } catch {
      set({ user: null, token: null, isHydrated: true });
    }
  },
}));

export default useUserStore;
