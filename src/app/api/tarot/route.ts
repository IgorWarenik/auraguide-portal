import { NextResponse } from 'next/server';

const TAROT_CARDS = [
  { 
    name: 'Императрица (III)', 
    image: 'https://images.unsplash.com/photo-1606709849206-e713600f73c4?auto=format&fit=crop&q=80', 
    description: 'Сегодня день творчества, плодородия и изобилия. Доверяйте своей интуиции и заботьтесь о себе и окружающих. Отличное время для начала новых проектов, особенно связанных с эстетикой или природой.' 
  },
  { 
    name: 'Маг (I)', 
    image: 'https://images.unsplash.com/photo-1544026265-f855e714f3b7?auto=format&fit=crop&q=80', 
    description: 'У вас есть все необходимые ресурсы для достижения цели. Проявляйте инициативу, действуйте решительно и используйте свой острый интеллект.' 
  },
  { 
    name: 'Звезда (XVII)', 
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80', 
    description: 'Карта надежды, вдохновения и духовного обновления. Ваша путеводная звезда освещает путь. Верьте в лучшее будущее и смело следуйте за своей мечтой.' 
  },
  { 
    name: 'Солнце (XIX)', 
    image: 'https://images.unsplash.com/photo-1532055627-2c9bb5f0d8fc?auto=format&fit=crop&q=80', 
    description: 'Праздник, радость и успех. Все ваши усилия будут вознаграждены. Энергия бьет ключом, отличный день для теплого общения и наслаждения жизнью.' 
  },
];

export async function GET() {
  const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
  return NextResponse.json(randomCard);
}
