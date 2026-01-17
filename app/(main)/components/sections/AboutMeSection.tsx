"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { GreenText } from "../GreenText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutMeSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        [".about-header", ".about-desc", ".about-cv"],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        },
      ).fromTo(
        ".about-content > p",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3",
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="container flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-14 py-6 sm:py-8"
    >
      <div className="shrink-0 max-w-[400px] md:max-w-[351px] space-y-4 md:space-y-8">
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-2xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold about-header">
            Siapa <GreenText>Saya</GreenText>?
          </h2>
          <p className="text-base/[24px] tracking-[-0.4px] font-medium about-desc">
            Sedikit tentang saya di dunia web dan hal-hal yang bikin saya betah
            ngulik.
          </p>
        </div>
        <a
          href="https://drive.usercontent.google.com/u/0/uc?id=1MvSPb6mB1oKSev2R-l9FDJ4F61M3Ijw0&export=download"
          rel="noopener noreferrer"
          className="text-lg/[24px] tracking-[-0.7px] font-mono font-bold text-text-accent hover:text-accent animate-hover inline-block about-cv"
        >
          <u>Unduh CV</u> ↗
        </a>
      </div>
      <div className="w-full">
        <div className="space-y-4 text-base/[26px] tracking-[-0.35px] font-medium about-content">
          <p>
            Saya tidak datang dari dunia teknologi, tapi rasa penasaran saya
            sudah tumbuh sejak lama. Waktu SMA, saya senang{" "}
            <strong>install ulang Windows</strong> dan ngoprek komputer teman —
            sekadar penasaran bagaimana semuanya bisa bekerja.
          </p>
          <p>
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
              className="font-bold text-text-accent hover:text-accent animate-hover inline-block"
            >
              lomba iklan video
            </a>
            .
          </p>
          <p>
            Dari situ, rasa ingin tahu saya berubah arah: bagaimana kalau visual
            dan logika digabung? Pertanyaan itu membawa saya ke bootcamp
            Fullstack Web Arkademy (sekarang menjadi <strong>Pijar Camp</strong>{" "}
            dan <strong>Fazztrack</strong>
            ), dan sejak itu saya menekuni dunia frontend development. Sekarang
            saya bekerja sebagai Frontend Developer di Kulina, sambil terus
            bereksperimen dengan desain, animasi, dan hal-hal visual di waktu
            luang.
          </p>
          <p>Bagi saya, web adalah tempat terbaik untuk terus bertumbuh.</p>
        </div>
      </div>
    </section>
  );
}
