"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Dining", href: "/#experiences" },
  { label: "Spa & Wellness", href: "/#experiences" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark shadow-lg" : ""
        }`}
      >
        <nav className="flex items-center justify-between h-[72px] border-b border-white/10">
          {/* Menu toggle */}
          <div className="flex items-center h-full border-r border-white/10">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-3 px-6 h-full text-white/80 hover:text-white transition-colors duration-200 font-body text-xs tracking-[0.2em] uppercase"
              aria-label="Open menu"
            >
              <Menu size={16} strokeWidth={1.5} />
              <span>Menu</span>
            </button>
          </div>

          {/* Language */}
          <div className="hidden md:flex items-center h-full border-r border-white/10 px-6">
            <div className="flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase">
              <button className="text-white hover:text-gold-300 transition-colors duration-200">EN</button>
              <span className="text-white/30">/</span>
              <button className="text-white/50 hover:text-white transition-colors duration-200">FR</button>
            </div>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="font-serif text-2xl italic text-white tracking-wide hover:text-gold-300 transition-colors duration-300"
            >
              New Haven Hotel
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center h-full ml-auto">
            <Link
              href="/contact"
              className="hidden md:flex items-center px-8 h-full border-l border-white/10 font-body text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-200"
            >
              Contacts
            </Link>
            <Link
              href="/rooms"
              className="flex items-center gap-3 px-6 md:px-8 h-full border-l border-white/10 font-body text-xs tracking-[0.2em] uppercase text-white hover:text-gold-300 transition-colors duration-200 group"
            >
              <span>Booking</span>
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </div>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(20,18,15,0.97)" }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 p-3 text-white/60 hover:text-white transition-colors duration-200"
          aria-label="Close menu"
        >
          <X size={24} strokeWidth={1.2} />
        </button>

        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <span className="font-serif text-2xl italic text-white">New Haven</span>
        </div>

        <div className="flex flex-col items-center justify-center h-full gap-1">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`font-serif text-4xl md:text-6xl italic text-white/70 hover:text-white transition-all duration-300 py-2 hover-line ${
                menuOpen ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
            >
              {item.label}
            </Link>
          ))}

          <div className="absolute bottom-12 flex items-center gap-6 font-body text-xs tracking-[0.2em] uppercase text-white/40">
            <Link href="/rooms" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
              Book Now
            </Link>
            <span className="w-px h-4 bg-white/20" />
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <span className="w-px h-4 bg-white/20" />
            <span className="flex gap-2">
              <button className="hover:text-white transition-colors">EN</button>
              <span>/</span>
              <button className="hover:text-white transition-colors">FR</button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
