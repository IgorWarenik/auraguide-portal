import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Эзотерические параметры
    const title = searchParams.has('title')
      ? searchParams.get('title')
      : 'Раскройте свой скрытый потенциал';
      
    const category = searchParams.get('category') || 'AuraGuide Эзотерика';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#1E103C',
            backgroundImage: 'radial-gradient(circle at 80% -20%, rgba(168, 85, 247, 0.4) 0%, rgba(30, 16, 60, 1) 70%)',
            padding: '80px 100px',
            color: 'white',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
             <span style={{ color: '#D8B4FE', fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '8px' }}>
               ✦ AURAGUIDE
             </span>
          </div>

          <div
            style={{
              padding: '12px 32px',
              backgroundColor: 'rgba(168, 85, 247, 0.2)',
              borderRadius: '100px',
              border: '2px solid rgba(168, 85, 247, 0.4)',
              fontSize: 28,
              fontWeight: 600,
              color: '#F3E8FF',
              marginBottom: '30px',
              display: 'flex',
            }}
          >
            {category}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.1,
              color: 'white',
              maxWidth: '900px',
              paddingBottom: '20px'
            }}
          >
             {title}
          </div>
          
          <div style={{ display: 'flex', marginTop: 'auto', alignItems: 'center', opacity: 0.8 }}>
            <span style={{ fontSize: 32, color: '#A78BFA' }}>auraguide.ru — Матрица, Таро, Астрология</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
