"use client";

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
  const backAccentRef = useRef<HTMLImageElement>(null);
  const middleAccentRef = useRef<HTMLImageElement>(null);
  const frontAccentRef = useRef<HTMLImageElement>(null);
  const threeLinesRef = useRef<HTMLImageElement>(null);

  const floatingOffsets = useRef({
    back: 0,
    middle: 0,
    front: 0,
    lines: 0,
  });

  const parallaxSetters = useRef<{
    back?: (x: number, y?: number) => void;
    middle?: (x: number, y?: number) => void;
    front?: (x: number, y?: number) => void;
    lines?: (x: number, y?: number) => void;
  }>({});

  useGSAP(() => {
    // Floating animation
    const floatConfigs = [
      { ref: backAccentRef, key: "back", floatY: 5, duration: 2 },
      { ref: middleAccentRef, key: "middle", floatY: 10, duration: 2.5 },
      { ref: threeLinesRef, key: "lines", floatY: 10, duration: 2.5 },
      { ref: frontAccentRef, key: "front", floatY: 20, duration: 2.8 },
    ] as const;

    floatConfigs.forEach(({ ref, key, floatY, duration }) => {
      if (!ref.current) return;
      // Setup quick setter fo-r parallax
      parallaxSetters.current[key] = gsap.quickTo(ref.current, "y", {
        duration: 0.3,
      });

      // Floating animation
      gsap.to(floatingOffsets.current, {
        [key]: floatY,
        duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          // On each floating update, merge with parallax
          const parallaxY = ref.current?.dataset.parallaxY
            ? Number(ref.current.dataset.parallaxY)
            : 0;
          parallaxSetters.current[key]?.(
            parallaxY + floatingOffsets.current[key],
          );
        },
      });
    });

    // Mousemove handler
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX - w / 2) / w;
      const y = (e.clientY - h / 2) / h;

      // Parallax factors
      const parallaxConfigs = [
        { ref: backAccentRef, key: "back", factor: -10 },
        { ref: middleAccentRef, key: "middle", factor: 5 },
        { ref: threeLinesRef, key: "lines", factor: 5 },
        { ref: frontAccentRef, key: "front", factor: 20 },
      ] as const;

      parallaxConfigs.forEach(({ ref, key, factor }) => {
        if (ref.current) {
          const parallaxY = y * factor;
          ref.current.dataset.parallaxY = String(parallaxY);
          // Merge floating and parallax
          parallaxSetters.current[key]?.(
            parallaxY + floatingOffsets.current[key],
          );
          gsap.to(ref.current, {
            x: x * factor,
            duration: 0.3,
            overwrite: "auto",
          });
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      // GSAP will auto-cleanup animations
    };
  });

  return (
    <section className="container flex flex-row gap-4 h-[400px] md:h-[600px] -mt-10">
      <div className="md:pb-14 flex flex-col justify-center gap-8 w-full [&>*]:max-w-fit">
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
      <div className="shrink-0 min-w-[440px] pb-14 hidden md:block">
        <div className="h-full">
          <div className="relative h-full hero-image mr-6">
            <Image
              src={vectorBackgroundHero}
              alt=""
              className="absolute left-[-32px] bottom-0 max-w-[120%] pointer-events-none"
            />
            <Image
              ref={backAccentRef}
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
            />
            <Image
              ref={middleAccentRef}
              src={middleAccent}
              alt=""
              role="presentation"
              className="absolute max-w-[105%] bottom-0 right-[-20px] pointer-events-none"
            />
            <Image
              ref={frontAccentRef}
              src={frontAccent}
              alt=""
              role="presentation"
              className="absolute max-w-[115%] bottom-0 right-[-17px] pointer-events-none"
            />
            <Image
              ref={threeLinesRef}
              src={threeLines}
              alt=""
              role="presentation"
              className="absolute top-[98px] pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
