
'use client';

import React from 'react';
import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';

const SplashScreen = () => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-out'
      )}
    >
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <Logo className="w-20 h-20 text-white" />
        <h1 className="text-4xl font-bold text-white tracking-tight font-headline">
          indcric
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
