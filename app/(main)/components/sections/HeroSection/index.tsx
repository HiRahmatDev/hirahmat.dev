"use client";

import React, { useRef } from "react";

import { CTAButton } from "../../CTAButton";
import { DynamicHeroImage } from "./DynamicHeroImage";
import { GreenText } from "../../GreenText";
import { CustomEase, gsap, useGSAP } from "@/app/lib/gsap";
import { StaticHeroImage } from "./StaticHeroImage";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { autoAlpha: 0, ease: "power3.out" },
      });

      tl.from(".hero-text-element", {
        y: 20,
        duration: 0.8,
        stagger: 0.15,
      })
        .from(
          ".hero-cta",
          {
            y: 20,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          ".hero-image",
          {
            [matchMedia("(min-width: 768px)").matches ? "x" : "y"]: 20,
            duration: 1.4,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.083,0.294 0.035,0.717 0.337,0.911 0.456,0.987 0.752,1 1,1 ",
            ),
          },
          "-=0.6",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="container flex flex-col justify-center md:justify-start md:flex-row gap-12 md:gap-8 min-h-max md:h-150 -mt-5 pt-12 pb-20 md:py-0"
    >
      <div className="md:pb-14 flex flex-col items-center md:items-start justify-center gap-8 w-full *:max-w-fit text-center md:text-left">
        <div className="space-y-2 md:space-y-3">
          <h1 className="hero-text-element invisible font-bold text-4xl/[40px] md:text-5xl/[50px] tracking-[-1.5px] md:tracking-[-2px]">
            <span className="text-2xl tracking-[-1px]">
              <GreenText>Hi</GreenText>, saya <GreenText>Rahmat</GreenText>
              <br />
            </span>
            Frontend <GreenText>Dev</GreenText>eloper
          </h1>
          <p className="hero-text-element invisible text-base/normal sm:text-lg/normal -tracking-[.2px] max-w-[30ch] md:max-w-[36ch] text-gray-700">
            Saya membangun aplikasi web dengan navigasi mulus dan animasi
            interaktif.
          </p>
        </div>
        <div className="hero-cta invisible">
          <CTAButton />
        </div>
      </div>
      <div className="hero-image invisible shrink-0">
        <DynamicHeroImage />
        <StaticHeroImage />
      </div>
    </section>
  );
}
