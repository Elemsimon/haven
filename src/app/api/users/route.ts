import { NextResponse } from 'next/server';
// Users endpoint not used in guest checkout flow.
// Kept for future admin use.
export async function GET() {
  return new NextResponse('Not implemented', { status: 501 });
}
