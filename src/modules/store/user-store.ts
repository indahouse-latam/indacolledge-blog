import { Author } from "@/types/sanity";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createCookieStorage } from "../common/lib/cookiesStorage";

interface AuthState {
  user: Author | null;
  isAuthenticated: boolean;
  setUser: (user: Author | null) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      signOut: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => createCookieStorage()),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
