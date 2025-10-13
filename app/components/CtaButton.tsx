"use client";

import { Mail } from "lucide-react";

export function CtaButton() {
  const sendEmail = () => {
    const email = "hirahmat.dev@gmail.com";
    const subject = encodeURIComponent("Hi Rahmat!");
    const body = encodeURIComponent(
      "Halo Rahmat,\n\nSaya tertarik dengan portfoliomu di HiRahmat.Dev.\nBoleh ngobrol sebentar?"
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <button type="button" className="cta-button animate-hover" onClick={sendEmail}>
      <Mail />
      Kirim Email
    </button>
  );
}
