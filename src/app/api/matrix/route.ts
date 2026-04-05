import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, date } = await request.json();
    if (!name || !date) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const arcana = [
      { num: 3, name: 'Императрица', desc: 'Энергия плодородия, женственности и роскоши. Ваш талант - создавать красоту и приумножать материальные блага.' },
      { num: 4, name: 'Император', desc: 'Энергия власти, структуры и логики. Вы - прирожденный бизнес-лидер и непоколебимый организатор.' },
      { num: 7, name: 'Колесница', desc: 'Энергия победителя. Вы созданы управлять большими процессами, ставить амбициозные цели и пробивать любые потолки.' },
      { num: 10, name: 'Колесо Фортуны', desc: 'Энергия потока. Для вас главное - расслабиться и довериться везению. Суета и тяжелый труд блокируют ваши финансы.' },
      { num: 15, name: 'Дьявол', desc: 'Энергия магнетизма и больших денег. Вы обладаете мистической харизмой и легко влияете на социум. Доверяйте своим амбициям.' },
      { num: 21, name: 'Мир', desc: 'Энергия масштаба. Ваша задача — объединять людей, путешествовать и мыслить границами всего земного шара, а не одного города.' }
    ];

    // Pseudo-random calculator based on name and date logic
    const day = parseInt(date.split('-')[2] || '1', 10);
    const idx = (name.length + day) % arcana.length;
    const center = arcana[idx];
    const money = arcana[(idx + 2) % arcana.length];
    const relation = arcana[(idx + 4) % arcana.length];

    return NextResponse.json({
      name,
      summary: `Ваша 22-арканная Матрица Судьбы построена. Мы расшифровали ядро вашей личности и главную финансовую программу.`,
      energies: [
        {
          title: "Центр (Зона Комфорта Характера)",
          arcanaId: center.num,
          arcanaName: center.name,
          text: center.desc
        },
        {
          title: "Линия Денег (Где лежат ваши миллионы?)",
          arcanaId: money.num,
          arcanaName: money.name,
          text: money.desc
        },
        {
          title: "Кармический хвост (Привет из прошлых жизней)",
          arcanaId: relation.num,
          arcanaName: relation.name,
          text: `В прошлой жизни вы нарушили баланс по этой энергии (${relation.name}). Теперь ваша главная задача - вывести её из минуса.\n\n${relation.desc}`
        }
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Matrix Build Failed' }, { status: 500 });
  }
}
