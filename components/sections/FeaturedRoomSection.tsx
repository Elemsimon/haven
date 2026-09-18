import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Room } from "@/src/models/room";

export default function FeaturedRoomSection({ featuredRoom }: { featuredRoom: Room }) {
  return (
    <section className="py-20 md:py-32 bg-stone-800" id="featured">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Images */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-3">
            <div className="col-span-2 relative h-64 overflow-hidden">
              <Image
                src={featuredRoom.coverImage.url}
                alt={featuredRoom.name}
                fill
                className="object-cover"
              />
            </div>
            {featuredRoom.images?.slice(1, 3).map((img) => (
              <div key={img._key} className="relative h-40 overflow-hidden">
                <Image src={img.url} alt={img._key} fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="md:w-1/2">
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold-500" />
              Featured Room
            </span>
            <h2 className="font-serif italic text-4xl md:text-5xl text-cream mb-5 leading-tight">
              {featuredRoom.name}
            </h2>
            <p className="font-body text-sm text-stone-400 leading-[1.9] mb-8">
              {featuredRoom.description}
            </p>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="font-body text-xs text-stone-500">From</span>
              <span className="font-serif text-3xl text-cream">${featuredRoom.price}</span>
              <span className="font-body text-xs text-stone-500">/night</span>
              {featuredRoom.discount > 0 && (
                <span className="font-body text-[9px] tracking-[0.2em] uppercase bg-gold-500 text-stone-900 px-2 py-0.5 ml-2">
                  -{featuredRoom.discount}% off
                </span>
              )}
            </div>
            <Link
              href={`/rooms/${featuredRoom.slug.current}`}
              className="inline-flex items-center gap-3 font-body text-xs tracking-[0.25em] uppercase text-cream border-b border-gold-500 pb-1 hover:text-gold-300 hover:border-gold-300 transition-all duration-300 group"
            >
              View Room Details
              <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
