'use client';

import { useState } from 'react';
import { Bell, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [notificationCount] = useState(1);
  const userName = 'JOE';
  const walletBalance = 0;

  return (
    <main className="w-full">
      {/* Header */}
      <header className="relative bg-primary py-8 px-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground text-primary font-bold">
              HL
            </div>
            <div>
              <p className="text-sm opacity-90">Welcome back,</p>
              <p className="text-lg font-semibold">{userName} 👋</p>
            </div>
          </div>
          <div className="relative">
            <Bell size={24} />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                {notificationCount}
              </span>
            )}
          </div>
        </div>

        {/* Wallet Card */}
        <div className="mt-6 rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
          <p className="mb-2 text-sm opacity-90">Health Wallet Balance</p>
          <h2 className="mb-4 text-3xl font-bold">₦{walletBalance}</h2>
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 bg-white/20 text-white hover:bg-white/30"
            >
              <Plus size={18} className="mr-2" />
              Add Money
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 bg-white/20 text-white hover:bg-white/30"
            >
              <Send size={18} className="mr-2" />
              Pay
            </Button>
          </div>
        </div>
      </header>

      {/* Quick Services */}
      <section className="px-6 py-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-3 rounded-xl bg-secondary/50 py-4 px-3 text-center">
            <div className="rounded-lg bg-primary/10 p-3">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium">Insurance</p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl bg-secondary/50 py-4 px-3 text-center">
            <div className="rounded-lg bg-primary/10 p-3">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4"
                />
              </svg>
            </div>
            <p className="text-sm font-medium">Consult</p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl bg-secondary/50 py-4 px-3 text-center">
            <div className="rounded-lg bg-destructive/10 p-3">
              <svg
                className="h-6 w-6 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4v2m0 4v2"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-destructive">Emergency</p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <a href="#" className="text-sm text-primary hover:underline">See all</a>
        </div>
        <div className="rounded-lg bg-secondary p-6 text-center">
          <p className="text-muted-foreground">No transactions yet. Add money to get started!</p>
        </div>
      </section>
    </main>
  );
}
