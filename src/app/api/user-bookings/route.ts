import { NextResponse } from 'next/server';
import sanityClient from '@/src/libs/sanity';

// Public endpoint: look up bookings by guest email
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) {
    return new NextResponse('Email parameter required', { status: 400 });
  }
  try {
    const bookings = await sanityClient.fetch(
      `*[_type == 'booking' && guestEmail == $email] {
        _id,
        guestName,
        guestEmail,
        hotelRoom -> { _id, name, slug, price },
        checkinDate,
        checkoutDate,
        numberOfDays,
        adults,
        children,
        totalPrice,
        discount
      }`,
      { email: email.toLowerCase() }
    );
    return NextResponse.json(bookings, { status: 200 });
  } catch {
    return new NextResponse('Unable to fetch bookings', { status: 400 });
  }
}
