import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <BellRing className="w-12 h-12 mb-4 text-accent"/>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Your recent notifications will be displayed here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">You have no new notifications.</p>
        </CardContent>
      </Card>
    </div>
  );
}
