import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <User className="w-12 h-12 mb-4 text-accent"/>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is a placeholder profile page.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Your profile information will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
