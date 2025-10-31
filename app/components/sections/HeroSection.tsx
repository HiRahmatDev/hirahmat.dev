"use client";

import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";
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
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);

  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set(["h1", "p", "a"], {
        opacity: 0,
        y: 10,
      });

      gsap.to(["h1", "p", "a"], {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        onComplete: () => {
          gsap.set("a", { clearProps: "y" });
        },
      });
    },
    { scope: container }
  );

  return (
    <section className="container flex flex-row gap-4 h-[400px] md:h-[633px] -mt-10">
      <div
        ref={container}
        className="md:pb-24 flex flex-col justify-center gap-8 w-full [&>*]:max-w-fit"
      >
        <div className="space-y-2">
          <h1 className="font-bold text-4xl/[46px] md:text-5xl/[58px] tracking-[-2.5px] opacity-0">
            <span className="text-2xl tracking-[-1px]">
              <GreenText>Hi</GreenText>, saya <GreenText>Rahmat</GreenText>
            </span>
            <br />
            Frontend <GreenText>Dev</GreenText>eloper
          </h1>
          <p className="text-base/[24px] tracking-[-0.4px] max-w-[40ch] opacity-0">
            Saya merancang dan mengembangkan aplikasi web yang fungsional,
            responsif, dan enak dipakai.
          </p>
        </div>
        <CTAButton className="opacity-0" />
      </div>
      <div className="shrink-0 min-w-[395px] pb-24 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroImageLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full"
        >
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
              role="presentation"
              className="absolute bottom-0 right-[0px] pointer-events-none"
            />
            <Image
              src={rahmatHero}
              alt="Foto Rahmat Hidayatullah dengan background transparan | hirahmat.dev"
              className="absolute mask-no-repeat mask-cover"
              style={{
                left: 0,
                bottom: 0,
                maskImage: "url('/svgs/mask-image-hero.svg')",
                maskPosition: "-32px 50%",
              }}
              loading="eager"
              onLoad={() => setIsHeroImageLoaded(true)}
            />
            <Image
              src={middleAccent}
              alt=""
              role="presentation"
              className="absolute max-w-[105%] bottom-0 right-[-20px] pointer-events-none"
            />
            <Image
              src={frontAccent}
              alt=""
              role="presentation"
              className="absolute max-w-[115%] bottom-0 right-[-17px] pointer-events-none"
            />
            <Image
              src={threeLines}
              alt=""
              role="presentation"
              className="absolute top-[98px] pointer-events-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
