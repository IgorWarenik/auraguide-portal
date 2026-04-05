"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Loader2, User, Sparkle, Lock, Download } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as htmlToImage from 'html-to-image';
import BlurWall from '@/components/BlurWall';

interface MatrixResult {
  name: string;
  summary: string;
  energies: {
    title: string;
    arcanaId: number;
    arcanaName: string;
    text: string;
  }[];
}

export default function MatrixPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [result, setResult] = useState<MatrixResult | null>(null);
  const [savedData, setSavedData] = useState({ name: '', date: '' });
  const exportRef = useRef<HTMLDivElement>(null);

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
    };

    const existing = JSON.parse(localStorage.getItem('auraGuideUserData') || '{}');
    localStorage.setItem('auraGuideUserData', JSON.stringify({ ...existing, ...payload }));

    try {
      const res = await fetch('/api/matrix', {
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

  const handleDownload = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(exportRef.current, { 
        cacheBust: true, 
        backgroundColor: '#0b071a',
        pixelRatio: 2 // High res export
      });
      const link = document.createElement('a');
      link.download = `AuraGuide_Matrix_${result?.name || 'hero'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      setIsExporting(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl w-full bg-[#1b0a1d]/80 rounded-3xl border border-amber-500/20 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          
          <div className="text-center mb-10 border-b border-white/10 pb-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Матрица Судьбы</h2>
            <p className="text-gray-300 text-lg">{result.summary}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start mb-12">
            
            {/* Exportable Area */}
            <div className="lg:w-1/2 flex flex-col items-center w-full">
              
              <div ref={exportRef} className="relative w-full p-8 rounded-2xl bg-gradient-to-b from-[#1b0a1d] to-[#0b071a] border border-amber-500/10 flex flex-col items-center justify-center">
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">Код Судьбы: {result.name}</h3>
                  <div className="text-amber-500/80 text-sm font-semibold tracking-widest uppercase">auraguide.io</div>
                </div>

                <div className="relative w-72 h-72 flex items-center justify-center">
                  <div className="absolute inset-0 border-[3px] border-amber-500/30 w-full h-full" />
                  <div className="absolute inset-0 border-[3px] border-orange-500/30 w-full h-full rotate-45" />
                  
                  <div className="absolute w-[80%] h-[80%] rounded-full border border-amber-400/20 flex items-center justify-center bg-[#0b071a]/80 backdrop-blur-md">
                    <div className="text-center">
                      <div className="text-sm text-amber-300/80 mb-1 uppercase tracking-widest font-black text-[10px]">Ядро</div>
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-orange-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                        {result.energies[0].arcanaId}
                      </div>
                    </div>
                  </div>

                  {/* Energy Nodes */}
                  <div className="absolute top-[-10px] bg-[#1a0b12] border-2 border-amber-500 text-amber-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(245,158,11,0.5)]">6</div>
                  <div className="absolute bottom-[-10px] bg-[#1a0b12] border-2 border-red-500 text-red-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(239,68,68,0.5)]">{result.energies[2].arcanaId}</div>
                  <div className="absolute right-[-10px] bg-[#1a0b12] border-2 border-orange-500 text-orange-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(249,115,22,0.5)]">{result.energies[1].arcanaId}</div>
                  <div className="absolute left-[-10px] bg-[#1a0b12] border-2 border-purple-500 text-purple-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">9</div>
                </div>
              </div>

              {/* Export Trigger Button */}
              <button 
                onClick={handleDownload}
                disabled={isExporting}
                className="mt-6 py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2 hover:border-amber-500/50 disabled:opacity-50"
              >
                {isExporting ? <Loader2 className="w-5 h-5 animate-spin text-amber-500" /> : <Download className="w-5 h-5 text-amber-500" />}
                {isExporting ? 'Генерация изображения...' : 'Сохранить для Instagram'}
              </button>

            </div>

            {/* Results Output */}
            <div className="lg:w-1/2 w-full space-y-6">
              {result.energies.map((energy, idx) => {
                const isKarmic = idx === 2;
                const content = (
                  <div className={`p-6 rounded-2xl border ${isKarmic ? 'bg-[#1a0b12] border-red-500/30' : 'bg-[#0b071a]/50 border-amber-500/20'} shadow-lg hover:bg-white/5 transition-all`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-bold text-lg ${isKarmic ? 'text-red-400' : 'text-amber-400'}`}>{energy.title}</h4>
                      {isKarmic ? <Lock className="w-5 h-5 text-red-500/50" /> : <Sparkle className="w-5 h-5 text-amber-500/50" />}
                    </div>
                    <div className="text-2xl font-black text-white mb-3">
                      {energy.arcanaId} Аркан <span className="text-gray-400 opacity-50 pl-2 text-xl font-normal">{energy.arcanaName}</span>
                    </div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">{energy.text}</p>
                  </div>
                );

                return isKarmic ? (
                  <BlurWall key={idx} title="Доступ ограничен: Кармический долг">{content}</BlurWall>
                ) : (
                  <div key={idx}>{content}</div>
                );
              })}
            </div>

          </div>

          <div className="mt-8 p-1 relative rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600">
            <div className="bg-[#1a0b12] p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Расшифруйте все 22 энергии своей Судьбы!</h4>
                <p className="text-gray-400">Узнайте свое предназначение до 40 лет, кармические узлы, идеальную профессию и пути масштабирования Линии Денег. Отчет на 70 страниц.</p>
              </div>
              <button className="whitespace-nowrap py-4 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2">
                Снять блокировки <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <button onClick={() => setResult(null)} className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4">Рассчитать новую матрицу</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center mb-10 max-w-2xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-500">Матрица Судьбы</h1>
        <p className="text-gray-400 text-lg leading-relaxed">Система на базе 22 энергий старших арканов. В отличие от астрологии, здесь не требуется время и место рождения — только дата!</p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1a0b12]/60 border border-amber-500/20 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-amber-100/70 mb-2">Как вас зовут?</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-amber-500/50" />
              <input key={`name-${savedData.name}`} defaultValue={savedData.name} name="name" required type="text" className="w-full bg-[#0b071a]/50 border border-amber-500/30 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors" placeholder="Алексей" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-amber-100/70 mb-2">Дата рождения</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-amber-500/50" />
              <input key={`date-${savedData.date}`} defaultValue={savedData.date} name="date" required type="date" className="w-full bg-[#0b071a]/50 border border-amber-500/30 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors [color-scheme:dark]" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:shadow-none cursor-pointer"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Рассчитать свою Матрицу'}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
