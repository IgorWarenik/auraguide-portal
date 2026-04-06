'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createArticle(prevState: any, formData: FormData) {
  const password = formData.get('password');
  const expectedPassword = process.env.ADMIN_PASSWORD || 'auraguide_admin_2026';

  if (password !== expectedPassword) {
    return { success: false, error: 'Неверный пароль администратора' };
  }

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;

  if (!title || !slug || !category || !content) {
    return { success: false, error: 'Все поля обязательны для заполнения' };
  }

  try {
    await prisma.article.create({
      data: {
        title,
        slug,
        category,
        content,
      },
    });

    // Invalidate the knowledge base cache to show the new article immediately
    revalidatePath('/articles');
    revalidatePath('/sitemap.xml'); // Help SEO caching

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error creating article:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'Статья с таким URL (Slug) уже существует' };
    }
    return { success: false, error: 'Ошибка сервера при сохранении статьи' };
  }
}
