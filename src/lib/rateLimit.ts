import type { NextApiRequest } from "next";

/**
 * Simple per-IP sliding-window rate limiter using an in-memory Map.
 * Good enough for single-instance Vercel functions; replace with Upstash/Redis if you
 * need to enforce limits across all serverless invocations.
 */

interface Bucket {
  hits: number[]; // unix ms timestamps
}

const buckets = new Map<string, Bucket>();

export function getClientIp(req: NextApiRequest): string {
  // Vercel sets x-forwarded-for as "ip1, ip2, ..."; the first is the real client.
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  if (Array.isArray(xff) && xff.length > 0) {
    return xff[0].split(",")[0].trim();
  }
  return req.socket?.remoteAddress ?? "unknown";
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Check + record a hit. Returns ok: false if the caller is over the limit.
 * @param key Usually the client IP, optionally namespaced (e.g. `chat:${ip}`).
 * @param limit Max requests allowed in the window.
 * @param windowMs Window size in milliseconds.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { hits: [] };
    buckets.set(key, bucket);
  }

  // Drop hits older than the window.
  bucket.hits = bucket.hits.filter((t) => t > cutoff);

  if (bucket.hits.length >= limit) {
    const oldest = bucket.hits[0];
    const retryAfter = Math.ceil((oldest + windowMs - now) / 1000);
    return { ok: false, remaining: 0, retryAfterSeconds: Math.max(retryAfter, 1) };
  }

  bucket.hits.push(now);
  return {
    ok: true,
    remaining: limit - bucket.hits.length,
    retryAfterSeconds: 0,
  };
}

// Periodically prune stale buckets so the Map doesn't grow forever.
// Runs only in long-lived processes (dev server, persistent serverless).
if (typeof setInterval === "function") {
  const PRUNE_INTERVAL_MS = 5 * 60 * 1000;
  setInterval(() => {
    const cutoff = Date.now() - 60 * 60 * 1000; // 1 hour
    for (const [key, bucket] of buckets.entries()) {
      const recent = bucket.hits.filter((t) => t > cutoff);
      if (recent.length === 0) {
        buckets.delete(key);
      } else {
        bucket.hits = recent;
      }
    }
  }, PRUNE_INTERVAL_MS).unref?.();
}
