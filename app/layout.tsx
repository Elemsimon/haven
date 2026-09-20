import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Haven Hotel — Luxury Retreat",
  description:
    "Experience unparalleled luxury at New Haven Hotel. Nestled in the Alps, offering exquisite rooms, world-class spa, and breathtaking views.",
  keywords: "luxury hotel, New Haven Hotel",
  openGraph: {
    title: "New Haven Hotel",
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
