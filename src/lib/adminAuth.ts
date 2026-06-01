import type { GetServerSidePropsContext } from "next";
import { createHmac, timingSafeEqual, randomBytes } from "crypto";

const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export function parseCookies(cookieHeader?: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) {
    return cookies;
  }

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...value] = cookie.split("=");
    if (!name) {
      return;
    }
    cookies[name.trim()] = decodeURIComponent(value.join("=").trim());
  });

  return cookies;
}

/**
 * Returns the secret used to sign admin sessions.
 * Throws if not configured — never falls back to a default in production.
 */
function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short (need 32+ chars). Generate with: openssl rand -hex 32",
    );
  }
  return secret;
}

interface SessionPayload {
  role: "admin";
  exp: number; // unix seconds
  jti: string; // random per-token id, makes each token unique
}

function base64UrlEncode(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): Buffer {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  return Buffer.from(padded + "=".repeat(pad ? 4 - pad : 0), "base64");
}

/** Sign a session payload into a tamper-proof token. Format: base64url(json).base64url(hmac) */
export function signAdminSession(): string {
  const payload: SessionPayload = {
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    jti: randomBytes(16).toString("hex"),
  };
  const body = base64UrlEncode(Buffer.from(JSON.stringify(payload)));
  const sig = base64UrlEncode(
    createHmac("sha256", getSessionSecret()).update(body).digest(),
  );
  return `${body}.${sig}`;
}

/** Verify a token came from us and hasn't expired. Returns the payload, or null. */
export function verifyAdminSession(token: string | undefined): SessionPayload | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;

  let expectedSigBuf: Buffer;
  let providedSigBuf: Buffer;
  try {
    expectedSigBuf = createHmac("sha256", getSessionSecret()).update(body).digest();
    providedSigBuf = base64UrlDecode(sig);
  } catch {
    return null;
  }

  if (expectedSigBuf.length !== providedSigBuf.length) return null;
  if (!timingSafeEqual(expectedSigBuf, providedSigBuf)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(body).toString("utf8")) as SessionPayload;
    if (payload.role !== "admin") return null;
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/** Timing-safe password comparison to prevent character-by-character timing attacks. */
export function safeCompareAdminPassword(provided: string, expected: string): boolean {
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isAdminAuthenticated(req: GetServerSidePropsContext["req"]): boolean {
  const token =
    (req.cookies && req.cookies.admin_auth) ||
    parseCookies(req.headers.cookie).admin_auth;
  return verifyAdminSession(token) !== null;
}

export function requireAdminAuth(ctx: GetServerSidePropsContext) {
  if (!isAdminAuthenticated(ctx.req)) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return null;
}
