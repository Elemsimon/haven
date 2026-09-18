import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center px-6 text-center">
      {/* Logo */}
      <Link href="/" className="font-serif text-3xl italic text-cream hover:text-gold-300 transition-colors duration-300 mb-16">
        Ryan
      </Link>

      {/* Number */}
      <p className="font-serif italic text-[10rem] md:text-[16rem] leading-none text-white/5 select-none mb-0 -mb-8 md:-mb-16">
        404
      </p>

      {/* Message */}
      <div className="relative z-10">
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-px bg-gold-500" />
          Page Not Found
          <span className="w-8 h-px bg-gold-500" />
        </span>
        <h1 className="font-serif italic text-4xl md:text-5xl text-cream mb-4">
          Off the Beaten Path
        </h1>
        <p className="font-body text-sm text-stone-400 max-w-sm mx-auto mb-10">
          This page doesn&apos;t exist. Perhaps you were looking for one of our
          alpine suites instead?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-stone-900 font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 group"
          >
            Return Home
            <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/rooms"
            className="flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:border-white/30 text-cream font-body text-xs tracking-[0.25em] uppercase transition-all duration-300"
          >
            Browse Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
