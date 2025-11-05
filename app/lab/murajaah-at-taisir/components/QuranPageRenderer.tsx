"use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { AyahNumberOrnament } from "../components/AyahNumberOrnament";
import { QuranPageResponse } from "../lib/fetchQuranPage";
import { useAyahData } from "../context/AyahDataContext";

type QuranPageRendererProps = {
  pageN: QuranPageResponse;
  isRightPage: boolean;
};

export function QuranPageRenderer({
  pageN,
  isRightPage,
}: QuranPageRendererProps) {
  const ayahData = useAyahData();
  const randomText = ayahData?.text || "";

  return (
    <article
      lang="ar"
      dir="rtl"
      className={clsx(
        "w-[600px] min-h-[900px] shrink-0 bg-[#f6f5ee] pt-7.5 px-12.5 pb-12",
        "md:scale-100",
        "sm:scale-[0.8] origin-top-left",
        "scale-[0.7] origin-top-left",
        "transition-transform"
      )}
    >
      <div className="flex flex-col gap-8">
        <div
          className={
            "min-h-6 text-zinc-400 italic tracking-[-0.35px] font-medium font-sans text-sm" +
            (isRightPage ? " text-right" : " text-left")
          }
        >
          {isRightPage ? <p>KANAN</p> : <p>KIRI</p>}
        </div>
        {Object.entries(pageN.data.surahs).map(([_, surah], index) => {
          const isSurahAlfatiha = surah.number === 1;
          const isSurahAlBaqarah = surah.number === 2;

          const isNarrowerContainer =
            isSurahAlfatiha ||
            (isSurahAlBaqarah && pageN.data.ayahs[0].numberInSurah === 1);

          function shouldRenderTitle() {
            if (index === 0) {
              return pageN.data.ayahs[0].numberInSurah === 1;
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
                    src="https://web.mushafmakkah.com/_nuxt/img/SurahTitle-Light.b01697e.svg"
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
                {pageN.data.ayahs.map((ayah) => {
                  const isSelectedAyah =
                    normalizeArabic(randomText) === normalizeArabic(ayah.text);

                  if (ayah.surah.number !== surah.number) return null;

                  if (isSurahAlfatiha) {
                    return (
                      <React.Fragment key={ayah.number}>
                        <p
                          className={
                            ayah.numberInSurah === 1
                              ? " block text-center"
                              : " inline not-last:ml-2"
                          }
                        >
                          <span>
                            {isSelectedAyah ? (
                              <span className="bg-[#f1efdf] hover:[&>span]:opacity-100 [&>span]:transition-opacity">
                                <span>
                                  {getFirstArabicWord(ayah.text).trim()}
                                </span>{" "}
                                <span className="opacity-[0.025]">
                                  {removeFirstArabicWord(ayah.text).trim()}
                                </span>
                              </span>
                            ) : (
                              <span className="opacity-[0.025]">
                                {ayah.text}
                              </span>
                            )}
                          </span>
                          <AyahNumberOrnament
                            number={ayah.numberInSurah}
                            className={
                              "mr-2" + (!isSelectedAyah ? " opacity-10" : "")
                            }
                          />
                        </p>
                      </React.Fragment>
                    );
                  }

                  return (
                    <React.Fragment key={ayah.number}>
                      {ayah.numberInSurah === 1 && (
                        <p className="text-center">
                          بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
                        </p>
                      )}
                      <p className="inline not-last:ml-3">
                        <span>
                          {isSelectedAyah ? (
                            <span className="bg-[#f1efdf] hover:[&>span]:opacity-100 [&>span]:transition-opacity">
                              <span>
                                {getFirstArabicWord(
                                  ayah.text.replace(
                                    "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ ",
                                    ""
                                  )
                                )}
                              </span>{" "}
                              <span className="opacity-[0.025]">
                                {removeFirstArabicWord(
                                  ayah.text.replace(
                                    "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ ",
                                    ""
                                  )
                                )}
                              </span>
                            </span>
                          ) : (
                            <span className="opacity-[0.025]">
                              {ayah.text.replace(
                                "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ ",
                                ""
                              )}
                            </span>
                          )}
                        </span>
                        <AyahNumberOrnament
                          number={ayah.numberInSurah}
                          className={
                            "mr-2" + (!isSelectedAyah ? " opacity-10" : "")
                          }
                        />
                      </p>
                    </React.Fragment>
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

function normalizeArabic(text: string) {
  return text
    .replace(/[\u064B-\u0652]/g, "") // Hilangkan harakat
    .replace(/\s+/g, " ") // Normalisasi spasi
    .trim();
}

function getFirstArabicWord(text: string) {
  const words = text.trim().split(" ");
  return words.slice(0, 2).join(" ");
}

function removeFirstArabicWord(text: string) {
  const words = text.trim().split(" ");
  return words.slice(2).join(" ");
}
