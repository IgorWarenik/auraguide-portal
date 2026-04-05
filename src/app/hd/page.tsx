"use client";

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Clock, Loader2, User, Activity, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HDResult {
  name: string;
  type: string;
  strategy: string;
  profile: string;
  authority: string;
  definition: string;
  incarnationCross: string;
  summary: string;
  centers: { name: string; status: string }[];
  details: { title: string; text: string }[];
}

export default function HumanDesignPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HDResult | null>(null);
  const [savedData, setSavedData] = useState({ name: '', date: '', time: '', location: '' });

  useEffect(() => {
    const saved = localStorage.getItem('auraGuideUserData');
    if (saved) {
      setSavedData(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      location: formData.get('location') as string,
    };

    localStorage.setItem('auraGuideUserData', JSON.stringify(payload));

    try {
      const res = await fetch('/api/hd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl w-full bg-[#1d0f3b]/60 rounded-3xl border border-white/5 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          
          <div className="text-center mb-12 border-b border-white/10 pb-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">Рейв-карта (Бодиграф)</h2>
            <p className="text-gray-300 text-lg">{result.summary}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Esoteric Bodygraph Mockup */}
            <div className="lg:col-span-1 flex flex-col items-center p-8 bg-[#0b071a]/80 rounded-2xl border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)] h-full">
              <div className="relative w-48 h-72 border border-white/10 rounded-full flex flex-col items-center justify-between py-6 before:content-[''] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] before:opacity-30">
                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/50" />
                <div className="w-8 h-8 rotate-45 bg-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                <div className="w-8 h-8 rounded-sm bg-teal-500/50" />
                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/50" />
                <div className="w-8 h-8 rounded-sm bg-emerald-400/40" />
              </div>
              <div className="mt-8 w-full space-y-3">
                <h4 className="text-teal-400 font-semibold mb-2 flex items-center gap-2"><Activity className="w-4 h-4"/> Ключевые центры</h4>
                {result.centers.map(c => (
                  <div key={c.name} className="flex justify-between text-sm border-b border-white/5 pb-1">
                    <span className="text-gray-400">{c.name}</span>
                    <span className={c.status.includes('Определен') ? "text-emerald-400" : "text-white/50"}>{c.status}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Core Stats */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-teal-500/50 transition-colors">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Тип</div>
                  <div className="text-lg font-bold text-white">{result.type}</div>
                </div>
                <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-teal-500/50 transition-colors">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Профиль</div>
                  <div className="text-lg font-bold text-teal-400">{result.profile}</div>
                </div>
                <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-teal-500/50 transition-colors">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Определенность</div>
                  <div className="text-lg font-bold text-emerald-400">{result.definition}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Стратегия</div>
                  <div className="text-xl font-bold text-white">{result.strategy}</div>
                </div>
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Внутренний Авторитет</div>
                  <div className="text-xl font-bold text-emerald-400">{result.authority}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-900/30 to-emerald-900/30 p-5 rounded-xl border border-teal-500/30">
                <div className="text-xs text-teal-300 uppercase tracking-wider mb-1">Инкарнационный Крест (Смысл Жизни)</div>
                <div className="text-xl font-bold text-white">{result.incarnationCross}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center text-teal-100 border-b border-white/10 pb-4">Базовая расшифровка механики</h3>
            <div className="grid gap-6">
              {result.details.map((detail, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#0b071a]/50 border border-white/5 border-l-4 border-l-teal-500 hover:bg-white/5 transition-colors">
                  <h4 className="font-bold text-teal-300 text-lg mb-2">{detail.title}</h4>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">{detail.text}</p>
                </div>
              ))}
            </div>

            {/* Cross-Sell Progress Bar */}
            <div className="mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#0b071a] to-[#121c2f] border border-teal-500/40 shadow-[0_0_40px_rgba(20,184,166,0.15)] relative overflow-hidden">
              <Layers className="absolute -right-10 -bottom-10 w-48 h-48 text-teal-500/10 pointer-events-none" />
              <div className="flex justify-between items-end mb-4 relative z-10">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Синтез Судьбы: Расшифровано 50%</h4>
                  <p className="text-gray-400 text-sm max-w-sm">Бодиграф показывает, как работает ваше тело. Добавьте к этому Астрологию, чтобы увидеть глубинные кармические задачи (в 1 клик).</p>
                </div>
                <span className="text-teal-400 font-black text-2xl">1/2</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 mb-6 overflow-hidden relative z-10">
                <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} transition={{ duration: 1, delay: 0.5 }} className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full"></motion.div>
              </div>
              <Link href="/natal" className="w-full py-4 rounded-xl bg-teal-600/20 hover:bg-teal-600/40 text-teal-300 font-bold border border-teal-500/50 transition-all flex items-center justify-center gap-2 relative z-10">
                Рассчитать Астрологическую Карту <ArrowRight className="w-5 h-5"/>
              </Link>
            </div>
            
            {/* Paywall Call to Action */}
            <div className="mt-8 p-1 relative rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600">
              <div className="bg-[#0b071a] p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">ЕДИНАЯ МАТРИЦА СУДЬБЫ (60+ стр.)</h4>
                  <p className="text-gray-400">Комплексный анализ: Астрология + Дизайн Человека. Закажите комбо-разбор сегодня и получите скидку 50%.</p>
                </div>
                <button className="whitespace-nowrap py-4 px-8 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all flex items-center justify-center gap-2">
                  Заказать Синтез <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="text-center mt-8">
              <button onClick={() => setResult(null)} className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4">
                Рассчитать новую карту
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center mb-10 max-w-2xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Дизайн Человека</h1>
        <p className="text-gray-400 text-lg leading-relaxed">Система знаний о вашей энергетической архитектуре. Введите данные рождения, чтобы узнать свой генетический потенциал и механику принятия корректных решений.</p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1d0f3b]/60 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Ваше Имя</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input key={`name-${savedData.name}`} defaultValue={savedData.name} name="name" required type="text" className="w-full bg-[#0b071a]/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder="Алексей" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Дата</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input key={`date-${savedData.date}`} defaultValue={savedData.date} name="date" required type="date" className="w-full bg-[#0b071a]/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors [color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Время</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input key={`time-${savedData.time}`} defaultValue={savedData.time} name="time" type="time" className="w-full bg-[#0b071a]/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors [color-scheme:dark]" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Место рождения</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input key={`loc-${savedData.location}`} defaultValue={savedData.location} name="location" required type="text" className="w-full bg-[#0b071a]/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder="Санкт-Петербург" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-teal-500/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:shadow-none cursor-pointer"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Рассчитать Бодиграф'}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
