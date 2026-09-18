"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  Maximize,
  Star,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Mail,
} from "lucide-react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Room } from "@/src/models/room";
import { loadStripe } from "@stripe/stripe-js";

// ── Photo Lightbox ──────────────────────────────────────────────────────────
function PhotoGallery({ photos }: { photos: { url: string; _key: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  if (!photos?.length) return null;
  const prev = () => setCurrentIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] md:h-[520px]">
        <div
          className="col-span-4 md:col-span-3 row-span-2 relative overflow-hidden cursor-pointer group"
          onClick={() => { setCurrentIndex(0); setModalOpen(true); }}
        >
          <Image src={photos[0].url} alt="Room main photo" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
        </div>
        {photos.slice(1, 3).map((photo, i) => (
          <div
            key={photo._key}
            className="hidden md:block relative overflow-hidden cursor-pointer group"
            onClick={() => { setCurrentIndex(i + 1); setModalOpen(true); }}
          >
            <Image src={photo.url} alt={`Room photo ${i + 2}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            {i === 1 && photos.length > 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="font-body text-sm text-white">+{photos.length - 3} more</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <button className="absolute top-5 right-5 text-white/60 hover:text-white" onClick={() => setModalOpen(false)}>
            <X size={24} strokeWidth={1.2} />
          </button>
          <button className="absolute left-5 text-white/60 hover:text-white p-2" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={32} strokeWidth={1.2} />
          </button>
          <div className="relative w-full max-w-5xl max-h-[88vh] aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[currentIndex].url} alt={`Photo ${currentIndex + 1}`} fill className="object-contain" />
          </div>
          <button className="absolute right-5 text-white/60 hover:text-white p-2" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={32} strokeWidth={1.2} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs text-white/40 tracking-widest">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}

// ── Star Rating display ─────────────────────────────────────────────────────
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className={i <= count ? "fill-gold-400 text-gold-400" : "text-stone-700"} />
      ))}
    </div>
  );
}

// ── Demo fallback room ──────────────────────────────────────────────────────
const getDemoRoom = (slug: string): Room => ({
  _id: "demo",
  name: "Alpine Suite",
  type: "Suite",
  price: 680,
  discount: 0,
  description:
    "Floor-to-ceiling windows frame the Matterhorn. Reclaimed oak floors, a wood-burning fireplace, and a deep soaking tub define this signature suite.",
  coverImage: { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85" },
  images: [
    { _key: "1", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85" },
    { _key: "2", url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80" },
    { _key: "3", url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80" },
  ],
  slug: { _type: "slug", current: slug },
  isBooked: false,
  isFeatured: true,
  dimension: "65 m²",
  numberOfBeds: 1,
  specialNote: "Early check-in available on request. Complimentary bottle of Valais wine upon arrival.",
  offeredAmenities: [
    { _key: "a1", amenity: "Mountain View", icon: "fa-mountain" },
    { _key: "a2", amenity: "Fireplace", icon: "fa-fire" },
    { _key: "a3", amenity: "Private Terrace", icon: "fa-sun" },
    { _key: "a4", amenity: "Butler Service", icon: "fa-bell-concierge" },
    { _key: "a5", amenity: "Mini Bar", icon: "fa-wine-glass" },
    { _key: "a6", amenity: "Spa Access", icon: "fa-spa" },
  ],
});

// ── Main page ───────────────────────────────────────────────────────────────
export default function RoomDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  // Booking form state
  const [checkinDate, setCheckinDate]   = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults]             = useState(1);
  const [children, setChildren]         = useState(0);
  const [guestName, setGuestName]       = useState("");
  const [guestEmail, setGuestEmail]     = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch room from Sanity (falls back to demo data)
  const { data: room, isLoading } = useSWR<Room>(
    slug ? `/api/rooms/${slug}` : null,
    async () => {
      try {
        const { data } = await axios.get<Room>(`/api/rooms/${slug}`);
        return data ?? getDemoRoom(slug);
      } catch {
        return getDemoRoom(slug);
      }
    },
    { fallbackData: getDemoRoom(slug) }
  );

  const displayRoom = room ?? getDemoRoom(slug);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const calcMinCheckout = () => {
    if (!checkinDate) return null;
    const d = new Date(checkinDate);
    d.setDate(d.getDate() + 1);
    return d;
  };

  const nights = (() => {
    if (!checkinDate || !checkoutDate) return 0;
    return Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / 86400000);
  })();

  const discountPrice =
    displayRoom.discount > 0
      ? displayRoom.price - (displayRoom.price / 100) * displayRoom.discount
      : displayRoom.price;

  const totalPrice = nights * discountPrice;

  // ── Stripe Checkout ───────────────────────────────────────────────────────
  const handleBookNow = async () => {
    if (!checkinDate || !checkoutDate) return toast.error("Please select check-in and check-out dates");
    if (checkinDate >= checkoutDate)   return toast.error("Check-out must be after check-in");
    if (!guestName.trim())             return toast.error("Please enter your name");
    if (!guestEmail.trim())            return toast.error("Please enter your email address");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) return toast.error("Please enter a valid email address");

    setIsSubmitting(true);
    try {
      const { data: session } = await axios.post("/api/stripe", {
        checkinDate: checkinDate.toISOString(),
        checkoutDate: checkoutDate.toISOString(),
        adults,
        children,
        hotelRoomSlug: displayRoom.slug.current,
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim().toLowerCase(),
      });

      const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!stripeKey) {
        // Dev mode — show success toast instead of real redirect
        toast.success("Booking created! (Stripe not configured in dev mode)");
        setIsSubmitting(false);
        return;
      }
      const stripe = await loadStripe(stripeKey);
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-900">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900">
      <Navbar />

      <div className="pt-[72px]">
        {/* Gallery */}
        <PhotoGallery
          photos={
            displayRoom.images?.length
              ? displayRoom.images
              : [{ _key: "cover", url: displayRoom.coverImage.url }]
          }
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-10">
            <Link
              href="/rooms"
              className="flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-stone-500 hover:text-cream transition-colors duration-200 group"
            >
              <ArrowLeft size={13} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
              All Rooms
            </Link>
            <span className="text-stone-700">/</span>
            <span className="font-body text-xs tracking-[0.2em] uppercase text-stone-400">{displayRoom.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* ── Left: Room details ── */}
            <div className="lg:col-span-7">
              {/* Title block */}
              <div className="mb-8">
                <span className="font-body text-[9px] tracking-[0.3em] uppercase text-gold-500 border border-gold-500/30 px-3 py-1 mb-4 inline-block">
                  {displayRoom.type}
                </span>
                <h1 className="font-serif italic text-4xl md:text-5xl text-cream mt-3 mb-4 leading-tight">
                  {displayRoom.name}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-stone-500">
                  {displayRoom.dimension && (
                    <span className="flex items-center gap-2 font-body text-xs">
                      <Maximize size={12} strokeWidth={1.5} /> {displayRoom.dimension}
                    </span>
                  )}
                  {displayRoom.numberOfBeds > 0 && (
                    <span className="flex items-center gap-2 font-body text-xs">
                      <Bed size={12} strokeWidth={1.5} />
                      {displayRoom.numberOfBeds} {displayRoom.numberOfBeds === 1 ? "Bed" : "Beds"}
                    </span>
                  )}
                  <StarRating count={5} />
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <div className="w-8 h-px bg-gold-500 mb-6" />
                <p className="font-body text-sm text-stone-400 leading-[1.95]">
                  {displayRoom.description}
                </p>
              </div>

              {/* Special note */}
              {displayRoom.specialNote && (
                <div className="mb-10 border border-gold-500/20 bg-gold-500/5 p-6">
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold-500 mb-2">
                    Concierge Note
                  </p>
                  <p className="font-body text-sm text-stone-400 leading-relaxed italic">
                    {displayRoom.specialNote}
                  </p>
                </div>
              )}

              {/* Amenities */}
              {displayRoom.offeredAmenities?.length > 0 && (
                <div className="mb-10">
                  <h3 className="font-serif italic text-2xl text-cream mb-6">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {displayRoom.offeredAmenities.map((a: any) => (
                      <div key={a._key} className="flex items-center gap-3 border border-white/5 p-4 hover:border-white/10 transition-colors">
                        <i className={`fa-solid ${a.icon} text-gold-400 text-sm w-4 text-center`} />
                        <span className="font-body text-xs text-stone-400">{a.amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety */}
              <div className="mb-10">
                <h3 className="font-serif italic text-2xl text-cream mb-6 flex items-center gap-3">
                  <Shield size={18} strokeWidth={1.2} className="text-gold-400" />
                  Safety & Hygiene
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <MdOutlineCleaningServices className="text-gold-400" />, label: "Daily Housekeeping" },
                    { icon: <LiaFireExtinguisherSolid className="text-gold-400" />, label: "Fire Extinguishers" },
                    { icon: <AiOutlineMedicineBox className="text-gold-400" />, label: "Sterilization Protocol" },
                    { icon: <GiSmokeBomb className="text-gold-400" />, label: "Smoke Detectors" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 border border-white/5 p-4">
                      <span className="text-sm">{item.icon}</span>
                      <span className="font-body text-xs text-stone-400">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Booking panel ── */}
            <div className="lg:col-span-5">
              <div className="border border-white/10 p-8 sticky top-24">

                {/* Price header */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-3">
                    {displayRoom.discount > 0 && (
                      <span className="font-body text-sm text-stone-600 line-through">${displayRoom.price}</span>
                    )}
                    <span className="font-serif text-4xl text-cream">${discountPrice}</span>
                    <span className="font-body text-xs text-stone-500">/night</span>
                  </div>
                  {displayRoom.discount > 0 && (
                    <div className="mt-2 inline-flex">
                      <span className="font-body text-[9px] tracking-[0.2em] uppercase bg-gold-500 text-stone-900 px-2.5 py-0.5">
                        {displayRoom.discount}% discount applied
                      </span>
                    </div>
                  )}
                </div>

                {/* Date pickers */}
                <div className="space-y-4 mb-5">
                  <div>
                    <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 block mb-2">
                      Check-in
                    </label>
                    <DatePicker
                      selected={checkinDate}
                      onChange={(date: Date | null) => {
                        setCheckinDate(date);
                        if (checkoutDate && date && checkoutDate <= date) setCheckoutDate(null);
                      }}
                      dateFormat="dd MMM yyyy"
                      minDate={new Date()}
                      placeholderText="Select date"
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream placeholder-stone-600 outline-none [color-scheme:dark] transition-colors duration-300 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 block mb-2">
                      Check-out
                    </label>
                    <DatePicker
                      selected={checkoutDate}
                      onChange={(date: Date | null) => setCheckoutDate(date)}
                      dateFormat="dd MMM yyyy"
                      disabled={!checkinDate}
                      minDate={calcMinCheckout() ?? undefined}
                      placeholderText="Select date"
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream placeholder-stone-600 outline-none [color-scheme:dark] disabled:opacity-40 transition-colors duration-300 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 block mb-2">Adults</label>
                    <input
                      type="number" value={adults} min={1} max={5}
                      onChange={(e) => setAdults(Math.max(1, Math.min(5, +e.target.value)))}
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 block mb-2">Children</label>
                    <input
                      type="number" value={children} min={0} max={3}
                      onChange={(e) => setChildren(Math.max(0, Math.min(3, +e.target.value)))}
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Guest details — no login required */}
                <div className="space-y-4 mb-5 pt-5 border-t border-white/10">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">
                    Your Details
                  </p>
                  <div className="relative">
                    <User size={13} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Full name"
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 pl-10 pr-4 py-3 font-body text-sm text-cream placeholder-stone-600 outline-none transition-colors duration-300"
                    />
                  </div>
                  <div className="relative">
                    <Mail size={13} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 pl-10 pr-4 py-3 font-body text-sm text-cream placeholder-stone-600 outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Price summary */}
                {nights > 0 && (
                  <div className="mb-5 pb-5 border-b border-white/10 space-y-2">
                    <div className="flex justify-between font-body text-xs text-stone-500">
                      <span>${discountPrice} × {nights} night{nights > 1 ? "s" : ""}</span>
                      <span className="text-cream">${totalPrice.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-body text-xs text-stone-500">Total</span>
                      <span className="font-serif text-2xl text-cream">${totalPrice.toFixed(0)}</span>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={handleBookNow}
                  disabled={displayRoom.isBooked || isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gold-500 hover:bg-gold-400 disabled:bg-stone-700 disabled:cursor-not-allowed text-stone-900 font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 group"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-stone-900/30 border-t-stone-900 rounded-full animate-spin" />
                  ) : displayRoom.isBooked ? (
                    "Room Unavailable"
                  ) : (
                    <>
                      Proceed to Payment
                      <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Trust signals */}
                <div className="mt-5 space-y-2">
                  <p className="font-body text-[10px] text-stone-600 text-center">
                    🔒 Secure payment via Stripe · No account required
                  </p>
                  <p className="font-body text-[10px] text-stone-600 text-center">
                    Free cancellation up to 48 hours before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
