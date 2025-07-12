'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, BarChart2, Trophy, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimateSharedLayout } from 'framer-motion';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/insights', icon: BarChart2, label: 'Insights' },
  { href: '/start', icon: Rocket, label: 'Start' },
  { href: '/rewards', icon: Trophy, label: 'Rewards' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const FloatingNavBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex h-16 items-center gap-2 rounded-2xl bg-card/90 p-2 backdrop-blur-lg border border-border shadow-lg">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link href={href} key={label}>
              <motion.div
                className="relative w-12 h-12 flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <Icon
                  className={cn(
                    'w-6 h-6 z-10 transition-colors',
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                  )}
                />
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-xl bg-accent"
                    style={{ borderRadius: 12 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="sr-only">{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default FloatingNavBar;
