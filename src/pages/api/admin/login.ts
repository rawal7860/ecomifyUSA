import type { NextApiRequest, NextApiResponse } from "next";
import {
  safeCompareAdminPassword,
  signAdminSession,
} from "@/lib/adminAuth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: "Admin password is not configured" });
  }
  if (!process.env.ADMIN_SESSION_SECRET) {
    return res
      .status(500)
      .json({ error: "ADMIN_SESSION_SECRET is not configured" });
  }

  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!password || !safeCompareAdminPassword(password, ADMIN_PASSWORD)) {
    return res.status(401).json({ error: "Invalid admin password" });
  }

  let token: string;
  try {
    token = signAdminSession();
  } catch (err) {
    return res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Session config error" });
  }

  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  // Path=/ so /api/admin/* also receives the cookie, not just /admin/* pages.
  res.setHeader(
    "Set-Cookie",
    `admin_auth=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${secureFlag}`,
  );

  return res.status(200).json({ ok: true });
}
