"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Calendar, Users, Mail } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import axios from "axios";

// ── Confirmation content (needs useSearchParams → must be in Suspense) ──────
function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [details, setDetails] = useState<{
    guestName: string;
    guestEmail: string;
    roomName: string;
    checkinDate: string;
    checkoutDate: string;
    numberOfDays: number;
    adults: number;
    children: number;
    totalPrice: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }
    // Fetch session details from our API to show confirmation info
    axios
      .get(`/api/stripe/session?session_id=${sessionId}`)
      .then((res) => setDetails(res.data))
      .catch(() => setDetails(null))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-0 py-24 text-center">
      {/* Success icon */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-full border border-gold-500/30 flex items-center justify-center">
          <CheckCircle size={36} strokeWidth={1.2} className="text-gold-400" />
        </div>
      </div>

      {/* Heading */}
      <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 flex items-center justify-center gap-3 mb-4">
        <span className="w-8 h-px bg-gold-500" />
        Booking Confirmed
        <span className="w-8 h-px bg-gold-500" />
      </span>
      <h1 className="font-serif italic text-4xl md:text-5xl text-cream mb-5 leading-tight">
        {details?.guestName
          ? `Thank you, ${details.guestName.split(" ")[0]}`
          : "Your stay is confirmed"}
      </h1>
      <p className="font-body text-sm text-stone-400 leading-[1.9] mb-10 max-w-md mx-auto">
        Your reservation at Geneza Hotel has been confirmed. A confirmation
        email has been sent to{" "}
        <span className="text-cream">{details?.guestEmail ?? "your email address"}</span>.
        Our concierge team will be in touch within 24 hours.
      </p>

      {/* Booking summary card */}
      {details && (
        <div className="border border-white/10 text-left mb-10">
          <div className="p-6 border-b border-white/10">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-1">
              Room
            </p>
            <p className="font-serif italic text-xl text-cream">{details.roomName}</p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-white/10">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={11} strokeWidth={1.5} className="text-gold-400" />
                <p className="font-body text-[9px] tracking-[0.25em] uppercase text-stone-500">Check-in</p>
              </div>
              <p className="font-body text-sm text-cream">
                {new Date(details.checkinDate).toLocaleDateString("en-US", {
                  weekday: "short", day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={11} strokeWidth={1.5} className="text-gold-400" />
                <p className="font-body text-[9px] tracking-[0.25em] uppercase text-stone-500">Check-out</p>
              </div>
              <p className="font-body text-sm text-cream">
                {new Date(details.checkoutDate).toLocaleDateString("en-US", {
                  weekday: "short", day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Users size={11} strokeWidth={1.5} className="text-gold-400" />
                <p className="font-body text-[9px] tracking-[0.25em] uppercase text-stone-500">Guests</p>
              </div>
              <p className="font-body text-sm text-cream">
                {details.adults} adult{details.adults > 1 ? "s" : ""}
                {details.children > 0 ? `, ${details.children} child${details.children > 1 ? "ren" : ""}` : ""}
              </p>
            </div>
            <div className="p-6">
              <p className="font-body text-[9px] tracking-[0.25em] uppercase text-stone-500 mb-1">Total Paid</p>
              <p className="font-serif text-2xl text-cream">${details.totalPrice.toLocaleString()}</p>
            </div>
          </div>
          {details.guestEmail && (
            <div className="p-5 border-t border-white/10 flex items-center gap-2 text-stone-500">
              <Mail size={11} strokeWidth={1.5} className="text-gold-400" />
              <p className="font-body text-xs">
                Confirmation sent to <span className="text-stone-300">{details.guestEmail}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* No session ID — generic success */}
      {!details && !loading && (
        <div className="border border-white/10 p-8 mb-10">
          <p className="font-body text-sm text-stone-400">
            Your payment was successful and your booking is confirmed.
            Please check your email for details.
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/rooms"
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-stone-900 font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 group"
        >
          Explore More Rooms
          <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:border-white/30 text-cream font-body text-xs tracking-[0.25em] uppercase transition-all duration-300"
        >
          Contact Concierge
        </Link>
      </div>
    </div>
  );
}

// ── Page wrapper ──────────────────────────────────────────────────────────
export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-stone-900">
      <Navbar />
      <div className="pt-[72px]">
        {/* Hero banner */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=60"
            alt="Geneza Hotel"
            fill
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 to-stone-900" />
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            </div>
          }
        >
          <ConfirmationContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
