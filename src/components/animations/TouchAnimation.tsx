'use client';

import React, { useState, useEffect } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const TouchAnimation: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const addRipple = (event: MouseEvent) => {
      const newRipple: Ripple = {
        x: event.clientX,
        y: event.clientY,
        id: Date.now(),
      };
      setRipples(prevRipples => [...prevRipples, newRipple]);
    };

    document.addEventListener('mousedown', addRipple);

    return () => {
      document.removeEventListener('mousedown', addRipple);
    };
  }, []);

  const handleAnimationEnd = (id: number) => {
    setRipples(prevRipples => prevRipples.filter(ripple => ripple.id !== id));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/50 animate-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          onAnimationEnd={() => handleAnimationEnd(ripple.id)}
        />
      ))}
    </div>
  );
};

export default TouchAnimation;
