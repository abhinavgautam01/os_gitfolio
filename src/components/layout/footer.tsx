import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-card py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-text-secondary">
          <FaGithub className="w-5 h-5 text-cyan-400" />
          <span>OS_<span className="text-cyan-400 font-semibold">Gitfolio</span></span>
          <span className="text-text-muted mx-2">|</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        
        <div className="flex gap-6 text-sm text-text-secondary">
          <Link href="/privacy" className="hover:text-text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-text-primary transition-colors">
            Terms
          </Link>
          <a
            href="https://github.com/abhinavgautam01/os-gitfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            Open Source
          </a>
        </div>
      </div>
    </footer>
  );
}
