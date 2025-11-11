"use client";

import { Ayah } from "../lib/fetchQuranPage";
import { AyahNumberOrnament } from "./AyahNumberOrnament";
import { AyahTextHighlight } from "./AyahTextHighlight";
import { useMurajaahContext } from "../context/MurajaahContext";

type AyahRendererProps = {
  ayah: Ayah;
  isSurahAlfatiha?: boolean;
};

export function AyahRenderer({ ayah, isSurahAlfatiha }: AyahRendererProps) {
  const { ayahData } = useMurajaahContext();
  const randomText = ayahData?.text || "";

  const isSelectedAyah =
    normalizeArabic(randomText) === normalizeArabic(ayah.text);

  if (isSurahAlfatiha) {
    return (
      <>
        <p
          className={
            ayah.numberInSurah === 1
              ? " block text-center"
              : " inline not-last:ml-2"
          }
        >
          <span>
            <AyahTextHighlight
              ayahText={ayah.text}
              isSelected={isSelectedAyah}
              isSurahAlfatiha
            />
          </span>
          <AyahNumberOrnament
            number={ayah.numberInSurah}
            className={"mr-1 sm:mr-2" + (!isSelectedAyah ? " opacity-10" : "")}
          />
        </p>
      </>
    );
  }

  return (
    <>
      {ayah.numberInSurah === 1 && (
        <p className="text-center">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</p>
      )}
      <p className="inline not-last:ml-3">
        <span>
          <AyahTextHighlight ayahText={ayah.text} isSelected={isSelectedAyah} />
        </span>
        <AyahNumberOrnament
          number={ayah.numberInSurah}
          className={"mr-1 sm:mr-2" + (!isSelectedAyah ? " opacity-10" : "")}
        />
      </p>
    </>
  );
}

function normalizeArabic(text: string) {
  return text
    .replace(/[\u064B-\u0652]/g, "") // Hilangkan harakat
    .replace(/\s+/g, " ") // Normalisasi spasi
    .trim();
}
