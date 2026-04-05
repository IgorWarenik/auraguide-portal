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
          <h3 className="text-2xl font-bold text-white mb-6">Ваши активные хроники</h3>
          
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

          {/* Premium Card Dynamics */}
          {isPremium ? (
             <Link href="/premium" className="block bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 p-6 rounded-2xl hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-md">РАЗБЛОКИРОВАНО</div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30"><BookOpen className="text-green-400 w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-green-400 text-lg">Комплексный Разбор Высшего Я</h4>
                      <p className="text-green-200/60 text-sm">Доступ к вашему ежедневному аудио-потоку открыт.</p>
                    </div>
                  </div>
                  <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-500 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="text-white w-5 h-5" />
                  </div>
                </div>
             </Link>
          ) : (
             <Link href="/checkout" className="block bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 p-6 rounded-2xl relative overflow-hidden group hover:border-pink-500/50 transition-colors cursor-pointer">
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">ПРЕМИУМ</div>
                <div className="flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-lg"><BookOpen className="text-purple-300 w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-purple-300 text-lg">Комплексный Разбор Высшего Я</h4>
                      <p className="text-gray-400 text-sm">Книга на 120 стр + подписка. Нажмите для оформления.</p>
                    </div>
                  </div>
                  <div className="bg-purple-600 p-2 rounded-lg backdrop-blur-sm group-hover:bg-pink-600 transition-colors flex items-center gap-2">
                    <Lock className="text-white w-4 h-4" /> <span className="text-white text-sm font-bold pr-1">ЗАМОК</span>
                  </div>
                </div>
             </Link>
          )}
          
        </div>
      </motion.div>
    </div>
  );
}
