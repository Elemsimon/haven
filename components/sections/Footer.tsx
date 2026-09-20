import Link from "next/link";
import { ArrowRight } from "lucide-react";

const footerLinks = {
  Hotel: [
    { label: "Our Story", href: "/#about" },
    { label: "Rooms & Suites", href: "/rooms" },
    { label: "Dining", href: "/#experiences" },
    { label: "Spa & Wellness", href: "/#experiences" },
    { label: "Gallery", href: "/#gallery" },
  ],
  Experiences: [
    { label: "Skiing & Heliskiing", href: "/contact" },
    { label: "Hiking & Climbing", href: "/contact" },
    { label: "Private Events", href: "/contact" },
    { label: "Helicopter Tours", href: "/contact" },
  ],
  Services: [
    { label: "Concierge", href: "/contact" },
    { label: "Airport Transfer", href: "/contact" },
    { label: "Private Chef", href: "/contact" },
    { label: "Wedding Planning", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-stone-900 border-t border-white/5">
      {/* Newsletter */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h3 className="font-serif italic text-2xl text-cream mb-1">Stay in the know</h3>
              <p className="font-body text-sm text-stone-500">Seasonal offers, exclusive events, and stories from the Alps.</p>
            </div>
            <div className="flex items-stretch border border-white/10 max-w-md w-full">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-5 py-3.5 font-body text-sm text-cream placeholder-stone-600 outline-none"
                aria-label="Email for newsletter"
              />
              <button className="px-6 bg-gold-500 hover:bg-gold-400 transition-colors duration-300 flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-stone-900 group">
                Subscribe
                <ArrowRight size={13} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-3xl italic text-cream hover:text-gold-300 transition-colors duration-300 block mb-4">
              New Haven Hotel
            </Link>
            <p className="font-body text-xs text-stone-500 leading-[1.8] mb-6">
              New Haven Hotel<br />
              2 Vista Oge Crescent,<br />
              Abakaliki 480108<br />
              Ebonyi
            </p>
            <a href="tel:+41276780000" className="font-body text-xs text-stone-400 hover:text-cream transition-colors duration-300 block mb-1">+41 27 678 0000</a>
            <a href="mailto:hello@newhavenhotel.com" className="font-body text-xs text-stone-400 hover:text-cream transition-colors duration-300 block">hello@newhavenhotel.com</a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="font-body text-xs text-stone-400 hover:text-cream transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-stone-600">
            © {new Date().getFullYear()} New Haven Hotel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Instagram", "Facebook", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 hover:text-stone-400 transition-colors duration-200">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
