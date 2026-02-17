"use client";

import React from "react";

import { gsap, useGSAP } from "@/app/lib/gsap";

interface AnimatedGridWrapperProps {
  children: React.ReactNode;
}

export function AnimatedGridWrapper({ children }: AnimatedGridWrapperProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".animated-card-element", {
        x: 20,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.10,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 min-h-110"
    >
      {children}
    </div>
  );
}
