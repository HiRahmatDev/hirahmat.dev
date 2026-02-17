"use client";

import React from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";

interface AnimatedTOCWrapperProps {
  children: React.ReactNode;
}

export function AnimatedTOCWrapper({ children }: AnimatedTOCWrapperProps) {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".animated-toc-element", {
        x: 20,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <aside
      ref={containerRef}
      className="hidden md:block sticky top-24 max-h-[80vh] overflow-y-auto overflow-x-hidden px-5 pb-12 space-y-3"
    >
      {children}
    </aside>
  );
}
