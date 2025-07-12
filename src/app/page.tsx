'use client';
import React, { useState, useEffect } from 'react';
import Cube from '@/components/cube/Cube';
import type { CubeShapes } from '@/lib/types';
import { motion } from 'framer-motion';

const initialShapes: CubeShapes = {
  front: { name: 'front', type: 'circle', color: '', imageUrl: '', aiHint: 'brand logo' },
  back: { name: 'back', type: 'square', color: '', imageUrl: '', aiHint: 'sports drink' },
  right: { name: 'right', type: 'triangle', color: '', imageUrl: '', aiHint: 'tech company' },
  left: { name: 'left', type: 'diamond', color: '', imageUrl: '', aiHint: 'fashion brand' },
  top: { name: 'top', type: 'plus', color: '', imageUrl: '', aiHint: 'food delivery' },
  bottom: { name: 'bottom', type: 'star', color: '', imageUrl: '', aiHint: 'travel agency' },
};

const faceRotations = [
  { x: 0, y: 0 },    // Front
  { x: -90, y: 0 },   // Top
  { x: 0, y: 90 },    // Right
  { x: 90, y: 0 },    // Bottom
  { x: 0, y: 180 },   // Back
  { x: 0, y: -90 },   // Left
];

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  },
};

const title = 'indcric';

export default function Home() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shapes] = useState<CubeShapes>(initialShapes);
  
  useEffect(() => {
    const interval = setInterval(() => {
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
    <div className="flex min-h-screen flex-col items-center bg-background p-4 md:p-8">
      <div className="text-center py-4 font-headline mb-8">
        <motion.h1
          className="text-5xl font-bold text-primary-foreground tracking-tight sm:text-6xl md:text-7xl text-white"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          aria-label={title}
        >
          {title.split('').map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Win <strong className="text-white">100</strong> rupees in <strong className="text-white">100</strong> seconds
        </p>
      </div>
      <div 
        className="w-full flex items-center justify-center mt-8"
      >
        <Cube rotation={rotation} shapes={shapes} />
      </div>
    </div>
  );
}
