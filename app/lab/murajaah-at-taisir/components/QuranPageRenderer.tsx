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
    <div className="flex justify-center -mx-5 sm:mx-0">
      <article
        lang="ar"
        dir="rtl"
        className={clsx(
          "md:scale-100",
          "min-h-[75vh] sm:min-h-[900px] sm:w-[600px] sm:max-w-[600px] sm:scale-[0.8] sm:origin-top-left sm:px-12.5",
          "scale-100 relative shrink-0 bg-[#f6f5ee] pt-7.5 px-5 pb-12 max-w-[420px] w-full"
        )}
      >
        <div
          className={clsx(
            "pointer-events-none absolute top-0 bottom-0 w-32",
            isRightPage
              ? "left-0 bg-gradient-to-r from-[#7a7761]/40 to-transparent"
              : "right-0 bg-gradient-to-l from-[#7a7761]/40 to-transparent"
          )}
          aria-hidden="true"
        />
        <div className="flex flex-col gap-8">
          <div
            className={
              "min-h-6 text-zinc-400 tracking-[0.35px] font-semibold font-sans text-[10px] sm:text-sm" +
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
                      className="absolute top-0 w-full h-[49.53px] pointer-events-none select-none object-cover"
                    />
                  </div>
                )}
                <div
                  className={
                    "text-justify text-lg/[46px] sm:text-2xl/[64px] select-none" +
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
    </div>
  );
}
