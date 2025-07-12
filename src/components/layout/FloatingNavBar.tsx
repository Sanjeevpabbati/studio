'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  const [activePill, setActivePill] = useState({
    width: 0,
    height: 0,
    x: 0,
  });
  const navRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.href === pathname);
    const activeLink = refs.current[activeIndex];
    const navNode = navRef.current;

    if (activeLink && navNode) {
      const { width, height } = activeLink.getBoundingClientRect();
      const { x: navX } = navNode.getBoundingClientRect();
      const x = activeLink.getBoundingClientRect().x - navX;
      setActivePill({ width, height, x });
    }
  }, [pathname]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav ref={navRef} className="relative flex h-16 items-center gap-2 rounded-2xl bg-card/90 p-2 backdrop-blur-lg border border-border shadow-lg">
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 z-0 rounded-xl bg-accent"
            style={{ borderRadius: 12 }}
            initial={false}
            animate={activePill}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 30,
            }}
          />
        </AnimatePresence>
        
        {navItems.map(({ href, icon: Icon, label }, index) => {
          const isActive = pathname === href;
          return (
            <Link
              href={href}
              key={label}
              className="relative z-10"
              ref={(el) => (refs.current[index] = el)}
            >
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
