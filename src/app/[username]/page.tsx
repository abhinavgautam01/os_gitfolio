import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProfileHeader } from '@/components/profile/profile-header';
import { StatsGrid } from '@/components/profile/stats-grid';
import { StreakCard } from '@/components/profile/streak-card';
import { RepoCards } from '@/components/profile/repo-cards';
import { LanguageDonut } from '@/components/profile/language-donut';
import { Heatmap } from '@/components/profile/heatmap';
import { ActivityCharts } from '@/components/profile/activity-charts';
import { ExportBar } from '@/components/profile/export-bar';
import { fetchUserStats } from '@/lib/github/stats';
import { fetchContributionYear } from '@/lib/github/contributions';
import { validateUsername } from '@/lib/utils';
import { auth } from '@/lib/auth';

export const revalidate = 3600; // Cache for 1 hour at edge

export default async function ProfilePage(
  props: { 
    params: Promise<{ username: string }>; 
    searchParams: Promise<{ year?: string }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const username = params.username;
  
  const { valid } = validateUsername(username);
  if (!valid) {
    notFound();
  }

  const session = await auth();
  
  let stats;
  let contributions;
  let availableYears: number[] = [];
  
  try {
    stats = await fetchUserStats(username, session?.accessToken);
    const startYear = new Date(stats.createdAt).getFullYear();
    const currentYear = new Date().getFullYear();
    availableYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);
    
    const selectedYear = searchParams?.year ? parseInt(searchParams.year) : currentYear;
    contributions = await fetchContributionYear(username, selectedYear, session?.accessToken);
  } catch (error: any) {
    const isNotFound = error?.message?.toLowerCase().includes('could not resolve to a user') || error?.message?.toLowerCase().includes('not found');
    if (!isNotFound) {
      console.error(error);
    }
    
    if (error?.message?.toLowerCase().includes('rate limit')) {
      throw error;
    }
    notFound();
  }

  return (
    <>
      <Navbar />
      <main id="profile-export-area" className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
        <ProfileHeader user={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StatsGrid stats={stats} />
            
            <Heatmap data={contributions} availableYears={availableYears} username={username} />
            
            <ActivityCharts data={contributions} />
            
            <div className="flex justify-center pt-2" data-export-exclude="true">
              <Link 
                href={`/${username}/activities`}
                prefetch={false}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold tracking-wide transition-all shadow-[0_4px_14px_rgba(56,189,248,0.3)] dark:shadow-[0_0_15px_rgba(56,189,248,0.4)] border border-transparent hover:scale-[1.02] active:scale-[0.98]"
              >
                View Latest Activities
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <StreakCard 
              currentStreak={stats.currentStreak}
              longestStreak={stats.longestStreak}
              streakStartDate={stats.streakStartDate}
              streakEndDate={stats.streakEndDate}
            />
            
            <LanguageDonut languages={stats.topLanguages} />
            
            <RepoCards repos={stats.topRepositories} />
          </div>
        </div>
      </main>

      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="h-3 md:h-4" aria-hidden="true" />
        <ExportBar username={stats.username} />
      </div>

      <Footer />
    </>
  );
}
