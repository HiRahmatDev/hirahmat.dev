"use client";

import clsx from "clsx";
import Image from "next/image";

import surahTitleLight from "../assets/surah-title-light.svg";
import { Ayah, Surahs } from "../lib/fetchQuranPage";
import { AyahRenderer } from "./AyahRenderer";
import { SlideableWrapper } from "./SlidableWrapper";

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
    <div className="flex justify-center -mx-6 sm:mx-0">
      <SlideableWrapper>
        <article
          lang="ar"
          dir="rtl"
          className={clsx(
            "relative shrink-0 bg-[#f6f5ee] pt-7.5 px-3 pb-36 max-w-125 w-full min-h-screen sm:min-h-auto",
            "sm:max-w-160 sm:px-6",
            "lg:px-12.5",
          )}
        >
          <div
            className={clsx(
              "pointer-events-none absolute top-0 bottom-0 w-32",
              isRightPage
                ? "left-0 bg-linear-to-r from-[#7a7761]/40 to-transparent"
                : "right-0 bg-linear-to-l from-[#7a7761]/40 to-transparent",
            )}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-8">
            <div
              className={
                "min-h-6 text-zinc-400 tracking-[0.35px] font-semibold font-sans text-[10px] md:text-sm [&>p]:select-none" +
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
                        "relative text-center" +
                        (index === 0 ? " mt-0" : " mt-8")
                      }
                    >
                      <h2 className="text-lg/[49.53px] select-none">
                        {surah.name}
                      </h2>
                      <Image
                        width={434}
                        height={43}
                        loading="eager"
                        src={surahTitleLight}
                        alt=""
                        role="presentation"
                        className="absolute top-0 w-full h-[49.53px] pointer-events-none select-none object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={
                      "text-justify [text-align-last:center] text-xl/[51px] md:text-2xl/[64px] select-none" +
                      (isNarrowerContainer ? " px-5 sm:px-24" : "")
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
      </SlideableWrapper>
    </div>
  );
}
