"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';

const mockEvents = [
  { name: 'Елена, Москва', action: 'только что рассчитала Натальную карту' },
  { name: 'Алексей, Минск', action: 'сохранил Матрицу Судьбы (PNG)' },
  { name: 'Мария, Алматы', action: 'выкупила Полный Кармический Разбор' },
  { name: 'Игорь, СПБ', action: 'узнал свой тип по Дизайну Человека' },
  { name: 'Анна, Киев', action: 'вытащила счастливую Карту Дня' },
  { name: 'Виктория, Сочи', action: 'разблокировала Линию Денег' },
  { name: 'Дмитрий, Дубай', action: 'прочитал лонгрид про Скрытые Узлы' }
];

export default function LiveSocialProof() {
  const [currentEvent, setCurrentEvent] = useState<typeof mockEvents[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Эвалуатор: Добавлен стейт для полного отключения виджета, чтобы не бесить юзера
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const showRandomEvent = () => {
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      setCurrentEvent(randomEvent);
      setIsVisible(true);

      // Планировщик: Уведомление висит ровно 5 секунд
      setTimeout(() => {
        setIsVisible(false);
      }, 5000); 
    };

    // Стартовая задержка, чтобы не пугать юзера сразу
    const firstTimer = setTimeout(showRandomEvent, 4000);

    // Циклическое появление (случайный интервал от 15 до 30 секунд)
    const loop = setInterval(() => {
      if (!isDismissed && document.visibilityState === 'visible') {
         showRandomEvent();
      }
    }, 15000 + Math.random() * 15000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(loop);
    };
  }, [isDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true); // Отключаем навсегда для текущей сессии
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && currentEvent && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, x: -20 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9, x: -20 }}
          className="fixed bottom-6 left-6 z-[100] bg-[#160a2c]/90 backdrop-blur-md border border-purple-500/30 p-4 rounded-2xl shadow-[0_4px_30px_rgba(168,85,247,0.3)] flex items-center gap-4 max-w-sm"
        >
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-2 rounded-full border border-purple-500/50">
            <Star className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1 pr-6">
            <h5 className="text-white text-sm font-bold">{currentEvent.name}</h5>
            <p className="text-gray-400 text-xs">{currentEvent.action}</p>
          </div>
          <button 
            onClick={handleClose} 
            className="absolute top-2 right-2 p-1 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
