const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, 'articles.json');
  const articles = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log(`Начинаем массовое заполнение базы (найдено ${articles.length} статей)...`);
  
  for (const article of articles) {
    const created = await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        content: article.content,
        category: article.category
      },
      create: article,
    });
    console.log(`✅ Добавлена статья: ${created.title}`);
  }
  
  console.log('Готово! База данных успешно обновлена контентом.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
