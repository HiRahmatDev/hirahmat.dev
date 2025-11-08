import { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchQuranPage } from "./lib/fetchQuranPage";
import { QuranPageRenderer } from "./components/QuranPageRenderer";
import { SITE_NAME } from "@/app/constants";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Aplikasi Murajaah at Taisir | HiRahmat.Dev",
  description:
    "Terinspirasi dari buku Muraja'ah At-Taisir (30 Hari Hafal Al-Qur'an) - Adi Hidayat",
  openGraph: {
    title: "Aplikasi Murajaah at Taisir | HiRahmat.Dev",
    description:
      "Terinspirasi dari buku Muraja'ah At-Taisir (30 Hari Hafal Al-Qur'an) - Adi Hidayat",
    siteName: SITE_NAME,
    url: "/lab/murajaah-at-taisir",
    images: "/lab/murajaah-at-taisir/opengraph-image.png",
    locale: "id",
    type: "website",
  },
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
  const pageN = await fetchQuranPage(page);
  const surahs = pageN.data.surahs;
  const ayahs = pageN.data.ayahs || [];

  return (
    <QuranPageRenderer
      surahs={surahs}
      ayahs={ayahs}
      isRightPage={isRightPage}
    />
  );
}
