import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

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