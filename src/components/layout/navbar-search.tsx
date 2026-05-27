"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NavbarSearch() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username.trim()}`);
      setUsername("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center rounded-md overflow-hidden border border-border-default bg-bg-elevated/50 focus-within:border-accent-500/50 focus-within:ring-1 focus-within:ring-accent-500/50 transition-all"
    >
      <span className="pl-3 pr-1 py-1.5 text-sm text-text-muted select-none whitespace-nowrap">
        github.com/
      </span>
      <input 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        className="bg-transparent !border-none !outline-none !ring-0 focus:!ring-0 focus:!outline-none focus:!border-none shadow-none focus:shadow-none text-sm text-text-primary py-1.5 w-32 md:w-40 placeholder:text-text-muted/50"
      />
      <button 
        type="submit"
        disabled={!username.trim()}
        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 text-white px-4 py-1.5 text-sm font-medium transition-colors"
      >
        Search
      </button>
    </form>
  );
}
