import { createHmac, createHash, randomBytes, timingSafeEqual, createCipheriv, createDecipheriv } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const COOKIE_NAME = "salestax_admin";
const SESSION_MAX_AGE = 60 * 60 * 12;

function sessionKey() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not configured.");
  return createHash("sha256").update(`${password}:ecomifyusa-sales-tax-admin`).digest();
}

export function verifyAdminPassword(value: unknown) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof value !== "string") return false;
  const inputBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return inputBuffer.length === expectedBuffer.length && timingSafeEqual(inputBuffer, expectedBuffer);
}

function createSessionToken() {
  const issuedAt = Math.floor(Date.now() / 1000).toString();
  const signature = createHmac("sha256", sessionKey()).update(issuedAt).digest("hex");
  return `${issuedAt}.${signature}`;
}

export function setAdminCookie(res: NextApiResponse) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=${createSessionToken()}; HttpOnly; Path=/api/salestax; SameSite=Strict; Max-Age=${SESSION_MAX_AGE}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
}

export function clearAdminCookie(res: NextApiResponse) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; HttpOnly; Path=/api/salestax; SameSite=Strict; Max-Age=0${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
}

export function hasAdminSession(req: NextApiRequest) {
  try {
    const token = req.cookies[COOKIE_NAME];
    const [issuedAt, signature] = (token || "").split(".");
    if (!/^\d+$/.test(issuedAt) || !/^[a-f0-9]{64}$/.test(signature)) return false;
    const age = Math.floor(Date.now() / 1000) - Number(issuedAt);
    if (age < 0 || age > SESSION_MAX_AGE) return false;
    const expected = createHmac("sha256", sessionKey()).update(issuedAt).digest("hex");
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch { return false; }
}

export function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase environment variables are not configured.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function encryptionKey() {
  const secret = process.env.SALESTAX_CREDENTIALS_KEY || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("Configure SALESTAX_CREDENTIALS_KEY to protect state portal passwords.");
  return createHash("sha256").update(secret).digest();
}

export function encryptPortalPassword(password: string) {
  if (!password) return "";
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(password, "utf8"), cipher.final()]);
  return `enc:v1:${iv.toString("hex")}:${cipher.getAuthTag().toString("hex")}:${encrypted.toString("hex")}`;
}

export function decryptPortalPassword(value: string) {
  if (!value || !value.startsWith("enc:v1:")) return value || "";
  const [, , ivHex, tagHex, ciphertextHex] = value.split(":");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(ivHex, "hex"));
  decipher.setAuthTag(Buffer.from(tagHex, "hex"));
  return Buffer.concat([decipher.update(Buffer.from(ciphertextHex, "hex")), decipher.final()]).toString("utf8");
}
