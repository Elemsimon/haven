"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";

/**
 * Sanity Studio — only loads when Sanity env vars are configured.
 * To use: set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * then visit /studio
 */
export default function StudioPage() {
  useEffect(() => {
    // Redirect to Sanity Manage if project ID is set
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId && projectId !== "demo") {
      window.location.href = `https://sanity.io/manage/project/${projectId}`;
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-serif text-3xl italic text-cream">New Haven Hotel</span>
      <div>
        <h1 className="font-serif italic text-2xl text-cream mb-3">CMS Studio</h1>
        <p className="font-body text-sm text-stone-400 max-w-sm">
          Configure <code className="text-gold-400 text-xs bg-stone-800 px-1.5 py-0.5">NEXT_PUBLIC_SANITY_PROJECT_ID</code> in{" "}
          <code className="text-gold-400 text-xs bg-stone-800 px-1.5 py-0.5">.env.local</code> to enable the CMS.
        </p>
      </div>
      <a
        href="https://sanity.io/manage"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-xs tracking-[0.2em] uppercase text-gold-400 border-b border-gold-500 pb-0.5 hover:text-gold-300 transition-colors"
      >
        Open Sanity Manage →
      </a>
    </div>
  );
}
