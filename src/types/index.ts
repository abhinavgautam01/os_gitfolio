// =============================================================================
// GitViz Pro — Type Definitions
// All data models from SPEC.md §6
// =============================================================================

/** Intensity level for a single contribution day (mirrors GitHub's built-in levels) */
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

/** Available chart visualization types */
export type ChartType = 'heatmap' | 'bar' | 'line';

/** All 12 selectable chart color themes (SPEC §9.14) */
export type ChartTheme =
  | 'github-green'
  | 'github-dark'
  | 'ocean-blue'
  | 'dracula'
  | 'halloween'
  | 'panda'
  | 'teal'
  | 'sunset'
  | 'monochrome'
  | 'neon'
  | 'purple-rain'
  | 'coral';

/** A single day in the contribution calendar */
export interface ContributionDay {
  /** ISO 8601 date string, e.g. "2024-03-15" */
  date: string;
  /** Number of contributions (0–n) */
  count: number;
  /** GitHub's built-in intensity level */
  level: ContributionLevel;
  /** Day of week: 0 = Sunday … 6 = Saturday */
  weekday: number;
  /** ISO week number */
  week: number;
}

/** A single week in the contribution calendar */
export interface ContributionWeek {
  /** ISO date of Sunday (first day of the week) */
  firstDay: string;
  /** Array of contribution days in this week */
  days: ContributionDay[];
}

/** Month label for heatmap x-axis */
export interface MonthLabel {
  /** Full month name, e.g. "January" */
  name: string;
  /** The year this month belongs to */
  year: number;
  /** ISO date of the first day of the month */
  firstDay: string;
  /** Number of weeks this month spans in the calendar grid */
  totalWeeks: number;
}

/** A full year of contribution data */
export interface ContributionYear {
  /** The calendar year */
  year: number;
  /** Total contributions for this year */
  totalContributions: number;
  /** Array of contribution weeks */
  weeks: ContributionWeek[];
  /** Month labels for heatmap x-axis */
  months: MonthLabel[];
}

/** Language usage statistics for a user */
export interface LanguageStat {
  /** Language name, e.g. "TypeScript" */
  name: string;
  /** GitHub's official language color hex, e.g. "#3178c6" */
  color: string;
  /** Percentage of total code (0–100), calculated by bytes */
  percentage: number;
  /** Number of repos using this language */
  repoCount: number;
}

/** Repository statistics for display */
export interface RepoStat {
  /** Repository name (without owner) */
  name: string;
  /** Full name with owner, e.g. "torvalds/linux" */
  nameWithOwner: string;
  /** Repository description */
  description: string | null;
  /** Full GitHub URL */
  url: string;
  /** Stargazer count */
  stars: number;
  /** Fork count */
  forks: number;
  /** Primary language name */
  primaryLanguage: string | null;
  /** Primary language color hex */
  languageColor: string | null;
  /** Whether the repo is private */
  isPrivate: boolean;
  /** Whether the repo is a fork */
  isFork: boolean;
  /** ISO timestamp of last update */
  updatedAt: string;
}

/** Comprehensive user statistics */
export interface UserStats {
  /** GitHub login username */
  username: string;
  /** Display name (may differ from login) */
  displayName: string | null;
  /** Avatar URL from GitHub CDN */
  avatarUrl: string;
  /** User bio */
  bio: string | null;
  /** Location string */
  location: string | null;
  /** Company name */
  company: string | null;
  /** Website URL */
  websiteUrl: string | null;
  /** Twitter/X username (without @) */
  twitterUsername: string | null;
  /** Number of followers */
  followers: number;
  /** Number of users following */
  following: number;
  /** Number of public repositories */
  publicRepos: number;
  /** ISO date of account creation */
  createdAt: string;

  // Contribution stats
  /** All-time total contributions */
  totalContributions: number;
  /** Contributions in the current calendar year */
  contributionsThisYear: number;
  /** Current consecutive contribution streak (days) */
  currentStreak: number;
  /** Longest consecutive contribution streak (days) */
  longestStreak: number;
  /** ISO date when the current/longest streak started */
  streakStartDate: string | null;
  /** ISO date when the current/longest streak ended */
  streakEndDate: string | null;

  // Activity breakdown
  /** Total commit contributions */
  totalCommits: number;
  /** Total pull request contributions */
  totalPullRequests: number;
  /** Number of merged pull requests */
  mergedPullRequests: number;
  /** Total issue contributions */
  totalIssues: number;
  /** Number of closed issues */
  closedIssues: number;
  /** Total code review contributions */
  totalCodeReviews: number;

  // Language data
  /** Top languages by bytes of code */
  topLanguages: LanguageStat[];

  // Repo data
  /** Top repositories by stars */
  topRepositories: RepoStat[];
}

/** Monthly aggregated contribution data for bar charts */
export interface MonthlyAggregate {
  /** Month identifier, e.g. "2024-03" */
  month: string;
  /** Display label, e.g. "Mar 2024" */
  label: string;
  /** Total contributions for the month */
  total: number;
  /** Commit count */
  commits: number;
  /** Pull request count */
  pullRequests: number;
  /** Issue count */
  issues: number;
  /** Code review count */
  reviews: number;
}

/** Generic cache entry wrapper with metadata */
export interface CacheEntry<T> {
  /** The cached data */
  data: T;
  /** ISO timestamp of when the data was cached */
  cachedAt: string;
  /** ISO timestamp of when the cache entry expires */
  expiresAt: string;
  /** Whether this data came from cache or a fresh API call */
  source: 'cache' | 'api';
}

/** Standardized GitHub event for the activity feed */
export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url?: string;
  };
  payload: any;
  createdAt: string;
}
