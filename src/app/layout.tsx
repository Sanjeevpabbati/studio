import type {Metadata} from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import TouchAnimation from '@/components/animations/TouchAnimation';
import PageTransition from '@/components/animations/PageTransition';
import FloatingNavBar from '@/components/layout/FloatingNavBar';

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
        <main className="pb-24">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <FloatingNavBar />
        <Toaster />
      </body>
    </html>
  );
}
