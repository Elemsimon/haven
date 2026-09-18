import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Rooms from "@/components/sections/Rooms";
import Experiences from "@/components/sections/Experiences";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import FeaturedRoomSection from "@/components/sections/FeaturedRoomSection";
import { getFeaturedRoom } from "@/src/libs/apis";

export default async function Home() {
  let featuredRoom = null;
  try {
    featuredRoom = await getFeaturedRoom();
  } catch {
    // Gracefully degrade if Sanity not configured
  }

  return (
    <main className="relative min-h-screen bg-stone-900">
      <Navbar />
      <Hero />
      <About />
      {featuredRoom && <FeaturedRoomSection featuredRoom={featuredRoom} />}
      <Rooms />
      <Experiences />
      <Gallery />
      <CTA />
      <Footer />
    </main>
  );
}
