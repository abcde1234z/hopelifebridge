'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EmergencyHistoryPage() {
  // TODO: Fetch emergency logs from Supabase
  const emergencyLogs: Array<{
    id: string;
    date: string;
    time: string;
    location?: string;
    status: string;
    contactsNotified: number;
  }> = [];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/app/emergency">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold">Emergency History</h1>
          <div className="w-6" />
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6 pb-20">
        {emergencyLogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <svg
                className="h-6 w-6 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-muted-foreground">No emergency activations yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your emergency history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {emergencyLogs.map((log) => (
              <div key={log.id} className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{log.date}</p>
                    <p className="text-sm text-muted-foreground">{log.time}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    log.status === 'resolved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {log.status}
                  </span>
                </div>
                {log.location && (
                  <p className="mt-2 text-sm">Location: {log.location}</p>
                )}
                <p className="mt-1 text-sm text-muted-foreground">
                  {log.contactsNotified} contact{log.contactsNotified !== 1 ? 's' : ''} notified
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
