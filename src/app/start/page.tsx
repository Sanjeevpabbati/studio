'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { sampleQuiz } from '@/lib/quiz-data';
import type { Question } from '@/lib/types';
import { CheckCircle, XCircle } from 'lucide-react';

const totalQuestions = sampleQuiz.questions.length;
const timePerQuestion = 20;

function QuizResults({ score, onRestart }: { score: number, onRestart: () => void }) {
  return (
    <Card className="w-full max-w-lg text-center">
      <CardHeader>
        <CardTitle>Quiz Complete!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-4">
          You scored <strong className="text-accent">{score}</strong> out of <strong className="text-accent">{totalQuestions}</strong>
        </p>
        <Button onClick={onRestart} className="mt-4">
          Start Next Quiz
        </Button>
      </CardContent>
    </Card>
  );
}

export default function StartPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentQuestion: Question = sampleQuiz.questions[currentQuestionIndex];

  useEffect(() => {
    if (isAnswered || isQuizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnswered, currentQuestionIndex, isQuizFinished]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(optionIndex);

    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1500); // Wait 1.5 seconds before showing next question
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(timePerQuestion);
    } else {
      setIsQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(timePerQuestion);
    setIsQuizFinished(false);
  };

  const getOptionClasses = (optionIndex: number) => {
    if (!isAnswered) return '';
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const isSelected = optionIndex === selectedAnswer;

    if (isCorrect) return 'bg-green-500/80 hover:bg-green-500/90 border-green-500';
    if (isSelected) return 'bg-red-500/80 hover:bg-red-500/90 border-red-500';
    return 'opacity-50';
  };

  if (!isClient) {
    return null; // or a loading spinner
  }
  
  if (isQuizFinished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <QuizResults score={score} onRestart={restartQuiz} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center mb-4">
            <CardTitle>Test Cricket Quiz</CardTitle>
            <div className="text-lg font-bold text-accent">{timeLeft}s</div>
          </div>
          <Progress value={(timeLeft / timePerQuestion) * 100} className="h-2" />
          <p className="text-muted-foreground pt-4 text-center">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold mb-6 text-center h-20 flex items-center justify-center">
            {currentQuestion.question}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className={`h-auto min-h-16 whitespace-normal justify-start text-left relative transition-all duration-300 ${getOptionClasses(index)}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
              >
                {option}
                {isAnswered && index === currentQuestion.correctAnswer && <CheckCircle className="w-5 h-5 absolute right-4" />}
                {isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 absolute right-4" />}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
