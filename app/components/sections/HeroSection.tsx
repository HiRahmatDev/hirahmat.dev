import Image from "next/image";

import { CTAButton } from "../CTAButton";
import { GreenText } from "../GreenText";
import backAccent from "@/public/images/back-accent.png";
import frontAccent from "@/public/images/front-accent.png";
import middleAccent from "@/public/images/middle-accent.png";
import rahmatHero from "@/public/images/rahmat-hidayatullah-hero.png";
import threeLines from "@/public/svgs/three-lines.svg";
import vectorBackgroundHero from "@/public/svgs/vector-background-hero.svg";

export function HeroSection() {
  return (
    <section className="container flex flex-row gap-4 h-[633px] -mt-10">
      <div className="pb-24 flex flex-col justify-center gap-8 w-full [&>*]:max-w-fit">
        <div className="space-y-2">
          <h1 className="font-bold text-5xl/[58px] tracking-[-2.5px]">
            <span className="text-2xl tracking-[-1px]">
              <GreenText>Hi</GreenText>, saya <GreenText>Rahmat</GreenText>
            </span>
            <br />
            Frontend <GreenText>Dev</GreenText>eloper
          </h1>
          <p className="text-base/[24px] tracking-[-0.4px] max-w-[40ch]">
            Saya merancang dan mengembangkan aplikasi web yang fungsional,
            responsif, dan enak dipakai.
          </p>
        </div>
        <CTAButton />
      </div>
      <div className="shrink-0 min-w-[395px] pb-24 hidden sm:block">
        <div className="relative h-full">
          <Image
            src={vectorBackgroundHero}
            alt=""
            className="absolute left-[-32px] bottom-0 max-w-[120%] pointer-events-none"
          />
          <Image
            width={90}
            src={backAccent}
            alt=""
            className="absolute bottom-0 right-[0px] pointer-events-none"
          />
          <Image
            src={rahmatHero}
            alt="hirahmat.dev"
            className="absolute mask-no-repeat mask-cover"
            style={{
              left: "0",
              bottom: "0%",
              maskImage: "url('/svgs/mask-image-hero.svg')",
              maskPosition: "-32px 50%",
            }}
          />
          <Image
            src={middleAccent}
            alt=""
            className="absolute max-w-[105%] bottom-0 right-[-20px] pointer-events-none"
          />
          <Image
            src={frontAccent}
            alt=""
            className="absolute max-w-[115%] bottom-0 right-[-17px] pointer-events-none"
          />
          <Image
            src={threeLines}
            alt=""
            className="absolute top-[98px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
