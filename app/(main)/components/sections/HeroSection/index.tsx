"use client";

import { CTAButton } from "../../CTAButton";
import { GreenText } from "../../GreenText";
import { DynamicHeroImage } from "./DynamicHeroImage";

export function HeroSection() {
  return (
    <section className="container flex flex-row gap-4 h-100 md:h-150 -mt-10">
      <div className="md:pb-14 flex flex-col justify-center gap-8 w-full *:max-w-fit">
        <div className="space-y-2 md:space-y-3">
          <h1 className="font-bold text-4xl/[40px] md:text-5xl/[50px] tracking-[-1.5px] md:tracking-[-2px]">
            <span className="text-2xl tracking-[-1px]">
              <GreenText>Hi</GreenText>, saya <GreenText>Rahmat</GreenText>
            </span>
            <br />
            Frontend <GreenText>Dev</GreenText>eloper
          </h1>
          <p className="text-base/normal sm:text-lg/normal -tracking-[.2px] max-w-[40ch] text-gray-700">
            Saya membangun aplikasi web dengan navigasi mulus dan animasi
            interaktif.
          </p>
        </div>
        <CTAButton />
      </div>
      <DynamicHeroImage />
    </section>
  );
}
