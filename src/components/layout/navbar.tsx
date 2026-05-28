import Link from 'next/link';
import { Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { UserNav } from '@/components/layout/user-nav';
import { NavbarSearch } from '@/components/layout/navbar-search';

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-default bg-bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <FaGithub className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-lg hidden sm:inline-block">OS_<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Gitfolio</span></span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
            <NavbarSearch />
          </div>
          
          <a 
            href="https://github.com/abhinavgautam01/os_gitfolio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors border border-white/10 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-yellow-400 group"
          >
            <Star className="w-4 h-4 group-hover:fill-yellow-400 transition-colors" />
            <span>Star on GitHub</span>
          </a>

          <ThemeToggle />
          {session?.user ? (
            <UserNav user={session.user} />
          ) : (
            <Link href="/signin">
              <Button size="sm" variant="primary">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
