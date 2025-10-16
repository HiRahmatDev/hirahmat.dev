import type { Metadata } from "next";
import { Inter, Overpass_Mono } from "next/font/google";

import { FooterContactCTA } from "./components/FooterContactCTA";
import { FooterCopyrights } from "./components/FooterCopyrights";
import { Navbar } from "./components/Navbar";

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
  title: "Hi, Saya Rahmat Hidayatullah, Frontend Developer.",
  description:
    "Saya merancang dan mengembangkan aplikasi web yang fungsional, responsif, dan enak dipakai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${overpassMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <footer>
          <FooterContactCTA />
          <FooterCopyrights />
        </footer>
      </body>
    </html>
  );
}
