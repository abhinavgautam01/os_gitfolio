"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { AlertTriangle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const isRateLimit = error.message?.toLowerCase().includes("rate limit");

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-[70vh]">
      <GlassCard className="max-w-md w-full p-8 flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-error-500/10 flex items-center justify-center ring-1 ring-error-500/20 text-error-500">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-primary">
              {isRateLimit ? "Rate Limit Exceeded" : "Something went wrong!"}
            </h2>
            <p className="text-text-secondary">
              {isRateLimit 
                ? "GitHub only allows 60 requests per hour for unauthenticated users. The server's limit has been reached." 
                : error.message || "An unexpected error occurred while fetching the data."}
            </p>
          </div>

          {isRateLimit && (
            <div className="bg-bg-elevated/50 p-4 rounded-lg text-sm text-text-muted text-left w-full border border-border-default">
              <p>To avoid these limits, please sign in. Once signed in, you get your own personal limit of <strong>5,000 requests per hour</strong>!</p>
            </div>
          )}

          <div className="flex flex-col w-full gap-3 mt-4">
            {isRateLimit ? (
              <Button onClick={() => signIn()} variant="primary" className="w-full">
                Sign in with GitHub
              </Button>
            ) : (
              <Button onClick={() => reset()} variant="primary" className="w-full">
                Try again
              </Button>
            )}
            
            <Link href="/" className="w-full">
              <Button variant="ghost" className="w-full">
                Back to Search
              </Button>
            </Link>
          </div>
        </GlassCard>
      </main>
  );
}
