import type { NextApiRequest, NextApiResponse } from "next";
import { decryptPortalPassword, getAdminSupabase } from "@/lib/salestaxAdminServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "Method not allowed." }); }
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ error: "Sign in to view these credentials." });
  try {
    const db = getAdminSupabase();
    const { data: { user }, error: authError } = await db.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: "Your session has expired. Please sign in again." });
    const { data: client, error: clientError } = await db.from("salestax_clients").select("id").eq("user_id", user.id).maybeSingle();
    if (clientError || !client) return res.status(404).json({ error: "Client profile not found." });
    const registrationId = req.body?.registrationId;
    const { data: registration, error } = await db.from("salestax_registrations").select("portal_password").eq("id", registrationId).eq("client_id", client.id).maybeSingle();
    if (error || !registration) return res.status(404).json({ error: "Registration not found." });
    return res.status(200).json({ password: decryptPortalPassword(registration.portal_password || "") });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Unable to retrieve credentials." });
  }
}
