"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

export function SearchForm() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsLoading(true);
    router.push(`/${username.trim()}`);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="relative w-full flex items-center group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative w-full rounded-full p-[2px] bg-gradient-to-r from-border-default via-cyan-500/30 to-border-default focus-within:from-blue-500 focus-within:to-cyan-400 transition-all duration-500">
        <div className="relative flex items-center bg-background rounded-full overflow-hidden">
          <div className="pl-3 sm:pl-5 pr-2 sm:pr-3 text-text-muted">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter a GitHub username..."
            className="flex-1 bg-transparent py-3 sm:py-4 px-1 sm:px-2 mr-1 sm:mr-2 text-base sm:text-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none min-w-0"
            style={{ boxShadow: 'none', outline: 'none', WebkitAppearance: 'none' }}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            disabled={isLoading}
          />
          <div className="pr-1 sm:pr-2">
            <Button 
              type="submit" 
              variant="primary" 
              className="rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base"
              disabled={!username.trim() || isLoading}
            >
              {isLoading ? (
                <motion.div
                  className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <span className="hidden sm:inline">Visualize</span>
                  <span className="sm:hidden">Go</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.form>
  );
}
