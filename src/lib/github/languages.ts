import type { LanguageStat } from '@/types';
import { GITHUB_LANGUAGE_COLORS } from '@/lib/constants';

interface RepoNode {
  isPrivate: boolean;
  isFork: boolean;
  languages: {
    edges: Array<{
      size: number;
      node: { name: string; color: string | null };
    }>;
  };
}

export function aggregateLanguages(repos: RepoNode[]): LanguageStat[] {
  // Filter: non-fork, non-private repos only (per SPEC)
  const filteredRepos = repos.filter((r) => !r.isFork && !r.isPrivate);

  // Aggregate bytes per language
  const languageMap = new Map<string, { bytes: number; color: string; repoCount: number }>();

  for (const repo of filteredRepos) {
    const seenInRepo = new Set<string>();
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      const existing = languageMap.get(name) || {
        bytes: 0,
        color: edge.node.color || GITHUB_LANGUAGE_COLORS[name] || '#8b8b8b',
        repoCount: 0,
      };
      existing.bytes += edge.size;
      if (!seenInRepo.has(name)) {
        existing.repoCount += 1;
        seenInRepo.add(name);
      }
      languageMap.set(name, existing);
    }
  }

  // Sort by bytes descending
  const sorted = Array.from(languageMap.entries())
    .sort((a, b) => b[1].bytes - a[1].bytes);

  // Total bytes
  const totalBytes = sorted.reduce((sum, [, v]) => sum + v.bytes, 0);
  if (totalBytes === 0) return [];

  // Take top 8, group rest as "Other"
  const top8 = sorted.slice(0, 8);
  const rest = sorted.slice(8);

  const result: LanguageStat[] = top8.map(([name, data]) => ({
    name,
    color: data.color,
    percentage: Math.round((data.bytes / totalBytes) * 1000) / 10, // one decimal
    repoCount: data.repoCount,
  }));

  if (rest.length > 0) {
    const otherBytes = rest.reduce((sum, [, v]) => sum + v.bytes, 0);
    const otherRepos = new Set(rest.flatMap(([, v]) => v.repoCount)).size;
    result.push({
      name: 'Other',
      color: '#8b8b8b',
      percentage: Math.round((otherBytes / totalBytes) * 1000) / 10,
      repoCount: otherRepos,
    });
  }

  // Ensure percentages sum to 100 (adjust last item)
  const totalPct = result.reduce((sum, l) => sum + l.percentage, 0);
  if (result.length > 0 && totalPct !== 100) {
    result[result.length - 1].percentage += Math.round((100 - totalPct) * 10) / 10;
  }

  return result;
}
