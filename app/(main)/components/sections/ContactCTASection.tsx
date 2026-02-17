"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import React from "react";

import { CustomEase, gsap, useGSAP, ScrollTrigger } from "@/app/lib/gsap";
import { EMAIL_HREF } from "../constants";
import backgroundFooterContactCtaPng from "@/public/images/background-footer-contact-cta.png";

export function ContactCTASection() {
  const ctaRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top bottom-=120px",
        end: "top bottom-=120px",
        toggleActions: "play none reverse none",
      },
    });

    tl.from(ctaRef.current, {
      y: 20,
      duration: 0.6,
      scale: 0.9,
      autoAlpha: 0,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.018,0.132 0.026,0.291 0.083,0.513 0.139,0.733 0.187,0.875 0.231,0.942 0.295,1.039 0.37,1.111 0.534,1.037 0.61,1.002 0.71,1 0.8,1 0.837,1 0.95,1 1,1 ",
      ),
    });
  });

  React.useLayoutEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    // Watch for DOM changes (like when ArticlesList loads)
    resizeObserver = new ResizeObserver(refreshScrollTrigger);
    resizeObserver.observe(document.body);

    // Initial refresh after page load
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", () => ScrollTrigger.refresh());
    }

    return () => {
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <section className="container py-6">
      <div
        ref={ctaRef}
        className="invisible p-5 bg-accent text-white rounded-[20px] flex gap-3 relative overflow-hidden"
      >
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
