'use client';

import { Home, User, Trophy, PieChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/rewards', icon: Trophy, label: 'Rewards' },
];

const rightNavItems = [
  { href: '/insights', icon: PieChart, label: 'Insights' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const NavLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} legacyBehavior passHref>
      <a className="relative flex flex-col items-center justify-center w-14 h-12 rounded-full cursor-pointer transition-colors duration-300 hover:text-accent group">
        <Icon
          className={cn(
            'relative z-10 transition-colors',
            isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-accent'
          )}
        />
        {isActive && (
          <motion.div
            layoutId="active-underline"
            className="absolute bottom-1 h-1 w-6 bg-accent rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        )}
        <span className="sr-only">{label}</span>
      </a>
    </Link>
  );
};

const FloatingNavBar: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="relative">
        <nav className="relative flex items-center justify-between gap-32 rounded-full bg-card/80 backdrop-blur-md p-2 shadow-lg">
          <div className="flex gap-4">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>
          
          <div className="flex gap-4">
            {rightNavItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>
        </nav>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className='rounded-full'>
              <Button 
                variant="default" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full h-20 w-20 font-bold text-xl shadow-[0_0_12px_hsl(var(--accent))] shimmer-button"
                asChild
              >
                <Link href="/start">Start</Link>
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingNavBar;
