import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12 lg:py-24">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-text-secondary mb-6">Last updated: May 2026</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">When you use OS_Gitfolio, we interact with the GitHub API to fetch publicly available data about your GitHub profile, including repositories, contributions, and languages. If you authenticate via OAuth, we only request access to public data.</p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">The data fetched from GitHub is used strictly for the purpose of generating your profile dashboard and visualizations in real-time. We do not sell, rent, or share this data with any third parties.</p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Storage</h2>
          <p className="mb-4">OS_Gitfolio is designed to be stateless for users. We temporarily cache GitHub API responses to prevent rate limiting and improve performance, but we do not permanently store your GitHub data in a database.</p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Third-Party Services</h2>
          <p className="mb-4">We use Vercel Analytics to collect anonymous, aggregated usage data to help us improve the application. This does not track personally identifiable information.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
