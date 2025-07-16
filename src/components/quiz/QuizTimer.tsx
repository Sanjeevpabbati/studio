'use client';

import React, { useState, useEffect } from 'react';

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
    <div className="text-center">
      <p className="text-lg text-muted-foreground">Time Remaining</p>
      <p className="text-4xl font-bold text-white">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
    </div>
  );
};

export default QuizTimer;
