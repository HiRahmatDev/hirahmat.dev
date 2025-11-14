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
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="space-y-1 [&>h2,&>p]:opacity-0">
      <h2 className="text-3xl/[40px] sm:text-4xl/[44px] tracking-[-1px] font-bold">
        Proyek <GreenText>Pilihan</GreenText>
      </h2>
      <p className="text-base/[24px] tracking-[-0.4px] max-w-prose">
        Beberapa proyek yang saya garap dengan rasa penasaran tinggi dan
        perhatian ke hal-hal kecil yang bikin hasilnya terasa beda.
      </p>
    </div>
  );
}
