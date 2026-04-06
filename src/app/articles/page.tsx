import prisma from '@/lib/prisma';
import { Sparkles, BookOpen, AlertTriangle } from 'lucide-react';

export const revalidate = 0; // Disable cache for dev

export default async function ArticlesPage() {
  let articles: any[] = [];
  let dbError = null;

  try {
    articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    console.error("DB Error:", err);
    dbError = "Соединение с Базой Данных устанавливается. Пожалуйста, обновите страницу через минуту.";
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
         <BookOpen className="w-8 h-8 text-purple-500" />
         <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">База знаний AuraGuide</h1>
      </div>
      
      {dbError && (
        <div className="p-6 mb-8 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center gap-4 text-yellow-300">
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <p>{dbError}</p>
        </div>
      )}

      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article.id} className="p-6 bg-[#1d0f3b]/60 rounded-2xl border border-white/5 backdrop-blur-md hover:bg-[#1d0f3b]/80 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{article.title}</h2>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold">
                {article.category}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">{article.content}</p>
            <div className="text-sm text-gray-500">
              Опубликовано: {new Date(article.createdAt).toLocaleDateString('ru-RU')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
