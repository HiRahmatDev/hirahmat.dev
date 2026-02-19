"use client";

import React from "react";

import { gsap, useGSAP } from "@/app/lib/gsap";

interface AnimatedWrapperProps {
  children: React.ReactNode;
}

export function AnimatedWrapper({ children }: AnimatedWrapperProps) {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { autoAlpha: 0, duration: 0.6, ease: "power3.out" },
      });

      tl.from(".animated-element", {
        x: 20,
        stagger: 0.07,
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="container pt-4 sm:pt-12 pb-20">
      {children}
    </section>
  );
}
