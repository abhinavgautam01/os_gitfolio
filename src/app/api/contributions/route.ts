import { NextResponse } from 'next/server';
import { fetchContributionYear } from '@/lib/github/contributions';
import { validateUsername } from '@/lib/utils';
import { getCached, setCached, apiRatelimit } from '@/lib/cache/redis';
import { contributionsKey, getTTL } from '@/lib/cache/keys';
import { RateLimitError, ValidationError, errorToResponse } from '@/lib/errors';
import { auth } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');
    const yearStr = searchParams.get('year');

    if (!user) throw new ValidationError('Missing user parameter');
    
    const { valid, error } = validateUsername(user);
    if (!valid) throw new ValidationError(error || 'Invalid username');

    const year = yearStr ? parseInt(yearStr, 10) : new Date().getUTCFullYear();
    if (isNaN(year) || year < 2008 || year > new Date().getUTCFullYear()) {
      throw new ValidationError('Invalid year parameter');
    }

    // Rate limiting
    if (apiRatelimit) {
      const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
      const { success, reset } = await apiRatelimit.limit(ip);
      if (!success) {
        throw new RateLimitError(reset);
      }
    }

    // Check auth for self-requests (faster cache invalidation)
    const session = await auth();
    const isAuthenticatedSelf = session?.user?.name?.toLowerCase() === user.toLowerCase();

    // Cache lookup
    const cacheKey = contributionsKey(user, year);
    const cachedData = await getCached<any>(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: { 'X-Cache': 'HIT' }
      });
    }

    // Fetch from GitHub
    const data = await fetchContributionYear(user, year, session?.accessToken);
    
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
