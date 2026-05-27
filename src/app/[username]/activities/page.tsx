import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchUserStats } from '@/lib/github/stats';
import { fetchUserEvents } from '@/lib/github/events';
import { ActivityFeed } from '@/components/profile/activity-feed';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.username}'s Activities | OS_Gitfolio`,
    description: `Latest GitHub activities for ${resolvedParams.username}`,
  };
}

export default async function ActivitiesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  
  let stats, events;
  try {
    [stats, events] = await Promise.all([
      fetchUserStats(username),
      fetchUserEvents(username)
    ]);
  } catch (error: any) {
    console.error(error);
    if (error?.message?.toLowerCase().includes('rate limit')) {
      throw error;
    }
    notFound();
  }

  if (!stats) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20 pt-8 max-w-4xl mx-auto px-4 md:px-6">
      <Link href={`/${username}`} className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Profile
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-16 h-16 ring-2 ring-border-default">
          <AvatarImage src={stats.avatarUrl} alt={stats.username} />
          <AvatarFallback className="text-xl">{stats.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{stats.displayName || stats.username}</h1>
          <a href={`https://github.com/${stats.username}`} target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:underline">
            @{stats.username}
          </a>
        </div>
      </div>

      <ActivityFeed events={events} />
    </div>
  );
}
