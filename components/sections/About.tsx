"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-28 md:py-40 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <div
              className="reveal transition-all duration-700"
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-gold-500 inline-block" />
                Our Story
              </span>
            </div>

            <h2
              className="reveal font-serif italic text-5xl md:text-6xl text-cream leading-[1.1] mb-8 transition-all duration-700"
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
              Where the Alps
              <br />
              Meet Refinement
            </h2>

            <p
              className="reveal font-body text-sm leading-[1.9] text-stone-400 mb-6 transition-all duration-700"
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
              Perched at 2,200 metres above sea level, Geneza Hotel has been a sanctuary
              for discerning travellers since 1968. Our philosophy is simple: nature&apos;s
              grandeur deserves an equally extraordinary stage.
            </p>

            <p
              className="reveal font-body text-sm leading-[1.9] text-stone-400 mb-10 transition-all duration-700"
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
              Each suite is a considered composition of local stone, aged timber, and hand-woven
              textiles — a conversation between craft and comfort that honours the landscape
              beyond your window.
            </p>

            <div
              className="reveal transition-all duration-700"
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
              <a
                href="#rooms"
                className="inline-flex items-center gap-3 font-body text-xs tracking-[0.25em] uppercase text-cream border-b border-gold-500 pb-1 hover:text-gold-300 hover:border-gold-300 transition-all duration-300 group"
              >
                Discover our rooms
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-px bg-white/5">
            {[
              { value: "65", unit: "", label: "Curated Rooms" },
              { value: "2021", unit: "", label: "Est. Year" },
              { value: "4.2", unit: "", label: "Average Star" },
              { value: "65", unit: "", label: "On-site Guest Capacity" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="reveal bg-stone-900 p-8 md:p-10 flex flex-col justify-between gap-6 transition-all duration-700 group hover:bg-stone-800"
                style={{ opacity: 0, transform: "translateY(24px)" }}
              >
                <div className="w-6 h-px bg-gold-500" />
                <div>
                  <div className="font-serif text-4xl md:text-5xl text-cream">
                    {stat.value}
                    <span className="text-gold-500 text-2xl">{stat.unit}</span>
                  </div>
                  <div className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-500 mt-2">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
