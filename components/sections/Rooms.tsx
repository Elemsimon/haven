"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const rooms = [
  {
    id: 1,
    name: "Alpine Suite",
    type: "Suite",
    size: "65 m²",
    view: "Mountain View",
    price: "₦68,000",
    description:
      "Floor-to-ceiling windows frame the Matterhorn. Reclaimed oak floors, a wood-burning fireplace, and a deep soaking tub define this signature suite.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    features: ["King Bed", "Private Terrace", "Butler Service"],
  },
  {
    id: 2,
    name: "Panorama Penthouse",
    type: "Penthouse",
    size: "140 m²",
    view: "360° Panorama",
    price: "₦110,000",
    description:
      "Two levels of pure elevation. Private rooftop terrace with heated plunge pool, chef's kitchen, and bespoke art collection curated for each stay.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    features: ["Rooftop Pool", "Private Chef", "Helipad Access"],
  },
  {
    id: 3,
    name: "Forest Studio",
    type: "Studio",
    size: "42 m²",
    view: "Forest View",
    price: "₦30,000",
    description:
      "An intimate retreat wrapped in larch wood and natural stone. Perfect for solo travellers seeking stillness and the scent of pine at dawn.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    features: ["Queen Bed", "Kitchenette", "Yoga Mat"],
  },
];

export default function Rooms() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".room-card").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="rooms" className="py-28 md:py-40 bg-stone-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold-500" />
              Accommodations
            </span>
            <h2 className="font-serif italic text-5xl md:text-6xl text-cream leading-[1.1]">
              Rooms & Suites
            </h2>
          </div>
          <a
            href="/rooms"
            className="flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-cream transition-colors duration-300 group self-start md:self-auto"
          >
            View all rooms
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </div>

        {/* Room cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {rooms.map((room) => (
            <article
              key={room.id}
              className="room-card bg-stone-800 group cursor-pointer transition-all duration-700"
              style={{ opacity: 0, transform: "translateY(32px)" }}
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={`${room.name} — ${room.view}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                {/* Price badge */}
                <div className="absolute top-4 right-4 glass px-3 py-1.5">
                  <span className="font-body text-xs text-white/80">
                    from{" "}
                    <span className="text-white font-medium">{room.price}</span>
                    <span className="text-white/50">/night</span>
                  </span>
                </div>
                {/* Type tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white/60 border border-white/20 px-3 py-1">
                    {room.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 border border-white/5 border-t-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif italic text-xl text-cream">
                    {room.name}
                  </h3>
                  <span className="font-body text-xs text-stone-500">
                    {room.size}
                  </span>
                </div>

                <p className="font-body text-sm text-stone-500 leading-[1.8] mb-5">
                  {room.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="font-body text-[9px] tracking-[0.2em] uppercase text-stone-500 border border-stone-700 px-2.5 py-1"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="/rooms"
                  className="flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-gold-400 hover:text-gold-300 transition-colors duration-300 group/link"
                >
                  Book this room
                  <ArrowRight
                    size={13}
                    strokeWidth={1.5}
                    className="group-hover/link:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
