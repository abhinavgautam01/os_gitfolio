import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-bg-elevated text-text-secondary border-border-default',
    success: 'bg-success-glow text-success-400 border-success-500/20',
    warning: 'bg-warning-500/10 text-warning-400 border-warning-500/20',
    error: 'bg-error-glow text-error-400 border-error-500/20',
    info: 'bg-info-500/10 text-info-400 border-info-500/20',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
