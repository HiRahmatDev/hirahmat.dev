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
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="space-y-1 md:space-y-2">
      <h2 className="text-3xl/[40px] sm:text-4xl/[44px] tracking-[-1px] font-bold blog-header">
        Blog
      </h2>
      <p className="text-base/[24px] tracking-[-0.4px] max-w-prose font-medium blog-desc">
        Catatan reflektif dan hal-hal yang saya pelajari di luar proyek — mulai
        dari desain, pengembangan, sampai cara berpikir di balik keduanya.
      </p>
    </div>
  );
}
