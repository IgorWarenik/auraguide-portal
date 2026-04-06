import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({ where: { slug: params.slug } });
  if (!article) return { title: 'Статья не найдена' };
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://auraguide-portal.vercel.app';
  const ogUrl = new URL(`${baseUrl}/api/og`);
  ogUrl.searchParams.set('title', article.title);
  ogUrl.searchParams.set('category', article.category);

  return {
    title: `${article.title} | AuraGuide`,
    description: article.content.substring(0, 160) + '...',
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogUrl.toString()],
    }
  };
}

export default async function ArticleDynamicPage({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug }
  });

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-24 pb-12 px-4 max-w-3xl mx-auto">
      <Link href="/articles" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Назад к списку
      </Link>
      
      <div className="mb-8">
        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30 mb-4 inline-block">
          {article.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{article.title}</h1>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
           <Sparkles className="w-4 h-4 text-purple-500/50" />
           Опубликовано: {new Date(article.createdAt).toLocaleDateString('ru-RU')}
        </div>
      </div>
      
      <div className="prose prose-invert prose-purple max-w-none">
        {article.content.split('\n').map((paragraph, idx) => (
          <p key={idx} className="text-gray-300 leading-relaxed text-lg mb-6">{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
