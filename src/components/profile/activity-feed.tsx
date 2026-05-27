import { GitHubEvent } from '@/types';
import { GlassCard } from '@/components/ui/glass-card';
import { GitFork, Star, GitCommit, MessageSquare, GitPullRequest, GitBranch, AlertCircle, BookOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ActivityFeed({ events }: { events: GitHubEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <GlassCard className="p-8 text-center">
        <p className="text-text-secondary">No recent public activities found.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-0 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border-default bg-bg-elevated/50">
        <h3 className="text-sm font-bold text-text-primary tracking-wider uppercase">Latest Activities</h3>
      </div>
      <div className="flex flex-col divide-y divide-border-default">
        {events.map((event) => (
          <ActivityItem key={event.id} event={event} />
        ))}
      </div>
    </GlassCard>
  );
}

function ActivityItem({ event }: { event: GitHubEvent }) {
  const timeAgo = formatDistanceToNow(new Date(event.createdAt), { addSuffix: true });
  let Icon = BookOpen;
  let iconColor = "text-text-muted";
  let content = <span>Acted on <RepoLink repo={event.repo} /></span>;

  switch (event.type) {
    case 'PushEvent':
      Icon = GitCommit;
      iconColor = "text-success-400";
      const commits = event.payload?.commits?.length || 0;
      const ref = event.payload?.ref?.replace('refs/heads/', '') || 'branch';
      content = (
        <span>
          Pushed {commits} commit{commits !== 1 ? 's' : ''} to <span className="text-accent-400 font-mono text-xs">{ref}</span> in <RepoLink repo={event.repo} />
        </span>
      );
      break;
    case 'WatchEvent':
      Icon = Star;
      iconColor = "text-yellow-400";
      content = <span>Starred a repo <RepoLink repo={event.repo} /></span>;
      break;
    case 'ForkEvent':
      Icon = GitFork;
      iconColor = "text-success-400";
      content = <span>Forked a repo <RepoLink repo={event.repo} /> to <RepoLink repo={{ name: event.payload?.forkee?.full_name || 'unknown' }} /></span>;
      break;
    case 'PullRequestEvent':
      Icon = GitPullRequest;
      iconColor = event.payload?.action === 'opened' ? "text-success-400" : "text-purple-400";
      content = <span>{capitalize(event.payload?.action || 'interacted with')} a pull request in <RepoLink repo={event.repo} /></span>;
      break;
    case 'IssuesEvent':
      Icon = AlertCircle;
      iconColor = event.payload?.action === 'opened' ? "text-success-400" : "text-warning-400";
      content = <span>{capitalize(event.payload?.action || 'interacted with')} an issue in <RepoLink repo={event.repo} /></span>;
      break;
    case 'IssueCommentEvent':
      Icon = MessageSquare;
      iconColor = "text-text-muted";
      content = <span>Created a comment on an issue in <RepoLink repo={event.repo} /></span>;
      break;
    case 'CreateEvent':
      if (event.payload?.ref_type === 'branch') {
        Icon = GitBranch;
        iconColor = "text-success-400";
        content = <span>Created a branch <span className="text-accent-400 font-mono text-xs">{event.payload?.ref}</span> in <RepoLink repo={event.repo} /></span>;
      } else if (event.payload?.ref_type === 'repository') {
        Icon = BookOpen;
        iconColor = "text-info-400";
        content = <span>Created a repository <RepoLink repo={event.repo} /></span>;
      }
      break;
    case 'PublicEvent':
      Icon = BookOpen;
      iconColor = "text-info-400";
      content = <span>Made repository <RepoLink repo={event.repo} /> public</span>;
      break;
  }

  return (
    <div className="p-4 flex items-start gap-4 hover:bg-bg-elevated/30 transition-colors">
      <div className={`mt-0.5 ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div className="text-[15px] text-text-primary leading-relaxed">
          {content}
        </div>
        <div className="text-sm text-text-muted shrink-0 whitespace-nowrap">
          {timeAgo}
        </div>
      </div>
    </div>
  );
}

function RepoLink({ repo }: { repo: { name: string; url?: string } }) {
  const url = repo.url || `https://github.com/${repo.name}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:underline font-medium">
      {repo.name}
    </a>
  );
}

function capitalize(s: string) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
