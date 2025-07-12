'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, BarChart2, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/insights', icon: BarChart2, label: 'Insights' },
  { href: '/rewards', icon: Trophy, label: 'Rewards' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const FloatingNavBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <nav className="bg-card/90 backdrop-blur-lg border border-border rounded-full p-2 shadow-lg">
        <div className="flex justify-around items-center">
          {navItems.slice(0, 2).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn('nav-link p-2 rounded-full', isActive && 'active')}>
                <item.icon className="w-6 h-6" />
                <span className="sr-only">{item.label}</span>
              </Link>
            );
          })}

          <Button asChild variant="default" size="lg" className="h-14 w-24 bg-accent rounded-full shadow-lg -translate-y-4 hover:bg-accent/90 font-bold text-lg">
            <Link href="/start">
                Start
            </Link>
          </Button>

          {navItems.slice(2).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn('nav-link p-2 rounded-full', isActive && 'active')}>
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
