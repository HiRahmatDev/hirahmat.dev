import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";

import { AyahNumberOrnament } from "./components/AyahNumberOrnament";
import { PageWrapper } from "./components/PageWrapper";

type PageN = {
  code: number;
  status: string;
  data: Data;
};

type Data = {
  number: number;
  ayahs: Ayah[];
  surahs: Surahs;
  edition: Edition;
};

type Ayah = {
  number: number;
  text: string;
  surah: Surah;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
};

type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
};

type Surahs = {
  [key: string]: SurahN;
};

type SurahN = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
};

type Edition = {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const MIN_PAGE = 1;
const MAX_PAGE = 604;

export default async function MurajaahAtTaisirPage({
  searchParams,
}: PageProps) {
  const page = Number((await searchParams).page || "1");

  if (!page || isNaN(page) || page > MAX_PAGE || page < MIN_PAGE) {
    notFound();
  }

  const isRightPage = page % 2 === 1;

  const pageN: PageN = await fetch(
    `https://api.alquran.cloud/v1/page/${page}`
  ).then((res) => res.json());

  return (
    <div className="min-h-[calc(100vh-calc(64px+88px))] pt-12 pb-20">
      <div className="container flex justify-between">
        <div></div>
        <PageWrapper>
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
                  // Only render if the first ayah in this page is the first ayah in its surah
                  return pageN.data.ayahs[0].numberInSurah === 1;
                }
                // For other surahs, always render
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
                      "text-justify text-2xl/[64px]" +
                      (isNarrowerContainer ? " px-24" : "")
                    }
                  >
                    {pageN.data.ayahs.map((ayah) => {
                      if (ayah.surah.number !== surah.number) return null;

                      if (isSurahAlfatiha) {
                        return (
                          <p
                            key={ayah.number}
                            className={
                              ayah.numberInSurah === 1
                                ? " block text-center"
                                : " inline not-last:ml-2"
                            }
                          >
                            <span>{ayah.text}</span>
                            <AyahNumberOrnament number={ayah.numberInSurah} />
                          </p>
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
                              {ayah.text.replace(
                                "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ ",
                                ""
                              )}
                            </span>
                            <AyahNumberOrnament number={ayah.numberInSurah} />
                          </p>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </PageWrapper>
      </div>
    </div>
  );
}
