"use client";

import { Mail } from "lucide-react";
import { EMAIL_HREF } from "./constants";
import { twMerge } from "tailwind-merge";

export function CTAButton({ className }: { className?: string }) {
  return (
    <a
      href={EMAIL_HREF}
      className={twMerge("cta-button animate-hover", className)}
    >
      <Mail />
      <span className="hidden sm:inline">Diskusikan Proyek</span>
      <span className="inline sm:hidden">Email Saya</span>
    </a>
  );
}
