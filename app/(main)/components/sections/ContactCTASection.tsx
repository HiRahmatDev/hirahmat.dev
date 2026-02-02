"use client";

import { Mail } from "lucide-react";
import Image from "next/image";

import { EMAIL_HREF } from "../constants";
import backgroundFooterContactCtaPng from "@/public/images/background-footer-contact-cta.png";

export function ContactCTASection() {
  return (
    <section className="container py-6">
      <div className="p-5 bg-accent text-white rounded-[20px] flex gap-3 relative overflow-hidden">
        <Mail className="shrink-0" />
        <div className="space-y-1">
          <h2 className="text-lg/[24px] font-semibold">
            Punya ide atau proyek menarik?
          </h2>
          <p className="text-base/[24px] tracking-[-0.35px]">
            Saya siap berkolaborasi — kirim email ke{" "}
            <a
              href={EMAIL_HREF}
              className="inline-block animate-hover font-mono font-medium tracking-[-1px] underline"
            >
              hirahmat.dev@gmail.com
            </a>
          </p>
        </div>
        <Image
          src={backgroundFooterContactCtaPng}
          alt="background footer contact cta accent"
          placeholder="blur"
          height={128}
          className="w-auto h-auto absolute top-[50%] right-0 translate-y-[-50%] pointer-events-none"
        />
      </div>
    </section>
  );
}
