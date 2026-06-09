import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export interface CreateOrderData {
  service_type: string;
  business_name: string;
  state: string;
  state_code?: string;
  state_name?: string;
  total_amount: number;
  formation_fee?: number;
  service_fee?: number;
  addons?: any;
  entity_type?: string;
}

export const orderService = {
  // Get all orders for the current user
  async getUserOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("Get user orders:", { data, error });
    if (error) throw error;
    return data || [];
  },

  // Get a single order by ID
  async getOrderById(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    console.log("Get order by ID:", { data, error });
    if (error) throw error;
    return data;
  },

  // Create a new order
  async createOrder(orderData: Omit<OrderInsert, "id" | "created_at" | "updated_at">): Promise<Order> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("orders")
      .insert({
        ...orderData,
        user_id: user.id,
      })
      .select()
      .single();

    console.log("Create order:", { data, error });
    if (error) throw error;
    return data;
  },

  // Update an order
  async updateOrder(orderId: string, updates: OrderUpdate): Promise<Order> {
    const { data, error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", orderId)
      .select()
      .single();

    console.log("Update order:", { data, error });
    if (error) throw error;
    return data;
  },

  // Delete an order
  async deleteOrder(orderId: string): Promise<void> {
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    console.log("Delete order:", { error });
    if (error) throw error;
  },

  // Get order statistics
  async getOrderStats() {
    const { data, error } = await supabase
      .from("orders")
      .select("status");

    console.log("Get order stats:", { data, error });
    if (error) throw error;

    const orders = data || [];
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === "pending").length,
      in_progress: orders.filter(o => o.status === "in_progress").length,
      completed: orders.filter(o => o.status === "completed").length,
      cancelled: orders.filter(o => o.status === "cancelled").length,
    };
  },
};

export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User must be authenticated to create an order");
  }

  // Map total_amount to amount column
  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      service_type: orderData.service_type,
      business_name: orderData.business_name,
      state: orderData.state,
      state_code: orderData.state_code,
      state_name: orderData.state_name,
      amount: orderData.total_amount, // Map frontend 'total_amount' to DB 'amount'
      formation_fee: orderData.formation_fee,
      service_fee: orderData.service_fee,
      addons: orderData.addons,
      entity_type: orderData.entity_type,
      status: "pending",
      payment_status: "unpaid"
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw error;
  }

  return data;
};