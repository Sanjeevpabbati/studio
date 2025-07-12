'use client';

import React, { useState, useEffect } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
}

interface SparkleBurst {
  id: number;
  x: number;
  y: number;
  sparkles: Sparkle[];
}

const SPARKLE_COUNT = 8;
const random = (min: number, max: number) => Math.random() * (max - min) + min;

const TouchAnimation: React.FC = () => {
  const [bursts, setBursts] = useState<SparkleBurst[]>([]);

  useEffect(() => {
    const addSparkleBurst = (event: MouseEvent) => {
      const newBurst: SparkleBurst = {
        id: Date.now(),
        x: event.clientX,
        y: event.clientY,
        sparkles: Array.from({ length: SPARKLE_COUNT }).map((_, i) => ({
          id: i,
          x: 0,
          y: 0,
          angle: random(0, 360),
          distance: random(20, 70),
          size: random(4, 8),
        })),
      };
      setBursts(prevBursts => [...prevBursts, newBurst]);
    };

    document.addEventListener('mousedown', addSparkleBurst);

    return () => {
      document.removeEventListener('mousedown', addSparkleBurst);
    };
  }, []);

  const handleAnimationEnd = (id: number) => {
    setBursts(prevBursts => prevBursts.filter(burst => burst.id !== id));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
      {bursts.map(burst => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: burst.x, top: burst.y }}
          onAnimationEnd={() => handleAnimationEnd(burst.id)}
        >
          {burst.sparkles.map(sparkle => (
            <span
              key={sparkle.id}
              className="absolute bg-white rounded-full animate-sparkle"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                '--angle': `${sparkle.angle}deg`,
                '--distance': `${sparkle.distance}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TouchAnimation;
