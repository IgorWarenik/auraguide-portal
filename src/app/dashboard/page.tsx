"use client";

import { motion } from 'framer-motion';
import { User, Sparkles, BookOpen, Star, Lock, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [userData, setUserData] = useState({ name: '', date: '' });
  const [userEmail, setUserEmail] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('auraGuideUserData');
    if (saved) setUserData(JSON.parse(saved));
    
    const em = localStorage.getItem('auraGuideUserEmail');
    if (em) setUserEmail(em);

    const premiumObj = localStorage.getItem('auraGuidePremium');
    if (premiumObj === 'true') setIsPremium(true);
  }, []);

  if (!userEmail) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center text-center px-4">
        <Lock className="w-16 h-16 text-purple-500 border border-purple-500/30 p-4 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.3)] mb-6" />
        <h1 className="text-3xl font-bold mb-4">Вход в Личное Пространство</h1>
        <p className="text-gray-400 max-w-md mb-8">Пройдите любой из бесплатных расчетов на сайте и введите свой email, чтобы ваш личный кабинет сформировался автоматически.</p>
        <Link href="/matrix" className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold transition-all text-white">
          Рассчитать Судьбу
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row gap-8 items-start mb-12">
        
        {/* Аватар и профиль */}
        <div className="bg-[#1b0a1d]/80 border border-purple-500/20 p-8 rounded-3xl backdrop-blur-xl w-full md:w-1/3 flex flex-col items-center text-center shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden">
          {isPremium && (
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500" />
          )}
          
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-[#0b071a] ${isPremium ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{userData.name || 'Аватар'}</h2>
          
          {isPremium ? (
            <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full text-xs font-bold mb-6 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-3 h-3" /> PREMIUM STATUS
            </div>
          ) : (
            <p className="text-purple-400 text-sm font-medium mb-6">{userEmail}</p>
          )}

          <div className="w-full bg-black/30 rounded-xl p-4 mb-4 text-left border border-white/5">
            <div className="text-xs text-gray-500 mb-1">Дата воплощения</div>
            <div className="text-lg text-gray-200">{userData.date || 'Не указана'}</div>
          </div>
          
          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/'; }} 
            className="text-sm text-gray-500 hover:text-red-400 transition-colors mt-4"
          >
            Сбросить профиль (Выход)
          </button>
        </div>

        {/* Секция контента */}
        <div className="w-full md:w-2/3 space-y-6">
          
          {/* Daily Transit Widget */}
          <div className="bg-[#1a0f30] border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.1)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[80px]" />
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Star className="text-pink-400" /> Космическая Погода
            </h3>
            
            {isPremium ? (
              <div className="space-y-4">
                <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/20 flex gap-4 items-start">
                   <div className="text-4xl">🌕</div>
                   <div>
                     <h4 className="font-bold text-lg text-purple-200">Полнолуние во Льве</h4>
                     <p className="text-gray-300 text-sm mt-1">Сегодняшний день несет мощную энергию самопроявления. Оптимальное время для публичных выступлений, но избегайте гордыни в делах с близкими. Ваша аура сейчас излучает огненный магнетизм.</p>
                   </div>
                </div>
                
                <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/20 flex gap-4 items-start">
                   <div className="text-4xl">🪐</div>
                   <div>
                     <h4 className="font-bold text-lg text-blue-200">Транзит: Меркурий в тригоне с Сатурном</h4>
                     <p className="text-gray-300 text-sm mt-1">Отличный день для подписания контрактов и долгосрочного планирования. Интеллект работает предельно четко.</p>
                   </div>
                </div>
                
                <button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 py-3 rounded-xl font-bold shadow-lg transition-all text-white flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5"/> Сгенерировать персональный Аудио-разбор дня
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="space-y-4 filter blur-md select-none opacity-50">
                  <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/20 flex gap-4 items-start">
                     <div className="text-4xl">🌕</div>
                     <div>
                       <h4 className="font-bold text-lg text-purple-200">Скрытый транзит</h4>
                       <p className="text-gray-300 text-sm mt-1">Этот текст скрыт. Влияние планет на вас сегодня доступно только подписчикам Premium...</p>
                     </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                   <Lock className="w-10 h-10 text-pink-400 mb-3" />
                   <h4 className="font-bold text-lg text-white mb-2">Ежедневный Прогноз Заблокирован</h4>
                   <p className="text-sm text-gray-300 mb-4 px-6">Откройте Premium, чтобы получать ежедневные личные подсказки от Вселенной.</p>
                   <Link href="/checkout" className="px-6 py-2 bg-pink-600 hover:bg-pink-500 rounded-full font-bold text-white shadow-lg transition-all text-sm">
                     Открыть Доступ
                   </Link>
                </div>
              </div>
            )}
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 pt-6">Ваши активные хроники</h3>
          
          {/* Card 1 */}
          <Link href="/matrix" className="block bg-[#1a0b12] border border-amber-500/20 p-6 rounded-2xl hover:bg-amber-500/10 transition-colors group">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-amber-500/20 p-3 rounded-lg"><Star className="text-amber-500 w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-amber-400 text-lg">Матрица Судьбы</h4>
                  <p className="text-gray-400 text-sm">Ваш расчет по 22 Арканам сохранён.</p>
                </div>
              </div>
              <div className="text-amber-500 font-bold group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/hd" className="block bg-[#0b1021] border border-blue-500/20 p-6 rounded-2xl hover:bg-blue-500/10 transition-colors group">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg"><Sparkles className="text-blue-500 w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-blue-400 text-lg">Бодиграф (Human Design)</h4>
                  <p className="text-gray-400 text-sm">Ваша энергетическая архитектура.</p>
                </div>
              </div>
              <div className="text-blue-500 font-bold group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </Link>
          
          {/* Card 3 (Tarot) */}
          <Link href="/tarot" className="block bg-[#1b0a2c] border border-purple-500/20 p-6 rounded-2xl hover:bg-purple-500/10 transition-colors group">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg"><CheckCircle2 className="text-purple-500 w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-purple-400 text-lg">Дневной Расклад Таро</h4>
                  <p className="text-gray-400 text-sm">Ваша персональная карта дня доступна.</p>
                </div>
              </div>
              <div className="text-purple-500 font-bold group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </Link>

        </div>
      </motion.div>
    </div>
  );
}
