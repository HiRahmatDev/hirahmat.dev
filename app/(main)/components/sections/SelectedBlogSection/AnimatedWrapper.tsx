"use client";

import { gsap, useGSAP } from "@/app/lib/gsap";
import React from "react";

interface AnimatedWrapperProps {
  children: React.ReactNode;
}

export function AnimatedWrapper({ children }: AnimatedWrapperProps) {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { autoAlpha: 0, duration: 0.6, ease: "power3.out" },
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      });

      tl.from(".selected-blogs-text-element", {
        x: 20,
        stagger: 0.07,
      }).from(
        ".selected-blog-card",
        {
          x: 20,
          stagger: 0.1,
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="container py-6 sm:py-8">
      {children}
    </section>
  );
}
