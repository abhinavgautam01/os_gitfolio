import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchUserStats } from '@/lib/github/stats';
import { auth } from '@/lib/auth';
import { GlassCard } from '@/components/ui/glass-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Swords, Zap, Star, GitCommit, GitPullRequest, CircleDot } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';
import { AnimatedStatBar } from '@/components/profile/animated-stat-bar';

interface PageProps {
  params: Promise<{ username: string; opponent: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.username} vs ${resolvedParams.opponent} | Battle | OS_Gitfolio`,
    description: `Head-to-head GitHub stat comparison between ${resolvedParams.username} and ${resolvedParams.opponent}.`,
  };
}

export default async function CompetePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { username, opponent } = resolvedParams;
  const session = await auth();

  let u1, u2;
  try {
    [u1, u2] = await Promise.all([
      fetchUserStats(username, session?.accessToken),
      fetchUserStats(opponent, session?.accessToken)
    ]);
  } catch (error: any) {
    console.error(error);
    if (error?.message?.toLowerCase().includes('rate limit')) {
      throw error;
    }
    notFound();
  }

  if (!u1 || !u2) {
    notFound();
  }

  // Calculate simple scores
  let score1 = 0;
  let score2 = 0;

  const compare = (v1: number, v2: number) => {
    if (v1 > v2) score1++;
    if (v2 > v1) score2++;
  };

  compare(u1.followers, u2.followers);
  compare(u1.totalContributions, u2.totalContributions);
  compare(u1.longestStreak, u2.longestStreak);
  compare(u1.totalCommits, u2.totalCommits);
  compare(u1.totalPullRequests, u2.totalPullRequests);
  compare(u1.totalIssues, u2.totalIssues);
  
  // Repo stars
  const stars1 = u1.topRepositories.reduce((acc, r) => acc + r.stars, 0);
  const stars2 = u2.topRepositories.reduce((acc, r) => acc + r.stars, 0);
  compare(stars1, stars2);

  const p1Winner = score1 >= score2;
  const p2Winner = score2 >= score1;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl space-y-16 relative">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-error-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />

      {/* Versus Header */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 relative">
        {/* Player 1 */}
        <div className="flex flex-col items-center gap-4 text-center z-10">
          <Link href={`/${u1.username}`} className="group">
            <div className={`relative rounded-full p-2.5 transition-transform duration-500 group-hover:scale-105 ${p1Winner ? 'bg-gradient-to-tr from-blue-500 via-cyan-400 to-blue-500 bg-[length:200%_200%] animate-gradient shadow-[0_0_40px_rgba(56,189,248,0.4)]' : 'bg-bg-elevated/50'}`}>
              {p1Winner && (
                <div className="absolute -top-4 -right-4 bg-bg-card p-3 rounded-full border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.3)] z-10 animate-bounce-slow">
                  <Trophy className="w-8 h-8 text-yellow-500 drop-shadow-lg" />
                </div>
              )}
              <Avatar className={`w-32 h-32 md:w-40 md:h-40 ring-4 ${p1Winner ? 'ring-bg-card' : 'ring-border-default/50'}`}>
                <AvatarImage src={u1.avatarUrl} alt={u1.username} />
                <AvatarFallback className="text-5xl">{u1.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </Link>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight text-text-primary drop-shadow-md">{u1.displayName || u1.username}</h2>
            <p className="text-lg font-medium text-accent-400/80">@{u1.username}</p>
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center justify-center shrink-0 z-20">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-bg-card border border-border-default/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative -my-8 md:-my-0">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-bg-elevated to-bg-card flex items-center justify-center border border-border-default/20">
              <span className="text-2xl md:text-3xl font-black italic bg-clip-text text-transparent bg-gradient-to-br from-text-muted to-text-secondary">VS</span>
            </div>
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex flex-col items-center gap-4 text-center z-10">
          <Link href={`/${u2.username}`} className="group">
            <div className={`relative rounded-full p-2.5 transition-transform duration-500 group-hover:scale-105 ${p2Winner ? 'bg-gradient-to-tr from-red-600 via-orange-500 to-red-600 bg-[length:200%_200%] animate-gradient shadow-[0_0_40px_rgba(249,115,22,0.4)]' : 'bg-bg-elevated/50'}`}>
              {p2Winner && (
                <div className="absolute -top-4 -left-4 bg-bg-card p-3 rounded-full border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.3)] z-10 animate-bounce-slow">
                  <Trophy className="w-8 h-8 text-yellow-500 drop-shadow-lg" />
                </div>
              )}
              <Avatar className={`w-32 h-32 md:w-40 md:h-40 ring-4 ${p2Winner ? 'ring-bg-card' : 'ring-border-default/50'}`}>
                <AvatarImage src={u2.avatarUrl} alt={u2.username} />
                <AvatarFallback className="text-5xl">{u2.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </Link>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight text-text-primary drop-shadow-md">{u2.displayName || u2.username}</h2>
            <p className="text-lg font-medium text-error-400/80">@{u2.username}</p>
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="max-w-4xl mx-auto space-y-8">
        <GlassCard className="p-8 md:p-12 space-y-6 bg-bg-card/40 backdrop-blur-2xl border-border-default/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent opacity-50" />
          
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-400/50" />
            <h3 className="text-center text-2xl font-black text-text-primary tracking-[0.2em] uppercase shadow-text">
              Tale of the Tape
            </h3>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-error-400/50" />
          </div>
          
          <div className="space-y-4 divide-y divide-border-default/20">
            <AnimatedStatBar label="Total Contributions" val1={u1.totalContributions} val2={u2.totalContributions} iconNode={<Zap className="w-4 h-4" />} />
            <AnimatedStatBar label="Commits" val1={u1.totalCommits} val2={u2.totalCommits} iconNode={<GitCommit className="w-4 h-4" />} />
            <AnimatedStatBar label="Pull Requests" val1={u1.totalPullRequests} val2={u2.totalPullRequests} iconNode={<GitPullRequest className="w-4 h-4" />} />
            <AnimatedStatBar label="Issues" val1={u1.totalIssues} val2={u2.totalIssues} iconNode={<CircleDot className="w-4 h-4" />} />
            <AnimatedStatBar label="Longest Streak" val1={u1.longestStreak} val2={u2.longestStreak} iconNode={<Zap className="w-4 h-4" />} />
            <AnimatedStatBar label="Followers" val1={u1.followers} val2={u2.followers} iconNode={<Star className="w-4 h-4" />} />
            <AnimatedStatBar label="Stars Earned" val1={stars1} val2={stars2} iconNode={<Star className="w-4 h-4" />} />
          </div>
        </GlassCard>

        {/* Verdict */}
        <div className="relative mt-16 max-w-2xl mx-auto">
          <div className={`absolute inset-0 bg-gradient-to-r ${score1 > score2 ? 'from-blue-500/20 to-cyan-400/20' : score2 > score1 ? 'from-red-500/20 to-orange-400/20' : 'from-border-default/20 to-border-default/20'} blur-3xl -z-10`} />
          <GlassCard className={`p-10 text-center border-2 ${score1 > score2 ? 'border-accent-500/30' : score2 > score1 ? 'border-error-500/30' : 'border-border-default'} bg-bg-card/80`}>
            <p className="text-text-primary uppercase tracking-[0.3em] text-sm font-black mb-4 flex items-center justify-center gap-3">
              <Swords className="w-5 h-5 text-accent-400" />
              Final Verdict
              <Swords className="w-5 h-5 text-accent-400" />
            </p>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r break-words ${score1 > score2 ? 'from-blue-500 to-cyan-300' : score2 > score1 ? 'from-red-500 to-orange-300' : 'from-text-primary to-text-secondary'}`}>
              {score1 > score2 
                ? `${u1.username} Wins!` 
                : score2 > score1 
                  ? `${u2.username} Wins!` 
                  : "It's a Tie!"}
            </h2>
            <div className="mt-6 flex justify-center gap-2 text-text-secondary font-mono text-lg bg-bg-elevated/50 py-2 px-6 rounded-full inline-flex mx-auto border border-border-default/30">
              <span className={score1 > score2 ? 'text-accent-400 font-bold' : ''}>{score1}</span>
              <span>-</span>
              <span className={score2 > score1 ? 'text-error-400 font-bold' : ''}>{score2}</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
