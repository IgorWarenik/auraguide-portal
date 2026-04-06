'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const [activated, setActivated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // В реальном боевом проекте мы бы сверяли JWT или статус из URL/Базы Данных.
    // Так как у нас пока бессерверная сессия (без полноценной регистрации юзеров),
    // мы активируем Premium в браузере сразу после успешного возврата из ЮKassa.
    localStorage.setItem('auraGuidePremium', 'true');
    setActivated(true);

    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000); // Редирект в кабинет через 5 сек

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8 border border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-pulse">
        <CheckCircle className="w-12 h-12 text-green-400" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Оплата прошла успешно!</h1>
      <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl">
        Ваш статус Premium активирован. Теперь вам доступны полные расшифровки всех калькуляторов, 
        профессиональная Матрица Судьбы и детальный анализ Дизайна Человека.
      </p>

      <Link href="/dashboard" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-purple-600/20">
        Перейти в Личный Кабинет <ArrowRight className="w-5 h-5" />
      </Link>
      
      <p className="mt-8 text-gray-500 text-sm">
        Вы будете автоматически перенаправлены через 5 секунд...
      </p>

      {/* Background ambient elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />
    </div>
  );
}
