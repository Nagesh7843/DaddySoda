import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderId = `DS-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      status: 'success',
      orderId,
      message: 'Order created successfully and sent to soda fountain queue.',
      order: {
        ...body,
        id: orderId,
        createdAt: new Date().toISOString(),
        status: 'BREWING',
      },
    });
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Failed to process order payload.' },
      { status: 400 }
    );
  }
}
