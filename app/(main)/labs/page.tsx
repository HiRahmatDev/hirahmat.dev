import Image, { StaticImageData } from "next/image";
import { ExternalLink, FlaskConical } from "lucide-react";

import murajaahAtTaisirPng from "@/public/images/screenshot-murajaah-at-taisir-app-page-no-frame.png";
import { ContactCTASection } from "../components/sections/ContactCTASection";

type Lab = {
  key: string;
  staticImage: StaticImageData;
  title: string;
  description: string;
  href: string;
};

export default function Labs() {
  const labs: Lab[] = [
    {
      key: "murajaah-at-taisir",
      staticImage: murajaahAtTaisirPng,
      title: "Muraja'ah at-Taisir",
      description:
        "Terinspirasi dari buku Muraja'ah at-Taisir (30 Hari Hafal Al-Qur'an).",
      href: "/murajaah-at-taisir",
    },
  ];

  return (
    <main>
      <section className="container pt-4 sm:pt-12 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold">
            <span className="inline-flex items-center gap-3">
              <FlaskConical className="size-9" />
              Labs
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-[60ch]">
            Kumpulan eksperimen kecil-kecilan.
          </p>
        </div>
      </section>
      <section className="container pt-6 pb-20 space-y-10">
        {labs.map((lab) => {
          return (
            <div
              key={lab.key}
              className="relative min-h-100 sm:min-h-150 overflow-hidden rounded-3xl"
            >
              <Image
                src={lab.staticImage}
                alt={`Cover for ${lab.title}`}
                placeholder="blur"
                fill
                className="object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-green-700/10" />
              <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5 p-5 sm:px-8 sm:py-6 bg-white rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div>
                    <h1 className="text-2xl/[36px] sm:text-3xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold">
                      {lab.title}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      {lab.description}
                    </p>
                  </div>
                  <a
                    href={"/lab" + lab.href}
                    target="_blank"
                    className="cta-button animate-hover w-fit"
                  >
                    Coba langsung
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <ContactCTASection />
    </main>
  );
}
