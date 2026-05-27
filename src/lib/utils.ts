import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format, parseISO } from 'date-fns';

/**
 * Merge class names with Tailwind CSS conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number for display.
 *
 * - Standard mode: locale-aware formatting (e.g. 10432 → "10,432")
 * - Compact mode: abbreviated for large numbers (e.g. 1200 → "1.2k")
 *
 * In compact mode, numbers ≥ 1,000,000 use "m" suffix, ≥ 1,000 use "k" suffix.
 * Trailing ".0" is removed (e.g. "1.0k" → "1k").
 */
export function formatNumber(num: number, compact: boolean = false): string {
  if (compact) {
    if (num >= 1_000_000) {
      const formatted = (num / 1_000_000).toFixed(1);
      return formatted.endsWith('.0')
        ? `${formatted.slice(0, -2)}m`
        : `${formatted}m`;
    }
    if (num >= 1_000) {
      const formatted = (num / 1_000).toFixed(1);
      return formatted.endsWith('.0')
        ? `${formatted.slice(0, -2)}k`
        : `${formatted}k`;
    }
    return num.toLocaleString();
  }

  return num.toLocaleString();
}

/**
 * Normalize a GitHub username: lowercase and trim whitespace.
 * GitHub usernames are case-insensitive; we normalize for cache keys and URLs.
 */
export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

/**
 * Username validation regex from SPEC §9.1.
 *
 * Rules:
 * - 1–39 characters
 * - Alphanumeric and hyphens only
 * - Cannot start or end with a hyphen
 * - No consecutive hyphens (GitHub rejects them, but the regex allows single hyphens)
 */
const USERNAME_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

/**
 * Validate a GitHub username against SPEC §9.1 rules.
 * Returns an object with `valid` boolean and optional `error` message.
 */
export function validateUsername(username: string): { valid: boolean; error?: string } {
  const trimmed = username.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Username is required.' };
  }

  if (trimmed.length > 39) {
    return { valid: false, error: 'Username must be 39 characters or fewer.' };
  }

  if (!USERNAME_REGEX.test(trimmed)) {
    return {
      valid: false,
      error: 'Invalid username. Usernames can only contain letters, numbers, and hyphens.',
    };
  }

  return { valid: true };
}

/**
 * Format a date as a relative time string (e.g. "2 days ago", "about 1 hour ago").
 * Accepts an ISO date string or a Date object.
 */
export function formatRelativeTime(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(parsed, { addSuffix: true });
}

/**
 * Format a date for display (e.g. "Mar 15, 2024").
 * Accepts an ISO date string or a Date object.
 */
export function formatDate(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return format(parsed, 'MMM d, yyyy');
}
