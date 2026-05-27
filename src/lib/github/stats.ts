import { createGraphQLClient } from './client';
import type { UserStats, LanguageStat, RepoStat } from '@/types';
import { aggregateLanguages } from './languages';
import { calculateStreak } from './streak';
import { fetchAllContributionYears } from './contributions';

const USER_STATS_QUERY = `
query GetUserStats($username: String!, $repoCount: Int = 20) {
  user(login: $username) {
    name
    login
    avatarUrl
    bio
    location
    company
    websiteUrl
    twitterUsername
    followers { totalCount }
    following { totalCount }
    repositories(
      first: $repoCount
      orderBy: { field: STARGAZERS, direction: DESC }
      ownerAffiliations: OWNER
      isFork: false
    ) {
      nodes {
        name
        nameWithOwner
        description
        url
        stargazerCount
        forkCount
        primaryLanguage { name color }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node { name color }
          }
        }
        isPrivate
        isFork
        updatedAt
      }
    }
    pullRequests(states: [OPEN, MERGED, CLOSED]) { totalCount }
    mergedPullRequests: pullRequests(states: MERGED) { totalCount }
    issues(states: [OPEN, CLOSED]) { totalCount }
    closedIssues: issues(states: CLOSED) { totalCount }
    createdAt
  }
}
`;

export async function fetchUserStats(
  username: string,
  token?: string
): Promise<UserStats> {
  const graphqlWithAuth = createGraphQLClient(token);

  const response: any = await graphqlWithAuth(USER_STATS_QUERY, {
    username,
    repoCount: 20,
  });

  const user = response.user;
  if (!user) {
    throw new Error(`User not found: ${username}`);
  }

  // Aggregate languages from repo data
  const topLanguages = aggregateLanguages(user.repositories.nodes);

  // Build repo stats
  const topRepositories: RepoStat[] = user.repositories.nodes
    .slice(0, 6)
    .map((repo: any) => ({
      name: repo.name,
      nameWithOwner: repo.nameWithOwner,
      description: repo.description,
      url: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      primaryLanguage: repo.primaryLanguage?.name || null,
      languageColor: repo.primaryLanguage?.color || null,
      isPrivate: repo.isPrivate,
      isFork: repo.isFork,
      updatedAt: repo.updatedAt,
    }));

  // Fetch contribution data for streak calculation
  const createdAtYear = new Date(user.createdAt).getUTCFullYear();
  const allYears = await fetchAllContributionYears(username, createdAtYear, token);
  
  // Calculate streaks
  const allDays = allYears.flatMap((y) => y.weeks.flatMap((w) => w.days));
  const streakData = calculateStreak(allDays);
  
  // Sum total contributions across all years
  const totalContributions = allYears.reduce((sum, y) => sum + y.totalContributions, 0);
  const currentYear = new Date().getUTCFullYear();
  const currentYearData = allYears.find((y) => y.year === currentYear);

  return {
    username: user.login,
    displayName: user.name,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    location: user.location,
    company: user.company,
    websiteUrl: user.websiteUrl,
    twitterUsername: user.twitterUsername,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    publicRepos: user.repositories.nodes.length,
    createdAt: user.createdAt,
    totalContributions,
    contributionsThisYear: currentYearData?.totalContributions || 0,
    currentStreak: streakData.current,
    longestStreak: streakData.longest,
    streakStartDate: streakData.streakStart,
    streakEndDate: streakData.streakEnd,
    totalCommits: 0, // Will come from contributionsCollection
    totalPullRequests: user.pullRequests.totalCount,
    mergedPullRequests: user.mergedPullRequests.totalCount,
    totalIssues: user.issues.totalCount,
    closedIssues: user.closedIssues.totalCount,
    totalCodeReviews: 0,
    topLanguages,
    topRepositories,
  };
}
