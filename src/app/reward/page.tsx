'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tv, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

function SponsoredAd({ onAdComplete }: { onAdComplete: () => void }) {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsComplete(true);
            onAdComplete();
        }, 5000); // 5-second ad

        return () => clearTimeout(timer);
    }, [onAdComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center text-white"
        >
            <Tv className="w-24 h-24 mb-8 text-accent" />
            <h2 className="text-3xl font-bold mb-4">Sponsored Advertisement</h2>
            <p className="text-lg text-muted-foreground">Your reward will be available after this message.</p>
        </motion.div>
    );
}

function RewardCard() {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
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
        </motion.div>
    );
}

export default function RewardPage() {
    const [isAdWatched, setIsAdWatched] = useState(false);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <AnimatePresence>
                {!isAdWatched ? (
                    <SponsoredAd onAdComplete={() => setIsAdWatched(true)} />
                ) : (
                    <RewardCard />
                )}
            </AnimatePresence>
        </div>
    );
}
