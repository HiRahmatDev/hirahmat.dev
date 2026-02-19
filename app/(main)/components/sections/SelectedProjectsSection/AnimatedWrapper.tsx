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
      });

      tl.from(".selected-projects-text-element", {
        x: 20,
        delay: 2.5,
        stagger: 0.07,
      }).from(
        ".selected-project-card",
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
    <section ref={containerRef} className="container py-8 sm:pt-6">
      {children}
    </section>
  );
}
