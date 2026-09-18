"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "/pool.webp",
    alt: "Infinity pool overlooking the Alps at sunset",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    alt: "Luxury alpine suite interior with mountain view",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    alt: "Spa wellness area with alpine views",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    alt: "Fine dining restaurant Le Sommet",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "/bar.webp",
    alt: "Mountain hiking experience at Ryan",
    span: "col-span-1 row-span-1",
  },
/*   {
    id: 6,
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
    alt: "Cozy fireplace lounge at Ryan Hotel",
    span: "col-span-2 row-span-1",
  }, */
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string }>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".gallery-item").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "scale(1)";
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="py-28 md:py-40 bg-stone-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold-500" />
              Visual Journey
            </span>
            <h2 className="font-serif italic text-5xl md:text-6xl text-cream leading-[1.1]">
              Gallery
            </h2>
          </div>
          <p className="font-body text-sm text-stone-400 max-w-xs">
            A glimpse into the world of Ryan— where every frame is worthy of the wall.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[200px]">
          {galleryImages.map((img) => (
            <button
              key={img.id}
              className={`gallery-item relative overflow-hidden cursor-pointer group transition-all duration-700 ${img.span}`}
              style={{ opacity: 0, transform: "scale(0.97)" }}
              onClick={() => setLightbox({ src: img.src, alt: img.alt })}
              aria-label={`View: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/80 border border-white/30 px-4 py-2">
                  View
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <X size={24} strokeWidth={1.2} />
          </button>
          <div
            className="relative w-full max-w-4xl max-h-[85vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src.replace("w=600", "w=1200").replace("w=800", "w=1600")}
              alt={lightbox.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-xs text-white/40 tracking-wider text-center">
            {lightbox.alt}
          </p>
        </div>
      )}
    </section>
  );
}
