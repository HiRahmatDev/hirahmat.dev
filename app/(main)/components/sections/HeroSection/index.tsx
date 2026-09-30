"use client";

import React from "react";

import { CTAButton } from "../../CTAButton";
import { DynamicHeroImage } from "./DynamicHeroImage";
import { GreenText } from "../../GreenText";
import { StaticHeroImage } from "./StaticHeroImage";

export function HeroSection() {
  const containerRef = React.useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="container flex flex-col justify-center md:justify-start md:flex-row gap-12 md:gap-8 min-h-max md:h-150 pt-12 pb-20 md:py-0"
    >
      <div className="md:pb-14 flex flex-col items-center md:items-start justify-center gap-8 w-full *:max-w-fit text-center md:text-left">
        <div className="space-y-2 md:space-y-3">
          <h1 className="font-bold leading-0 tracking-[-1.5px] md:tracking-[-2px]">
            <span className="inline-block">
              <span className="inline-block text-2xl tracking-[-1px]">
                <GreenText>Hi</GreenText>, saya <GreenText>Rahmat</GreenText>
              </span>
            </span>
            <br />
            <span className="inline-block text-4xl/[40px] md:text-5xl/[54px] overflow-hidden">
              <span className="inline-block">
                Frontend <GreenText>Dev</GreenText>eloper
              </span>
            </span>
          </h1>
          <p className="text-base/normal sm:text-lg/normal -tracking-[.2px] max-w-[30ch] md:max-w-[36ch] text-gray-700">
            Saya membangun aplikasi web dengan navigasi mulus dan animasi
            interaktif.
          </p>
        </div>
        <div>
          <CTAButton />
        </div>
      </div>
      <div className="shrink-0">
        <DynamicHeroImage />
        <StaticHeroImage />
      </div>
    </section>
  );
}
