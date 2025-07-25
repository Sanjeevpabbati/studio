

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getQuiz } from '@/lib/quiz-data';
import type { Question, Quiz, QuizFormat } from '@/lib/types';
import { CheckCircle, XCircle, Lightbulb, Tv, Circle, Check, Home, X, Focus, CheckSquare, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';

const timePerQuestion = 20;

const QuizFormatSchema = z.enum(['T20', 'ODI', 'IPL', 'WPL', 'Test', 'Core']);

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
        <div className="relative bg-background min-h-screen pt-20 pb-24">
            <div className="fixed top-0 left-0 right-0 z-10 p-4 border-b bg-background/80 backdrop-blur-sm">
                <p className="text-lg font-bold text-center">{quiz.format} Quiz - Answers</p>
                <p className="text-sm text-muted-foreground text-center">Review the correct answers below.</p>
            </div>
            <div className="p-4 space-y-6">
                {quiz.questions.map((question, qIndex) => (
                    <React.Fragment key={qIndex}>
                        <div>
                             {question.imageUrl && (
                                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                                    <Image
                                        src={question.imageUrl}
                                        alt={`Quiz image for question ${qIndex + 1}`}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={question.imageAiHint}
                                    />
                                </div>
                            )}
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
            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t flex justify-center">
                <Button className="w-3/4 shimmer-button" onClick={onBack}>
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>
            </footer>
        </div>
    );
}

function QuizResults({ score, totalQuestions, quizFormat, onRestart, onViewAnswers, terminated }: { score: number, totalQuestions: number, quizFormat: QuizFormat, onRestart: () => void, onViewAnswers: () => void, terminated?: boolean }) {
  const router = useRouter();
  const isPerfectScore = score === totalQuestions && !terminated;
    
  useEffect(() => {
    if (isPerfectScore) {
      router.push(`/reward?format=${quizFormat}`);
    }
  }, [isPerfectScore, quizFormat, router]);

  if (isPerfectScore) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle>Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">
              You scored <strong className="text-accent">{score}</strong> out of <strong className="text-accent">{totalQuestions}</strong>
            </p>
            <p className="text-green-400 font-bold mb-4">Perfect Score! Redirecting to your reward...</p>
          </CardContent>
        </Card>
      </div>
    );
  }
    
  return (
    <div className="w-full max-w-md p-1 rounded-lg bg-gradient-to-br from-accent via-primary to-accent bg-[length:200%_200%] animate-gradient-flow">
        <Card className="overflow-hidden text-center bg-card/95 backdrop-blur-sm">
             <div className="bg-black/20 p-8">
                <div className="flex justify-center">
                    {terminated ? (
                        <Focus className="w-24 h-24 text-accent drop-shadow-[0_0_15px_hsl(var(--accent))]" />
                    ) : (
                        <CheckSquare className="w-24 h-24 text-accent drop-shadow-[0_0_15px_hsl(var(--accent))]" />
                    )}
                </div>
            </div>
            <CardHeader className="pt-6">
                {terminated ? (
                    <>
                        <CardTitle className="text-3xl font-bold">Stay Focused!</CardTitle>
                        <CardDescription className="text-md">Please remain in the quiz window to ensure fair play.</CardDescription>
                    </>
                ) : (
                    <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
                )}
            </CardHeader>
            <CardContent className="space-y-6 px-6 pb-6">
                <p className="text-2xl font-bold">
                    You scored <strong className="text-accent">{score}</strong> out of <strong className="text-accent">{totalQuestions}</strong>
                </p>

                <Separator className="bg-border/50" />
                
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm font-semibold text-muted-foreground">Advertisement</p>
                    <p className="text-xs text-muted-foreground/80">Your ad banner goes here</p>
                </div>
            </CardContent>
            <CardFooter className="bg-black/20 p-4 flex flex-col gap-4">
                {!terminated && (
                    <Button onClick={onViewAnswers} className="w-full">
                        View Answers
                    </Button>
                )}
                <Button variant="outline" onClick={onRestart} className="w-full">
                    Home Page
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}

function InterstitialAd({ onAdComplete }: { onAdComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAdComplete();
        }, 1500); // 1.5-second ad
        return () => clearTimeout(timer);
    }, [onAdComplete]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md mb-16">
                <div className="p-1 rounded-lg bg-gradient-to-br from-accent/50 via-primary to-accent/50">
                    <Card className="bg-card/90 backdrop-blur-sm">
                        <CardContent className="p-8 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <Loader2 className="h-12 w-12 animate-spin text-accent" />
                                <p className="text-lg font-semibold text-card-foreground">Loading sponsored content...</p>
                                <p className="text-sm text-muted-foreground">Please wait a moment.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function HintPopup({ hint, onClose }: { hint: string; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md p-1 rounded-lg bg-gradient-to-br from-accent via-primary to-accent bg-[length:200%_200%] animate-gradient-flow">
                <div className="bg-card rounded-md">
                    <CardHeader className="items-center text-center">
                        <div className="flex justify-center mb-2">
                            <Lightbulb className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_8px_#facc15]" />
                        </div>
                        <CardTitle>Hint</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-center">
                        <p className="text-lg text-card-foreground">{hint}</p>
                        <div className="py-4 px-2 rounded-lg bg-muted/50 border border-border">
                            <p className="text-sm font-semibold text-muted-foreground">Advertisement</p>
                            <p className="text-xs text-muted-foreground/80">Your ad banner goes here</p>
                        </div>
                    </CardContent>
                </div>
            </div>
             <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white"
            >
                <X className="h-5 w-5" />
                <span className="sr-only">Close hint</span>
            </Button>
        </div>
    );
}

function DifficultyIndicator({ level }: { level: 'easy' | 'medium' | 'hard' }) {
    const bars = [
        { level: 'easy', color: 'bg-green-500', active: level === 'easy' || level === 'medium' || level === 'hard' },
        { level: 'medium', color: 'bg-yellow-500', active: level === 'medium' || level === 'hard' },
        { level: 'hard', color: 'bg-red-500', active: level === 'hard' },
    ];
    const levelText = level.charAt(0).toUpperCase() + level.slice(1);
    const levelColor = level === 'easy' ? 'text-green-400' : level === 'medium' ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="flex items-center gap-2">
             <div className="flex items-end gap-1 h-4">
                {bars.map((bar, index) => (
                    <div
                        key={index}
                        className={cn(
                            'w-1.5 rounded-full transition-all duration-300',
                            bar.active ? bar.color : 'bg-muted/30',
                            index === 0 && 'h-2',
                            index === 1 && 'h-3',
                            index === 2 && 'h-4'
                        )}
                    />
                ))}
            </div>
            <span className={cn("text-xs font-semibold tracking-wider", levelColor)}>{levelText}</span>
        </div>
    );
}

function QuizComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
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
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [quizTerminated, setQuizTerminated] = useState(false);
  const [quizFormat, setQuizFormat] = useState<QuizFormat | null>(null);

  useEffect(() => {
    const format = searchParams.get('format');
    const validation = QuizFormatSchema.safeParse(format);
    
    if (!validation.success) {
        toast({
            variant: 'destructive',
            title: 'Invalid Quiz Format',
            description: 'The selected quiz format is not valid. Returning home.',
        });
        router.push('/');
        return;
    }

    const validFormat = validation.data;
    setQuizFormat(validFormat);

    const loadQuiz = async () => {
      const loadedQuiz = await getQuiz(validFormat);
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
        setIsTimerPaused(false);
        setQuizTerminated(false);
      } else {
         toast({
            variant: 'destructive',
            title: 'Quiz not found',
            description: `Could not load the ${validFormat} quiz.`,
        });
        router.push('/');
      }
    };

    loadQuiz();
  }, [searchParams, router, toast]);

  const handleQuizCompletion = (terminated = false) => {
    setIsQuizFinished(true);
    setQuizTerminated(terminated);
    if (terminated) {
      toast({
        variant: 'destructive',
        title: 'Let\'s keep it fair!',
        description: 'Please stay in the quiz to continue.',
      });
    }

    if (quizFormat && !terminated) {
      const completedQuizzesStr = localStorage.getItem('completedQuizzes');
      const completedQuizzes: QuizFormat[] = completedQuizzesStr ? JSON.parse(completedQuizzesStr) : [];
      if (!completedQuizzes.includes(quizFormat)) {
        const updatedQuizzes = [...completedQuizzes, quizFormat];
        localStorage.setItem('completedQuizzes', JSON.stringify(updatedQuizzes));
      }
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isQuizFinished && !isLoadingAd && !isTimerPaused) {
        handleQuizCompletion(true);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isQuizFinished, isLoadingAd, isTimerPaused]);

  const totalQuestions = quiz?.questions.length ?? 0;
  const currentQuestion: Question | undefined = quiz?.questions[currentQuestionIndex];
  const difficulty: 'easy' | 'medium' | 'hard' = currentQuestionIndex < 3 ? 'easy' : currentQuestionIndex < 4 ? 'medium' : 'hard';


  useEffect(() => {
    if (isLoadingAd || isAnswered || isQuizFinished || !quiz || isTimerPaused) return;

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
  }, [isLoadingAd, isAnswered, currentQuestionIndex, isQuizFinished, quiz, isTimerPaused]);

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

  const handleShowHint = () => {
      setShowHint(true);
      setIsTimerPaused(true);
  };

  const handleCloseHint = () => {
      setShowHint(false);
      setIsTimerPaused(false);
  };
  
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    toast({
        variant: 'destructive',
        title: 'Copying is disabled',
        description: 'Please answer the questions without assistance.',
    });
  };

  if (isLoadingAd) {
      return <InterstitialAd onAdComplete={() => setIsLoadingAd(false)} />;
  }

  if (!quiz || !currentQuestion || !quizFormat) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <p className="mt-4 text-muted-foreground">Loading quiz...</p>
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
        <QuizResults score={score} totalQuestions={totalQuestions} quizFormat={quiz.format} onRestart={restartQuiz} onViewAnswers={handleViewAnswers} terminated={quizTerminated} />
      </div>
    );
  }
  
  return (
    <>
      <div className="flex min-h-screen flex-col bg-background pb-20 pt-24" onCopy={handleCopy}>
        <header className="fixed top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-2xl items-center justify-between p-4">
              <div className="flex items-center gap-3">
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-bold">{quiz.format} Quiz</p>
                    <p className="text-sm text-muted-foreground">
                        {currentQuestionIndex + 1}/{totalQuestions}
                    </p>
                  </div>
                  <DifficultyIndicator level={difficulty} />
              </div>
              <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-accent">{timeLeft}s</div>
              </div>
          </div>
          <Progress value={(timeLeft / timePerQuestion) * 100} className="h-1 w-full" />
        </header>

        <main className="flex-grow p-4">
          <div className="mx-auto w-full max-w-2xl text-center">
              {currentQuestion.imageUrl && (
                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={currentQuestion.imageUrl}
                    alt={`Quiz image for question ${currentQuestionIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    data-ai-hint={currentQuestion.imageAiHint}
                    priority={true}
                  />
                </div>
              )}
              <p className="flex min-h-[6rem] items-center justify-center text-2xl font-semibold mb-8 select-none">
                  {currentQuestion.question}
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {currentQuestion.options.map((option, index) => (
                  <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      className={cn(
                          "h-auto min-h-16 whitespace-normal justify-start text-left relative transition-all duration-300 py-4 text-base select-none",
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
          </div>
        </main>

        {showHint && currentQuestion.hint && (
            <HintPopup hint={currentQuestion.hint} onClose={handleCloseHint} />
        )}

        <footer className="fixed bottom-0 z-10 w-full border-t bg-background/80 p-4 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-2xl flex justify-center">
              <Button variant="outline" size="sm" onClick={handleShowHint} disabled={showHint}>
                  <Lightbulb className="mr-2 h-4 w-4 text-yellow-400 animate-pulse drop-shadow-[0_0_3px_#facc15]" />
                  Show Hint
              </Button>
          </div>
        </footer>
      </div>
    </>
  );
}

function StartPageComponent() {
  return (
    <Suspense fallback={<div className="flex min-h-screen flex-col items-center justify-center bg-background p-4"><Loader2 className="w-8 h-8 animate-spin text-accent" /><p className="mt-4 text-muted-foreground">Loading...</p></div>}>
      <QuizComponent />
    </Suspense>
  )
}


export default function StartPage() {
  return <StartPageComponent />;
}
