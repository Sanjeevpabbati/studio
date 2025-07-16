'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizTimerProps {
  initialMinutes: number;
}

const TimeDigit = ({ digit }: { digit: string }) => (
  <div className="bg-background/50 rounded-lg p-3">
    <span className="text-5xl font-bold text-white font-mono tracking-wider">{digit}</span>
  </div>
);

const QuizTimer: React.FC<QuizTimerProps> = ({ initialMinutes }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <Card className="bg-card/50 border-border/20">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-muted-foreground"/>
            <p className="text-md text-muted-foreground">Time Remaining</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <TimeDigit digit={minutes[0]} />
            <TimeDigit digit={minutes[1]} />
            <div className="text-5xl font-bold text-white font-mono animate-pulse">:</div>
            <TimeDigit digit={seconds[0]} />
            <TimeDigit digit={seconds[1]} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizTimer;