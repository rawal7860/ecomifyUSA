import type { NextApiRequest, NextApiResponse } from "next";
import { decryptPortalPassword, encryptPortalPassword, getAdminSupabase, hasAdminSession } from "@/lib/salestaxAdminServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!hasAdminSession(req)) return res.status(401).json({ error: "Admin authentication required." });
  try {
    const db = getAdminSupabase();
    if (req.method === "GET") {
      if (req.query.action === "clients") {
        const [clients, registrations, filings] = await Promise.all([db.from("salestax_clients").select("*").order("created_at", { ascending: false }), db.from("salestax_registrations").select("id,client_id,state,filing_frequency,start_date,is_active"), db.from("salestax_filings").select("client_id,registration_id,period_month,period_year,filed_date")]);
        if (clients.error || registrations.error || filings.error) throw clients.error || registrations.error || filings.error;
        return res.status(200).json({ clients: clients.data || [], registrations: registrations.data || [], filings: filings.data || [] });
      }
      if (req.query.action === "client" && typeof req.query.id === "string") {
        const id = req.query.id;
        const [client, registrations, filings] = await Promise.all([db.from("salestax_clients").select("*").eq("id", id).maybeSingle(), db.from("salestax_registrations").select("*").eq("client_id", id).order("state"), db.from("salestax_filings").select("*").eq("client_id", id).order("filed_date", { ascending: false })]);
        if (client.error || registrations.error || filings.error) throw client.error || registrations.error || filings.error;
        if (!client.data) return res.status(404).json({ error: "Client not found." });
        return res.status(200).json({ client: client.data, registrations: (registrations.data || []).map((item) => ({ ...item, portal_password: decryptPortalPassword(item.portal_password || "") })), filings: filings.data || [] });
      }
      if (req.query.action === "registrations") {
        const { data, error } = await db.from("salestax_registrations").select("id,client_id,state,filing_frequency,is_active").order("state");
        if (error) throw error;
        return res.status(200).json({ registrations: data || [] });
      }
      return res.status(400).json({ error: "Unknown query action." });
    }
    if (req.method === "POST") {
      const body = req.body || {};
      if (body.action === "create-client") {
        const { full_name, email, company_name, platform, phone, registrations = [] } = body;
        if (!full_name || !email || !company_name || !platform) return res.status(400).json({ error: "Name, email, company, and platform are required." });
        const { data: client, error } = await db.from("salestax_clients").insert({ full_name, email, company_name, platform, phone: phone || "", user_id: null }).select("*").single();
        if (error) throw error;
        if (registrations.length) {
          const rows = registrations.map((registration: Record<string, unknown>) => ({ ...registration, client_id: client.id, portal_password: encryptPortalPassword(String(registration.portal_password || "")), is_active: true }));
          const { error: registrationError } = await db.from("salestax_registrations").insert(rows);
          if (registrationError) throw registrationError;
        }
        return res.status(201).json({ client });
      }
      if (body.action === "create-registration") {
        const { action: _action, ...registration } = body;
        registration.portal_password = encryptPortalPassword(String(registration.portal_password || ""));
        const { data, error } = await db.from("salestax_registrations").insert(registration).select("*").single();
        if (error) throw error;
        return res.status(201).json({ registration: { ...data, portal_password: decryptPortalPassword(data.portal_password || "") } });
      }
      if (body.action === "create-filing") {
        const { action: _action, ...filing } = body;
        const { data, error } = await db.from("salestax_filings").insert({ ...filing, status: filing.status || "Filed", filed_by: filing.filed_by || "ecomifyUSA" }).select("*").single();
        if (error) throw error;
        return res.status(201).json({ filing: data });
      }
      return res.status(400).json({ error: "Unknown create action." });
    }
    if (req.method === "PATCH") {
      const { id, ...updates } = req.body || {};
      if (!id) return res.status(400).json({ error: "Registration id is required." });
      if (typeof updates.portal_password === "string") updates.portal_password = encryptPortalPassword(updates.portal_password);
      const { data, error } = await db.from("salestax_registrations").update(updates).eq("id", id).select("*").single();
      if (error) throw error;
      return res.status(200).json({ registration: { ...data, portal_password: decryptPortalPassword(data.portal_password || "") } });
    }
    res.setHeader("Allow", "GET, POST, PATCH");
    return res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    console.error("Sales tax admin API error:", error);
    return res.status(500).json({ error: error instanceof Error ? error.message : "Unable to process admin request." });
  }
}
