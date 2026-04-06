"use client";

import { motion } from 'framer-motion';
import { Check, Shield, Sparkles, CreditCard, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      
      if (data.confirmation?.confirmation_url) {
        // Уводим клиента на страницу банка (ЮKassa) или наш Mock-редирект
        window.location.href = data.confirmation.confirmation_url;
      } else {
        console.error('Ошибка платежного шлюза:', data);
        setIsProcessing(false);
      }
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex justify-center bg-[#0b071a]">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-8">
        
        {/* Left: Value Proposition */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <Link href="/dashboard" className="text-gray-500 hover:text-white mb-8 flex items-center gap-2 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" /> Назад в кабинет
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Откройте скрытые зоны своей судьбы.</h1>
          <p className="text-xl text-purple-400 mb-10">Подписка <strong className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AuraGuide Premium</strong> снимает все ограничения с формул расчета портала.</p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 p-1.5 rounded-full mt-1 border border-green-500/50">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Полная расшифровка всех карт</h4>
                <p className="text-gray-400 text-sm">Кармические хвосты, синастрия партнеров, совместимость по дизайну человека — всё доступно без лимитов.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 p-1.5 rounded-full mt-1 border border-green-500/50">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Ежедневный Аудио-Транзит</h4>
                <p className="text-gray-400 text-sm">Персональный голосовой ИИ-разбор того, как текущие планеты влияют именно на ваш бодиграф сегодня.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 p-1.5 rounded-full mt-1 border border-green-500/50">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Отсутствие рекламы и блюра</h4>
                <p className="text-gray-400 text-sm">Кристально чистый интерфейс для глубокой медитативной работы над собой.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payment Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2"
        >
          <div className="bg-[#160a2c] border border-purple-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
            
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-pink-400" />
                <span className="font-bold text-xl text-white">Premium Доступ</span>
              </div>
              <div className="text-sm px-3 py-1 bg-white/10 text-gray-300 rounded-full font-medium">Auto-renew</div>
            </div>

            <div className="flex items-end gap-2 mb-8">
              <span className="text-6xl font-black text-white">$9.90</span>
              <span className="text-gray-400 font-medium mb-2">/ месяц</span>
            </div>

            {/* Fake Card Form (Stripe Elements Mock) */}
            <div className="space-y-4 mb-8 relative">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#160a2c]/60 backdrop-blur-[2px]">
                 <span className="px-4 py-2 bg-purple-600/50 text-purple-200 border border-purple-500/30 font-bold rounded-lg text-sm uppercase tracking-widest flex items-center gap-2">
                   <Lock className="w-4 h-4"/> Тестовый Терминал (Песочница)
                 </span>
              </div>
              
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1 block">Номер карты</label>
                <div className="relative">
                  <CreditCard className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
                  <input disabled type="text" placeholder="•••• •••• •••• 4242" className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1 block">Срок (MM/YY)</label>
                  <input disabled type="text" placeholder="12/26" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                </div>
                <div className="w-1/2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1 block">CVC</label>
                  <input disabled type="text" placeholder="•••" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                </div>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-lg py-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 hover:shadow-[0_4px_30px_rgba(168,85,247,0.6)] disabled:opacity-70 disabled:hover:shadow-[0_4px_20px_rgba(168,85,247,0.4)] relative z-20"
            >
              {isProcessing ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Обработка транзакции...</>
              ) : (
                <>Оформить подписку за $9.90</>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
              <Shield className="w-4 h-4" /> <span>256-bit SSL шифрование • Отмена в любой момент</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
