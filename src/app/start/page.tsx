import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

export default function StartPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <PlayCircle className="w-12 h-12 mb-4 text-accent"/>
          <CardTitle>Start</CardTitle>
          <CardDescription>The game starts here!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">This is a placeholder page for the start screen.</p>
        </CardContent>
      </Card>
    </div>
  );
}
