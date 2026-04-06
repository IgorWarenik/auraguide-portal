import { PrismaClient } from '@prisma/client';

// Next.js 15+ fetch logic
const prisma = new PrismaClient();

export const revalidate = 0; // Disable cache for dev

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">База знаний AuraGuide</h1>
      <p className="text-gray-400 mb-12">Здесь хранятся статьи, загруженные из нашей базы данных через Prisma ORM.</p>
      
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
