'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Cube from '@/components/cube/Cube';
import type { CubeShapes, FaceName } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

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
    imageUrl: 'https://placehold.co/288x288.png',
    imageAiHint: 'cricket ball',
    sponsor: { name: 'Pepsi', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'soda brand logo' },
  },
  right: {
    name: 'right',
    type: 'triangle',
    color: '',
    quizFormat: 'ODI',
    imageUrl: 'https://placehold.co/288x288.png',
    imageAiHint: 'cricket bat',
    sponsor: { name: 'Adidas', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'sports apparel logo' },
  },
  bottom: {
    name: 'bottom',
    type: 'star',
    color: '',
    quizFormat: 'WPL',
    imageUrl: 'https://placehold.co/288x288.png',
    imageAiHint: 'trophy',
    sponsor: { name: 'My11Circle', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'fantasy sports logo' },
  },
  back: {
    name: 'back',
    type: 'square',
    color: '',
    quizFormat: 'Test',
    imageUrl: 'https://placehold.co/288x288.png',
    imageAiHint: 'team logo',
    sponsor: { name: 'MRF', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'tire company logo' },
  },
  left: {
    name: 'left',
    type: 'diamond',
    color: '',
    quizFormat: 'Core',
    imageUrl: 'https://placehold.co/288x288.png',
    imageAiHint: 'abstract graphic',
    sponsor: { name: 'Puma', logoUrl: 'https://placehold.co/32x32.png', aiHint: 'athletic brand logo' },
  },
};

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
  const [api, setApi] = useState<CarouselApi>();
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    }
  }, []);

  const startAutoRotate = useCallback(() => {
    stopAutoRotate();
    autoRotateIntervalRef.current = setInterval(() => {
      setCurrentFaceIndex(prevIndex => (prevIndex + 1) % faceOrder.length);
    }, 4000);
  }, [stopAutoRotate]);

  useEffect(() => {
    if (!isInteracting) {
      startAutoRotate();
    }
    return () => stopAutoRotate();
  }, [isInteracting, startAutoRotate, stopAutoRotate]);
  
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentFaceIndex(selectedIndex);
    };

    const onInteraction = () => {
      setIsInteracting(true);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      interactionTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
      }, 5000); // 5-second delay before auto-rotation resumes
    };

    api.on('select', onSelect);
    api.on('pointerDown', onInteraction);
    api.on('wheel', onInteraction);

    return () => {
      api.off('select', onSelect);
      api.off('pointerDown', onInteraction);
      api.off('wheel', onInteraction);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [api]);

  useEffect(() => {
    const nextFaceName = faceOrder[currentFaceIndex];
    setRotation(faceRotations[nextFaceName]);
    if (api && api.selectedScrollSnap() !== currentFaceIndex) {
      api.scrollTo(currentFaceIndex, true); // Jump to the correct slide
    }
  }, [currentFaceIndex, api]);

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
        <div className="w-full max-w-sm mt-8">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {faceOrder.map((faceName) => (
                <CarouselItem key={faceName}>
                  <div className="p-1">
                      <div className="flex items-center justify-center gap-3 h-12">
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
            {faceOrder.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentFaceIndex ? 'bg-accent' : 'bg-muted'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
