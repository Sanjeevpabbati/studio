import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import TouchAnimation from '@/components/animations/TouchAnimation';
import FloatingNavBar from '@/components/layout/FloatingNavBar';

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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&family=Poppins:wght@700&display=swap" rel="stylesheet" />
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
        <main className="pb-24">
          {children}
        </main>
        <FloatingNavBar />
        <Toaster />
      </body>
    </html>
  );
}
