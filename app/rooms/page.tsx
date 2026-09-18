import { Suspense } from "react";
import RoomsPageClient from "./RoomsPageClient";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-stone-900">
      <Navbar />
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
        </div>
      }>
        <RoomsPageClient />
      </Suspense>
      <Footer />
    </div>
  );
}
