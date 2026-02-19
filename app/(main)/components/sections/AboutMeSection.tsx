"use client";

import React from "react";

import { GreenText } from "../GreenText";
import { gsap, useGSAP } from "@/app/lib/gsap";

export function AboutMeSection() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { autoAlpha: 0, duration: 0.6, ease: "power3.out" },
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      });

      tl.from(".about-text-element", { x: 20, stagger: 0.07 }).from(
        ".about-paragraf",
        { x: 20, stagger: 0.07 },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="container flex flex-col md:flex-row gap-10 sm:gap-12 md:gap-14 py-10"
    >
      <div className="shrink-0 md:max-w-73.75 space-y-4 md:space-y-8">
        <div className="space-y-1 md:space-y-2">
          <h2 className="about-text-element invisible text-2xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold about-header">
            Siapa <GreenText>Saya</GreenText>?
          </h2>
          <p className="about-text-element invisible text-base/normal sm:text-lg/normal -tracking-[.2px] max-w-[60ch] text-gray-600 about-desc">
            Sekilas tentang saya di dunia web.
          </p>
        </div>
        <div className="about-text-element invisible">
          <a
            href="https://drive.usercontent.google.com/u/0/uc?id=1MvSPb6mB1oKSev2R-l9FDJ4F61M3Ijw0&export=download"
            rel="noopener noreferrer"
            className="text-lg/[24px] tracking-[-0.7px] font-mono font-bold text-text-accent hover:text-accent-hover animate-hover inline-block about-cv"
          >
            <u>Unduh CV</u> ↗
          </a>
        </div>
      </div>
      <div className="w-full">
        <div className="space-y-7 text-base/relaxed sm:text-lg/relaxed -tracking-[.2px] max-w-[60ch] about-content">
          <p className="about-paragraf invisible">
            Saya tidak datang dari dunia teknologi, tapi rasa penasaran saya
            sudah tumbuh sejak lama. Waktu SMA, saya senang{" "}
            <strong>install ulang Windows</strong> dan ngoprek komputer teman —
            sekadar penasaran bagaimana semuanya bisa bekerja.
          </p>
          <p className="about-paragraf invisible">
            Langkah saya kemudian berbelok ke jalur yang tidak biasa: kuliah di{" "}
            <strong>Pendidikan Bahasa Arab (PBA)</strong>. Di sana, saya justru
            menyadari bahwa struktur bahasa punya logika yang mirip dengan
            pemrograman. Keduanya adalah cara kita menyusun aturan agar pesan
            bisa tersampaikan. Di masa ini juga, ketertarikan saya pada desain
            visual makin kuat hingga sempat memenangkan{" "}
            <a
              href="https://youtu.be/LhPnxK-lPE8?si=2w-MaGbgcO6sfg7L"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-text-accent hover:text-accent-hover animate-hover inline-block"
            >
              lomba iklan video
            </a>
            .
          </p>
          <p className="about-paragraf invisible">
            Dari situ, rasa ingin tahu saya berubah arah: bagaimana kalau visual
            dan logika digabung? Pertanyaan itu membawa saya ke bootcamp
            Fullstack Web Arkademy (sekarang menjadi <strong>Pijar Camp</strong>{" "}
            dan <strong>Fazztrack</strong>
            ), dan sejak itu saya menekuni dunia frontend development. Sekarang
            saya bekerja sebagai Frontend Developer di Kulina, sambil terus
            bereksperimen dengan desain, animasi, dan hal-hal visual di waktu
            luang.
          </p>
          <p className="about-paragraf invisible">
            Bagi saya, web adalah tempat terbaik untuk terus bertumbuh.
          </p>
        </div>
      </div>
    </section>
  );
}
