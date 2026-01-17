"use client";

import { Mail } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

import { EMAIL_HREF } from "./constants";
import backgroundFooterContactCtaPng from "@/public/images/background-footer-contact-cta.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactCTA() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div className="container py-6">
      <div
        ref={container}
        className="p-5 bg-accent text-white rounded-[20px] flex gap-3 relative overflow-hidden opacity-0"
      >
        <Mail className="shrink-0" />
        <div className="space-y-1">
          <h2 className="text-xl/[24px] font-semibold tracking-[-0.35px]">
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
    </div>
  );
}
