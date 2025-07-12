'use client';
import React, { useState } from 'react';
import Cube from '@/components/cube/Cube';
import type { CubeShapes, FaceName } from '@/lib/types';

const initialShapes: CubeShapes = {
  front: { name: 'front', type: 'circle', color: '#ef4444', aiHint: 'circle' },
  back: { name: 'back', type: 'square', color: '#3b82f6', aiHint: 'square' },
  right: { name: 'right', type: 'triangle', color: '#22c55e', aiHint: 'triangle' },
  left: { name: 'left', type: 'diamond', color: '#eab308', aiHint: 'diamond' },
  top: { name: 'top', type: 'plus', color: '#8b5cf6', aiHint: 'plus sign' },
  bottom: { name: 'bottom', type: 'star', color: '#ec4899', aiHint: 'star' },
};

export default function Home() {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [shapes] = useState<CubeShapes>(initialShapes);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight } = currentTarget;
    const x = ((clientX / offsetWidth) * 2 - 1) * 30;
    const y = ((clientY / offsetHeight) * 2 - 1) * -30;
    setRotation({ x: y, y: x });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <div 
        className="w-full h-full flex items-center justify-center min-h-[400px] lg:min-h-screen"
        onMouseMove={handleMouseMove}
      >
        <Cube rotation={rotation} shapes={shapes} />
      </div>
    </main>
  );
}
