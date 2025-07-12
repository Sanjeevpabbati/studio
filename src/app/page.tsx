'use client';
import React, { useState, useEffect } from 'react';
import Cube from '@/components/cube/Cube';
import type { CubeShapes } from '@/lib/types';

const initialShapes: CubeShapes = {
  front: { name: 'front', type: 'circle', color: '', imageUrl: 'https://placehold.co/200x200.png', aiHint: 'brand logo' },
  back: { name: 'back', type: 'square', color: '', imageUrl: 'https://placehold.co/200x200.png', aiHint: 'brand logo' },
  right: { name: 'right', type: 'triangle', color: '', imageUrl: 'https://placehold.co/200x200.png', aiHint: 'brand logo' },
  left: { name: 'left', type: 'diamond', color: '', imageUrl: 'https://placehold.co/200x200.png', aiHint: 'brand logo' },
  top: { name: 'top', type: 'plus', color: '', imageUrl: 'https://placehold.co/200x200.png', aiHint: 'brand logo' },
  bottom: { name: 'bottom', type: 'star', color: '', imageUrl: 'https://placehold.co/200x200.png', aiHint: 'brand logo' },
};

// Simplified and clear sequence of face rotations
const faceRotations = [
  { x: 0, y: 0 },    // Front
  { x: -90, y: 0 },   // Top
  { x: 0, y: 90 },    // Right
  { x: 90, y: 0 },    // Bottom
  { x: 0, y: 180 },   // Back
  { x: 0, y: -90 },   // Left
];

export default function Home() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shapes] = useState<CubeShapes>(initialShapes);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Use a functional update to get the next rotation in the sequence
      setRotation(prevRotation => {
        const currentIndex = faceRotations.findIndex(
          r => r.x === prevRotation.x && r.y === prevRotation.y
        );
        const nextIndex = (currentIndex + 1) % faceRotations.length;
        return faceRotations[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-4 md:p-8">
      <div className="text-center py-4 font-headline mb-8">
        <h1 className="text-5xl font-bold text-primary-foreground tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-white font-bold">indcric</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Win <strong className="text-white">100</strong> rupees in <strong className="text-white">100</strong> seconds
        </p>
      </div>
      <div 
        className="w-full flex items-center justify-center mt-8"
      >
        <Cube rotation={rotation} shapes={shapes} />
      </div>
    </main>
  );
}
