"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".cta-reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-36 md:py-52 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero5.PNG"
          alt="New Haven Hotel exterior at dusk"
          fill
          className="object-cover object-center"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Decorative element */}
        <div
          className="cta-reveal flex items-center justify-center gap-4 mb-10 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <span className="w-12 h-px bg-gold-500/60" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold-400">
            Reserve Your Stay
          </span>
          <span className="w-12 h-px bg-gold-500/60" />
        </div>

        <h2
          className="cta-reveal font-serif italic text-5xl md:text-7xl text-cream leading-[1.1] mb-8 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          A World Apart,
          <br />
          Yet Close Enough
        </h2>

        <p
          className="cta-reveal font-body text-sm md:text-base text-stone-300 leading-[1.9] max-w-xl mx-auto mb-12 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          A world away from everything. Plan your escape
          to New Haven Hotel where the mountains do the talking and time
          gracefully slows.
        </p>

        <div
          className="cta-reveal flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <a
            href="/rooms"
            className="flex items-center gap-3 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-stone-900 font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 group"
          >
            Book Your Stay
            <ArrowRight
              size={14}
              strokeWidth={2}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/50 text-cream font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-white/5"
          >
            Speak With Us
          </a>
        </div>

        {/* Trust signals */}
        <div
          className="cta-reveal mt-16 flex flex-wrap items-center justify-center gap-8 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {["Best Luxury Hotel 2024 — Condé Nast", "★★★★★ on TripAdvisor", "3 Michelin Stars"].map(
            (badge) => (
              <span key={badge} className="font-body text-[10px] tracking-[0.2em] uppercase text-white/30">
                {badge}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
