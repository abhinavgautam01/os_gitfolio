import { UserStats } from '@/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Link as LinkIcon, Calendar, Users, GitMerge } from 'lucide-react';
import { FaTwitter } from 'react-icons/fa';
import { formatDate, formatNumber } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { CompeteModal } from './compete-modal';

export function ProfileHeader({ user }: { user: UserStats }) {
  return (
    <GlassCard className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8">
      <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-bg-elevated">
        <AvatarImage src={user.avatarUrl} alt={user.username} />
        <AvatarFallback className="text-3xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <a href={`https://github.com/${user.username}`} target="_blank" rel="noopener noreferrer" className="block group">
            <h1 className="text-3xl font-bold text-text-primary group-hover:text-accent-400 transition-colors">{user.displayName || user.username}</h1>
            <p className="text-xl text-text-secondary group-hover:underline">@{user.username}</p>
          </a>
          <CompeteModal currentUser={user.username} />
        </div>
        
        {user.bio && (
          <p className="text-text-primary max-w-2xl">{user.bio}</p>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
          {user.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
          {user.company && (
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>{user.company}</span>
            </div>
          )}
          {user.websiteUrl && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4" />
              <a href={user.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 transition-colors">
                {user.websiteUrl.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {user.twitterUsername && (
            <div className="flex items-center gap-1.5">
                <FaTwitter className="w-4 h-4 mt-0.5" />
              <a href={`https://twitter.com/${user.twitterUsername}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 transition-colors">
                @{user.twitterUsername}
              </a>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Joined {formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row md:flex-col gap-4 self-stretch justify-center pt-4 md:pt-0 md:border-l md:border-border-default md:pl-8">
        <a href={`https://github.com/${user.username}?tab=followers`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:opacity-80 transition-opacity">
          <span className="text-2xl font-bold text-text-primary">{formatNumber(user.followers)}</span>
          <span className="text-xs text-text-muted uppercase tracking-wider">Followers</span>
        </a>
        <a href={`https://github.com/${user.username}?tab=following`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:opacity-80 transition-opacity">
          <span className="text-2xl font-bold text-text-primary">{formatNumber(user.following)}</span>
          <span className="text-xs text-text-muted uppercase tracking-wider">Following</span>
        </a>
      </div>
    </GlassCard>
  );
}
