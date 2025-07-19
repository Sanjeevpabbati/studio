import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RewardsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <Trophy className="w-12 h-12 mb-4 text-accent"/>
          <CardTitle>Rewards</CardTitle>
          <CardDescription>Your rewards and achievements will be displayed here.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">You have no rewards yet. Get a perfect score in a quiz to earn one!</p>
        </CardContent>
      </Card>
    </div>
  );
}
