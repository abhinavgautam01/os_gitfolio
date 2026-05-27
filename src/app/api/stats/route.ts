import { NextResponse } from 'next/server';
import { fetchUserStats } from '@/lib/github/stats';
import { validateUsername } from '@/lib/utils';
import { getCached, setCached, apiRatelimit } from '@/lib/cache/redis';
import { statsKey, getTTL } from '@/lib/cache/keys';
import { ValidationError, RateLimitError, errorToResponse } from '@/lib/errors';
import { auth } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');

    if (!user) throw new ValidationError('Missing user parameter');
    
    const { valid, error } = validateUsername(user);
    if (!valid) throw new ValidationError(error || 'Invalid username');

    // Rate limiting
    if (apiRatelimit) {
      const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
      const { success, reset } = await apiRatelimit.limit(ip);
      if (!success) {
        throw new RateLimitError(reset);
      }
    }

    // Check auth
    const session = await auth();
    const isAuthenticatedSelf = session?.user?.name?.toLowerCase() === user.toLowerCase();

    // Cache lookup
    const cacheKey = statsKey(user);
    const cachedData = await getCached<any>(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: { 'X-Cache': 'HIT' }
      });
    }

    // Fetch from GitHub
    const data = await fetchUserStats(user, session?.accessToken);
    
    // Save to cache
    const ttl = getTTL(cacheKey, isAuthenticatedSelf);
    await setCached(cacheKey, data, ttl);

    return NextResponse.json(data, {
      headers: { 'X-Cache': 'MISS' }
    });

  } catch (error) {
    const { status, body } = errorToResponse(error);
    return NextResponse.json(body, { status });
  }
}
