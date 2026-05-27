"use client";

import * as React from 'react';
import { ContributionYear } from '@/types';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { Activity } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-elevated border border-border-default rounded-md p-3 shadow-lg">
        <p className="font-semibold text-text-primary">{label}</p>
        <p className="text-accent-400 font-medium">
          {payload[0].value} contributions
        </p>
      </div>
    );
  }
  return null;
};

export function ActivityCharts({ data }: { data: ContributionYear }) {
  // Aggregate monthly data
  const monthlyData = data.months.map(month => {
    let monthTotal = 0;
    // Iterate through weeks to sum up days belonging to this month
    data.weeks.forEach(week => {
      week.days.forEach(day => {
        const date = new Date(day.date);
        // Note: this is a simple approximation. For precise monthly aggregation, 
        // we'd match the month and year explicitly.
        if (date.toLocaleString('default', { month: 'short' }) === month.name) {
          monthTotal += day.count;
        }
      });
    });
    return { name: month.name, total: monthTotal };
  });

  // Aggregate daily data (moving average or raw)
  // For simplicity, we just flatten the days
  const dailyData = data.weeks.flatMap(w => w.days).filter(d => d.date <= new Date().toISOString());



  return (
    <GlassCard className="p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent-400" /> Activity Overview
        </h3>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-[200px] grid-cols-2 mb-6">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip cursor={{ fill: 'var(--bg-inset)' }} content={<CustomTooltip />} />
              <Bar dataKey="total" fill="var(--chart-bar-commits)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="daily" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--text-muted)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => {
                  const d = new Date(value);
                  return `${d.getMonth() + 1}/${d.getDate()}`;
                }}
                minTickGap={30}
              />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="var(--chart-line-stroke)" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4, fill: 'var(--chart-line-stroke)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </GlassCard>
  );
}
