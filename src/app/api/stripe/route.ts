import Stripe from 'stripe';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getRoom } from '@/src/libs/apis';

const requestSchema = z.object({
  checkinDate: z.string().datetime(),
  checkoutDate: z.string().datetime(),
  adults: z.number().int().min(1).max(10),
  children: z.number().int().min(0).max(10),
  hotelRoomSlug: z.string().min(1),
  guestName: z.string().trim().min(2).max(100),
  guestEmail: z.string().email(),
});

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return new NextResponse('STRIPE_SECRET_KEY is required', { status: 500 });
  }
  const stripe = new Stripe(stripeSecret);

  const parsedPayload = requestSchema.safeParse(await req.json());
  if (!parsedPayload.success) {
    return NextResponse.json(
      { message: 'Invalid request payload', issues: parsedPayload.error.issues },
      { status: 400 }
    );
  }

  const {
    checkinDate,
    checkoutDate,
    adults,
    children,
    hotelRoomSlug,
    guestName,
    guestEmail,
  } = parsedPayload.data;

  const appUrl = process.env.APP_URL;
  if (!appUrl) return new NextResponse('APP_URL is required', { status: 500 });

  const formattedCheckinDate = checkinDate.split('T')[0];
  const formattedCheckoutDate = checkoutDate.split('T')[0];

  try {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const dateDiff = checkout.getTime() - checkin.getTime();
    const numberOfDays = Math.ceil(dateDiff / (24 * 60 * 60 * 1000));

    if (!Number.isFinite(numberOfDays) || numberOfDays < 1 || numberOfDays > 365) {
      return new NextResponse('Invalid booking dates', { status: 400 });
    }

    const room = await getRoom(hotelRoomSlug);
    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice * numberOfDays;

    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: guestEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${room.name} — ${numberOfDays} night${numberOfDays > 1 ? 's' : ''}`,
              description: `Check-in: ${formattedCheckinDate} · Check-out: ${formattedCheckoutDate} · ${adults} adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''}`,
              images: room.images?.map((image: { url: string }) => image.url) ?? [],
            },
            unit_amount: Math.round(totalPrice * 100),
          },
        },
      ],
      payment_method_types: ['card'],
      // Redirect to booking confirmation page after payment
      success_url: `${appUrl}/booking-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/rooms/${hotelRoomSlug}`,
      metadata: {
        adults: String(adults),
        children: String(children),
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        hotelRoom: room._id,
        hotelRoomSlug,
        numberOfDays: String(numberOfDays),
        discount: String(room.discount),
        totalPrice: String(totalPrice),
        guestName,
        guestEmail,
      },
    });

    return NextResponse.json(stripeSession, { status: 200 });
  } catch (error) {
    console.error('Payment failed', error);
    return new NextResponse('Unable to create payment session', { status: 500 });
  }
}
