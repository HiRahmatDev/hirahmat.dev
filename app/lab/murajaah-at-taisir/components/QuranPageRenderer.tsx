"use client";

import clsx from "clsx";
import Image from "next/image";

import { AyahRenderer } from "./AyahRenderer";
import { Ayah, Surahs } from "../lib/fetchQuranPage";
import surahTitleLight from "../assets/surah-title-light.svg";

type QuranPageRendererProps = {
  surahs: Surahs;
  ayahs: Ayah[];
  isRightPage: boolean;
};

export function QuranPageRenderer({
  surahs,
  ayahs,
  isRightPage,
}: QuranPageRendererProps) {
  return (
    <article
      lang="ar"
      dir="rtl"
      className={clsx(
        "relative",
        "w-[600px] min-h-[900px] shrink-0 bg-[#f6f5ee] pt-7.5 px-12.5 pb-12",
        "md:scale-100",
        "sm:scale-[0.8] origin-top-left",
        "scale-[0.7] origin-top-left",
        "transition-transform"
      )}
    >
      <div
        className={clsx(
          "pointer-events-none absolute top-0 bottom-0 w-40",
          isRightPage
            ? "left-0 bg-gradient-to-r from-[#7a7761]/25 to-transparent"
            : "right-0 bg-gradient-to-l from-[#7a7761]/25 to-transparent"
        )}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-8">
        <div
          className={
            "min-h-6 text-zinc-400 italic tracking-[-0.35px] font-medium font-sans text-sm" +
            (isRightPage ? " text-right" : " text-left")
          }
        >
          {isRightPage ? <p>KANAN</p> : <p>KIRI</p>}
        </div>
        {Object.entries(surahs).map(([_, surah], index) => {
          const isSurahAlfatiha = surah.number === 1;
          const isSurahAlBaqarah = surah.number === 2;

          const isNarrowerContainer =
            isSurahAlfatiha ||
            (isSurahAlBaqarah && ayahs[0].numberInSurah === 1);

          function shouldRenderTitle() {
            if (index === 0) {
              return ayahs[0].numberInSurah === 1;
            }
            return true;
          }

          return (
            <div key={surah.number} className="flex flex-col gap-5">
              {shouldRenderTitle() && (
                <div
                  className={
                    "relative text-center" + (index === 0 ? " mt-0" : " mt-8")
                  }
                >
                  <h2 className="text-lg/[49.53px]">{surah.name}</h2>
                  <Image
                    width={434}
                    height={43}
                    loading="eager"
                    src={surahTitleLight}
                    alt=""
                    role="presentation"
                    className="absolute top-0 w-full pointer-events-none select-none"
                  />
                </div>
              )}
              <div
                className={
                  "text-justify text-2xl/[64px] select-none" +
                  (isNarrowerContainer ? " px-24" : "")
                }
              >
                {ayahs.map((ayah) => {
                  if (ayah.surah.number !== surah.number) return null;

                  return (
                    <AyahRenderer
                      key={`ayah-${ayah.number}`}
                      ayah={ayah}
                      isSurahAlfatiha={isSurahAlfatiha}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
