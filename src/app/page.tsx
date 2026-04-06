"use client";

import { motion } from 'framer-motion';
import { Sparkles, Moon, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subMessage, setSubMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setSubStatus('success');
        setSubMessage('PDF Гайд успешно отправлен на вашу почту!');
        setEmail('');
      } else {
        setSubStatus('error');
        setSubMessage(data.error || 'Ошибка при подписке');
      }
    } catch {
      setSubStatus('error');
      setSubMessage('Ошибка сети. Проверьте подключение.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto mt-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-purple-300 mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4" />
          <span>Узнайте свое предназначение</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Твой личный навигатор <br /> в мире <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">самопознания</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Мы объединяем древние системы знаний и современные типологии в одном удобном цифровом пространстве. Построй натальную карту и бодиграф онлайн.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link href="/matrix" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold text-lg shadow-[0_0_40px_rgba(157,78,221,0.4)] flex items-center justify-center gap-2 hover:shadow-[0_0_60px_rgba(157,78,221,0.6)] transition-all"
            >
              Рассчитать судьбу <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>

          <Link href="/dashboard" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 font-semibold text-lg backdrop-blur-md transition-all"
            >
              Кабинет
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-32 w-full"
      >
        <FeatureCard 
          icon={<Star className="w-8 h-8 text-yellow-400" />}
          title="Астрология"
          description="Бесплатный расчет натальной карты, асцендента и синастрии с детальными расшифровками домов."
        />
        <FeatureCard 
          icon={<Moon className="w-8 h-8 text-indigo-400" />}
          title="Дизайн Человека"
          description="Постройте свой бодиграф, узнайте свой Тип, Стратегию и Авторитет для гармоничной жизни."
        />
        <FeatureCard 
          icon={<Sparkles className="w-8 h-8 text-pink-400" />}
          title="Карта Дня"
          description="Ежедневные психологические подсказки и вытягивание виртуальной карты Таро для настроя на день."
        />
      </motion.div>

      {/* Lead Magnet Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl mx-auto mt-32 mb-10 bg-gradient-to-br from-[#1a0f30] to-[#0f0724] border border-pink-500/30 rounded-3xl p-8 md:p-14 text-center shadow-[0_0_50px_rgba(236,72,153,0.15)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" />
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10 leading-tight">Получите Гайд:<br/>«5 кармических ошибок»</h2>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">Оставьте свой Email, чтобы получить закрытый чек-лист в формате PDF, который поможет разблокировать ваш финансовый канал.</p>
        
        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10 w-full md:px-8">
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш лучший email адрес" 
            className="flex-1 bg-black/60 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors shadow-inner"
          />
          <button 
            type="submit" 
            disabled={subStatus === 'loading' || subStatus === 'success'}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-[0_4px_20px_rgba(236,72,153,0.4)] disabled:opacity-70 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {subStatus === 'loading' ? 'Отправка...' : subStatus === 'success' ? 'Гайд Отправлен!' : 'Получить Гайд'}
          </button>
        </form>
        {subMessage && (
          <p className={`mt-6 text-sm font-bold relative z-10 ${subStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {subMessage}
          </p>
        )}
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-start p-8 rounded-3xl bg-[var(--color-aura-card)] border border-[var(--color-aura-card-border)] backdrop-blur-lg hover:bg-white/5 transition-all group">
      <div className="p-4 rounded-2xl bg-white/5 mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
