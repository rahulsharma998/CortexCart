import { create } from "zustand";
import { api } from "@/services/api";
import type { Order, CreateOrderData } from "@/types";

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;

  fetchOrders: () => Promise<void>;
  createOrder: (data: CreateOrderData) => Promise<{ orderId?: string }>;
  clearError: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/orders/my-orders");
      const rawOrders = Array.isArray(response.data) ? response.data : [];
      const orders: Order[] = rawOrders.map((o: any) => ({
        _id: o._id || o.id,
        user: o.user,
        user_id: o.user_id,
        items: Array.isArray(o.items)
          ? o.items.map((i: any) => ({
              product: i.product,
              product_id: i.product_id || i.product,
              name: i.name,
              quantity: i.quantity,
              price: i.price,
            }))
          : [],
        totalAmount: o.totalAmount ?? o.total_amount ?? 0,
        status: o.status,
        shippingAddress: o.shippingAddress ?? o.shipping_address ?? "Default",
        createdAt: o.createdAt ?? o.created_at ?? new Date().toISOString(),
        updatedAt: o.updatedAt ?? o.updated_at,
      }));
      set({ orders, isLoading: false });
    } catch (error: any) {
      set({
        orders: [],
        error: error.response?.data?.detail || "Failed to fetch orders",
        isLoading: false,
      });
    }
  },

  createOrder: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/orders/checkout", data);
      set({ isLoading: false });
      const orderId = response.data?.order?.id || response.data?.order?._id || response.data?.order_id;
      return { orderId };
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
