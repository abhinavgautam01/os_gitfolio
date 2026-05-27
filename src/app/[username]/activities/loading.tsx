import { Skeleton } from '@/components/ui/skeleton';
import { GlassCard } from '@/components/ui/glass-card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Loading() {
  return (
    <div className="min-h-screen pb-20 pt-8 max-w-4xl mx-auto px-4 md:px-6 animate-pulse">
      <div className="inline-flex items-center gap-2 text-text-secondary mb-6 cursor-not-allowed opacity-50">
        <ArrowLeft className="w-4 h-4" />
        Back to Profile
      </div>
      
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 mb-8">
        <Skeleton className="w-16 h-16 rounded-full ring-2 ring-border-default shrink-0" />
        <div className="space-y-3">
          <Skeleton className="h-7 w-48 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md" />
        </div>
      </div>

      {/* Feed Skeleton */}
      <GlassCard className="p-0 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border-default bg-bg-elevated/50">
          <Skeleton className="h-4 w-40 rounded-sm" />
        </div>
        <div className="flex flex-col divide-y divide-border-default">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <Skeleton className="w-5 h-5 rounded-full shrink-0" />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
                <Skeleton className="h-5 w-full max-w-[60%] sm:max-w-[70%] rounded-md" />
                <Skeleton className="h-4 w-24 shrink-0 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
