"use client";

import { Mail } from "lucide-react";
import { EMAIL_HREF } from "./constants";
import { twMerge } from "tailwind-merge";

export function CTAButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={EMAIL_HREF}
      className={twMerge("cta-button animate-hover", className)}
    >
      <Mail />
      <span className="hidden sm:inline">
        {children ?? "Diskusikan Proyek"}
      </span>
      <span className="inline sm:hidden">{children ?? "Email Saya"}</span>
    </a>
  );
}
