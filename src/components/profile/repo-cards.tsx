import { RepoStat } from '@/types';
import { GlassCard } from '@/components/ui/glass-card';
import { Star, GitFork, Book } from 'lucide-react';

export function RepoCards({ repos }: { repos: RepoStat[] }) {
  if (!repos.length) return null;
  const displayRepos = repos.slice(0, 3);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-text-primary flex items-center gap-2 px-1">
        <Book className="w-5 h-5 text-accent-400" /> Top Repositories
      </h3>
      <div className="overflow-y-auto custom-scrollbar pr-2 repo-scroll-container" style={{ maxHeight: '280px' }}>
        <div className="grid grid-cols-1 gap-4">
          {displayRepos.map((repo) => (
            <GlassCard key={repo.nameWithOwner} hoverEffect className="repo-card p-4 flex flex-col justify-between min-h-[120px] gap-3">
            <div className="space-y-2">
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent-400 font-semibold text-lg hover:underline truncate block"
                title={repo.nameWithOwner}
              >
                {repo.name}
              </a>
              <p className="text-sm text-text-secondary line-clamp-2" title={repo.description || ''}>
                {repo.description || 'No description available.'}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-text-secondary mt-auto pt-2">
              {repo.primaryLanguage && (
                <div className="flex items-center gap-1.5">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: repo.languageColor || '#8b8b8b' }} 
                  />
                  <span>{repo.primaryLanguage}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{repo.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                <span>{repo.forks}</span>
              </div>
            </div>
          </GlassCard>
        ))}
        </div>
      </div>
    </div>
  );
}
