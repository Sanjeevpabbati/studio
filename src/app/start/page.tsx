
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getQuiz } from '@/lib/quiz-data';
import type { Question, Quiz, QuizFormat } from '@/lib/types';
import { CheckCircle, XCircle, Lightbulb, Tv, Circle, Check, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const timePerQuestion = 20;

function VideoAd({ onAdComplete }: { onAdComplete: () => void }) {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (countdown <= 0) {
            onAdComplete();
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, onAdComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <CardTitle>Advertisement</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-64 bg-muted/50 flex flex-col items-center justify-center rounded-lg mb-4">
                        <Tv className="w-16 h-16 text-muted-foreground" />
                        <p className="text-lg mt-4">Your video ad is playing...</p>
                    </div>
                    <p className="text-sm text-muted-foreground">You can skip in {countdown} seconds</p>
                </CardContent>
            </Card>
        </div>
    );
}


function AnswerReview({ quiz, onBack }: { quiz: Quiz, onBack: () => void }) {
    return (
        <div className="relative bg-background min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-10 p-4 border-b bg-background/80 backdrop-blur-sm">
                <p className="text-lg font-bold text-center">{quiz.format} Quiz - Answers</p>
                <p className="text-sm text-muted-foreground text-center">Review the correct answers below.</p>
            </div>
            <main className="pt-24 pb-24">
                <div className="p-4 space-y-6">
                    {quiz.questions.map((question, qIndex) => (
                        <React.Fragment key={qIndex}>
                            <div>
                                <p className="font-semibold mb-2 text-lg">{qIndex + 1}. {question.question}</p>
                                <div className="space-y-2">
                                    {question.options.map((option, oIndex) => {
                                        const isCorrect = oIndex === question.correctAnswer;
                                        return (
                                            <div
                                                key={oIndex}
                                                className={cn(
                                                    "flex items-center gap-3 p-3 rounded-md border",
                                                    isCorrect
                                                        ? "bg-green-500/20 border-green-500/40 text-white"
                                                        : "bg-card"
                                                )}
                                            >
                                                {isCorrect ? <CheckCircle className="h-5 w-5 text-green-400" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                                                <span>{option}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {qIndex === 4 && (
                               <div className="my-6 p-4 rounded-lg bg-muted/50 border border-border text-center">
                                    <p className="text-sm font-semibold text-muted-foreground">Advertisement</p>
                                    <p className="text-xs text-muted-foreground/80">Your ad banner goes here</p>
                               </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </main>
            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t flex justify-center">
                <Button className="w-3/4 shimmer-button" onClick={onBack}>
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>
            </footer>
        </div>
    );
}

function QuizResults({ score, totalQuestions, onRestart, onViewAnswers }: { score: number, totalQuestions: number, onRestart: () => void, onViewAnswers: () => void }) {
  const isPerfectScore = score === totalQuestions;
    
  return (
    <Card className="w-full max-w-lg text-center">
      <CardHeader>
        <CardTitle>Quiz Complete!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-4">
          You scored <strong className="text-accent">{score}</strong> out of <strong className="text-accent">{totalQuestions}</strong>
        </p>
        {isPerfectScore && (
          <p className="text-green-400 font-bold mb-4">Perfect Score! You've unlocked a reward!</p>
        )}
        <div className="flex justify-center gap-4 mt-4">
            {isPerfectScore ? (
              <Button asChild>
                <Link href="/reward">Claim Reward</Link>
              </Button>
            ) : (
               <Button onClick={onViewAnswers}>
                View Answers
              </Button>
            )}
            <Button variant="outline" onClick={onRestart}>
              Home Page
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function InterstitialAd({ onAdComplete }: { onAdComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAdComplete();
        }, 1000); // 1-second ad
        return () => clearTimeout(timer);
    }, [onAdComplete]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md text-center">
                <CardContent className="p-6">
                    <p className="text-lg">Loading Ad...</p>
                </CardContent>
            </Card>
        </div>
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
  const [isLoadingAd, setIsLoadingAd] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isShowingAnswers, setIsShowingAnswers] = useState(false);
  const [isShowingVideoAd, setIsShowingVideoAd] = useState(false);

  useEffect(() => {
    if (!quizFormat) {
        router.push('/');
        return;
    }
    const loadedQuiz = getQuiz(quizFormat);
    if (loadedQuiz) {
      setQuiz(loadedQuiz);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(timePerQuestion);
      setIsQuizFinished(false);
      setIsLoadingAd(true); // Show ad for each new quiz
      setIsShowingAnswers(false);
      setIsShowingVideoAd(false);
      setShowHint(false);
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
    if (isLoadingAd || isAnswered || isQuizFinished || !quiz) return;

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
  }, [isLoadingAd, isAnswered, currentQuestionIndex, isQuizFinished, quiz]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered || !currentQuestion) return;
    
    setIsAnswered(true);
    setSelectedAnswer(optionIndex);

    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 300);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(timePerQuestion);
      setShowHint(false);
    } else {
      handleQuizCompletion();
    }
  };

  const restartQuiz = () => {
    router.push('/');
  };

  const handleViewAnswers = () => {
    setIsShowingVideoAd(true);
  };

  const handleVideoAdComplete = () => {
    setIsShowingVideoAd(false);
    setIsShowingAnswers(true);
  };
  
  if (isLoadingAd) {
      return <InterstitialAd onAdComplete={() => setIsLoadingAd(false)} />;
  }

  if (!quiz || !currentQuestion) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <p>Loading quiz...</p>
        </div>
    );
  }

  if (isShowingVideoAd) {
      return <VideoAd onAdComplete={handleVideoAdComplete} />;
  }
  
  if (isShowingAnswers) {
      return <AnswerReview quiz={quiz} onBack={restartQuiz} />;
  }

  if (isQuizFinished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <QuizResults score={score} totalQuestions={totalQuestions} onRestart={restartQuiz} onViewAnswers={handleViewAnswers} />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 pt-24">
      <header className="fixed top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between p-4">
            <div className="flex items-baseline gap-2">
                <p className="text-lg font-bold">{quiz.format} Quiz</p>
                <p className="text-sm text-muted-foreground">
                    {currentQuestionIndex + 1}/{totalQuestions}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-accent">{timeLeft}s</div>
            </div>
        </div>
        <Progress value={(timeLeft / timePerQuestion) * 100} className="h-1 w-full" />
      </header>

      <main className="flex-grow p-4">
        <div className="mx-auto w-full max-w-2xl text-center">
            <p className="flex min-h-[6rem] items-center justify-center text-2xl font-semibold mb-8">
                {currentQuestion.question}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {currentQuestion.options.map((option, index) => (
                <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    className={cn(
                        "h-auto min-h-16 whitespace-normal justify-start text-left relative transition-all duration-300 py-4 text-base",
                        "hover:bg-accent/10 hover:border-accent",
                        selectedAnswer === index && "border-accent bg-accent/10"
                    )}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                >
                    <span className="mr-4 font-bold">{String.fromCharCode(65 + index)}</span>
                    <span className="flex-1">{option}</span>
                </Button>
                ))}
            </div>
            {showHint && (
              <div className="mt-8 text-center p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">{currentQuestion.hint}</p>
              </div>
            )}
        </div>
      </main>

      <footer className="fixed bottom-0 z-10 w-full border-t bg-background/80 p-4 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-2xl flex justify-center">
            <Button variant="outline" size="sm" onClick={() => setShowHint(true)} disabled={showHint}>
                <Lightbulb className="mr-2 h-4 w-4 text-yellow-400 animate-pulse drop-shadow-[0_0_3px_#facc15]" />
                Show Hint
            </Button>
        </div>
      </footer>
    </div>
  );
}

export default function StartPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <QuizComponent />
    </React.Suspense>
  );
}
