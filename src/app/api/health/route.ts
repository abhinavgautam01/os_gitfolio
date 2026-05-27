import { NextResponse } from 'next/server';
import { redis } from '@/lib/cache/redis';
import { createRestClient } from '@/lib/github/client';

export async function GET() {
  const status: Record<string, 'ok' | 'error' | 'unconfigured'> = {
    redis: 'unconfigured',
    github: 'unconfigured',
  };

  if (redis) {
    try {
      await redis.ping();
      status.redis = 'ok';
    } catch {
      status.redis = 'error';
    }
  }

  if (process.env.GITHUB_PAT || process.env.AUTH_GITHUB_ID) {
    try {
      const rest = createRestClient();
      await rest.request('GET /rate_limit');
      status.github = 'ok';
    } catch {
      status.github = 'error';
    }
  }

  const overall = Object.values(status).some(s => s === 'error') ? 'degraded' : 'ok';

  return NextResponse.json(
    { status: overall, services: status },
    { status: 200 }
  );
}
