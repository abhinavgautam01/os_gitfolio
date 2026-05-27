"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Swords, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CompeteModal({ currentUser }: { currentUser: string }) {
  const [open, setOpen] = React.useState(false);
  const [opponent, setOpponent] = React.useState("");
  const router = useRouter();

  const handleBattle = (e: React.FormEvent) => {
    e.preventDefault();
    if (opponent.trim() && opponent.toLowerCase() !== currentUser.toLowerCase()) {
      setOpen(false);
      router.push(`/${currentUser}/compete/${opponent.trim()}`);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="outline" size="sm" className="ml-4 gap-2 bg-bg-elevated/50 hover:bg-bg-elevated hover:text-accent-400 border-accent-500/20 hover:border-accent-400">
          <Swords className="w-4 h-4" />
          <span>Compete</span>
        </Button>
      </DialogPrimitive.Trigger>
      
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border-default bg-bg-card p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-2xl">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <DialogPrimitive.Title className="text-2xl font-bold leading-none tracking-tight flex items-center gap-2 text-text-primary">
              <Swords className="w-6 h-6 text-accent-400" />
              Battle Arena
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="text-sm text-text-secondary pt-2">
              Enter a GitHub username to compare stats head-to-head.
            </DialogPrimitive.Description>
          </div>
          
          <form onSubmit={handleBattle} className="flex flex-col gap-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={opponent}
                onChange={(e) => setOpponent(e.target.value)}
                placeholder="Opponent's GitHub username"
                className="w-full bg-bg-elevated/50 border border-border-default rounded-xl py-3 pl-10 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-400 transition-all"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <DialogPrimitive.Close asChild>
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </DialogPrimitive.Close>
              <Button type="submit" variant="primary" disabled={!opponent.trim() || opponent.toLowerCase() === currentUser.toLowerCase()}>
                <Swords className="w-4 h-4 mr-2" />
                Battle!
              </Button>
            </div>
          </form>
          
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-bg-card transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 disabled:pointer-events-none text-text-muted">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
