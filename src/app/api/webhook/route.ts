import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBooking, updateHotelRoom } from '@/src/libs/apis-server';

const checkout_session_completed = 'checkout.session.completed';

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return new NextResponse('STRIPE_SECRET_KEY is required', { status: 500 });
  }
  const stripe = new Stripe(stripeSecret);

  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return new NextResponse('Missing stripe signature configuration', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  switch (event.type) {
    case checkout_session_completed: {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata ?? {};

      const {
        adults,
        checkinDate,
        checkoutDate,
        children,
        hotelRoom,
        numberOfDays,
        discount,
        totalPrice,
        guestName,
        guestEmail,
      } = metadata;

      if (!checkinDate || !checkoutDate || !hotelRoom || !numberOfDays) {
        return new NextResponse('Webhook metadata missing', { status: 400 });
      }

      // Create booking — no user ID required (guest checkout)
      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        // Pass guest info as the "user" field using their email
        user: guestEmail || session.customer_email || 'guest',
        guestName: guestName || 'Guest',
        guestEmail: guestEmail || session.customer_email || '',
      });

      await updateHotelRoom(hotelRoom);

      return NextResponse.json('Booking successful', { status: 200 });
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json('Event Received', { status: 200 });
}
