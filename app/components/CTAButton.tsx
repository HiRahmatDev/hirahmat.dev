"use client";

import { EMAIL_HREF } from "./constants";
import { Mail } from "lucide-react";

export function CTAButton() {
  return (
    <a href={EMAIL_HREF} className="cta-button animate-hover">
      <Mail />
      Bahas Proyek Bareng?
    </a>
  );
}
