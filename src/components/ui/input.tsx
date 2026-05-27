"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

export interface InputProps extends HTMLMotionProps<"input"> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <motion.input
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-md border border-border-default bg-bg-card px-4 py-2 text-base text-text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            error && 'border-error-500 focus-visible:ring-error-500',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
