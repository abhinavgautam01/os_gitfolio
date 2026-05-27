"use client";

import { LanguageStat } from '@/types';
import { GlassCard } from '@/components/ui/glass-card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Code2 } from 'lucide-react';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-bg-elevated border border-border-default rounded-md p-3 shadow-lg flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
          <span className="font-semibold text-text-primary">{data.name}</span>
        </div>
        <span className="text-sm text-text-secondary">{data.percentage}% • {data.repoCount} repos</span>
      </div>
    );
  }
  return null;
};

export function LanguageDonut({ languages }: { languages: LanguageStat[] }) {
  if (!languages || languages.length === 0) return null;



  return (
    <GlassCard className="flex flex-col p-6 gap-4">
      <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
        <Code2 className="w-5 h-5 text-accent-400" /> Languages
      </h3>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languages}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="percentage"
              stroke="none"
            >
              {languages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              content={(props) => {
                const { payload } = props;
                return (
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                    {payload?.map((entry, index) => (
                      <li key={`item-${index}`} className="flex items-center gap-1.5 text-xs text-text-secondary">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span>{entry.value}</span>
                      </li>
                    ))}
                  </ul>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
