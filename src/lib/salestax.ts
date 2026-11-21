import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type FilingFrequency = "Monthly" | "Quarterly" | "Annual";
export type FilingStatus = "Filed" | "Pending" | "Due Soon" | "Overdue";

export interface SalesTaxClient {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  company_name: string;
  platform: string;
  phone: string;
  created_at: string;
}

export interface SalesTaxRegistration {
  id: string;
  client_id: string;
  state: string;
  registration_number: string;
  filing_frequency: FilingFrequency;
  start_date: string;
  portal_url: string;
  portal_username: string;
  portal_password: string;
  notes: string;
  is_active: boolean;
  created_at: string;
}

export interface SalesTaxFiling {
  id: string;
  client_id: string;
  registration_id: string;
  period_month: number;
  period_year: number;
  gross_sales: number;
  taxable_sales: number;
  tax_amount: number;
  confirmation_number: string;
  filed_date: string;
  filed_by: string;
  notes: string;
  status: string;
  created_at: string;
  registration?: SalesTaxRegistration;
}

let client: SupabaseClient | null = null;

export function getSalesTaxSupabase() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase environment variables are not configured.");
    client = createClient(url, key);
  }
  return client;
}

export function nextDueDate(frequency: FilingFrequency, from = new Date()) {
  const due = new Date(from.getFullYear(), from.getMonth(), 20);
  if (frequency === "Monthly") {
    if (due <= from) due.setMonth(due.getMonth() + 1);
  } else if (frequency === "Quarterly") {
    const dueMonths = [0, 3, 6, 9];
    let nextMonth = dueMonths.find((month) => new Date(from.getFullYear(), month, 20) > from);
    let year = from.getFullYear();
    if (nextMonth === undefined) {
      nextMonth = 0;
      year += 1;
    }
    due.setFullYear(year, nextMonth, 20);
  } else {
    due.setFullYear(from.getFullYear(), 0, 20);
    if (due <= from) due.setFullYear(from.getFullYear() + 1);
  }
  return due;
}

export function getFilingStatus(date: string | Date, filed = false): FilingStatus {
  if (filed) return "Filed";
  const dueDate = new Date(date);
  const days = Math.ceil((dueDate.getTime() - Date.now()) / 86400000);
  if (days < 0) return "Overdue";
  if (days <= 7) return "Due Soon";
  return "Pending";
}

export function formatDate(value?: string | Date | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatCurrency(value?: number | string | null) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value || 0));
}

export function periodLabel(month: number, year: number) {
  return `${new Date(year, month - 1, 1).toLocaleString("en-US", { month: "long" })} ${year}`;
}

export const PLATFORM_OPTIONS = ["Amazon FBA", "Shopify", "WooCommerce", "eBay", "Etsy", "Other"];
export const US_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
