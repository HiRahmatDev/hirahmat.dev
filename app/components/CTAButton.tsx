"use client";

import { Mail } from "lucide-react";
import { EMAIL_HREF } from "./constants";

export function CTAButton() {
  return (
    <a href={EMAIL_HREF} className="cta-button animate-hover">
      <Mail />
      Bahas Proyek Bareng?
    </a>
  );
}
