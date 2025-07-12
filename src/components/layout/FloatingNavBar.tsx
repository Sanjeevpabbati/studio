'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, BarChart2, Trophy, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/insights', icon: BarChart2, label: 'Insights' },
  { href: '/start', icon: Rocket, label: 'Start' },
  { href: '/rewards', icon: Trophy, label: 'Rewards' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const FloatingNavBar: React.FC = () => {
  const pathname = usePathname();
  const activeIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="relative flex h-16 items-center gap-2 rounded-2xl bg-card/90 p-2 backdrop-blur-lg border border-border shadow-lg">
        {activeIndex !== -1 && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-y-2 left-2 w-12 rounded-xl bg-accent"
            style={{ borderRadius: 12 }}
            initial={{ x: activeIndex * 56 }}
            animate={{ x: activeIndex * 56 }} // 48px width + 8px gap = 56px
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link href={href} key={label} className="z-10">
              <motion.div
                className="relative w-12 h-12 flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <Icon
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isActive ? 'text-accent-foreground' : 'text-muted-foreground'
                  )}
                />
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
