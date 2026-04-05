"use client";

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Clock, Loader2, Sparkles, Moon, Sun, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NatalResult {
  name: string;
  ascendant: string;
  sun: string;
  moon: string;
  summary: string;
  bigThree: { title: string; text: string }[];
  personalPlanets: { planet: string; sign: string }[];
}

export default function NatalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<NatalResult | null>(null);
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
      const res = await fetch('/api/natal', {
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
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center cursor-default">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl w-full bg-[#1d0f3b]/60 rounded-3xl border border-white/5 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          
          <div className="text-center mb-10 border-b border-white/10 pb-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Твоя Космическая Карта</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">{result.summary}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start mb-12">
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <div className="bg-gradient-to-br from-orange-500/20 to-pink-500/10 p-6 rounded-2xl border border-orange-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-orange-300 uppercase tracking-widest font-bold mb-1">Ядро Личности</div>
                  <div className="text-2xl font-bold text-white">Солнце: {result.sun}</div>
                </div>
                <Sun className="text-orange-400 w-8 h-8"/>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 p-6 rounded-2xl border border-blue-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-blue-300 uppercase tracking-widest font-bold mb-1">Душа & Эмоции</div>
                  <div className="text-2xl font-bold text-white">Луна: {result.moon}</div>
                </div>
                <Moon className="text-blue-400 w-8 h-8"/>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 p-6 rounded-2xl border border-purple-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-purple-300 uppercase tracking-widest font-bold mb-1">Маска & Имидж</div>
                  <div className="text-2xl font-bold text-white">Асцендент: {result.ascendant}</div>
                </div>
                <Sparkles className="text-purple-400 w-8 h-8"/>
              </div>
              
              <div className="mt-8 bg-[#0b071a]/50 p-6 rounded-2xl border border-white/5">
                <h4 className="font-bold text-gray-300 mb-4 border-b border-white/10 pb-2">Личные Планеты:</h4>
                <div className="space-y-3 relative">
                 <div className="absolute left-[7px] top-3 bottom-3 w-px bg-white/10"></div>
                 {result.personalPlanets.map((p, i) => (
                   <div key={i} className="flex justify-between items-center relative pl-6">
                     <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0b071a] border-2 border-purple-500"></span>
                     <span className="text-sm text-gray-400">{p.planet}</span>
                     <span className="font-semibold text-purple-300 text-sm">{p.sign}</span>
                   </div>
                 ))}
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-2/3 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Расшифровка Большой Тройки</h3>
              <div className="grid gap-6">
                {result.bigThree.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#0b071a]/50 border-t border-t-white/5 border-l-4 border-l-purple-500 shadow-[4px_4px_15px_rgba(0,0,0,0.3)] hover:bg-white/5 transition-colors">
                    <h4 className="font-bold text-purple-300 text-lg mb-3">{item.title}</h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Cross-Sell Progress Bar */}
              <div className="mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#0b071a] to-[#160a2c] border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden">
                <Layers className="absolute -right-10 -bottom-10 w-48 h-48 text-purple-500/10 pointer-events-none" />
                <div className="flex justify-between items-end mb-4 relative z-10">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Синтез Судьбы: Расшифровано 50%</h4>
                    <p className="text-gray-400 text-sm max-w-sm">Астрология показывает ваш потенциал. Чтобы понять, КАК действовать телом без ошибок, создайте свой Бодиграф (в 1 клик).</p>
                  </div>
                  <span className="text-purple-400 font-black text-2xl">1/2</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-6 overflow-hidden relative z-10">
                  <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} transition={{ duration: 1, delay: 0.5 }} className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"></motion.div>
                </div>
                <Link href="/hd" className="w-full py-4 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 font-bold border border-purple-500/50 transition-all flex items-center justify-center gap-2 relative z-10">
                  Рассчитать Дизайн Человека <ArrowRight className="w-5 h-5"/>
                </Link>
              </div>

            </div>
          </div>
          
          {/* Paywall Banner CTA */}
          <div className="mt-8 p-1 relative rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600">
            <div className="bg-[#0b071a] p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">ЕДИНАЯ МАТРИЦА СУДЬБЫ (60+ стр.)</h4>
                <p className="text-gray-400">Комплексный анализ вашей жизни: Астрология + Дизайн Человека. Скидка 50% при заказе комбо-отчета сегодня.</p>
              </div>
              <button className="whitespace-nowrap py-4 px-8 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.5)] transition-all flex items-center justify-center gap-2">
                Заказать Синтез <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-center mt-10">
            <button onClick={() => setResult(null)} className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4">
              Рассчитать новую карту
            </button>
          </div>

        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10 max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Натальная Карта</h1>
        <p className="text-gray-400">Для точного расчета позиций планет и домов нам нужны данные о вашем рождении. Алгоритм сработает за пару секунд.</p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1d0f3b]/40 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Как вас зовут?</label>
            <input key={`name-${savedData.name}`} defaultValue={savedData.name} name="name" required type="text" className="w-full bg-[#0b071a]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Имя" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Дата</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input key={`date-${savedData.date}`} defaultValue={savedData.date} name="date" required type="date" className="w-full bg-[#0b071a]/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500 [color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Время</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input key={`time-${savedData.time}`} defaultValue={savedData.time} name="time" required type="time" className="w-full bg-[#0b071a]/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors [color-scheme:dark]" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Место рождения</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input key={`loc-${savedData.location}`} defaultValue={savedData.location} name="location" required type="text" className="w-full bg-[#0b071a]/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Москва, Россия" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:shadow-none cursor-pointer"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Рассчитать бесплатно'}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
