
'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cube from '@/components/cube/Cube';
import type { CubeShapes, FaceName, QuizFormat } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Bell, HomeIcon, Trophy, PieChart, User } from 'lucide-react';
import QuizTimer from '@/components/quiz/QuizTimer';
import { Card } from '@/components/ui/card';

const initialShapes: CubeShapes = {
  front: {
    name: 'front',
    type: 'circle',
    color: '',
    quizFormat: 'IPL',
    imageUrl: 'https://placehold.co/260x260.png',
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

const faceOrder: FaceName[] = ['front', 'top', 'right', 'bottom', 'back', 'left'];
const quizOrder: QuizFormat[] = ['IPL', 'T20', 'ODI', 'WPL', 'Test', 'Core'];

const faceRotations: { [key in FaceName]: { x: number, y: number } } = {
  front: { x: 0, y: 0 },
  top: { x: -90, y: 0 },
  right: { x: 0, y: 90 },
  bottom: { x: 90, y: 0 },
  back: { x: 0, y: 180 },
  left: { x: 0, y: -90 },
};

const title = 'indcric';

const navItems = [
  { href: '/', icon: HomeIcon, label: 'Home', isActive: true },
  { href: '/rewards', icon: Trophy, label: 'Rewards' },
  { href: '/insights', icon: PieChart, label: 'Insights' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function Home() {
  const [rotation, setRotation] = useState(faceRotations.front);
  const [shapes] = useState<CubeShapes>(initialShapes);
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [nextQuizFormat, setNextQuizFormat] = useState<QuizFormat>('IPL');
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Determine the next quiz format based on user's progress
    const completedQuizzesStr = localStorage.getItem('completedQuizzes');
    const completedQuizzes: QuizFormat[] = completedQuizzesStr ? JSON.parse(completedQuizzesStr) : [];
    
    const nextQuiz = quizOrder.find(format => !completedQuizzes.includes(format));
    
    if (nextQuiz) {
      setNextQuizFormat(nextQuiz);
    } else {
      // User has completed all mandatory quizzes, allow free selection
      const currentFaceName = faceOrder[currentFaceIndex];
      setNextQuizFormat(shapes[currentFaceName].quizFormat);
    }
  }, [currentFaceIndex, shapes]);

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
      api?.scrollNext();
    }, 4000);
  }, [api, stopAutoRotate]);

  const handleInteraction = useCallback(() => {
    stopAutoRotate();
    interactionTimeoutRef.current = setTimeout(() => {
      startAutoRotate();
    }, 5000); // 5 seconds
  }, [startAutoRotate, stopAutoRotate]);

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
    
    api.on('select', onSelect);
    api.on('pointerDown', handleInteraction);
    api.on('settle', handleInteraction);

    return () => {
      api.off('select', onSelect);
      api.off('pointerDown', handleInteraction);
      api.off('settle', handleInteraction);
    };
  }, [api, handleInteraction]);

  useEffect(() => {
    const nextFaceName = faceOrder[currentFaceIndex];
    setRotation(faceRotations[nextFaceName]);
  }, [currentFaceIndex]);
  
  const currentFaceName = faceOrder[currentFaceIndex];

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 md:p-8">

      <div className="text-center py-4 font-headline mt-2 mb-8">
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
        <Link href={`/start?format=${shapes[currentFaceName].quizFormat}`} className="cursor-pointer flex flex-col items-center gap-4 text-decoration-none" prefetch={true}>
          <Cube rotation={rotation} shapes={shapes} />
           <p className="text-lg text-accent font-semibold animate-pulse">Click Cube to Play</p>
        </Link>
        <div className="w-full max-w-sm mt-12">
          <Carousel 
            setApi={setApi} 
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {faceOrder.map((faceName) => (
                <CarouselItem key={faceName}>
                  <div className="p-1">
                      <div className={cn("flex items-center justify-center gap-3 h-12 transition-opacity duration-300",
                        currentFaceName === faceName ? 'opacity-100' : 'opacity-0'
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
            <CarouselPrevious className="left-4 bg-transparent border-none" />
            <CarouselNext className="right-4 bg-transparent border-none" />
          </Carousel>
        </div>
        
        <div className="w-full max-w-4xl mt-32 flex flex-col items-center">
            <div className="mb-6">
                <QuizTimer initialMinutes={15} />
            </div>
        </div>
      </div>
       <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <nav className="flex items-center justify-center gap-4 rounded-full bg-card/80 backdrop-blur-md px-4 py-2 shadow-lg">
            {navItems.map(({ href, icon: Icon, label, isActive }) => (
              <Link
                key={href}
                href={href}
                prefetch={true}
                className={cn(
                  "relative flex flex-col items-center justify-center w-14 h-12 rounded-full cursor-pointer transition-colors duration-300 group",
                  isActive ? "text-accent" : "text-muted-foreground hover:text-accent"
                )}
              >
                <Icon className="relative z-10" />
                {isActive && (
                  <div className="absolute bottom-1 h-1 w-4 bg-accent rounded-full" />
                )}
                <span className="sr-only">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
    </div>
  );
}
