'use client';
import React, { useState } from 'react';
import Cube from '@/components/cube/Cube';
import type { CubeShapes } from '@/lib/types';

const initialShapes: CubeShapes = {
  front: { name: 'front', type: 'circle', color: '#ef4444', aiHint: 'circle' },
  back: { name: 'back', type: 'square', color: '#3b82f6', aiHint: 'square' },
  right: { name: 'right', type: 'triangle', color: '#22c55e', aiHint: 'triangle' },
  left: { name: 'left', type: 'diamond', color: '#eab308', aiHint: 'diamond' },
  top: { name: 'top', type: 'plus', color: '#8b5cf6', aiHint: 'plus sign' },
  bottom: { name: 'bottom', type: 'star', color: '#ec4899', aiHint: 'star' },
};

export default function Home() {
  const [rotation] = useState({ x: 0, y: 0 });
  const [shapes] = useState<CubeShapes>(initialShapes);

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-4 md:p-8">
      <div className="text-center py-4">
        <h1 className="text-5xl font-bold text-primary-foreground tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-white font-bold">indcric</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Win <strong className="text-white font-bold">100</strong> rupees in <strong className="text-white font-bold">100</strong> seconds
        </p>
      </div>
      <div 
        className="w-full flex-grow flex items-center justify-center min-h-[400px]"
      >
        <Cube rotation={rotation} shapes={shapes} />
      </div>
    </main>
  );
}
