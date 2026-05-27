import { createRestClient } from './client';
import { GitHubEvent } from '@/types';
import { getCached, setCached } from '../cache/redis';

export async function fetchUserEvents(username: string): Promise<GitHubEvent[]> {
  const cacheKey = `user:${username}:events`;
  
  const cached = await getCached<GitHubEvent[]>(cacheKey);
  if (cached) return cached;

  const octokit = createRestClient();
  
  try {
    const { data } = await octokit.request('GET /users/{username}/events/public', {
      username,
      per_page: 30,
    });

    const events: GitHubEvent[] = data.map((event: any) => ({
      id: event.id,
      type: event.type,
      actor: {
        login: event.actor.login,
        avatar_url: event.actor.avatar_url,
      },
      repo: {
        name: event.repo.name,
        url: `https://github.com/${event.repo.name}`,
      },
      payload: event.payload,
      createdAt: event.created_at,
    }));

    await setCached(cacheKey, events, 300); // Cache for 5 mins
    return events;
  } catch (error: any) {
    console.error(`Failed to fetch events for ${username}:`, error.message);
    return [];
  }
}
