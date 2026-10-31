/**
 * In-Memory Sliding Window Rate Limiter
 * Provides DDoS, brute-force, and credential-stuffing defense for Next.js endpoints.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const store = new Map<string, RateLimitRecord>();

// Periodically clean up entries older than 10 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      record.timestamps = record.timestamps.filter((t) => now - t < 10 * 60 * 1000);
      if (record.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed within the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter: number; // in seconds
}

export const RATE_LIMIT_PROFILES = {
  /** Strict profile for login / auth endpoints (5 attempts per minute) */
  AUTH: { limit: 5, windowMs: 60 * 1000 },
  /** Video authorization check profile (60 requests per minute) */
  VIDEO: { limit: 60, windowMs: 60 * 1000 },
  /** Certificate verification search profile (20 requests per minute) */
  VERIFY: { limit: 20, windowMs: 60 * 1000 },
  /** General admin action write profile (30 requests per minute) */
  MUTATION: { limit: 30, windowMs: 60 * 1000 },
} as const;

/**
 * Checks and records an action for a given identifier key.
 */
export function rateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const record = store.get(key) || { timestamps: [] };
  // Keep only timestamps within the active sliding window
  const recentTimestamps = record.timestamps.filter((t) => t > windowStart);

  if (recentTimestamps.length >= config.limit) {
    const oldest = recentTimestamps[0];
    const retryAfter = Math.ceil((oldest + config.windowMs - now) / 1000);
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      reset: Math.ceil((oldest + config.windowMs) / 1000),
      retryAfter: Math.max(1, retryAfter),
    };
  }

  recentTimestamps.push(now);
  store.set(key, { timestamps: recentTimestamps });

  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - recentTimestamps.length,
    reset: Math.ceil((now + config.windowMs) / 1000),
    retryAfter: 0,
  };
}

/**
 * Extracts a client identifier from headers (falling back to a default localhost key)
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}
