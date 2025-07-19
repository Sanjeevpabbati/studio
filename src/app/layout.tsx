
'use client';

import type {Metadata} from 'next';
import React, { useState, useEffect } from 'react';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import FloatingNavBar from '@/components/layout/FloatingNavBar';
import SplashScreen from '@/components/layout/SplashScreen';

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

// This is a client component, but we can still define metadata
// However, it's better to move static metadata to a server component if possible.
// For this example, we'll keep it here but be mindful of best practices.
// export const metadata: Metadata = {
//   title: 'Indcric',
//   description: 'A 3D cube customizer PWA.',
//   manifest: "/manifest.json",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable}`}>
      <head>
        <title>Indcric</title>
        <meta name="description" content="A 3D cube customizer PWA." />
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
        {loading ? (
          <SplashScreen />
        ) : (
          <>
            <main className="pb-24">
              {children}
            </main>
            <FloatingNavBar />
            <Toaster />
          </>
        )}
      </body>
    </html>
  );
}
