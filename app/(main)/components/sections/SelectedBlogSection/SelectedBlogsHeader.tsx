"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SelectedBlogsHeader() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        [".blog-header", ".blog-desc"],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        },
      );
    },
    { scope: container },
  );

  return (
    <div ref={container} className="space-y-1 md:space-y-2">
      <h2 className="text-2xl/[36px] sm:text-4xl/[44px] -tracking-[.2px] font-bold blog-header">
        Blog
      </h2>
      <p className="text-base sm:text-lg max-w-[60ch] text-gray-600 blog-desc">
        Catatan reflektif dan hal-hal yang saya pelajari di luar proyek.
      </p>
    </div>
  );
}
