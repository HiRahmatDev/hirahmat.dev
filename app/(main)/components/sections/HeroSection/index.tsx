"use client";

import { CTAButton } from "../../CTAButton";
import { GreenText } from "../../GreenText";
import { DynamicHeroImage } from "./DynamicHeroImage";
import { StaticHeroImage } from "./StaticHeroImage";

export function HeroSection() {
  return (
    <section className="container flex flex-col justify-center md:justify-start md:flex-row gap-12 md:gap-4 min-h-max md:h-150 -mt-10 py-20 md:py-0">
      <div className="md:pb-14 flex flex-col items-center sm:items-start justify-center gap-8 w-full *:max-w-fit text-center sm:text-left">
        <div className="space-y-2 md:space-y-3">
          <h1 className="font-bold text-4xl/[40px] md:text-5xl/[50px] tracking-[-1.5px] md:tracking-[-2px]">
            <span className="text-2xl tracking-[-1px]">
              <GreenText>Hi</GreenText>, saya <GreenText>Rahmat</GreenText>
              <br />
            </span>
            Frontend <GreenText>Dev</GreenText>eloper
          </h1>
          <p className="text-base/normal sm:text-lg/normal -tracking-[.2px] max-w-[30ch] md:max-w-[40ch] text-gray-700">
            Saya membangun aplikasi web dengan navigasi mulus dan animasi
            interaktif.
          </p>
        </div>
        <CTAButton />
      </div>
      <DynamicHeroImage />
      <StaticHeroImage />
    </section>
  );
}
