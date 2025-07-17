'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tv, Trophy } from 'lucide-react';

function SponsoredAd({ onAdComplete }: { onAdComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAdComplete();
        }, 5000); // 5-second ad

        return () => clearTimeout(timer);
    }, [onAdComplete]);

    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center text-white"
        >
            <Tv className="w-24 h-24 mb-8 text-accent" />
            <h2 className="text-3xl font-bold mb-4">Sponsored Advertisement</h2>
            <p className="text-lg text-muted-foreground">Your reward will be available after this message.</p>
        </div>
    );
}

function RewardCard() {
    return (
        <div
            className="w-full max-w-md"
        >
            <Card className="text-center bg-gradient-to-br from-accent/20 to-card border-accent shadow-lg shadow-accent/20">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <Trophy className="w-16 h-16 text-yellow-400" />
                    </div>
                    <CardTitle className="text-2xl">Congratulations!</CardTitle>
                    <CardDescription>You've earned a special reward!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-card/50 rounded-lg p-6 my-4">
                        <p className="text-lg font-bold">Special Reward Card</p>
                        <p className="text-sm text-muted-foreground">Use this to unlock exclusive content.</p>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <p className="text-xs text-muted-foreground">Thank you for playing!</p>
                    <Button asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function RewardPage() {
    const [isAdWatched, setIsAdWatched] = useState(false);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            {!isAdWatched ? (
                <SponsoredAd onAdComplete={() => setIsAdWatched(true)} />
            ) : (
                <RewardCard />
            )}
        </div>
    );
}
