import type { Metadata } from "next";
import { Inter, Overpass_Mono } from "next/font/google";

import { BASE_URL } from "./constants";
import { FooterCopyrights } from "@/app/components/FooterCopyrights";
import { Navbar } from "@/app/components/Navbar";

import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const overpassMono = Overpass_Mono({
  variable: "--font-overpass-mono",
  subsets: ["latin"],
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
    siteName: "HiRahmat.Dev | Frontend Developer",
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
        className={`${interSans.variable} ${overpassMono.variable} antialiased`}
      >
        <Navbar />
        <main tabIndex={-1}>{children}</main>
        <footer tabIndex={-1}>
          <FooterCopyrights />
        </footer>
      </body>
    </html>
  );
}
