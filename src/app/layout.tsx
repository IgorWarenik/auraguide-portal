import type { Metadata } from 'next';
import Script from 'next/script';
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
      <head>
        <Script id="yandex-metrika" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108409868', 'ym');

            ym(108409868, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `
        }} />
      </head>
      <body className={`${inter.className} min-h-screen bg-[var(--color-aura-bg)] text-white selection:bg-purple-500/30 overflow-x-hidden`}>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/108409868" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
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
