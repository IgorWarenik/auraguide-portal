"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';

interface BlurWallProps {
  children: React.ReactNode;
  title?: string;
}

export default function BlurWall({ children, title = "Скрытая Энергия" }: BlurWallProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState('');

  // Если юзер купил подписку, контент всегда открыт
  useEffect(() => {
    if (localStorage.getItem('auraGuidePremium') === 'true') {
      setUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      // TechLead Comment: В будущем здесь будет вызов API Prisma для сохранения в БД.
      // fetch('/api/leads', { method: 'POST', body: JSON.stringify({ email }) })
      localStorage.setItem('auraGuideUserEmail', email);
      window.dispatchEvent(new Event('auth-change'));
      setUnlocked(true);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl group">
      {/* Контент, который мы блюрим */}
      <motion.div 
        animate={{ filter: unlocked ? 'blur(0px)' : 'blur(6px)' }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
      
      {/* Форма разблокировки (исчезает при успехе) */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-[#1a0b12]/80 text-center"
          >
            <div className="bg-red-500/10 p-3 rounded-full mb-3 backdrop-blur-md border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <Lock className="w-6 h-6 text-red-400" />
            </div>
            <h4 className="font-bold text-lg text-white mb-2">{title}</h4>
            <p className="text-sm text-gray-300 mb-4 max-w-xs">Оставьте email, чтобы моментально дочитать расшифровку этого блока.</p>
            
            <form onSubmit={handleUnlock} className="flex relative w-full max-w-sm gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@mail.com" 
                  className="w-full bg-[#0b071a]/80 border border-red-500/30 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-red-400 transition-colors"
                />
              </div>
              <button type="submit" className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-1 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                Открыть <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
