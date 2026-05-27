'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EmergencyPage() {
  const [isActivating, setIsActivating] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);

  const handleEmergencyActivate = () => {
    setIsActivating(true);
    setTimeout(() => {
      setEmergencyActive(true);
      setIsActivating(false);
    }, 500);
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-between px-6 py-8">
      {/* Header */}
      <div className="w-full space-y-2 text-center">
        <h1 className="text-3xl font-bold">Emergency Mode</h1>
        <p className="text-muted-foreground">
          One-click emergency activation for instant medical response.
        </p>
      </div>

      {/* Emergency Button */}
      <div className="flex flex-col items-center gap-8">
        <div
          className={`relative transition-all duration-500 ${
            emergencyActive ? 'scale-110' : 'scale-100'
          }`}
        >
          <button
            onClick={handleEmergencyActivate}
            disabled={isActivating || emergencyActive}
            className="relative h-64 w-64 rounded-full bg-destructive shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-75 transition-all duration-200 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <AlertTriangle size={64} className="text-white" strokeWidth={1.5} />
              <span className="text-2xl font-bold text-white tracking-wide">
                EMERGENCY
              </span>
            </div>
          </button>

          {/* Pulse animation for active state */}
          {emergencyActive && (
            <>
              <div className="absolute inset-0 rounded-full bg-destructive opacity-20 animate-pulse" />
              <div className="absolute -inset-4 rounded-full border-4 border-destructive/50 animate-pulse" />
            </>
          )}
        </div>

        {/* Info Text */}
        <div className="max-w-sm space-y-4 text-center">
          <p className="text-muted-foreground leading-relaxed">
            Tap to instantly pay hospital, share medical data, and notify emergency
            contact
          </p>

          {emergencyActive && (
            <div className="space-y-2">
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                <p className="text-sm font-semibold text-destructive mb-2">
                  Emergency Activated
                </p>
                <ul className="space-y-1 text-xs text-destructive/80">
                  <li>✓ Emergency contacts notified</li>
                  <li>✓ Medical data shared</li>
                  <li>✓ Nearest hospital located</li>
                </ul>
              </div>
              <Button
                onClick={() => setEmergencyActive(false)}
                variant="outline"
                className="w-full"
              >
                Cancel Emergency
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Safety Info */}
      <div className="w-full space-y-3 rounded-lg bg-secondary p-4">
        <h3 className="font-semibold">Emergency Protocol</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Your location will be shared with emergency services</li>
          <li>• Emergency contacts will be notified immediately</li>
          <li>• Medical information will be available to hospitals</li>
          <li>• Emergency funds will be reserved for hospital payments</li>
        </ul>
      </div>

      {/* View History Link */}
      <div className="w-full text-center">
        <a 
          href="/app/emergency/history"
          className="text-sm text-primary hover:underline"
        >
          View Emergency History
        </a>
      </div>
    </main>
  );
}
