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
        scrollTrigger: { trigger: containerRef.current, start: "top 90%" },
      });

      tl.from(".selected-projects-text-element", {
        y: 20,
        delay: 0.4,
        stagger: 0.15,
      }).from(
        ".selected-project-card",
        {
          x: 20,
          stagger: 0.15,
        },
        "-=0.4",
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
