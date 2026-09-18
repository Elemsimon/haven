"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X, SlidersHorizontal } from "lucide-react";
import { Room } from "@/src/models/room";
import axios from "axios";

const staticRooms: Room[] = [
  { _id: "1", name: "Alpine Suite", type: "Suite", price: 68000, discount: 0, description: "Floor-to-ceiling windows frame the Matterhorn. Reclaimed oak floors, a wood-burning fireplace, and a deep soaking tub define this signature suite.", coverImage: { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" }, images: [], slug: { _type: "slug", current: "alpine-suite" }, isBooked: false, isFeatured: true, dimension: "65 m²", numberOfBeds: 1, offeredAmenities: [], specialNote: "" },
  { _id: "2", name: "Panorama Penthouse", type: "Suite", price: 110000, discount: 10, description: "Two levels of pure elevation. Private rooftop terrace with heated plunge pool and bespoke art collection.", coverImage: { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80" }, images: [], slug: { _type: "slug", current: "panorama-penthouse" }, isBooked: false, isFeatured: false, dimension: "140 m²", numberOfBeds: 2, offeredAmenities: [], specialNote: "" },
  { _id: "3", name: "Forest Studio", type: "Basic", price: 30000, discount: 5, description: "An intimate retreat wrapped in larch wood and natural stone. Perfect for solo travellers seeking stillness.", coverImage: { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80" }, images: [], slug: { _type: "slug", current: "forest-studio" }, isBooked: false, isFeatured: false, dimension: "42 m²", numberOfBeds: 1, offeredAmenities: [], specialNote: "" },
  { _id: "4", name: "Glacier Luxury Room", type: "Luxury", price: 85000, discount: 0, description: "Raw stone walls meet hand-stitched linens and curated alpine artwork. A study in understated luxury.", coverImage: { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80" }, images: [], slug: { _type: "slug", current: "glacier-luxury" }, isBooked: true, isFeatured: false, dimension: "80 m²", numberOfBeds: 1, offeredAmenities: [], specialNote: "" },
  { _id: "5", name: "Summit Villa", type: "Suite", price: 110000, discount: 0, description: "An entire private chalet perched at 2,200m. Private pool, sauna, chef's kitchen, and round-the-clock butler.", coverImage: { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80" }, images: [], slug: { _type: "slug", current: "summit-villa" }, isBooked: false, isFeatured: false, dimension: "220 m²", numberOfBeds: 3, offeredAmenities: [], specialNote: "" },
  { _id: "6", name: "Meadow Basic Room", type: "Basic", price: 30000, discount: 15, description: "Simple, serene, and impeccably appointed. The meadow room is where calm begins.", coverImage: { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" }, images: [], slug: { _type: "slug", current: "meadow-basic" }, isBooked: false, isFeatured: false, dimension: "35 m²", numberOfBeds: 1, offeredAmenities: [], specialNote: "" },
];

const roomTypes = ["All", "Basic", "Luxury", "Suite"];

export default function RoomsPageClient() {
  const searchParams = useSearchParams();
  const [roomTypeFilter, setRoomTypeFilter] = useState(searchParams.get("roomType") ?? "All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("searchQuery") ?? "");

  const { data: rooms, isLoading } = useSWR<Room[]>("/api/rooms-list", async () => {
    try {
      const { data } = await axios.get("/api/rooms-list");
      return data;
    } catch { return staticRooms; }
  }, { fallbackData: staticRooms });

  const filtered = (rooms ?? staticRooms).filter((room) => {
    const typeMatch = !roomTypeFilter || roomTypeFilter === "All" || room.type.toLowerCase() === roomTypeFilter.toLowerCase();
    const searchMatch = !searchQuery || room.name.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <>
      {/* Page Header */}
      <div className="relative pt-[72px]">
        <div className="relative h-56 md:h-72 overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80" alt="Ryanrooms" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-stone-900" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400 flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold-400" />Our Collection<span className="w-8 h-px bg-gold-400" />
            </span>
            <h1 className="font-serif italic text-4xl md:text-6xl text-cream">Rooms & Suites</h1>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b border-white/10 bg-stone-900/90 backdrop-blur sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={14} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input type="text" placeholder="Search rooms..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent border border-white/10 focus:border-gold-500 pl-10 pr-4 py-2.5 font-body text-sm text-cream placeholder-stone-500 outline-none transition-colors duration-300" />
              {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-cream"><X size={13} /></button>}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal size={13} strokeWidth={1.5} className="text-stone-500" />
              {roomTypes.map((type) => (
                <button key={type} onClick={() => setRoomTypeFilter(type)} className={`font-body text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 ${roomTypeFilter === type ? "border-gold-500 text-gold-400 bg-gold-500/10" : "border-white/10 text-stone-500 hover:border-white/30 hover:text-cream"}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif italic text-3xl text-stone-500">No rooms found</p>
            <button onClick={() => { setRoomTypeFilter("All"); setSearchQuery(""); }} className="mt-6 font-body text-xs tracking-[0.2em] uppercase text-gold-400 border-b border-gold-500 pb-0.5 hover:text-gold-300 transition-colors">Clear filters</button>
          </div>
        ) : (
          <>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-stone-500 mb-10">
              {filtered.length} {filtered.length === 1 ? "room" : "rooms"} available
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {filtered.map((room) => {
                const discountPrice = room.discount ? room.price - (room.price / 100) * room.discount : room.price;
                return (
                  <article key={room._id} className="bg-stone-900 group">
                    <div className="relative h-60 overflow-hidden">
                      <Image src={room.coverImage.url} alt={room.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                      {room.isBooked && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="font-body text-xs tracking-[0.3em] uppercase text-white/60 border border-white/20 px-4 py-2">Unavailable</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 glass px-3 py-1.5">
                        <span className="font-body text-xs text-white/70">from <span className="text-white font-medium">₦{discountPrice.toLocaleString("en-NG")}</span><span className="text-white/40">/night</span></span>
                      </div>
                      {room.discount > 0 && (
                        <div className="absolute top-4 left-4 bg-gold-500 px-2.5 py-1">
                          <span className="font-body text-[9px] tracking-[0.2em] uppercase text-stone-900 font-medium">-{room.discount}% off</span>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white/60 border border-white/20 px-3 py-1">{room.type}</span>
                      </div>
                    </div>
                    <div className="p-7 border border-white/5 border-t-0">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="font-serif italic text-xl text-cream">{room.name}</h2>
                        {room.dimension && <span className="font-body text-xs text-stone-500">{room.dimension}</span>}
                      </div>
                      <p className="font-body text-sm text-stone-500 leading-[1.8] mb-5 line-clamp-2">{room.description}</p>
                      {room.discount > 0 && <p className="font-body text-xs text-stone-600 line-through mb-1">₦{room.price.toLocaleString("en-NG")}/night</p>}
                      <Link href={`/rooms/${room.slug.current}`} className="flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-gold-400 hover:text-gold-300 transition-colors duration-300 group/link">
                        {room.isBooked ? "View Details" : "Book This Room"}
                        <ArrowRight size={13} strokeWidth={1.5} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
