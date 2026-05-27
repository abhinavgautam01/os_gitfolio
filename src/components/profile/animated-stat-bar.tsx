"use client";

import { useEffect, useState } from "react";
import { formatNumber } from "@/lib/utils";

export function AnimatedStatBar({ 
  label, 
  val1, 
  val2, 
  iconNode 
}: { 
  label: string; 
  val1: number; 
  val2: number; 
  iconNode: React.ReactNode; 
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure the transition triggers after initial render
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (val1 === 0 && val2 === 0) return null;

  const total = val1 + val2 || 1;
  const pct1 = Math.round((val1 / total) * 100);
  const pct2 = Math.round((val2 / total) * 100);
  
  const p1Wins = val1 > val2;
  const p2Wins = val2 > val1;
  const isTie = val1 === val2;

  return (
    <div className="py-4 space-y-3 group cursor-default">
      <div className="flex items-center justify-between text-sm mb-1 px-2 transition-transform duration-300 group-hover:-translate-y-1">
        <span className={`text-xl md:text-2xl font-black font-mono tracking-tighter transition-all duration-300 ${p1Wins ? 'text-accent-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] scale-110' : isTie ? 'text-text-primary' : 'text-text-secondary opacity-80'}`}>
          {formatNumber(val1)}
        </span>
        
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 text-text-primary font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full bg-bg-elevated/80 border border-border-default/50 shadow-inner group-hover:bg-bg-elevated group-hover:border-accent-500/50 transition-colors">
            <span className={`flex items-center justify-center transition-colors ${p1Wins ? 'text-accent-400' : p2Wins ? 'text-error-400' : 'text-text-muted'}`}>
              {iconNode}
            </span>
            {label}
          </div>
        </div>

        <span className={`text-xl md:text-2xl font-black font-mono tracking-tighter transition-all duration-300 ${p2Wins ? 'text-error-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.8)] scale-110' : isTie ? 'text-text-primary' : 'text-text-secondary opacity-80'}`}>
          {formatNumber(val2)}
        </span>
      </div>

      <div className="flex h-5 rounded-full overflow-hidden bg-bg-elevated shadow-inner relative border border-border-default/20 group-hover:border-border-default/50 transition-colors">
        {/* Center divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-bg-card z-10 skew-x-12 transform -translate-x-1/2" />
        
        {/* Player 1 Bar */}
        <div 
          style={{ width: mounted ? `${pct1}%` : '0%' }} 
          className={`h-full relative transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${p1Wins ? 'bg-gradient-to-r from-blue-600 to-cyan-400' : 'bg-bg-elevated'}`} 
        >
          {p1Wins && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
              <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-r from-transparent to-white/40 blur-md animate-pulse-slow" />
            </>
          )}
        </div>

        {/* Player 2 Bar */}
        <div 
          style={{ width: mounted ? `${pct2}%` : '0%' }} 
          className={`h-full relative transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${p2Wins ? 'bg-gradient-to-l from-red-600 to-orange-400' : 'bg-bg-elevated'}`} 
        >
          {p2Wins && (
            <>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/30" />
              <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-l from-transparent to-white/40 blur-md animate-pulse-slow" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
