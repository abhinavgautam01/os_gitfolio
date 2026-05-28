import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MapPinOff } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-[70vh] relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-500/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

        <GlassCard className="max-w-xl w-full p-8 md:p-12 flex flex-col items-center text-center space-y-6 relative border-border-default/50">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
          
          <div className="w-20 h-20 bg-accent-500/10 rounded-full flex items-center justify-center border border-accent-500/20 text-accent-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <MapPinOff className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              404
            </h1>
            <h2 className="text-xl font-semibold text-text-primary">
              Page Not Found
            </h2>
            <p className="text-text-secondary max-w-sm mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="w-full mt-6 flex justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold tracking-wide transition-all shadow-[0_4px_14px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Back to Home
            </Link>
          </div>
        </GlassCard>
      </main>
      <Footer />
    </>
  );
}
