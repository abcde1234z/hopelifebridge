# HopeLIFE Bridge - Complete Implementation Guide

## Project Overview
HopeLIFE Bridge is a comprehensive health wallet and emergency response platform that provides users with:
- Health wallet management for medical payments
- Emergency activation with instant hospital notifications
- Medical consultation booking
- Health insurance management
- Healthcare facility locator
- Emergency history tracking
- User account & profile management

---

## Phase 1: Database Setup (Supabase)

### 1.1 Create Supabase Project
1. Go to https://supabase.com and create a new project
2. Save your project URL and anon key
3. Add to environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### 1.2 Create Database Schema

Run these SQL queries in the Supabase SQL editor:

#### Users Profile Table
```sql
-- Extended user profile information
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  email TEXT,
  date_of_birth DATE,
  blood_type VARCHAR(5),
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  medical_conditions TEXT[], -- Array of conditions
  allergies TEXT[], -- Array of allergies
  current_medications TEXT[], -- Array of medications
  insurance_provider TEXT,
  insurance_number TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

#### Health Wallet Table
```sql
CREATE TABLE public.health_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  balance DECIMAL(10, 2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'NGN', -- Naira for Nigeria
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE public.health_wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own wallet" ON public.health_wallets
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallet" ON public.health_wallets
  FOR UPDATE USING (auth.uid() = user_id);
```

#### Wallet Transactions Table
```sql
CREATE TABLE public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES public.health_wallets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  type VARCHAR(20), -- 'credit', 'debit'
  amount DECIMAL(10, 2),
  description TEXT,
  reference_id TEXT, -- For linking to emergency/consultation
  status VARCHAR(20) DEFAULT 'completed', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON public.wallet_transactions
  FOR SELECT USING (auth.uid() = user_id);
```

#### Emergency Records Table
```sql
CREATE TABLE public.emergency_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  activation_time TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'resolved', 'cancelled'
  location JSONB, -- {latitude, longitude, address}
  hospital_id UUID, -- Reference to hospital if assigned
  hospital_name TEXT,
  notes TEXT,
  emergency_fund_amount DECIMAL(10, 2),
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE public.emergency_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own emergencies" ON public.emergency_records
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own emergencies" ON public.emergency_records
  FOR UPDATE USING (auth.uid() = user_id);
```

#### Consultations Table
```sql
CREATE TABLE public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  doctor_id UUID, -- Reference to doctor (future)
  doctor_name TEXT,
  specialty TEXT,
  scheduled_time TIMESTAMP,
  duration_minutes INTEGER DEFAULT 30,
  status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled'
  consultation_type VARCHAR(20) DEFAULT 'video', -- 'video', 'in-person', 'phone'
  cost DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own consultations" ON public.consultations
  FOR SELECT USING (auth.uid() = user_id);
```

#### Healthcare Facilities Table
```sql
CREATE TABLE public.healthcare_facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type VARCHAR(50), -- 'hospital', 'clinic', 'pharmacy'
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'Nigeria',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone_number TEXT,
  email TEXT,
  website TEXT,
  operating_hours JSONB, -- {monday: {open: "08:00", close: "18:00"}, ...}
  emergency_available BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 2),
  reviews_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create spatial index for location-based queries
CREATE INDEX healthcare_facilities_location_idx 
  ON public.healthcare_facilities (latitude, longitude);
```

#### Insurance Plans Table
```sql
CREATE TABLE public.insurance_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider TEXT,
  description TEXT,
  coverage_percentage DECIMAL(5, 2), -- 50.00 = 50%
  monthly_premium DECIMAL(10, 2),
  annual_premium DECIMAL(10, 2),
  max_annual_coverage DECIMAL(12, 2),
  deductible DECIMAL(10, 2),
  features TEXT[], -- Array of coverage features
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

#### User Insurance Subscriptions
```sql
CREATE TABLE public.user_insurance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.insurance_plans(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'expired', 'cancelled'
  start_date DATE,
  end_date DATE,
  claims_remaining INTEGER DEFAULT 5,
  total_claimed DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE public.user_insurance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own insurance" ON public.user_insurance
  FOR SELECT USING (auth.uid() = user_id);
```

#### Notifications Table
```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type VARCHAR(30), -- 'emergency', 'consultation', 'payment', 'system'
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);
```

---

## Phase 2: API Routes & Backend Logic

### 2.1 Create API Routes

#### File: `app/api/auth/callback/route.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/app/home', request.url))
}
```

#### File: `app/api/wallet/add-balance/route.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { amount } = await request.json()

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  }

  // Get wallet
  const { data: wallet, error: walletError } = await supabase
    .from('health_wallets')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (walletError || !wallet) {
    return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
  }

  // Update balance
  const { data: updatedWallet, error: updateError } = await supabase
    .from('health_wallets')
    .update({ balance: wallet.balance + amount })
    .eq('id', wallet.id)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Log transaction
  await supabase
    .from('wallet_transactions')
    .insert({
      wallet_id: wallet.id,
      user_id: user.id,
      type: 'credit',
      amount,
      description: 'Wallet top-up',
      status: 'completed',
    })

  return NextResponse.json(updatedWallet)
}
```

#### File: `app/api/emergency/activate/route.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { location } = await request.json()

  // Create emergency record
  const { data: emergency, error } = await supabase
    .from('emergency_records')
    .insert({
      user_id: user.id,
      location,
      status: 'active',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Notify emergency contacts (implement your notification service)
  // This could integrate with SMS service, email, push notifications

  // Reserve emergency funds from wallet
  const { data: wallet } = await supabase
    .from('health_wallets')
    .select('id, balance')
    .eq('user_id', user.id)
    .single()

  if (wallet && wallet.balance > 0) {
    const emergency_fund = Math.min(wallet.balance, 10000) // Reserve up to ₦10,000
    await supabase
      .from('wallet_transactions')
      .insert({
        wallet_id: wallet.id,
        user_id: user.id,
        type: 'debit',
        amount: emergency_fund,
        description: 'Emergency fund reservation',
        reference_id: emergency.id,
        status: 'pending',
      })
  }

  return NextResponse.json(emergency)
}
```

#### File: `app/api/healthcare/nearby/route.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const radius = searchParams.get('radius') || '5' // 5km default

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 })
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  // Find facilities within radius using PostGIS
  const { data: facilities, error } = await supabase
    .rpc('nearby_facilities', {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      radius_km: parseFloat(radius),
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(facilities)
}
```

### 2.2 Create Supabase RPC Functions

```sql
-- Create function for nearby facilities search (PostGIS)
CREATE OR REPLACE FUNCTION nearby_facilities(
  latitude DECIMAL,
  longitude DECIMAL,
  radius_km DECIMAL DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  type VARCHAR,
  address TEXT,
  distance_km DECIMAL,
  rating DECIMAL,
  emergency_available BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.name,
    f.type,
    f.address,
    ROUND(
      CAST(
        ST_Distance(
          ST_SetSRID(ST_Point(f.longitude, f.latitude), 4326),
          ST_SetSRID(ST_Point(longitude, latitude), 4326)
        ) / 1000.0 AS DECIMAL
      ),
      2
    ) AS distance_km,
    f.rating,
    f.emergency_available
  FROM public.healthcare_facilities f
  WHERE ST_Distance(
    ST_SetSRID(ST_Point(f.longitude, f.latitude), 4326),
    ST_SetSRID(ST_Point(longitude, latitude), 4326)
  ) / 1000.0 <= radius_km
  ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql;
```

---

## Phase 3: Frontend Components & Pages

### 3.1 Update Home Page with Real Data

Update `app/app/home/page.tsx` to fetch wallet data:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Bell, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export default function HomePage() {
  const [userName, setUserName] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      if (!supabase) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      setUserName(profile?.full_name || user.email?.split('@')[0] || 'User');

      // Fetch wallet
      const { data: wallet } = await supabase
        .from('health_wallets')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      setWalletBalance(wallet?.balance || 0);

      // Fetch recent transactions
      const { data: txns } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setTransactions(txns || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <main className="w-full">
      {/* Header with wallet info */}
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
          <Bell size={24} />
        </div>

        {/* Wallet Card */}
        <div className="mt-6 rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
          <p className="mb-2 text-sm opacity-90">Health Wallet Balance</p>
          <h2 className="mb-4 text-3xl font-bold">₦{walletBalance.toFixed(2)}</h2>
          <div className="flex gap-3">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => window.location.href = '/app/wallet/add-money'}
            >
              <Plus size={18} className="mr-2" />
              Add Money
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
            >
              <Send size={18} className="mr-2" />
              Pay
            </Button>
          </div>
        </div>
      </header>

      {/* Recent Activity */}
      <section className="px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        {transactions.length === 0 ? (
          <div className="rounded-lg bg-secondary p-6 text-center">
            <p className="text-muted-foreground">No transactions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium">{txn.description}</p>
                  <p className="text-sm text-muted-foreground">{new Date(txn.created_at).toLocaleDateString()}</p>
                </div>
                <p className={txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                  {txn.type === 'credit' ? '+' : '-'}₦{txn.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
```

### 3.2 Emergency History Page

Create `app/app/emergency/history/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AlertTriangle, Clock, MapPin, Hospital } from 'lucide-react';

export default function EmergencyHistoryPage() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmergencies = async () => {
      const supabase = createClient();
      if (!supabase) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: emgs } = await supabase
        .from('emergency_records')
        .select('*')
        .eq('user_id', user.id)
        .order('activation_time', { ascending: false });

      setEmergencies(emgs || []);
      setLoading(false);
    };

    fetchEmergencies();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <main className="w-full min-h-[calc(100vh-80px)] px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">Emergency History</h1>

      {emergencies.length === 0 ? (
        <div className="rounded-lg bg-secondary p-6 text-center">
          <p className="text-muted-foreground">No emergency records found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {emergencies.map((emergency) => (
            <div key={emergency.id} className="border border-border rounded-lg p-4 hover:bg-secondary/50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-destructive mt-1" size={24} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Emergency #{emergency.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock size={16} />
                        {new Date(emergency.activation_time).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      emergency.status === 'active' ? 'bg-destructive/20 text-destructive' :
                      emergency.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {emergency.status.charAt(0).toUpperCase() + emergency.status.slice(1)}
                    </span>
                  </div>

                  {emergency.hospital_name && (
                    <p className="text-sm flex items-center gap-2 mt-2">
                      <Hospital size={16} />
                      {emergency.hospital_name}
                    </p>
                  )}

                  {emergency.location?.address && (
                    <p className="text-sm flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      {emergency.location.address}
                    </p>
                  )}

                  {emergency.notes && (
                    <p className="text-sm mt-2 text-muted-foreground italic">"{emergency.notes}"</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
```

### 3.3 Wallet Management

Create `app/app/wallet/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, TrendingDown, TrendingUp } from 'lucide-react';

export default function WalletPage() {
  const [wallet, setWallet] = useState({ balance: 0, currency: 'NGN' });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      const supabase = createClient();
      if (!supabase) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: w } = await supabase
        .from('health_wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setWallet(w || { balance: 0, currency: 'NGN' });

      const { data: txns } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setTransactions(txns || []);
      setLoading(false);
    };

    fetchWallet();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const totalCredit = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);

  return (
    <main className="w-full min-h-[calc(100vh-80px)] px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Health Wallet</h1>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white mb-8">
        <p className="text-sm opacity-90 mb-2">Current Balance</p>
        <h2 className="text-4xl font-bold mb-4">₦{wallet.balance.toFixed(2)}</h2>
        <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
          <Plus size={20} className="mr-2" />
          Add Money
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <TrendingUp size={20} />
            <p className="text-sm font-medium">Total Credits</p>
          </div>
          <p className="text-2xl font-bold text-green-700">₦{totalCredit.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <TrendingDown size={20} />
            <p className="text-sm font-medium">Total Debits</p>
          </div>
          <p className="text-2xl font-bold text-red-700">₦{totalDebit.toFixed(2)}</p>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        {transactions.length === 0 ? (
          <div className="bg-secondary rounded-lg p-6 text-center">
            <p className="text-muted-foreground">No transactions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium">{txn.description}</p>
                  <p className="text-xs text-muted-foreground">{txn.status}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.type === 'credit' ? '+' : '-'}₦{txn.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{new Date(txn.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
```

---

## Phase 4: Authentication Integration

### 4.1 Update Sign Up Page

Update `app/auth/sign-up/page.tsx` to create user profile:

```typescript
// After successful auth signup, create user profile
const { data } = await supabase.auth.signUp({
  email,
  password,
});

if (data.user) {
  await supabase.from('user_profiles').insert({
    id: data.user.id,
    email: data.user.email,
  });

  // Create wallet
  await supabase.from('health_wallets').insert({
    user_id: data.user.id,
  });
}
```

---

## Phase 5: Demo Data Population

### 5.1 Seed Database with Demo Data

Run this SQL to add demo facilities:

```sql
-- Insert demo healthcare facilities
INSERT INTO public.healthcare_facilities (
  name, type, address, city, state, latitude, longitude,
  phone_number, email, emergency_available, rating
) VALUES
  (
    'Lagos State University Teaching Hospital',
    'hospital',
    '123 Lekki Expressway',
    'Lagos',
    'Lagos',
    6.4277,
    3.5597,
    '+2340800000001',
    'info@lasuth.gov.ng',
    TRUE,
    4.8
  ),
  (
    'National Hospital Abuja',
    'hospital',
    '456 Shehu Shagari Way',
    'Abuja',
    'FCT',
    9.0765,
    7.3986,
    '+2340800000002',
    'info@nha.gov.ng',
    TRUE,
    4.6
  ),
  (
    'Mercy Clinic Lagos',
    'clinic',
    '789 Victoria Island',
    'Lagos',
    'Lagos',
    6.4344,
    3.5265,
    '+2340800000003',
    'info@mercyclinic.com',
    FALSE,
    4.5
  );

-- Insert demo insurance plans
INSERT INTO public.insurance_plans (
  name, provider, description, coverage_percentage,
  monthly_premium, annual_premium, max_annual_coverage,
  deductible, features
) VALUES
  (
    'Basic Health Plus',
    'HealthCare Nigeria',
    'Essential health coverage for individuals',
    70,
    5000,
    55000,
    500000,
    5000,
    ARRAY['Doctor Visits', 'Lab Tests', 'Prescriptions', 'Hospitalization']
  ),
  (
    'Premium Health Plus',
    'HealthCare Nigeria',
    'Comprehensive coverage with premium benefits',
    90,
    12000,
    130000,
    1500000,
    2500,
    ARRAY['Doctor Visits', 'Lab Tests', 'Prescriptions', 'Hospitalization', 'Surgery', 'Mental Health', '24/7 Support']
  );
```

### 5.2 Generate Demo Transactions (JavaScript)

```typescript
// Generate demo data for testing
async function seedDemoData(userId: string) {
  const supabase = createClient();
  
  // Create demo wallet if not exists
  const { data: existingWallet } = await supabase
    .from('health_wallets')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (!existingWallet) {
    await supabase
      .from('health_wallets')
      .insert({ user_id: userId, balance: 50000 });
  }

  // Add demo transactions
  const demoTransactions = [
    { type: 'credit', amount: 50000, description: 'Initial wallet funding' },
    { type: 'debit', amount: 2500, description: 'Doctor consultation - Dr. Smith' },
    { type: 'debit', amount: 1500, description: 'Lab tests' },
    { type: 'credit', amount: 10000, description: 'Insurance claim reimbursement' },
  ];

  for (const txn of demoTransactions) {
    const { data: wallet } = await supabase
      .from('health_wallets')
      .select('id')
      .eq('user_id', userId)
      .single();

    await supabase
      .from('wallet_transactions')
      .insert({
        wallet_id: wallet.id,
        user_id: userId,
        ...txn,
        status: 'completed',
      });
  }
}
```

---

## Phase 6: Third-Party Integrations

### 6.1 SMS Notifications (Twilio)
```bash
npm install twilio
```

Create `lib/twilio.ts`:
```typescript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendEmergencyAlert(phoneNumber: string, message: string) {
  return await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
}
```

### 6.2 Email Notifications (SendGrid)
```bash
npm install @sendgrid/mail
```

Create `lib/sendgrid.ts`:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmergencyEmail(to: string, emergencyData: any) {
  const msg = {
    to,
    from: 'noreply@hopelifebridge.com',
    subject: 'Emergency Alert - Immediate Action Required',
    html: `
      <h2>Emergency Activated</h2>
      <p>An emergency has been activated for your account.</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Status:</strong> Active</p>
    `,
  };
  return await sgMail.send(msg);
}
```

### 6.3 Payment Integration (Flutterwave/Paystack)
```bash
npm install flutterwave-node-v3
```

---

## Phase 7: Deployment Checklist

- [ ] All Supabase tables created with RLS policies enabled
- [ ] Environment variables configured in Vercel:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  - TWILIO_ACCOUNT_SID (if using SMS)
  - TWILIO_AUTH_TOKEN
  - TWILIO_PHONE_NUMBER
  - SENDGRID_API_KEY (if using email)
  - Payment provider keys
- [ ] Database backups configured
- [ ] Error monitoring setup (Sentry)
- [ ] Analytics configured
- [ ] All API routes tested
- [ ] Mobile responsive design verified
- [ ] Security audit completed
- [ ] Performance optimized

---

## Development Workflow

### Local Development
```bash
npm install
npm run dev
```

### Testing Emergency Features
1. Create test account
2. Add wallet balance via API
3. Trigger emergency activation
4. Verify SMS/Email notifications
5. Check emergency record in database

### Production Deployment
```bash
git add .
git commit -m "feat: complete HopeLIFE Bridge implementation"
git push origin main
# Vercel auto-deploys
```

---

## Performance Optimization

- Use database indexes for frequently queried fields
- Implement caching for healthcare facility locations
- Cache user profiles with SWR
- Compress images and assets
- Use CDN for static assets
- Implement pagination for transaction history

---

## Security Considerations

- Enable RLS on all user-related tables
- Use parameterized queries (Supabase handles this)
- Validate all user inputs on frontend and backend
- Encrypt sensitive data (medical records)
- Implement rate limiting on API routes
- Use HTTPS only
- Regular security audits

---

## Support & Monitoring

- Set up error tracking (Sentry)
- Monitor API performance (New Relic)
- Track user analytics (PostHog)
- Regular health checks
- Uptime monitoring (UptimeRobot)

This guide provides a complete roadmap for building HopeLIFE Bridge with a production-ready architecture!
