import { create } from "zustand";
import { api } from "@/services/api";
import type { Order } from "@/types";

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;

  fetchOrders: () => Promise<void>;
  createOrder: (data: Partial<Order>) => Promise<void>;
  clearError: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/orders");
      set({ orders: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || "Failed to fetch orders",
        isLoading: false,
      });
    }
  },

  createOrder: async (data) => {
    set({ isLoading: true, error: null });

    try {
      await api.post("/orders", data);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || "Failed to create order",
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
