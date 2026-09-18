"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-stone-900 flex flex-col items-center justify-center px-6 text-center">
        <span className="font-serif text-3xl italic text-cream mb-12">Ryan</span>
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-px bg-gold-500" />
          Something went wrong
          <span className="w-8 h-px bg-gold-500" />
        </span>
        <h2 className="font-serif italic text-4xl text-cream mb-4">
          An Unexpected Error
        </h2>
        <p className="font-body text-sm text-stone-400 max-w-sm mx-auto mb-10">
          We apologise for the inconvenience. Our team has been notified.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-stone-900 font-body text-xs tracking-[0.25em] uppercase transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 border border-white/10 hover:border-white/30 text-cream font-body text-xs tracking-[0.25em] uppercase transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
