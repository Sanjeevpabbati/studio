'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Cube from '@/components/cube/Cube';
import type { CubeShapes, FaceName } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

const initialShapes: CubeShapes = {
  front: {
    name: 'front',
    type: 'circle',
    color: '',
    quizFormat: 'IPL',
    imageUrl: 'https://i.ibb.co/d4FBpHT7/129663845-3387788141330000-4041207386765952109-n.jpg',
    imageAiHint: 'cricket stadium',
    sponsor: { name: 'Tata', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'conglomerate logo' },
  },
  top: {
    name: 'top',
    type: 'plus',
    color: '',
    quizFormat: 'T20',
    imageUrl: 'https://placehold.co/260x260.png',
    imageAiHint: 'cricket ball',
    sponsor: { name: 'Pepsi', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'soda brand logo' },
  },
  right: {
    name: 'right',
    type: 'triangle',
    color: '',
    quizFormat: 'ODI',
    imageUrl: 'https://placehold.co/260x260.png',
    imageAiHint: 'cricket bat',
    sponsor: { name: 'Adidas', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'sports apparel logo' },
  },
  bottom: {
    name: 'bottom',
    type: 'star',
    color: '',
    quizFormat: 'WPL',
    imageUrl: 'https://placehold.co/260x260.png',
    imageAiHint: 'trophy',
    sponsor: { name: 'My11Circle', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'fantasy sports logo' },
  },
  back: {
    name: 'back',
    type: 'square',
    color: '',
    quizFormat: 'Test',
    imageUrl: 'https://placehold.co/260x260.png',
    imageAiHint: 'team logo',
    sponsor: { name: 'MRF', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'tire company logo' },
  },
  left: {
    name: 'left',
    type: 'diamond',
    color: '',
    quizFormat: 'Core',
    imageUrl: 'https://placehold.co/260x260.png',
    imageAiHint: 'abstract graphic',
    sponsor: { name: 'Puma', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'athletic brand logo' },
  },
};

const faceOrder: FaceName[] = ['front', 'top', 'right', 'bottom', 'back', 'left', 'back', 'bottom', 'right', 'top'];
const uniqueFaceNames: FaceName[] = ['front', 'top', 'right', 'bottom', 'back', 'left'];

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
  const [api, setApi] = useState<CarouselApi>();
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    }
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
  }, []);

  const startAutoRotate = useCallback(() => {
    stopAutoRotate();
    autoRotateIntervalRef.current = setInterval(() => {
      setCurrentFaceIndex(prevIndex => (prevIndex + 1) % faceOrder.length);
    }, 4000);
  }, [stopAutoRotate]);

  const handleInteraction = useCallback(() => {
    stopAutoRotate();
    interactionTimeoutRef.current = setTimeout(() => {
      startAutoRotate();
    }, 500); 
  }, [startAutoRotate, stopAutoRotate]);

  const scrollTo = useCallback((faceName: FaceName) => {
    handleInteraction();
    const index = faceOrder.indexOf(faceName);
    if (index !== -1) {
      api?.scrollTo(index);
    }
  }, [api, handleInteraction]);

  useEffect(() => {
    startAutoRotate();
    return stopAutoRotate;
  }, [startAutoRotate, stopAutoRotate]);
  
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentFaceIndex(selectedIndex);
    };
    
    const onSettle = () => {
      handleInteraction();
    }

    api.on('select', onSelect);
    api.on('pointerDown', stopAutoRotate);
    api.on('settle', onSettle);

    return () => {
      api.off('select', onSelect);
      api.off('pointerDown', stopAutoRotate);
      api.off('settle', onSettle);
    };
  }, [api, handleInteraction, stopAutoRotate]);

  useEffect(() => {
    const nextFaceName = faceOrder[currentFaceIndex];
    setRotation(faceRotations[nextFaceName]);
    if (api && api.selectedScrollSnap() !== currentFaceIndex) {
      api.scrollTo(currentFaceIndex); 
    }
  }, [currentFaceIndex, api]);
  
  const currentFaceName = faceOrder[currentFaceIndex];

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
      
      <div className="w-full flex flex-col items-center justify-center mt-0">
        <Cube rotation={rotation} shapes={shapes} />
        <div className="w-full max-w-sm mt-12">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {faceOrder.map((faceName, index) => (
                <CarouselItem key={`${faceName}-${index}`}>
                  <div className="p-1">
                      <div className={cn("flex items-center justify-center gap-3 h-12 transition-opacity duration-300",
                        currentFaceIndex === index ? 'opacity-100' : 'opacity-0'
                      )}>
                        <span className="text-xl font-bold text-white tracking-wider">{shapes[faceName].quizFormat}</span>
                        <span className="text-sm text-muted-foreground">Sponsored by</span>
                        <Image 
                          src={shapes[faceName].sponsor.logoUrl} 
                          alt={`${shapes[faceName].sponsor.name} logo`}
                          width={28}
                          height={28}
                          className="object-contain rounded-full bg-white p-0.5"
                          data-ai-hint={shapes[faceName].sponsor.aiHint}
                        />
                      </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
           <div className="flex justify-center gap-2 mt-4">
            {uniqueFaceNames.map((faceName) => (
              <button
                key={faceName}
                onClick={() => scrollTo(faceName)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  faceName === currentFaceName ? 'bg-accent' : 'bg-muted'
                }`}
                aria-label={`Go to ${shapes[faceName].quizFormat} face`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
