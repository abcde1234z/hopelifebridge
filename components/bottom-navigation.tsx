'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, Grid3x3, AlertTriangle, User } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  const links = [
    { href: '/app/home', label: 'Home', icon: Home },
    { href: '/app/wallet', label: 'Wallet', icon: Wallet },
    { href: '/app/services', label: 'Services', icon: Grid3x3 },
    { href: '/app/emergency', label: 'Emergency', icon: AlertTriangle },
    { href: '/app/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background">
      <div className="flex items-center justify-around">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={24} />
              <span className="text-center">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
