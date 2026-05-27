'use client';

import { useState } from 'react';
import { Heart, AlertTriangle, LogOut, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const [userName] = useState('JOE ANONYMOUS');
  const [userEmail] = useState('anonymousjoe010@gmail.com');

  return (
    <main className="w-full min-h-[calc(100vh-80px)]">
      {/* Header */}
      <header className="bg-primary py-8 px-6 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-foreground/20">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">{userName}</h1>
            <p className="text-sm opacity-90">{userEmail}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="space-y-4 px-6 py-6">
        {/* Medical Info */}
        <div className="space-y-3 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart size={20} className="text-destructive" />
              <h2 className="font-bold">Medical Info</h2>
            </div>
            <a href="/app/profile/edit">
              <Button size="sm" variant="ghost" className="text-primary">
                <Edit2 size={16} />
              </Button>
            </a>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Blood Group</span>
              <span className="font-medium">Not set</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Allergies</span>
              <span className="font-medium">None</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">Not set</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-3 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-amber-500" />
              <h2 className="font-bold">Emergency Contact</h2>
            </div>
            <a href="/app/profile/edit">
              <Button size="sm" variant="ghost" className="text-primary">
                <Edit2 size={16} />
              </Button>
            </a>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">Not set</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">Not set</span>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="space-y-3 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">Hope Lifebridge</p>
              <p className="text-sm text-muted-foreground">v1.0</p>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <Button
          variant="outline"
          className="w-full border-destructive text-destructive hover:bg-destructive/10"
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </main>
  );
}
