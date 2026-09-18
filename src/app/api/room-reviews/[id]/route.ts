import { getRoomReviews } from '@/src/libs/apis';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const parsedParams = z.object({ id: z.string().min(1) }).safeParse(await params);
  if (!parsedParams.success) {
    return NextResponse.json(
      { message: 'Invalid room id', issues: parsedParams.error.issues },
      { status: 400 }
    );
  }
  const roomId = parsedParams.data.id;

  try {
    const roomReviews = await getRoomReviews(roomId);

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: 'Succesful',
    });
  } catch (error) {
    console.log('Getting Review Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}
