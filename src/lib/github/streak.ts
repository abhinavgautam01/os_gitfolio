import type { ContributionDay } from '@/types';

interface StreakResult {
  current: number;
  longest: number;
  streakStart: string | null;
  streakEnd: string | null;
  longestStreakStart: string | null;
  longestStreakEnd: string | null;
}

export function calculateStreak(days: ContributionDay[]): StreakResult {
  if (days.length === 0) {
    return { current: 0, longest: 0, streakStart: null, streakEnd: null, longestStreakStart: null, longestStreakEnd: null };
  }

  // Sort ascending by date
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));

  // Get today's date in UTC
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const yesterdayDate = new Date(today);
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  // Calculate longest streak
  let longestStreak = 0;
  let longestStart: string | null = null;
  let longestEnd: string | null = null;
  let currentRun = 0;
  let currentRunStart: string | null = null;

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].count > 0) {
      if (currentRun === 0) {
        currentRunStart = sorted[i].date;
      }
      currentRun++;

      if (currentRun > longestStreak) {
        longestStreak = currentRun;
        longestStart = currentRunStart;
        longestEnd = sorted[i].date;
      }
    } else {
      currentRun = 0;
      currentRunStart = null;
    }
  }

  // Calculate current streak (walk backwards from today)
  // Per SPEC §9.6: today with 0 contributions does NOT break the streak
  let currentStreak = 0;
  let streakStart: string | null = null;
  let streakEnd: string | null = null;

  // Find starting point: today or yesterday
  let startIdx = sorted.length - 1;
  while (startIdx >= 0 && sorted[startIdx].date > todayStr) {
    startIdx--;
  }

  // If today has 0 contributions, start from yesterday
  if (startIdx >= 0 && sorted[startIdx].date === todayStr && sorted[startIdx].count === 0) {
    startIdx--;
  }

  // Walk backwards counting consecutive days with contributions
  let expectedDate = startIdx >= 0 ? sorted[startIdx].date : null;
  for (let i = startIdx; i >= 0; i--) {
    if (sorted[i].date !== expectedDate) break;
    if (sorted[i].count === 0) break;

    currentStreak++;
    if (!streakEnd) streakEnd = sorted[i].date;
    streakStart = sorted[i].date;

    // Calculate previous expected date
    const d = new Date(sorted[i].date + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - 1);
    expectedDate = d.toISOString().split('T')[0];
  }

  return {
    current: currentStreak,
    longest: longestStreak,
    streakStart,
    streakEnd,
    longestStreakStart: longestStart,
    longestStreakEnd: longestEnd,
  };
}
