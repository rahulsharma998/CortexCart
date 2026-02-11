import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;

  globalLoading: boolean;
  setGlobalLoading: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (value) => set({ sidebarOpen: value }),

  globalLoading: false,
  setGlobalLoading: (value) => set({ globalLoading: value }),
}));
