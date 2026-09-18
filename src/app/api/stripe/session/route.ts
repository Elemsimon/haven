import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return new NextResponse("Missing session_id", { status: 400 });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return new NextResponse("Stripe not configured", { status: 500 });
  }

  try {
    const stripe = new Stripe(stripeSecret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const meta = session.metadata ?? {};

    return NextResponse.json({
      guestName: meta.guestName ?? "",
      guestEmail: meta.guestEmail ?? session.customer_email ?? "",
      roomName: meta.hotelRoomSlug ?? "Room",
      checkinDate: meta.checkinDate ?? "",
      checkoutDate: meta.checkoutDate ?? "",
      numberOfDays: Number(meta.numberOfDays ?? 0),
      adults: Number(meta.adults ?? 1),
      children: Number(meta.children ?? 0),
      totalPrice: Number(meta.totalPrice ?? 0),
    });
  } catch (err: any) {
    console.error("Stripe session fetch error:", err.message);
    return new NextResponse("Unable to retrieve session", { status: 500 });
  }
}
