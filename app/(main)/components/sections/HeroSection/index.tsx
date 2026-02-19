"use client";

import React from "react";

import { CTAButton } from "../../CTAButton";
import { DynamicHeroImage } from "./DynamicHeroImage";
import { GreenText } from "../../GreenText";
import { CustomEase, gsap, useGSAP } from "@/app/lib/gsap";
import { StaticHeroImage } from "./StaticHeroImage";

export function HeroSection() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      CustomEase.create("text", "0, 0.971, 0.34, 1");

      tl.fromTo(
        ".hi-text-element",
        {
          x: "-100%",
          autoAlpha: 1,
          transformOrigin: "left",
        },
        {
          x: "0%",
          autoAlpha: 1,
          duration: 1,
          delay: 0.5,
          ease: "text",
        },
      )
        .fromTo(
          ".work-text-element",
          {
            y: "-100%",
            autoAlpha: 1,
          },
          {
            y: "0%",
            autoAlpha: 1,
            duration: 1,
            ease: "text",
          },
          "-=0.4",
        )
        .to(
          ".hi-scale-text-element",
          {
            scale: 1,
            duration: 0.6,
            ease: "power4.out",
          },
          "+=0.6",
        )
        .to(
          ".hero-text-element",
          {
            y: 0,
            duration: 0.6,
            ease: "power4.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-image",
          {
            [matchMedia("(min-width: 768px)").matches ? "x" : "y"]: 20,
            autoAlpha: 0,
            duration: 1.4,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.083,0.294 0.035,0.717 0.337,0.911 0.456,0.987 0.752,1 1,1 ",
            ),
          },
          "-=1.8",
        )
        .from(
          ".hero-subtext-element",
          {
            y: -20,
            autoAlpha: 0,
            duration: 0.6,
          },
          "-=0.5",
        )
        .from(
          ".hero-cta",
          {
            y: -20,
            autoAlpha: 0,
            duration: 0.6,
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="container flex flex-col justify-center md:justify-start md:flex-row gap-12 md:gap-8 min-h-max md:h-150 pt-12 pb-20 md:py-0"
    >
      <div className="md:pb-14 flex flex-col items-center md:items-start justify-center gap-8 w-full *:max-w-fit text-center md:text-left">
        <div className="space-y-2 md:space-y-3">
          <h1 className="hero-text-element translate-y-14 font-bold leading-0 tracking-[-1.5px] md:tracking-[-2px]">
            <span className="hi-scale-text-element overflow-hidden inline-block scale-[1.4] md:scale-[1.8] origin-bottom md:origin-bottom-left">
              <span className="hi-text-element invisible inline-block text-2xl tracking-[-1px]">
                <GreenText>Hi</GreenText>, saya <GreenText>Rahmat</GreenText>
              </span>
            </span>
            <br />
            <span className="inline-block text-4xl/[40px] md:text-5xl/[54px] overflow-hidden">
              <span className="work-text-element invisible inline-block">
                Frontend <GreenText>Dev</GreenText>eloper
              </span>
            </span>
          </h1>
          <p className="hero-subtext-element invisible text-base/normal sm:text-lg/normal -tracking-[.2px] max-w-[30ch] md:max-w-[36ch] text-gray-700">
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
