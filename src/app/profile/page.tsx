'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is a placeholder profile page.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your profile information will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}