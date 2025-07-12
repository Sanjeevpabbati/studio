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
      <a className="relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-colors duration-300 hover:bg-accent/50">
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 bg-accent rounded-full"
            style={{ borderRadius: 9999 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        )}
        <Icon
          className={cn(
            'relative z-10 transition-colors',
            isActive ? 'text-accent-foreground' : 'text-muted-foreground'
          )}
        />
        <span className="sr-only">{label}</span>
      </a>
    </Link>
  );
};

const FloatingNavBar: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="relative flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-md p-2 border border-border shadow-lg">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}

        <Button 
          variant="default" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full h-14 w-14 font-bold text-lg"
          asChild
        >
          <Link href="/start">Start</Link>
        </Button>
        
        {rightNavItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </div>
  );
};

export default FloatingNavBar;
