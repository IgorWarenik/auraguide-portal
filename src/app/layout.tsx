import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  title: 'AuraGuide | Познание себя через Астрологию и Дизайн Человека',
  description: 'Единый портал-агрегатор для глубокого самопознания. Постройте свою натальную карту и бодиграф онлайн.',
  verification: {
    yandex: '4043f64855d7af3e',
  },
};

import Navbar from '@/components/Navbar';
import LiveSocialProof from '@/components/LiveSocialProof';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.className} min-h-screen bg-[var(--color-aura-bg)] text-white selection:bg-purple-500/30 overflow-x-hidden`}>
        {/* Ambient background glow */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />
        
        <Navbar />
        <main className="relative z-10 pt-16">
          {children}
        </main>
        
        <LiveSocialProof />
      </body>
    </html>
  );
}
