import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <PieChart className="w-12 h-12 mb-4 text-accent"/>
          <CardTitle>Insights</CardTitle>
          <CardDescription>Your insights and analytics will be displayed here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">You have no insights yet. Keep playing to see your stats!</p>
        </CardContent>
      </Card>
    </div>
  );
}
