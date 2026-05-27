import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-text-primary">Compare Profiles</h1>
        <p className="text-text-secondary text-lg">Compare two GitHub users side by side. (Coming soon)</p>
      </main>
      <Footer />
    </>
  );
}
