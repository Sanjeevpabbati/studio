
'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { type QuizFormat } from '@/lib/types';
import { getSponsor, type Sponsor } from '@/lib/sponsors';


function RewardCard({ quizFormat }: { quizFormat: QuizFormat }) {
    const sponsor = getSponsor(quizFormat);

    return (
        <div
            className="w-full max-w-md"
        >
            <Card className="text-center bg-gradient-to-br from-accent/20 to-card border-accent shadow-lg shadow-accent/20">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <Trophy className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_8px_#facc15]" />
                    </div>
                    <CardTitle className="text-3xl font-bold">Congratulations!</CardTitle>
                    <CardDescription>You mastered the {quizFormat} Quiz!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-card/50 rounded-lg p-6 my-4 border border-border/50">
                        <p className="text-xl font-bold text-accent-foreground mb-4">Special Reward Unlocked!</p>
                        
                        {sponsor && (
                             <div className="flex flex-col items-center justify-center gap-2">
                                <span className="text-sm text-muted-foreground">This achievement is proudly sponsored by</span>
                                <div className="flex items-center justify-center gap-3 mt-2">
                                    <Image 
                                        src={sponsor.logoUrl} 
                                        alt={`${sponsor.name} logo`}
                                        width={40}
                                        height={40}
                                        className="object-contain rounded-full bg-white p-1"
                                        data-ai-hint={sponsor.aiHint}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                     <p className="text-sm text-muted-foreground mt-2">Thank you for playing!</p>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button asChild className="w-3/4 shimmer-button">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}


function RewardPageComponent() {
    const searchParams = useSearchParams();
    const quizFormat = (searchParams.get('format') as QuizFormat) || 'IPL'; // Default to IPL if not provided

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <RewardCard quizFormat={quizFormat} />
        </div>
    );
}

export default function RewardPage() {
  return (
    <Suspense fallback={<div>Loading Reward...</div>}>
      <RewardPageComponent />
    </Suspense>
  )
}
