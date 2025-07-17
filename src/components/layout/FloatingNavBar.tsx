'use client';

import { Home, User, Trophy, PieChart, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/rewards', icon: Trophy, label: 'Rewards' },
  { href: '/insights', icon: PieChart, label: 'Insights' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const NavLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={true}
      className={cn(
        "relative flex flex-col items-center justify-center w-14 h-12 rounded-full cursor-pointer transition-colors duration-300 group",
        isActive ? 'text-accent' : 'text-muted-foreground hover:text-accent'
        )}
    >
      <Icon
        className='relative z-10 transition-colors'
      />
      {isActive && (
        <div
          className="absolute bottom-1 h-1 w-4 bg-accent rounded-full"
        />
      )}
      <span className="sr-only">{label}</span>
    </Link>
  );
};

const FloatingNavBar: React.FC = () => {
    const pathname = usePathname();
    if (['/', '/start', '/reward'].includes(pathname)) {
        return null;
    }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="relative flex items-center justify-center gap-4 rounded-full bg-card/80 backdrop-blur-md px-4 py-2 shadow-lg">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </div>
  );
};

export default FloatingNavBar;
