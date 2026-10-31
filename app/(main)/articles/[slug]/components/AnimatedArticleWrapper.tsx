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
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".animated-header-element", ".animated-content-element"], {
          autoAlpha: 1,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { autoAlpha: 0, duration: 0.6, ease: "power3.out" },
        });

        tl.from(".animated-header-element", {
          x: 20,
          stagger: 0.07,
        }).from(
          ".animated-content-element",
          {
            x: 20,
          },
          "-=0.6",
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <article ref={containerRef}>
      {children}
    </article>
  );
}
