"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';

interface TarotCard {
  name: string;
  image: string;
  description: string;
}

export default function TarotPage() {
  const [isDrawn, setIsDrawn] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cardData, setCardData] = useState<TarotCard | null>(null);

  const drawCard = async () => {
    setIsDrawing(true);
    try {
      const res = await fetch('/api/tarot');
      const data = await res.json();
      setCardData(data);
      // Simulate small delay for dramatic effect
      setTimeout(() => {
        setIsDrawing(false);
        setIsDrawn(true);
      }, 1000);
    } catch (e) {
      console.error(e);
      setIsDrawing(false);
    }
  };

  const resetCard = () => {
    setIsDrawn(false);
    setCardData(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Карта Дня (Таро)</h1>
        <p className="text-gray-400">Сделайте глубокий вдох. Сфокусируйтесь на том, что вас волнует сегодня, и вытяните свою карту.</p>
      </div>

      <div className="relative w-full max-w-sm aspect-[2/3] perspective-1000">
        <AnimatePresence mode="wait">
          {!isDrawn ? (
            <motion.div
              key="back"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-[#1d0f3b] to-[#0f172a] shadow-[0_0_30px_rgba(157,78,221,0.2)] flex items-center justify-center cursor-pointer hover:shadow-[0_0_50px_rgba(157,78,221,0.4)] transition-shadow"
              onClick={!isDrawing ? drawCard : undefined}
            >
              {isDrawing ? (
                <RefreshCw className="w-12 h-12 text-purple-400 animate-spin" />
              ) : (
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <span className="font-semibold text-lg">Вытянуть карту</span>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="front"
              initial={{ rotateY: 180, opacity: 0, scale: 0.8, boxShadow: "0px 0px 0px rgba(168,85,247,0)" }}
              animate={{ 
                rotateY: 0, 
                opacity: 1, 
                scale: 1,
                boxShadow: [
                  "0px 0px 0px rgba(168,85,247,0)",
                  "0px 0px 80px rgba(168,85,247,0.8)",
                  "0px 0px 30px rgba(168,85,247,0.4)"
                ] 
              }}
              transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
              className="absolute inset-0 rounded-2xl bg-[#0f172a] border border-purple-500/50 overflow-hidden flex flex-col relative z-20"
            >
              <div 
                className="h-[65%] w-full bg-cover bg-center brightness-90 hover:brightness-110 transition-all duration-700"
                style={{ backgroundImage: `url('${cardData?.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />
              </div>
              <div className="p-6 relative z-10 flex-1 flex flex-col justify-end">
                <h2 className="text-2xl font-bold mb-2 text-white">{cardData?.name}</h2>
                <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                  {cardData?.description}
                </p>
                <button onClick={resetCard} className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-4 decoration-purple-500/30">
                  Вытянуть другую
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
