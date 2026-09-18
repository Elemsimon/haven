"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: <MapPin size={16} strokeWidth={1.5} />,
    label: "Address",
    value: "Route des Sommets 12\nCH-3920 Zermatt, Switzerland",
  },
  {
    icon: <Phone size={16} strokeWidth={1.5} />,
    label: "Telephone",
    value: "+41 27 678 0000",
    href: "tel:+41276780000",
  },
  {
    icon: <Mail size={16} strokeWidth={1.5} />,
    label: "Email",
    value: "hello@Ryan Hotel.com",
    href: "mailto:hello@ryanhotel.com",
  },
  {
    icon: <Clock size={16} strokeWidth={1.5} />,
    label: "Concierge Hours",
    value: "24 hours a day\n365 days a year",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    arrival: "",
    departure: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Your message has been received. We'll respond within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "", arrival: "", departure: "" });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-stone-900">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-[72px]">
        <div className="relative h-56 md:h-72 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80"
            alt="Contact Ryan Hotel"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-stone-900" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400 flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold-400" />
              Get In Touch
              <span className="w-8 h-px bg-gold-400" />
            </span>
            <h1 className="font-serif italic text-4xl md:text-6xl text-cream">
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Contact Info */}
          <div>
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold-500" />
              Reach Out
            </span>
            <h2 className="font-serif italic text-4xl md:text-5xl text-cream leading-tight mb-8">
              We Are Here
              <br />
              For You
            </h2>
            <p className="font-body text-sm text-stone-400 leading-[1.9] mb-12 max-w-md">
              Whether you have questions about your upcoming stay, wish to arrange
              a special experience, or simply want to know more about Ryan
              Heights — our team is at your service.
            </p>

            {/* Contact Details */}
            <div className="space-y-0 border border-white/5">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-5 p-6 border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors duration-200"
                >
                  <div className="text-gold-400 mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-body text-[9px] tracking-[0.25em] uppercase text-stone-600 mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-body text-sm text-stone-300 hover:text-gold-300 transition-colors duration-200 whitespace-pre-line"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-stone-300 whitespace-pre-line">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
{/*             <div className="mt-8 relative h-48 border border-white/10 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1598257006463-f1f6a7ca0500?w=800&q=60"
                alt="Zermatt, Switzerland"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass px-6 py-3 text-center">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/80">
                    Zermatt, Switzerland
                  </p>
                  <p className="font-body text-[9px] text-white/50 mt-0.5">
                    45°59&apos;N 7°44&apos;E · 2,200m altitude
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right: Contact Form */}
          <div>
            <div className="border border-white/10 p-8 md:p-10">
              <h3 className="font-serif italic text-2xl text-cream mb-8">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-500 block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean-Paul Martin"
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream placeholder-stone-600 outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-500 block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream placeholder-stone-600 outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Arrival + Departure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-500 block mb-2">
                      Intended Arrival
                    </label>
                    <input
                      type="date"
                      value={formData.arrival}
                      onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-500 block mb-2">
                      Intended Departure
                    </label>
                    <input
                      type="date"
                      value={formData.departure}
                      onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                      className="w-full bg-transparent border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-500 block mb-2">
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-stone-900 border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream outline-none transition-colors duration-300 appearance-none"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="reservation">Room Reservation</option>
                    <option value="special">Special Request / Occasion</option>
                    <option value="spa">Spa & Wellness Booking</option>
                    <option value="dining">Dining Reservation</option>
                    <option value="event">Private Event / Wedding</option>
                    <option value="other">General Enquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-500 block mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-transparent border border-white/10 focus:border-gold-500 px-4 py-3 font-body text-sm text-cream placeholder-stone-600 outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gold-500 hover:bg-gold-400 disabled:bg-stone-700 disabled:cursor-not-allowed text-stone-900 font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 group"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-stone-900/30 border-t-stone-900 rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <ArrowRight
                        size={14}
                        strokeWidth={2}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>

                <p className="font-body text-[10px] text-stone-600 text-center">
                  We respond to all enquiries within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
