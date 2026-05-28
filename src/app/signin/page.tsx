import { signIn } from '@/lib/auth';
import { GlassCard } from '@/components/ui/glass-card';
import { Github, Activity, Star, GitBranch } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';

export const metadata = {
  title: 'Sign In',
};

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] -z-10" />

        <div className="w-full max-w-md">
          <GlassCard className="p-8 sm:p-12 relative overflow-hidden flex flex-col items-center text-center">
            
            {/* Subtle top gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
            
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Github className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-3 tracking-tight">
              OS_Gitfolio
            </h1>
            
            <p className="text-text-secondary mb-8 text-sm">
              Connect your GitHub account to generate beautiful stats, track streaks, and compete with other developers.
            </p>

            {/* Features preview list */}
            <div className="flex flex-col gap-3 text-sm text-left w-full mb-8">
              <div className="flex items-center gap-3 text-text-secondary">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Real-time contribution heatmaps</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Deep repository analytics</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <GitBranch className="w-4 h-4 text-blue-400" />
                <span>Head-to-head dev battles</span>
              </div>
            </div>

            <form
              action={async () => {
                'use server';
                await signIn('github', { redirectTo: '/' });
              }}
              className="w-full"
            >
              <button 
                type="submit"
                className="w-full group relative flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all shadow-[0_4px_14px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Continue with GitHub</span>
              </button>
            </form>
            
            <p className="mt-6 text-xs text-text-tertiary">
              By signing in, you agree to our <a href="/terms" className="hover:text-text-secondary underline underline-offset-2">Terms</a> and <a href="/privacy" className="hover:text-text-secondary underline underline-offset-2">Privacy Policy</a>.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
