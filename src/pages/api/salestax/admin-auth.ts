import type { NextApiRequest, NextApiResponse } from "next";
import { clearAdminCookie, hasAdminSession, setAdminCookie, verifyAdminPassword } from "@/lib/salestaxAdminServer";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return res.status(200).json({ authenticated: hasAdminSession(req) });
  if (req.method === "POST") {
    if (!process.env.ADMIN_PASSWORD) return res.status(503).json({ error: "Admin access is not configured." });
    if (!verifyAdminPassword(req.body?.password)) return res.status(401).json({ error: "Incorrect admin password." });
    setAdminCookie(res);
    return res.status(200).json({ authenticated: true });
  }
  if (req.method === "DELETE") { clearAdminCookie(res); return res.status(200).json({ authenticated: false }); }
  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ error: "Method not allowed." });
}
