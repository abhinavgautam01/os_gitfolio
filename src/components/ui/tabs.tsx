"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

export function Tabs({ 
  defaultValue, 
  value, 
  onValueChange, 
  className, 
  children 
}: { 
  defaultValue?: string; 
  value?: string; 
  onValueChange?: (value: string) => void; 
  className?: string; 
  children: React.ReactNode;
}) {
  const [tabValue, setTabValue] = React.useState(value || defaultValue || '');

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setTabValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value: value !== undefined ? value : tabValue, onValueChange: handleValueChange }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('inline-flex h-10 items-center justify-center rounded-md bg-bg-inset p-1 text-text-muted', className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isSelected = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => context.onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative',
        isSelected ? 'text-text-primary shadow-sm' : 'hover:text-text-primary',
        className
      )}
    >
      {isSelected && (
        <motion.div 
          layoutId="activeTab" 
          className="absolute inset-0 bg-bg-elevated rounded-sm shadow-sm"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.value !== value) return null;

  return (
    <motion.div
      role="tabpanel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 h-full',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
