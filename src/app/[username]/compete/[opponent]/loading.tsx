import { GlassCard } from '@/components/ui/glass-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Swords } from 'lucide-react';

export default function CompeteLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Versus Header Skeleton */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        
        {/* Player 1 Skeleton */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="w-16 h-16 rounded-full bg-bg-elevated/50 border-4 border-bg-card flex items-center justify-center -my-4 md:-my-0 md:-mx-4">
            <Swords className="w-8 h-8 text-accent-400/50 animate-pulse" />
          </div>
        </div>

        {/* Player 2 Skeleton */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>
      </div>

      {/* Stats Comparison Skeleton */}
      <div className="max-w-3xl mx-auto space-y-6">
        <GlassCard className="p-6 md:p-8 space-y-4">
          <Skeleton className="h-6 w-48 mx-auto rounded-md mb-8" />
          
          <div className="space-y-2 divide-y divide-border-default/50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="py-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <Skeleton className="h-4 w-12 rounded-sm" />
                  <Skeleton className="h-4 w-24 rounded-sm" />
                  <Skeleton className="h-4 w-12 rounded-sm" />
                </div>
                <Skeleton className="h-3 w-full rounded-full" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
