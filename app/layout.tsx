import { Analytics } from "@vercel/analytics/next";
import { Amiri_Quran, Inter, Overpass_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

import { BASE_URL, SITE_NAME } from "@/app/config/constants";

import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const overpassMono = Overpass_Mono({
  variable: "--font-overpass-mono",
  subsets: ["latin"],
});

const amiriQuran = Amiri_Quran({
  variable: "--font-amiri-quran",
  subsets: ["arabic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Hi, Saya Rahmat Hidayatullah, Frontend Developer.",
  description:
    "Saya merancang dan mengembangkan aplikasi web yang fungsional, responsif, dan enak dipakai.",
  openGraph: {
    title: "Hi, Saya Rahmat Hidayatullah, Frontend Developer.",
    description:
      "Saya merancang dan mengembangkan aplikasi web yang fungsional, responsif, dan enak dipakai.",
    siteName: SITE_NAME,
    url: "/",
    images: "/opengraph-image.png",
    locale: "id",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${interSans.variable} ${overpassMono.variable} ${amiriQuran.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
