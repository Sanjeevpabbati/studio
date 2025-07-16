'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getQuiz } from '@/lib/quiz-data';
import type { Question, Quiz, QuizFormat } from '@/lib/types';
import { CheckCircle, XCircle } from 'lucide-react';

const timePerQuestion = 20;

function QuizResults({ score, totalQuestions, onRestart }: { score: number, totalQuestions: number, onRestart: () => void }) {
  return (
    <Card className="w-full max-w-lg text-center">
      <CardHeader>
        <CardTitle>Quiz Complete!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-4">
          You scored <strong className="text-accent">{score}</strong> out of <strong className="text-accent">{totalQuestions}</strong>
        </p>
        <div className="flex justify-center gap-4 mt-4">
            <Button onClick={onRestart}>
              Start Next Quiz
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Home Page</Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function QuizComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const quizFormat = searchParams.get('format') as QuizFormat | null;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    if (!quizFormat) {
        // Redirect to home if no format is specified
        router.push('/');
        return;
    }
    const loadedQuiz = getQuiz(quizFormat);
    if (loadedQuiz) {
      setQuiz(loadedQuiz);
      // Reset state when quiz format changes
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(timePerQuestion);
      setIsQuizFinished(false);
    }
  }, [quizFormat, router]);

  const totalQuestions = quiz?.questions.length ?? 0;
  const currentQuestion: Question | undefined = quiz?.questions[currentQuestionIndex];

   const handleQuizCompletion = () => {
    setIsQuizFinished(true);
    if (quizFormat) {
      const completedQuizzesStr = localStorage.getItem('completedQuizzes');
      const completedQuizzes: QuizFormat[] = completedQuizzesStr ? JSON.parse(completedQuizzesStr) : [];
      if (!completedQuizzes.includes(quizFormat)) {
        const updatedQuizzes = [...completedQuizzes, quizFormat];
        localStorage.setItem('completedQuizzes', JSON.stringify(updatedQuizzes));
      }
    }
  };

  useEffect(() => {
    if (isAnswered || isQuizFinished || !quiz) return;

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
  }, [isAnswered, currentQuestionIndex, isQuizFinished, quiz]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered || !currentQuestion) return;

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
      handleQuizCompletion();
    }
  };

  const restartQuiz = () => {
    // This will redirect to home, and the logic there will pick the next quiz
    router.push('/');
  };

  const getOptionClasses = (optionIndex: number) => {
    if (!isAnswered || !currentQuestion) return '';
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const isSelected = optionIndex === selectedAnswer;

    if (isCorrect) return 'bg-green-500/80 hover:bg-green-500/90 border-green-500';
    if (isSelected) return 'bg-red-500/80 hover:bg-red-500/90 border-red-500';
    return 'opacity-50';
  };
  
  if (!quiz || !currentQuestion) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <p>Loading quiz...</p>
        </div>
    );
  }
  
  if (isQuizFinished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <QuizResults score={score} totalQuestions={totalQuestions} onRestart={restartQuiz} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center mb-4">
            <CardTitle>{quiz.format} Quiz</CardTitle>
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


export default function StartPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <QuizComponent />
    </React.Suspense>
  );
}
