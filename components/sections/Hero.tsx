"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";

// Booking bar dropdown options
const roomTypes = ["Apartment", "Suite", "Penthouse", "Villa", "Studio"];
const guestOptions = ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5+ Guests"];

export default function Hero() {
  const [date, setDate] = useState("");
  const [roomType, setRoomType] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col" id="hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero5.PNG"
          alt=" New Haven Hotel — relaxing in infinity pool with alpine mountain views"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
      </div>

      {/* Animated grain texture overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col flex-1 justify-between">
        {/* Title — centered, large */}
        <div className="flex-1 flex items-center justify-center px-6 pt-20">
          <div className="text-center">
            {/* Pre-title */}
            <p
              className="font-body text-xs tracking-[0.35em] uppercase text-white/60 mb-6 animate-fade-in"
              style={{ animationDelay: "200ms", animationFillMode: "both" }}
            >
               Luxury Since 2021
            </p>

            {/* Main heading — matching Figma: large italic serif */}
            <h1
              className="font-serif italic text-white leading-[1.05] animate-fade-up"
              style={{
                fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
                animationDelay: "350ms",
                animationFillMode: "both",
                textShadow: "0 2px 40px rgba(0,0,0,0.3)",
              }}
            >
              Explore New Haven
              <br />
                Hotel
            </h1>

            {/* Scroll hint */}
            <div
              className="mt-10 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
              style={{ animationDelay: "900ms", animationFillMode: "both" }}
            >
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40">
                Scroll
              </span>
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className="text-white/40 animate-bounce"
              />
            </div>
          </div>
        </div>

        {/* Booking Bar — bottom of hero, matching Figma */}
        <div id="booking" className="relative z-10">
          <div className="glass-dark border-t border-white/10">
            <div className="max-w-7xl mx-auto px-0">
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Date field */}
                <div className="relative px-8 py-5 flex flex-col gap-1 group">
                  <label className="font-body text-[10px] tracking-[0.25em] uppercase text-white/40 group-focus-within:text-gold-400 transition-colors duration-200">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent font-body text-sm text-white/70 placeholder-white/40 outline-none cursor-pointer appearance-none w-full [color-scheme:dark]"
                    aria-label="Select check-in date"
                  />
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-white/10 group-focus-within:bg-gold-500 transition-colors duration-300" />
                  {/* Dropdown caret */}
                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                  />
                </div>

                {/* Room Type */}
                <div className="relative px-8 py-5 flex flex-col gap-1 group">
                  <label
                    htmlFor="room-type"
                    className="font-body text-[10px] tracking-[0.25em] uppercase text-white/40 group-focus-within:text-gold-400 transition-colors duration-200"
                  >
                    Type
                  </label>
                  <select
                    id="room-type"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="bg-transparent font-body text-sm text-white/70 outline-none cursor-pointer appearance-none w-full"
                    aria-label="Select room type"
                  >
                    <option value="" disabled>
                      Apartment
                    </option>
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-white/10 group-focus-within:bg-gold-500 transition-colors duration-300" />
                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                  />
                </div>

                {/* Guests */}
                <div className="relative px-8 py-5 flex flex-col gap-1 group">
                  <label
                    htmlFor="guests"
                    className="font-body text-[10px] tracking-[0.25em] uppercase text-white/40 group-focus-within:text-gold-400 transition-colors duration-200"
                  >
                    Guests
                  </label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="bg-transparent font-body text-sm text-white/70 outline-none cursor-pointer appearance-none w-full"
                    aria-label="Select number of guests"
                  >
                    <option value="" disabled>
                      Number of guests
                    </option>
                    {guestOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-white/10 group-focus-within:bg-gold-500 transition-colors duration-300" />
                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                  />
                </div>

                {/* Booking CTA */}
                <div className="px-8 py-5 flex items-center justify-between md:justify-end">
                  <button
                    className="flex items-center gap-3 font-body text-sm tracking-[0.2em] uppercase text-white hover:text-gold-300 transition-all duration-300 group"
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (roomType) params.set("roomType", roomType);
                      window.location.href = `/rooms${params.toString() ? "?" + params.toString() : ""}`;
                    }}
                  >
                    <span>Booking</span>
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
