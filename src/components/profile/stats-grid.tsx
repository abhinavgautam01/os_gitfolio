import { UserStats } from '@/types';
import { GlassCard } from '@/components/ui/glass-card';
import { formatNumber } from '@/lib/utils';
import { GitCommit, GitPullRequest, GitMerge, AlertCircle, BookOpen, Star, GitFork } from 'lucide-react';

export function StatsGrid({ stats }: { stats: UserStats }) {
  const totalStars = stats.topRepositories?.reduce((acc, repo) => acc + repo.stars, 0) || 0;
  const totalForks = stats.topRepositories?.reduce((acc, repo) => acc + repo.forks, 0) || 0;

  const items = [
    {
      label: 'Total Contributions',
      value: stats.totalContributions,
      icon: GitCommit,
      color: 'text-accent-400',
      bg: 'bg-accent-500/10',
    },
    {
      label: 'Pull Requests',
      value: stats.totalPullRequests,
      icon: GitPullRequest,
      color: 'text-success-400',
      bg: 'bg-success-glow',
    },
    {
      label: 'Merged PRs',
      value: stats.mergedPullRequests,
      icon: GitMerge,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Issues',
      value: stats.totalIssues,
      icon: AlertCircle,
      color: 'text-warning-400',
      bg: 'bg-warning-500/10',
    },
    {
      label: 'Public Repos',
      value: stats.publicRepos,
      icon: BookOpen,
      color: 'text-info-400',
      bg: 'bg-info-500/10',
    },
    {
      label: 'Total Stars',
      value: totalStars,
      icon: Star,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
    {
      label: 'Total Forks',
      value: totalForks,
      icon: GitFork,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
    },
  ];

  return (
    <div className="flex overflow-x-auto custom-scrollbar pb-3 pt-2 px-1 gap-4">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <GlassCard key={i} hoverEffect className="p-3 md:p-4 flex flex-col items-center justify-center text-center min-w-[130px] flex-1 shrink-0">
            <div className={`p-3 rounded-full ${item.bg} ${item.color} mb-3`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-text-primary mb-1">
              {formatNumber(item.value)}
            </span>
            <span className="text-[10px] md:text-xs text-text-muted font-medium uppercase tracking-wider">
              {item.label}
            </span>
          </GlassCard>
        );
      })}
    </div>
  );
}
