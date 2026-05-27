import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SearchForm } from '@/components/home/search-form';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl flex flex-col items-center text-center space-y-8 py-20">
          
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-cyan-500/10 mb-4 ring-1 ring-cyan-500/20">
              <FaGithub className="w-12 h-12 text-cyan-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary">
              OS_<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Gitfolio</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Unlock deep insights into any GitHub user&apos;s contribution history.
              Visualize streaks, languages, and activity patterns with stunning interactive charts.
            </p>
          </div>

          <div className="w-full max-w-lg mt-8">
            <SearchForm />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <span className="text-sm text-text-muted">Try searching for:</span>
            <Link href="/abhinavgautam01" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              abhinavgautam01
            </Link>
            <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              your_github_username
            </Link>
            <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              your_friend&apos;s_github_username
            </Link>
            <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              your_enemy&apos;s_github_username 🤧
            </Link>
          </div>

        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-20 mb-20">
          <div className="p-6 rounded-2xl bg-bg-card border border-border-default backdrop-blur-md">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Beautiful Visualizations</h3>
            <p className="text-text-secondary">Heatmaps, bar charts, and donut charts built with D3 and Recharts for maximum clarity.</p>
          </div>
          <div className="p-6 rounded-2xl bg-bg-card border border-border-default backdrop-blur-md">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Dark Aurora Theme</h3>
            <p className="text-text-secondary">A premium, carefully crafted dark mode interface with micro-interactions and ambient glows.</p>
          </div>
          <div className="p-6 rounded-2xl bg-bg-card border border-border-default backdrop-blur-md">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Export & Share</h3>
            <p className="text-text-secondary">Generate high-quality PNGs or PDFs of your stats to share on social media or your resume.</p>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
