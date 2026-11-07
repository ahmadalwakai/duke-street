export type RateLimitConfig = {
  prefix: string;
  windowMs: number;
  max: number;
  blockDurationMs?: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfter: number;
};

type Bucket = {
  count: number;
  resetAt: number;
  blockedUntil?: number;
};

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

declare global {
  var __dukeStreetTyresRateLimitStore: Map<string, Bucket> | undefined;
  var __dukeStreetTyresRateLimitLastCleanup: number | undefined;
}

function getStore(): Map<string, Bucket> {
  // Process/isolate-local only: middleware and route functions do not share a
  // global quota across Vercel instances. Use a shared store or platform rule
  // before relying on this as a distributed brute-force protection boundary.
  globalThis.__dukeStreetTyresRateLimitStore ??= new Map<string, Bucket>();
  return globalThis.__dukeStreetTyresRateLimitStore;
}

function cleanupExpiredBuckets(now: number, store: Map<string, Bucket>): void {
  const lastCleanup = globalThis.__dukeStreetTyresRateLimitLastCleanup ?? 0;
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

  for (const [key, bucket] of store.entries()) {
    const expiry = Math.max(bucket.resetAt, bucket.blockedUntil ?? 0);
    if (expiry <= now) store.delete(key);
  }

  globalThis.__dukeStreetTyresRateLimitLastCleanup = now;
}

function secondsUntil(timestamp: number, now: number): number {
  return Math.max(1, Math.ceil((timestamp - now) / 1000));
}

export function getClientIpFromHeaders(headers: Headers): string {
  // Requires a trusted proxy to overwrite incoming forwarding headers. Vercel
  // does this; a self-hosted deployment must enforce the same trust boundary.
  const forwardedFor = headers.get("x-forwarded-for");
  const candidates = [
    forwardedFor?.split(",")[0]?.trim(),
    headers.get("cf-connecting-ip"),
    headers.get("true-client-ip"),
    headers.get("x-real-ip"),
    headers.get("x-client-ip"),
  ];

  return candidates.find((value): value is string => Boolean(value)) ?? "unknown";
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig,
  now = Date.now(),
): RateLimitResult {
  const store = getStore();
  cleanupExpiredBuckets(now, store);

  const key = `${config.prefix}:${identifier}`;
  const blockDurationMs = config.blockDurationMs ?? config.windowMs;
  const existing = store.get(key);

  if (existing?.blockedUntil && existing.blockedUntil > now) {
    return {
      allowed: false,
      limit: config.max,
      remaining: 0,
      resetAt: existing.blockedUntil,
      retryAfter: secondsUntil(existing.blockedUntil, now),
    };
  }

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + config.windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit: config.max,
      remaining: Math.max(0, config.max - 1),
      resetAt,
      retryAfter: 0,
    };
  }

  existing.count += 1;

  if (existing.count > config.max) {
    existing.blockedUntil = now + blockDurationMs;
    return {
      allowed: false,
      limit: config.max,
      remaining: 0,
      resetAt: existing.blockedUntil,
      retryAfter: secondsUntil(existing.blockedUntil, now),
    };
  }

  return {
    allowed: true,
    limit: config.max,
    remaining: Math.max(0, config.max - existing.count),
    resetAt: existing.resetAt,
    retryAfter: 0,
  };
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(result.resetAt / 1000).toString(),
  };

  if (!result.allowed) {
    headers["Retry-After"] = result.retryAfter.toString();
  }

  return headers;
}
