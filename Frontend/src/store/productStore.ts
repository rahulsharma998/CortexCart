import { create } from "zustand";
import { api } from "@/services/api";
import type { Product } from "@/types";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  addProduct: (data: Partial<Product>) => Promise<void>;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/products");
      set({ products: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || "Failed to fetch products",
        isLoading: false,
      });
    }
  },

  addProduct: async (data) => {
    set({ isLoading: true, error: null });

    try {
      await api.post("/products", data);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || "Failed to add product",
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
