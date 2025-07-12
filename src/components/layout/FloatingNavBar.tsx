
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, BarChart2, Trophy, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/insights', icon: BarChart2, label: 'Insights' },
  { href: '/start', icon: Rocket, label: 'Start' },
  { href: '/rewards', icon: Trophy, label: 'Rewards' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const FloatingNavBar: React.FC = () => {
  const pathname = usePathname();
  const activeIndex = navItems.findIndex(item => item.href === pathname);

  return (
    <>
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <nav
          className="relative flex h-16 items-center gap-x-2 rounded-2xl bg-card/90 p-2 backdrop-blur-lg border border-border shadow-lg"
          style={{ filter: 'url(#goo)' }}
        >
          {activeIndex !== -1 && (
            <motion.div
              className="absolute top-2 w-12 h-12 bg-accent rounded-full"
              initial={false}
              animate={{
                x: activeIndex * (48 + 8), // 48px icon width + 8px gap
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            />
          )}

          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                href={href}
                key={label}
                className={cn(
                  'relative z-10 w-12 h-12 flex items-center justify-center rounded-full',
                  'transition-colors duration-300'
                )}
              >
                <Icon
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isActive ? 'text-accent-foreground' : 'text-muted-foreground'
                  )}
                />
                <span className="sr-only">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default FloatingNavBar;
