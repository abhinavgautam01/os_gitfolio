import { createGraphQLClient } from './client';
import type { ContributionYear, ContributionDay, ContributionWeek, MonthLabel } from '@/types';

const CONTRIBUTIONS_QUERY = `
query GetContributions($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          firstDay
          contributionDays {
            date
            contributionCount
            contributionLevel
            weekday
          }
        }
        months {
          name
          year
          firstDay
          totalWeeks
        }
      }
      totalCommitContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalIssueContributions
      restrictedContributionsCount
    }
  }
}
`;

// Map GitHub API contribution levels to numeric 0-4
function mapContributionLevel(level: string): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case 'NONE': return 0;
    case 'FIRST_QUARTILE': return 1;
    case 'SECOND_QUARTILE': return 2;
    case 'THIRD_QUARTILE': return 3;
    case 'FOURTH_QUARTILE': return 4;
    default: return 1; // Unknown levels default to 1 per SPEC §13
  }
}

// Fetch contributions for a single year
export async function fetchContributionYear(
  username: string,
  year: number,
  token?: string
): Promise<ContributionYear> {
  const graphqlWithAuth = createGraphQLClient(token);
  const now = new Date();
  const from = new Date(Date.UTC(year, 0, 1)).toISOString();
  const toDate = year === now.getUTCFullYear()
    ? now.toISOString()
    : new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString();

  const response: any = await graphqlWithAuth(CONTRIBUTIONS_QUERY, {
    username,
    from,
    to: toDate,
  });

  const calendar = response.user.contributionsCollection.contributionCalendar;

  const weeks: ContributionWeek[] = calendar.weeks.map((week: any) => ({
    firstDay: week.firstDay,
    days: week.contributionDays.map((day: any) => ({
      date: day.date,
      count: day.contributionCount,
      level: mapContributionLevel(day.contributionLevel),
      weekday: day.weekday,
      week: 0, // Will be filled below
    })),
  }));

  // Fill in week numbers
  weeks.forEach((week, weekIndex) => {
    week.days.forEach((day) => {
      day.week = weekIndex;
    });
  });

  const months: MonthLabel[] = calendar.months.map((month: any) => ({
    name: month.name,
    year: month.year,
    firstDay: month.firstDay,
    totalWeeks: month.totalWeeks,
  }));

  return {
    year,
    totalContributions: calendar.totalContributions,
    weeks,
    months,
  };
}

// Fetch contributions for all years (for streak calculation)
export async function fetchAllContributionYears(
  username: string,
  createdAtYear: number,
  token?: string
): Promise<ContributionYear[]> {
  const currentYear = new Date().getUTCFullYear();
  const years = [];
  for (let y = createdAtYear; y <= currentYear; y++) {
    years.push(y);
  }

  // Batch with max 3 parallel requests per SPEC §7.2
  const results: ContributionYear[] = [];
  for (let i = 0; i < years.length; i += 3) {
    const batch = years.slice(i, i + 3);
    const batchResults = await Promise.all(
      batch.map((y) => fetchContributionYear(username, y, token))
    );
    results.push(...batchResults);
  }

  return results.sort((a, b) => a.year - b.year);
}
