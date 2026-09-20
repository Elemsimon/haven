"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const experiences = [
  {
    id: 1,
    title: "Alpine Spa",
    subtitle: "Wellness & Restoration",
    description:
      "3,200 m² of thermal pools, hammam, and cryo-therapy set against a panoramic ice wall. Our resident naturopath crafts bespoke wellness journeys.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    tag: "Spa",
  },
  {
    id: 2,
    title: "Le Sommet",
    subtitle: "Fine Dining",
    description:
      "Three Michelin stars. Chef Laurent Moreau's cuisine celebrates the terroir of the Alps — local cheese, wild herbs, glacier water — reimagined with Parisian precision.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tag: "Dining",
  },
  {
    id: 3,
    title: "Guided Expeditions",
    subtitle: "Adventure & Discovery",
    description:
      "From dawn glacier hikes to private heliskiing, our mountain guides — world-class alpinists — design experiences that are safe, sublime, and unforgettable.",
    image: "/bar.webp",
    tag: "Experiences",
  },
];

export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".exp-item").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "none";
              }, i * 100);
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
    <section ref={sectionRef} id="experiences" className="py-28 md:py-40 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            Curated For You
            <span className="w-8 h-px bg-gold-500" />
          </span>
          <h2 className="font-serif italic text-5xl md:text-6xl text-cream leading-[1.1]">
            The New Haven Experience
          </h2>
        </div>

        {/* Experiences list */}
        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className={`exp-item grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/5 group cursor-pointer hover:border-white/10 transition-all duration-500 ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              {/* Image */}
              <div
                className={`relative h-64 md:h-80 overflow-hidden ${
                  i % 2 !== 0 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white/60 border border-white/20 px-3 py-1">
                    {exp.tag}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div
                className={`flex flex-col justify-center p-10 md:p-14 bg-stone-800 group-hover:bg-stone-750 transition-colors duration-300 ${
                  i % 2 !== 0 ? "md:order-1" : ""
                }`}
              >
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold-500 mb-3">
                  {exp.subtitle}
                </span>
                <h3 className="font-serif italic text-3xl md:text-4xl text-cream mb-5 leading-tight">
                  {exp.title}
                </h3>
                <p className="font-body text-sm text-stone-400 leading-[1.9] mb-8">
                  {exp.description}
                </p>
                <a
                  href="#booking"
                  className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-cream border-b border-gold-500 pb-1 w-fit hover:text-gold-300 hover:border-gold-300 transition-all duration-300 group/link"
                >
                  Learn more
                  <span className="group-hover/link:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
