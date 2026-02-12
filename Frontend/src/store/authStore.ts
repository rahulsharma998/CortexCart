import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginCredentials, RegisterData } from "../types";
import { authService } from "../services/auth.service";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  users: User[]; // for admin
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  fetchUsers: () => Promise<void>;
  toggleUserStatus: (userId: string) => Promise<void>;
  clearError: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      users: [],
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.login(credentials);

          localStorage.setItem("token", response.access_token);

          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.detail || "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.register(data);

          localStorage.setItem("token", response.access_token);

          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          const detail = error.response?.data?.detail;
          set({
            error: typeof detail === "string" ? detail : (detail ? JSON.stringify(detail) : "Registration failed"),
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      fetchCurrentUser: async () => {
        set({ isLoading: true, error: null });

        try {
          const user = await authService.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          } else {
            set({
              error:
                error.response?.data?.detail ||
                "Failed to fetch user",
              isLoading: false,
            });
          }
        }
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });

        try {
          const user = await authService.updateProfile(data);
          set({
            user,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.detail ||
              "Failed to update profile",
            isLoading: false,
          });
          throw error;
        }
      },

      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          const users = await authService.getUsers();
          set({ users, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.detail || "Failed to fetch users",
            isLoading: false
          });
        }
      },

      toggleUserStatus: async (userId: string) => {
        try {
          const result = await authService.toggleUserStatus(userId);
          set((state) => ({
            users: state.users.map((u) =>
              u._id === userId ? { ...u, isActive: result.is_active } : u
            ),
          }));
        } catch (error: any) {
          set({
            error: error.response?.data?.detail || "Failed to toggle user status",
          });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
