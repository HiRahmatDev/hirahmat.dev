"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import { GreenText } from "../../GreenText";

export function SectionHeader() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ["h2", "p"],
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.3,
          stagger: 0.1,
        },
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="space-y-1 md:space-y-2 [&>h2,&>p]:opacity-0"
    >
      <h2 className="text-2xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold">
        Proyek <GreenText>Pilihan</GreenText>
      </h2>
      <p className="text-base sm:text-lg max-w-[60ch] -tracking-[.2px] text-gray-600">
        Proyek pilihan dengan detail, interaksi, dan desain menarik.
      </p>
    </div>
  );
}
