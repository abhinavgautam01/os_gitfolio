import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Create Redis client — returns null if env vars not set
function createRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!url || !token) {
    console.warn('[Cache] Redis not configured — caching disabled');
    return null;
  }
  
  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('[Cache] Failed to create Redis client:', error);
    return null;
  }
}

export const redis = createRedisClient();

// Rate limiter for API routes (30 req/min per IP)
export const apiRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, '1 m'),
      analytics: true,
    })
  : null;

// Stricter rate limiter for OG image generation (10 req/min per IP)
export const ogRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 m'),
      analytics: true,
    })
  : null;

// Helper: get cached data with type safety
export async function getCached<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    const data = await redis.get<T>(key);
    return data;
  } catch (error) {
    console.error(`[Cache] GET ${key} failed:`, error);
    return null;
  }
}

// Helper: set cached data with TTL
export async function setCached<T>(
  key: string,
  data: T,
  ttlSeconds: number
): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(key, data, { ex: ttlSeconds });
  } catch (error) {
    console.error(`[Cache] SET ${key} failed:`, error);
  }
}

// Helper: delete cached key
export async function deleteCached(key: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`[Cache] DEL ${key} failed:`, error);
  }
}
