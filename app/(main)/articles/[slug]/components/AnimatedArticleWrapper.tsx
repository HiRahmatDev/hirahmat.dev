"use client";

import React from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";

interface AnimatedArticleWrapperProps {
  children: React.ReactNode;
}

export function AnimatedArticleWrapper({
  children,
}: AnimatedArticleWrapperProps) {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { autoAlpha: 0, duration: 0.6, ease: "power3.out" },
      });

      tl.from(".animated-header-element", {
        x: 20,
        stagger: 0.08,
      }).from(".animated-content-element", {
        x: 20,
      }, "-=0.4");
    },
    { scope: containerRef },
  );

  return (
    <article ref={containerRef} className="space-y-8">
      {children}
    </article>
  );
}
