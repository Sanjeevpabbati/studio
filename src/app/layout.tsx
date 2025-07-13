import type {Metadata} from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import FloatingNavBar from '@/components/layout/FloatingNavBar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageTransition from '@/components/animations/PageTransition';
import TouchAnimation from '@/components/animations/TouchAnimation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Indcric',
  description: 'A 3D cube customizer PWA.',
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="application-name" content="Indcric" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Indcric" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1E1E1E" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased">
        <TouchAnimation />
        <div className="fixed top-10 right-4 z-50">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/notifications" className="relative">
              <Bell className="h-6 w-6 text-white" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
        </div>
        <main className="pb-24">
          <PageTransition>{children}</PageTransition>
        </main>
        <FloatingNavBar />
        <Toaster />
      </body>
    </html>
  );
}
