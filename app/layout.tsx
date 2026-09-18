import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Ryan Hotel — Luxury Retreat",
  description:
    "Experience unparalleled luxury at Ryan Hotel. Nestled in the Alps, offering exquisite rooms, world-class spa, and breathtaking views.",
  keywords: "luxury hotel, Ryan Hotel",
  openGraph: {
    title: "Ryan Hotel",
    description: "Luxury Retreat in the Alps",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          toastOptions={{
            style: {
              background: "#1A1815",
              color: "#F5F0E8",
              border: "1px solid rgba(176,144,96,0.3)",
              fontFamily: "'Jost', sans-serif",
              fontSize: "13px",
              letterSpacing: "0.05em",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
