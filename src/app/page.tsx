
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

const promotedProducts = [
    { id: 1, imageUrl: 'https://placehold.co/400x200.png', alt: 'Brand 1', aiHint: 'sports drink' },
    { id: 2, imageUrl: 'https://placehold.co/400x200.png', alt: 'Brand 2', aiHint: 'cricket equipment' },
    { id: 3, imageUrl: 'https://placehold.co/400x200.png', alt: 'Brand 3', aiHint: 'mobile phone' },
    { id: 4, imageUrl: 'https://placehold.co/400x200.png', alt: 'Brand 4', aiHint: 'snack food' },
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
      <div className="fixed top-4 right-4 z-50">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/notifications" prefetch={true} className="relative">
            <Bell className="h-6 w-6 text-white" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>
      </div>

      <div className="text-center py-4 font-headline mt-12 mb-8">
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
        
        <div className="w-full max-w-4xl mt-16 flex flex-col items-center">
            <div className="mb-6">
                <QuizTimer initialMinutes={15} />
            </div>
             <div className="grid md:grid-cols-2 gap-4 w-full">
                <Card className="md:col-span-2 overflow-hidden bg-card/50 border-border/20">
                    <div className="aspect-video relative">
                        <Image
                            src={promotedProducts[0].imageUrl}
                            alt={promotedProducts[0].alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            data-ai-hint={promotedProducts[0].aiHint}
                        />
                    </div>
                </Card>
                {promotedProducts.slice(1).map((product) => (
                    <Card key={product.id} className="overflow-hidden bg-card/50 border-border/20">
                         <div className="aspect-square relative">
                            <Image
                                src={product.imageUrl}
                                alt={product.alt}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover"
                                data-ai-hint={product.aiHint}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>

      </div>
       <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <nav className="flex items-center justify-center gap-4 rounded-full bg-card/80 backdrop-blur-md px-4 py-2 shadow-lg">
            <Link href="/" prefetch={true} className="relative flex flex-col items-center justify-center w-14 h-12 rounded-full cursor-pointer transition-colors duration-300 text-accent group">
              <HomeIcon className="relative z-10" />
              <div className="absolute bottom-1 h-1 w-4 bg-accent rounded-full" />
              <span className="sr-only">Home</span>
            </Link>
            <Link href="/rewards" prefetch={true} className="relative flex flex-col items-center justify-center w-14 h-12 rounded-full cursor-pointer transition-colors duration-300 text-muted-foreground hover:text-accent group">
              <Trophy className="relative z-10" />
              <span className="sr-only">Rewards</span>
            </Link>
             <Link href="/insights" prefetch={true} className="relative flex flex-col items-center justify-center w-14 h-12 rounded-full cursor-pointer transition-colors duration-300 text-muted-foreground hover:text-accent group">
              <PieChart className="relative z-10" />
              <span className="sr-only">Insights</span>
            </Link>
             <Link href="/profile" prefetch={true} className="relative flex flex-col items-center justify-center w-14 h-12 rounded-full cursor-pointer transition-colors duration-300 text-muted-foreground hover:text-accent group">
              <User className="relative z-10" />
              <span className="sr-only">Profile</span>
            </Link>
          </nav>
        </div>
    </div>
  );
}
