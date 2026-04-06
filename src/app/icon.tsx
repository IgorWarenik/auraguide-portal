import { ImageResponse } from 'next/og';

// Маршрутизация на Edge
export const runtime = 'edge';

// Стандартный размер фавиконки (Next.js рекомендует 32x32)
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #a855f7, #ec4899)', // Наш фирменный градиент
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '25%', // Закругленные края как у Apple иконок
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
           {/* Иконка Sparkles (Звездочка) - символ магии и портала */}
           <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
