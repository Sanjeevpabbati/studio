'use client';

import React, { useState, useEffect } from 'react';
import { TimerIcon } from 'lucide-react';

interface QuizTimerProps {
  initialMinutes: number;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ initialMinutes }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-md px-4 py-2 text-white font-mono shadow-lg">
      <TimerIcon className="h-5 w-5 text-accent" />
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

export default QuizTimer;
