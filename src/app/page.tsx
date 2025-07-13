'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Cube from '@/components/cube/Cube';
import type { CubeShapes, FaceName, QuizFormat } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';

const initialShapes: CubeShapes = {
  front: {
    name: 'front',
    type: 'circle',
    color: '',
    quizFormat: 'Test',
    sponsor: { name: 'MRF', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'tire company logo' },
  },
  top: {
    name: 'top',
    type: 'plus',
    color: '',
    quizFormat: 'T20',
    sponsor: { name: 'Pepsi', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'soda brand logo' },
  },
  right: {
    name: 'right',
    type: 'triangle',
    color: '',
    quizFormat: 'ODI',
    sponsor: { name: 'Adidas', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'sports apparel logo' },
  },
  bottom: {
    name: 'bottom',
    type: 'star',
    color: '',
    quizFormat: 'IPL',
    sponsor: { name: 'Tata', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'conglomerate logo' },
  },
  back: {
    name: 'back',
    type: 'square',
    color: '',
    quizFormat: 'WPL',
    sponsor: { name: 'My11Circle', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'fantasy sports logo' },
  },
  left: {
    name: 'left',
    type: 'diamond',
    color: '',
    quizFormat: 'Mixed',
    sponsor: { name: 'Puma', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'athletic brand logo' },
  },
};

// Order of faces for rotation
const faceOrder: FaceName[] = ['front', 'top', 'right', 'bottom', 'back', 'left'];

const faceRotations: { [key in FaceName]: { x: number, y: number } } = {
  front: { x: 0, y: 0 },
  top: { x: -90, y: 0 },
  right: { x: 0, y: 90 },
  bottom: { x: 90, y: 0 },
  back: { x: 0, y: 180 },
  left: { x: 0, y: -90 },
};

const title = 'indcric';

export default function Home() {
  const [rotation, setRotation] = useState(faceRotations.front);
  const [shapes] = useState<CubeShapes>(initialShapes);
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFaceIndex(prevIndex => (prevIndex + 1) % faceOrder.length);
    }, 4000); // Changed to 4 seconds per requirement

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextFaceName = faceOrder[currentFaceIndex];
    setRotation(faceRotations[nextFaceName]);
  }, [currentFaceIndex]);

  const currentFaceName = faceOrder[currentFaceIndex];
  const currentFormat = shapes[currentFaceName];

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 md:p-8">
      <div className="text-center py-4 font-headline mb-8">
        <h1
          className="text-5xl font-bold text-primary-foreground tracking-tight sm:text-6xl md:text-7xl text-white"
          aria-label={title}
        >
          {title.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block"
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Win <strong className="text-white">100</strong> rupees in <strong className="text-white">100</strong> seconds
        </p>
      </div>
      <div 
        className="w-full flex flex-col items-center justify-center mt-8"
      >
        <Cube rotation={rotation} shapes={shapes} />
        <div className="mt-12 h-16 w-full max-w-sm flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFormat.quizFormat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative flex items-center justify-center gap-3 rounded-full bg-card/50 backdrop-blur-sm px-6 py-3 border border-white/10 shadow-lg"
            >
              <span className="text-xl font-bold text-white tracking-wider">{currentFormat.quizFormat}</span>
              <span className="text-sm text-muted-foreground">Sponsored by</span>
              <Image 
                src={currentFormat.sponsor.logoUrl} 
                alt={`${currentFormat.sponsor.name} logo`}
                width={28}
                height={28}
                className="object-contain rounded-full bg-white p-0.5"
                data-ai-hint={currentFormat.sponsor.aiHint}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
