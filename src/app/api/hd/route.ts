import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, date, time, location } = body;

    if (!name || !date || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Extended HD mock data generation simulating what competitor sites give for free.
    // Competitors usually give: Type, Profile, Strategy, Inner Authority, Definition, Incarnation Cross, 
    // and a text summary of the Centers and Type mechanics.

    const types = [
      { type: 'Генератор', strategy: 'Ждать отклика', aura: 'Открытая и обволакивающая', desc: 'Ваша главная сила — неисчерпаемая сакральная энергия. Вы созданы созидать и получать удовлетворение от процесса. Если вы игнорируете отклик тела и действуете от ума, вы встречаете фрустрацию.' },
      { type: 'Манифестирующий Генератор', strategy: 'Ждать отклика, затем информировать', aura: 'Открытая, но быстрая', desc: 'Дар мультитаскинга. Вы способны находить самые короткие пути к цели. Ваша задача — разрешить себе бросать то, что перестало приносить радость, и переключаться.' },
      { type: 'Проектор', strategy: 'Ждать приглашения', aura: 'Сфокусированная и впитывающая', desc: 'Вы здесь не для тяжелого физического труда. Вы — проводник для других. Ваши советы бесценны, но они обладают силой лишь тогда, когда вас об этом попросили. Иначе вы рискуете получить горечь.' },
      { type: 'Манифестор', strategy: 'Информировать перед действием', aura: 'Закрытая и отталкивающая', desc: 'Вы инициируете процессы в мире. Ваша независимость толкает вас вперед, но чтобы избежать сопротивления и гнева со стороны окружающих, всегда информируйте их о своих планах.' }
    ];

    const profiles = [
      { name: '1/3 (Исследователь-Мученик)', text: 'Вам нужно докопаться до самой сути вещей (1 линия), и вы проверяете все на собственном опыте, совершая ошибки (3 линия). Ошибки — это ваш ресурс.'},
      { name: '3/5 (Мученик-Еретик)', text: 'Практик и экспериментатор, на которого проецируют надежды другие люди. Вы приносите практичные, прорывные решения в этот мир.'},
      { name: '2/4 (Отшельник-Оппортунист)', text: 'У вас есть скрытые таланты, которые вы применяете естественным образом. Ваш успех приходит через вашу личную сеть связей и друзей.'},
      { name: '4/6 (Оппортунист-Ролевая Модель)', text: 'После 30 лет вы переходите в фазу наблюдателя ("на крыше"), чтобы после 50 лет стать мудрым примером и ролевой моделью для своего окружения.'}
    ];

    const authorities = [
      { name: 'Сакральный (Отклик)', text: 'Слушайте реакции вашего живота (угу/неа). Тело всегда знает ответ еще до того, как его обработает мозг.'},
      { name: 'Эмоциональный (Волна)', text: 'Нет правды в моменте. Никогда не принимайте решения на пике эйфории или в ярости. Переспите с мыслью, дайте эмоциям улечься.'},
      { name: 'Селезеночный (Интуиция)', text: 'Сигнал подается лишь однажды, тихо и мгновенно. Это чутье тела, животный инстинкт опасности или безопасности в текущей секунде.'}
    ];
    
    const crosses = ['Крест Сфинкса', 'Крест Спящего Феникса', 'Крест Напряжения', 'Крест Служения', 'Крест Проникновения'];
    const definitions = ['Одинарная', 'Двойная (Сплит)', 'Тройная'];

    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
    const randomAuth = authorities[Math.floor(Math.random() * authorities.length)];
    const randomCross = crosses[Math.floor(Math.random() * crosses.length)];
    const randomDef = definitions[Math.floor(Math.random() * definitions.length)];

    const responseData = {
      name,
      type: randomType.type,
      strategy: randomType.strategy,
      profile: randomProfile.name,
      authority: randomAuth.name,
      definition: randomDef,
      incarnationCross: randomCross,
      summary: `Привет, ${name}. Мы составили ваш подробный базовый бодиграф. Ваш профиль скрывает ключи к вашим природным талантам и уязвимостям.`,
      centers: [
        { name: 'Сакральный', status: randomType.type.includes('Генератор') ? 'Определен (Закрашен)' : 'Открыт (Белый)' },
        { name: 'Эмоциональный', status: Math.random() > 0.5 ? 'Определен' : 'Открыт' },
        { name: 'Горловой', status: Math.random() > 0.5 ? 'Определен' : 'Открыт' },
        { name: 'Корневой', status: Math.random() > 0.5 ? 'Определен' : 'Открыт' }
      ],
      details: [
        {
          title: `Тип: ${randomType.type}`,
          text: `Ваша Аура: ${randomType.aura}. ${randomType.desc}`
        },
        {
          title: `Стратегия: ${randomType.strategy}`,
          text: 'Стратегия защищает вашу ауру от истощения. Следуйте ей, чтобы снизить трение при контакте с социумом.'
        },
        {
          title: `Внутренний Авторитет: ${randomAuth.name}`,
          text: randomAuth.text
        },
        {
          title: `Профиль: ${randomProfile.name}`,
          text: randomProfile.text
        },
        {
          title: `Инкарнационный Крест: ${randomCross}`,
          text: 'Это ваше предназначение на эту жизнь. Оно активируется само, когда вы начинаете жить по своим Стратегии и Авторитету.'
        }
      ]
    };

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate HD' }, { status: 500 });
  }
}
