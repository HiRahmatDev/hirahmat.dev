import Image from "next/image";

import { PageWrapper } from "./components/PageWrapper";
import { notFound } from "next/navigation";

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

export default async function MurajaahAtTaisirPage({
  searchParams,
}: PageProps) {
  const page = Number((await searchParams).page || "1");

  if (!page || isNaN(page) || page > 604) {
    notFound();
  }

  const pageN: PageN = await fetch(
    `https://api.alquran.cloud/v1/page/${page}`
  ).then((res) => res.json());

  return (
    <div className="min-h-[calc(100vh-calc(64px+88px))] pt-12 pb-20">
      <div className="container flex justify-center">
        <PageWrapper>
          <div className="min-h-6"></div>
          {Object.entries(pageN.data.surahs).map(([_, surah], index) => {
            function shouldRenderTitle() {
              if (index === 0) {
                // Only render if the first ayah in this page is the first ayah in its surah
                return pageN.data.ayahs[0].numberInSurah === 1;
              }
              // For other surahs, always render
              return pageN.data.ayahs.some((ayah) => ayah.numberInSurah === 1);
            }

            return (
              <div
                key={surah.number}
                className={"space-y-5" + (index > 0 ? " mt-5" : "")}
              >
                {shouldRenderTitle() && (
                  <div className="relative text-center">
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
                <div className="text-justify">
                  {pageN.data.ayahs.map(
                    (ayah) =>
                      surah.number === ayah.surah.number && (
                        <p
                          key={ayah.number}
                          className="text-2xl/[64px] inline not-last:ml-2"
                        >
                          <span>{ayah.text}</span>
                          <span className="relative inline-block w-7.5 text-center text-sm">
                            <Image
                              width={22}
                              height={25}
                              src="https://web.mushafmakkah.com/_nuxt/img/aya_num_ico.dedce8b.svg"
                              alt=""
                              role="presentation"
                              className="absolute -top-0.5 pointer-events-none select-none w-full"
                            />
                            {new Intl.NumberFormat("ar-Sa").format(
                              ayah.numberInSurah
                            )}
                          </span>
                        </p>
                      )
                  )}
                </div>
              </div>
            );
          })}
        </PageWrapper>
      </div>
    </div>
  );
}
