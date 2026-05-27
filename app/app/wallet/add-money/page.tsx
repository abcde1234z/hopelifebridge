'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddMoneyPage() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);

  const quickAmounts = [100, 500, 1000, 5000];

  const handleAddMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to payment gateway (Stripe)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/app/wallet">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold">Add Money</h1>
          <div className="w-6" />
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6 pb-20">
        <form onSubmit={handleAddMoney} className="space-y-6">
          {/* Amount Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Amount (₦)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-lg font-semibold"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Quick amounts:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => setAmount(quickAmount.toString())}
                  className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                    amount === quickAmount.toString()
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  ₦{quickAmount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 rounded-lg border border-border p-4">
            <label className="block text-sm font-medium">Payment Method</label>
            <div className="space-y-2">
              {[
                { value: 'card', label: 'Debit Card' },
                { value: 'bank', label: 'Bank Transfer' },
                { value: 'ussd', label: 'USSD' },
              ].map((method) => (
                <label key={method.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fee Info */}
          <div className="rounded-lg bg-secondary/50 p-3 text-sm">
            <p className="text-muted-foreground">
              No transaction fees on deposits. Your wallet will be credited instantly.
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!amount || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? 'Processing...' : `Add ₦${amount || '0'}`}
          </Button>

          <Link href="/app/wallet" className="block">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    </main>
  );
}
