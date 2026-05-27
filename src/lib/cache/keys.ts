import { CACHE_TTLS } from '@/lib/constants';

// All cache keys are lowercase-normalized
export function contributionsKey(username: string, year: number): string {
  return `contributions:${username.toLowerCase()}:${year}`;
}

export function statsKey(username: string): string {
  return `stats:${username.toLowerCase()}`;
}

export function languagesKey(username: string): string {
  return `languages:${username.toLowerCase()}`;
}

export function reposKey(username: string): string {
  return `repos:${username.toLowerCase()}`;
}

export function ogKey(username: string): string {
  return `og:${username.toLowerCase()}`;
}

export function compareOgKey(usernameA: string, usernameB: string): string {
  const [a, b] = [usernameA.toLowerCase(), usernameB.toLowerCase()].sort();
  return `og:compare:${a}:${b}`;
}

export function getTTL(key: string, isAuthenticatedSelf: boolean = false): number {
  if (isAuthenticatedSelf) return CACHE_TTLS.authenticatedSelf;
  if (key.startsWith('contributions:')) return CACHE_TTLS.contributions;
  if (key.startsWith('stats:')) return CACHE_TTLS.stats;
  if (key.startsWith('languages:')) return CACHE_TTLS.languages;
  if (key.startsWith('repos:')) return CACHE_TTLS.repos;
  if (key.startsWith('og:')) return CACHE_TTLS.og;
  return CACHE_TTLS.stats; // default
}
