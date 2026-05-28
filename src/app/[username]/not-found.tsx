import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SearchForm } from '@/components/home/search-form';
import { Github, SearchX } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-[70vh] relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-error-500/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

        <GlassCard className="max-w-xl w-full p-8 md:p-12 flex flex-col items-center text-center space-y-6 relative border-error-500/20">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-error-500 to-orange-400" />
          
          <div className="w-20 h-20 bg-error-500/10 rounded-full flex items-center justify-center border border-error-500/20 text-error-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <SearchX className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-error-400 to-orange-300">
              User Not Found
            </h1>
            <p className="text-text-secondary max-w-sm mx-auto">
              We couldn't find a GitHub user with that username. They might have changed their handle, or the account doesn't exist.
            </p>
          </div>

          <div className="w-full mt-6 space-y-6">
            <div className="relative w-full max-w-md mx-auto">
              <SearchForm />
            </div>
            
            <div className="flex items-center justify-center gap-4 text-sm pt-4">
              <Link 
                href="/" 
                className="text-text-muted hover:text-white transition-colors underline underline-offset-4"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </GlassCard>
      </main>
      <Footer />
    </>
  );
}
