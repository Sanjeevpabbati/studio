'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Wallet, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/customize', icon: LayoutGrid, label: 'Customize' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const FloatingNavBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <nav className="bg-card/80 backdrop-blur-lg border border-border rounded-full p-2 shadow-lg">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn('nav-link p-2 rounded-full', isActive && 'active bg-accent/20')}>
                <item.icon className="w-6 h-6" />
                <span className="sr-only">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default FloatingNavBar;
