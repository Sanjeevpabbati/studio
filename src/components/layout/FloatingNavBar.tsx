'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, BarChart2, Trophy, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/insights', icon: BarChart2, label: 'Insights' },
  { href: '/start', icon: Rocket, label: 'Start' },
  { href: '/rewards', icon: Trophy, label: 'Rewards' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const FloatingNavBar: React.FC = () => {
  let mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-center gap-4 rounded-2xl bg-card/90 px-4 pb-3 backdrop-blur-lg border border-border shadow-lg"
      >
        {navItems.map(({ href, icon: Icon, label }) => (
          <AppIcon mouseX={mouseX} href={href} Icon={Icon} label={label} key={label} />
        ))}
      </motion.div>
    </div>
  );
};

function AppIcon({ mouseX, href, Icon, label }: { mouseX: any; href: string; Icon: React.ElementType; label: string; }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // The '37.5' here controls the responsive area. A smaller number makes it more focused.
  let scale = useTransform(distance, [-37.5, 0, 37.5], [1, 1.5, 1]);
  let d = useSpring(scale, {
    damping: 15,
    stiffness: 200,
    mass: 0.1,
  });

  return (
    <div ref={ref} className="group relative flex flex-col items-center">
      <Link href={href}>
        <motion.div
          className="aspect-square w-10 flex items-center justify-center rounded-full bg-secondary/0 group-hover:bg-secondary transition-colors"
          style={{ scale: d }}
        >
            <Icon
              className={cn(
                'w-6 h-6 transition-colors',
                isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
              )}
            />
            <span className="sr-only">{label}</span>
        </motion.div>
      </Link>
      {isActive && (
        <motion.div
          layoutId="active-nav-dot"
          className="absolute bottom-[-8px] h-1.5 w-1.5 rounded-full bg-accent"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </div>
  );
}


export default FloatingNavBar;
