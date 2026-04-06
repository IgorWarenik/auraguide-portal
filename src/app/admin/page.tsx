'use client';

import { useState } from 'react';
import { createArticle } from './actions';
import { Shield, CheckCircle, AlertCircle, Save } from 'lucide-react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    
    // Call the Next.js Server Action
    const result = await createArticle(null, formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Статья успешно добавлена и уже доступна на сайте!' });
      // We could clear the form by a ref, but leaving it helps if they want to publish variants
    } else {
      setMessage({ type: 'error', text: result.error || 'Неизвестная ошибка' });
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-3xl mx-auto relative z-10">
      <div className="flex items-center gap-3 mb-10">
        <Shield className="w-8 h-8 text-purple-500" />
        <h1 className="text-4xl font-bold text-white">Панель Управления</h1>
      </div>

      <div className="bg-[#160a2c] border border-purple-500/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
        <div className="mb-6 border-b border-white/10 pb-6">
           <h2 className="text-2xl font-semibold mb-2">Создать SEO Статью</h2>
           <p className="text-gray-400 text-sm">Новая статья будет мгновенно закеширована (SSR) и автоматически добавлена в sitemap.xml для Яндекса.</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0"/> : <AlertCircle className="w-5 h-5 flex-shrink-0"/>}
            <span>{message.text}</span>
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm tracking-wide text-gray-400 mb-1 font-bold uppercase">Мастер-Пароль</label>
            <input required type="password" name="password" placeholder="Пароль администратора" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm tracking-wide text-gray-400 mb-1 font-bold uppercase">Заголовок статьи (H1)</label>
              <input required type="text" name="title" placeholder="Значение 3 Аркана" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="flex-1">
              <label className="block text-sm tracking-wide text-gray-400 mb-1 font-bold uppercase">URL (SEO Slug)</label>
              <input required type="text" name="slug" placeholder="znachenie-3-arkana" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" pattern="^[a-z0-9-]+$" title="Только маленькие латинские буквы, цифры и дефис" />
            </div>
          </div>

          <div>
            <label className="block text-sm tracking-wide text-gray-400 mb-1 font-bold uppercase">Рубрика</label>
            <select required name="category" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors">
               <option value="Матрица Судьбы">Матрица Судьбы</option>
               <option value="Таро">Таро</option>
               <option value="Астрология">Астрология</option>
               <option value="Бодиграф">Дизайн Человека</option>
            </select>
          </div>

          <div>
            <label className="block text-sm tracking-wide text-gray-400 mb-1 font-bold uppercase">Основной контент</label>
            <textarea required name="content" rows={12} placeholder="Текст вашей статьи..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"></textarea>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Идет публикация в базу...' : <><Save className="w-5 h-5"/> Опубликовать на сайте</>}
          </button>
        </form>
      </div>

      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-[-1]" />
    </div>
  );
}
