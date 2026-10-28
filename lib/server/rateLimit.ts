import 'server-only';

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

const globalRateLimit = globalThis as typeof globalThis & {
  mkaygraphicsRateLimits?: Map<string, RateLimitEntry>;
};

const entries = globalRateLimit.mkaygraphicsRateLimits ?? new Map<string, RateLimitEntry>();
globalRateLimit.mkaygraphicsRateLimits = entries;

/**
 * A lightweight abuse guard for deployments without a database or external KV.
 * It protects each running server process; a durable distributed limiter can replace it later.
 */
export function checkRateLimit(
  key: string,
  maximumRequests: number,
  windowMilliseconds: number,
): RateLimitResult {
  const now = Date.now();

  if (entries.size > 5_000) {
    for (const [entryKey, entry] of entries) {
      if (entry.resetAt <= now) entries.delete(entryKey);
    }
  }

  const current = entries.get(key);
  if (!current || current.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + windowMilliseconds });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= maximumRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
