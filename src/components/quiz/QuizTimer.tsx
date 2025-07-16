'use client';

import React, { useState, useEffect } from 'react';
import { TimerIcon } from 'lucide-react';

interface QuizTimerProps {
  initialMinutes: number;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ initialMinutes }) => {
  const totalSeconds = initialMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalSeconds;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg className="absolute h-full w-full" width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="8"
          className="stroke-muted/30"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="8"
          className="stroke-accent"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1s linear',
          }}
        />
      </svg>
      <div className="relative flex flex-col items-center justify-center text-white">
         <TimerIcon className="h-5 w-5 mb-1 text-accent" />
        <span className="font-mono text-2xl font-bold tracking-widest">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default QuizTimer;
