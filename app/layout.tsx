import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'EasySeva — Government Services, Made Easier',
  description:
    'Find, apply for, and track government services in your language. Designed for first-time users with step-by-step guidance.',
  keywords: 'government services, certificate, scholarship, pension, Tamil Nadu, EasySeva',
  openGraph: {
    title: 'EasySeva',
    description: 'Government services, made easier.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 antialiased">
        <AuthProvider>
          <AppProvider>
            <Header />
            {children}
            <MobileNav />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
