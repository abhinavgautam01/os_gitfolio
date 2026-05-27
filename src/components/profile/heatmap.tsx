"use client";

import * as React from 'react';
import { ContributionYear } from '@/types';
import { GlassCard } from '@/components/ui/glass-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate, cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export function Heatmap({ 
  data, 
  availableYears, 
  username 
}: { 
  data: ContributionYear;
  availableYears: number[];
  username: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentYearParam = searchParams.get('year');
  const selectedYear = currentYearParam ? parseInt(currentYearParam) : data.year;

  if (!data || !data.weeks) return null;

  const cellSize = 12;
  const cellGap = 4;
  const daysInWeek = 7;
  const width = data.weeks.length * (cellSize + cellGap);
  const height = daysInWeek * (cellSize + cellGap);

  const getLevelColor = (level: number) => {
    return `var(--color-contribution-${level})`;
  };

  const handleYearChange = (year: number) => {
    router.push(`/${username}?year=${year}`, { scroll: false });
  };

  return (
    <TooltipProvider delayDuration={100}>
      <GlassCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-text-primary">
            {data.totalContributions.toLocaleString()} contributions in {data.year}
          </h3>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div 
                  key={level} 
                  className="w-3 h-3 rounded-[2px]"
                  style={{ backgroundColor: getLevelColor(level) }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6 items-start">
          <div className="flex-1 overflow-x-auto custom-scrollbar pb-4 min-w-0">
            <div className="relative min-w-max">
              <div className="flex text-xs text-text-muted mb-2">
                <div className="w-[30px]" /> {/* spacing for days */}
                {data.months.map((month, i) => {
                  return (
                    <div 
                      key={i} 
                      style={{ width: `${month.totalWeeks * (cellSize + cellGap)}px` }}
                    >
                      {month.name}
                    </div>
                  );
                })}
              </div>

              <div className="flex">
                <div className="flex flex-col text-[10px] text-text-muted pr-2">
                  {[0, 1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="flex items-center h-[16px]">
                      <span className={i === 1 || i === 3 || i === 5 ? "" : "invisible"}>
                        {i === 1 ? 'Mon' : i === 3 ? 'Wed' : i === 5 ? 'Fri' : ''}
                      </span>
                    </div>
                  ))}
                </div>

                <svg width={width} height={height}>
                  {data.weeks.map((week, weekIdx) => (
                    <g key={week.firstDay} transform={`translate(${weekIdx * (cellSize + cellGap)}, 0)`}>
                      {week.days.map((day) => (
                        <Tooltip key={day.date}>
                          <TooltipTrigger asChild>
                            <rect
                              width={cellSize}
                              height={cellSize}
                              y={day.weekday * (cellSize + cellGap)}
                              rx={3}
                              ry={3}
                              fill={getLevelColor(day.level)}
                              className="hover:stroke-border-strong hover:stroke-2 hover:opacity-80 transition-all cursor-pointer"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex flex-col text-center">
                              <span className="font-semibold text-text-primary">
                                {day.count} {day.count === 1 ? 'contribution' : 'contributions'}
                              </span>
                              <span className="text-text-secondary text-xs">
                                {formatDate(day.date)}
                              </span>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Year Selector */}
          {availableYears.length > 0 && (
            <div className="w-[60px] md:w-[70px] shrink-0 border-l border-border-subtle pl-2 md:pl-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: '136px' }}>
              <div className="flex flex-col gap-2 pr-1">
                {availableYears.map(y => (
                  <button
                    key={y}
                    onClick={() => handleYearChange(y)}
                    className={cn(
                      "text-sm py-1 px-2 rounded-md transition-all text-center w-full",
                      y === selectedYear 
                        ? "bg-accent-500/20 text-accent-400 font-semibold" 
                        : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                    )}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </TooltipProvider>
  );
}
