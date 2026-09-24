import { NextResponse } from 'next/server';
import { STORES } from '@/data/stores';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    count: STORES.length,
    data: STORES,
  });
}
