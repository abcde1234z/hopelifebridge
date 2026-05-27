'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('All');
  const walletBalance = 0;

  const tabs = ['All', 'Deposit', 'Payment', 'Insurance', 'Emergency'];

  return (
    <main className="w-full min-h-[calc(100vh-80px)]">
      {/* Header */}
      <header className="bg-primary py-8 px-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Health Wallet</h1>

        {/* Balance Display */}
        <div className="space-y-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Available Balance</p>
            <h2 className="text-4xl font-bold">₦{walletBalance}</h2>
          </div>

          <Link href="/app/wallet/add-money" className="block">
            <Button
              size="lg"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Plus size={20} className="mr-2" />
              Add Money
            </Button>
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex overflow-x-auto px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-6 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">No transactions yet</p>
        </div>
      </div>
    </main>
  );
}
