import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getRoom } from '@/src/libs/apis';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const parsedParams = z
    .object({ slug: z.string().trim().min(1).max(200) })
    .safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json(
      { message: 'Invalid slug', issues: parsedParams.error.issues },
      { status: 400 }
    );
  }

  try {
    const room = await getRoom(parsedParams.data.slug);
    return NextResponse.json(room, { status: 200 });
  } catch {
    return new NextResponse('Unable to fetch room', { status: 400 });
  }
}
