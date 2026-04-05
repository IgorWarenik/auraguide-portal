import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, date, time, location } = body;

    if (!name || !date || !location) {
      return NextResponse.json({ error: 'Missing required birth fields.' }, { status: 400 });
    }

    // Extended Natal chart data simulation based on competitor free tiers.
    // They usually provide: The Big Three (Sun, Moon, Ascendant), Elements balance, and short descriptions.
    
    const signs = [
      { sign: 'Овен ♈️', element: 'Огонь', desc: 'импульсивность, лидерство, страсть' },
      { sign: 'Телец ♉️', element: 'Земля', desc: 'стабильность, гедонизм, упрямство' },
      { sign: 'Близнецы ♊️', element: 'Воздух', desc: 'коммуникация, гибкость, интеллект' },
      { sign: 'Рак ♋️', element: 'Вода', desc: 'эмоциональность, дом, интуиция' },
      { sign: 'Лев ♌️', element: 'Огонь', desc: 'яркость, творчество, гордость' },
      { sign: 'Дева ♍️', element: 'Земля', desc: 'аналитика, перфекционизм, забота' },
      { sign: 'Весы ♎️', element: 'Воздух', desc: 'эстетика, партнерство, сомнения' },
      { sign: 'Скорпион ♏️', element: 'Вода', desc: 'трансформация, глубина, магнетизм' },
      { sign: 'Стрелец ♐️', element: 'Огонь', desc: 'философия, путешествия, масштаб' },
      { sign: 'Козерог ♑️', element: 'Земля', desc: 'карьера, статус, дисциплина' },
      { sign: 'Водолей ♒️', element: 'Воздух', desc: 'свобода, инновации, бунтарство' },
      { sign: 'Рыбы ♓️', element: 'Вода', desc: 'мистика, эмпатия, фантазии' }
    ];

    const getRnd = () => signs[Math.floor(Math.random() * signs.length)];
    
    const ascendant = getRnd();
    const sun = getRnd();
    const moon = getRnd();
    const mercury = getRnd();
    const venus = getRnd();
    const mars = getRnd();

    // Elements distribution
    const elementCounts = { 'Огонь': 0, 'Земля': 0, 'Воздух': 0, 'Вода': 0 };
    [ascendant, sun, moon, mercury, venus, mars].forEach(s => { elementCounts[s.element as keyof typeof elementCounts]++; });
    const maxElement = Object.keys(elementCounts).reduce((a, b) => elementCounts[a as keyof typeof elementCounts] > elementCounts[b as keyof typeof elementCounts] ? a : b);

    const result = {
      name,
      ascendant: ascendant.sign,
      sun: sun.sign,
      moon: moon.sign,
      summary: `${name}, ваша натальная карта успешно рассчитана. Ведущая стихия в вашей карте: ${maxElement}.`,
      bigThree: [
        { 
          title: `Ваше Солнце (ЯДРО ЛИЧНОСТИ) в знаке: ${sun.sign}`, 
          text: `Солнце отвечает за ваше Эго, жизненную силу и сознательные желания. Положение в этом знаке дает вам ${sun.desc}. Для ощущения полноты жизни вам необходимо развивать эти качества.` 
        },
        { 
          title: `Ваша Луна (ПОДСОЗНАНИЕ И ДУША) в знаке: ${moon.sign}`, 
          text: `Луна — это ваши эмоции, зона комфорта и способ восстанавливать силы. Луна здесь говорит о том, что ваша психика опирается на ${moon.desc}. Это ваш внутренний ребенок.` 
        },
        { 
          title: `Ваш Асцендент (СОЦИАЛЬНАЯ МАСКА): ${ascendant.sign}`, 
          text: `Асцендент — это то, каким вас видят окружающие при первой встрече. Это ваш физический облик и фильтр, через который вы воспринимаете мир. Окружающие считывают вас как человека, которому присущи ${ascendant.desc}.` 
        }
      ],
      personalPlanets: [
        { planet: 'Меркурий (Мышление и речь)', sign: mercury.sign },
        { planet: 'Венера (Язык любви и деньги)', sign: venus.sign },
        { planet: 'Марс (Способ действовать и агрессия)', sign: mars.sign }
      ]
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Backend calculation failed.' }, { status: 500 });
  }
}
