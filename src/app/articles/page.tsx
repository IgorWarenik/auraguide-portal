import { Sparkles, BookOpen } from 'lucide-react';

export default function ArticlesPage() {
  const articles = [
    {
      id: "1",
      title: "Что такое Матрица Судьбы и как она работает?",
      category: "Основы",
      content: "Матрица судьбы — система самопознания, основанная на 22 старших арканах Таро. Она дает четкие ответы о вашей карме, врожденных талантах и главных денежных блоках. Вычисляется по вашей дате рождения.",
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Введение в Дизайн Человека",
      category: "Бодиграф",
      content: "Дизайн человека (Human Design) объединяет генетику, квантовую физику, И-Цзин и чакральную систему. Это подробная инструкция по эксплуатации вашего транспортного средства (тела). Показывает Стратегию и Авторитет.",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
         <BookOpen className="w-8 h-8 text-purple-500" />
         <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">База знаний AuraGuide</h1>
      </div>
      <p className="text-gray-400 mb-12">Здесь собраны фундаментальные материалы по самопознанию. Полный архив доступен только резидентам по подписке Premium.</p>
      
      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article.id} className="p-6 bg-[#1d0f3b]/60 rounded-2xl border border-white/5 backdrop-blur-md hover:bg-[#1d0f3b]/80 transition-all shadow-lg hover:shadow-purple-500/10">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{article.title}</h2>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30">
                {article.category}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">{article.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 border-t border-white/5 pt-4">
              <div className="flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-purple-500/50" />
                 Опубликовано: {new Date(article.createdAt).toLocaleDateString('ru-RU')}
              </div>
              <button className="text-purple-400 font-bold hover:text-purple-300 transition-colors">Читать статью &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
