import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { GlassCard } from '@/components/ui/glass-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-8 animate-pulse">
        {/* Profile Header Skeleton */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
          <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full shrink-0" />
          <div className="flex-1 space-y-4 text-center md:text-left w-full mt-4 md:mt-0">
            <Skeleton className="h-10 w-48 mx-auto md:mx-0" />
            <Skeleton className="h-6 w-32 mx-auto md:mx-0" />
            <Skeleton className="h-16 w-full max-w-lg mx-auto md:mx-0" />
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* StatsGrid Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <GlassCard key={i} className="p-4 flex flex-col items-center justify-center h-28">
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </GlassCard>
              ))}
            </div>
            
            {/* Heatmap Skeleton */}
            <GlassCard className="p-6 h-64 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
              <Skeleton className="w-full h-32 rounded-md" />
            </GlassCard>
            
            {/* ActivityCharts Skeleton */}
            <GlassCard className="p-6 h-80 flex flex-col">
              <Skeleton className="h-6 w-40 mb-6" />
              <Skeleton className="w-full flex-1 rounded-md" />
            </GlassCard>
          </div>
          
          <div className="space-y-6">
            {/* StreakCard Skeleton */}
            <GlassCard className="p-6 h-48 flex flex-col justify-between">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="flex justify-between items-end">
                <Skeleton className="h-16 w-24" />
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </GlassCard>
            
            {/* LanguageDonut Skeleton */}
            <GlassCard className="p-6 h-72 flex flex-col items-center justify-center">
              <Skeleton className="h-6 w-32 mb-6 self-start" />
              <Skeleton className="h-40 w-40 rounded-full" />
            </GlassCard>
            
            {/* RepoCards Skeleton */}
            <GlassCard className="p-6 space-y-4">
              <Skeleton className="h-6 w-40 mb-2" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-md" />
              ))}
            </GlassCard>
          </div>
        </div>
        
        <div className="h-12 md:h-20" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}
