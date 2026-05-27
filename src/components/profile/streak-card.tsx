import { GlassCard } from '@/components/ui/glass-card';
import { Trophy } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface StreakProps {
  currentStreak: number;
  longestStreak: number;
  streakStartDate: string | null;
  streakEndDate: string | null;
}

export function StreakCard({ currentStreak, longestStreak, streakStartDate, streakEndDate }: StreakProps) {
  return (
    <GlassCard className="flex flex-col p-6 gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center p-1">
          <img src="/streak.gif" alt="Streak Fire" className="w-14 h-14 object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Current Streak</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-text-primary">{currentStreak}</span>
            <span className="text-text-secondary">days</span>
          </div>
        </div>
      </div>
      
      {streakStartDate && streakEndDate && currentStreak > 0 && (
        <p className="text-sm text-text-secondary md:pl-[60px]">
          {formatDate(streakStartDate)} - {formatDate(streakEndDate)}
        </p>
      )}

      <hr className="border-border-default my-2" />

      <div className="flex items-center gap-3">
        <div className="p-3 bg-accent-500/10 text-accent-400 rounded-full">
          <Trophy className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Longest Streak</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-text-primary">{longestStreak}</span>
            <span className="text-text-secondary">days</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
