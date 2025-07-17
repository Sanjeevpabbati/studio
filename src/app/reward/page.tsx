
'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { type QuizFormat } from '@/lib/types';
import { getSponsor } from '@/lib/sponsors';
import { Separator } from '@/components/ui/separator';


function RewardCard({ quizFormat }: { quizFormat: QuizFormat }) {
    const sponsor = getSponsor(quizFormat);

    return (
        <div className="w-full max-w-md">
            <Card className="overflow-hidden text-center shadow-lg shadow-accent/20 border-accent/30 bg-gradient-to-br from-card to-accent/10">
                <div className="bg-accent/20 p-8">
                    <div className="flex justify-center">
                        <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_15px_#facc15]" />
                    </div>
                </div>
                <CardHeader className="pt-6">
                    <CardTitle className="text-3xl font-bold">Congratulations!</CardTitle>
                    <CardDescription className="text-md">You've mastered the {quizFormat} Quiz!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-6 pb-6">
                    <div className="space-y-2">
                         <p className="text-xl font-bold text-accent-foreground">Special Reward Unlocked!</p>
                         <p className="text-sm text-muted-foreground">Thank you for playing!</p>
                    </div>
                    
                    <Separator className="bg-border/50" />

                    {sponsor && (
                         <div className="flex flex-col items-center justify-center gap-3">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Proudly Sponsored By</span>
                            <Image 
                                src={sponsor.logoUrl} 
                                alt={`${sponsor.name} logo`}
                                width={48}
                                height={48}
                                className="object-contain rounded-full bg-white p-1.5 shadow-md"
                                data-ai-hint={sponsor.aiHint}
                            />
                        </div>
                    )}
                </CardContent>
                <CardFooter className="bg-black/20 p-4 flex flex-col gap-4">
                    <Button asChild className="w-full shimmer-button" variant="default">
                        <Link href="/rewards">Claim Reward</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
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
