import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005'; // Fallback for dev

    // Graceful Fallback if the CEO hasn't configured the keys yet
    if (!shopId || !secretKey) {
      console.warn('YooKassa keys not found. Implementing mock checkout process.');
      return NextResponse.json({
        confirmation: { confirmation_url: `${baseUrl}/checkout/success` }
      });
    }

    const authString = Buffer.from(`${shopId}:${secretKey}`).toString('base64');
    const idempotenceKey = uuidv4();

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Idempotence-Key': idempotenceKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: {
          value: '490.00',
          currency: 'RUB'
        },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: `${baseUrl}/checkout/success`
        },
        description: 'Безлимитный доступ к AuraGuide Premium'
      })
    });

    const payment = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(payment));
    }

    return NextResponse.json(payment);
  } catch (error) {
    console.error('YooKassa Checkout error:', error);
    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
  }
}
