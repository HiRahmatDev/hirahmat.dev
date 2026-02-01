"use client";

import { useMurajaahContext } from "../context/MurajaahContext";

type AyahTextHighlightProps = {
  ayahText: string;
  isSelected: boolean;
  isSurahAlfatiha?: boolean;
};

const BISMILLAH = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ ";

export function AyahTextHighlight({
  ayahText,
  isSelected,
  isSurahAlfatiha = false,
}: AyahTextHighlightProps) {
  const { mode } = useMurajaahContext();

  let displayText = ayahText;

  if (!isSurahAlfatiha) {
    displayText = ayahText.replace(BISMILLAH, "");
  }

  function getFirstArabicWord(text: string) {
    const words = text.split(" ");
    const isTooLong = words[0].split("").length > 6 || words.length < 6;
    return words.slice(0, isTooLong ? 1 : 2).join(" ");
  }

  function removeFirstArabicWord(text: string) {
    const words = text.split(" ");
    const isTooLong = words[0].split("").length > 6 || words.length < 6;
    return words.slice(isTooLong ? 1 : 2).join(" ");
  }

  if (!isSelected) {
    return <span className="opacity-[0.025]">{displayText.trim()}</span>;
  }

  return (
    <span className="bg-[#ebe8d4] [&>span]:transition-opacity [&>span]:duration-150 [&>span]:ease-(--ease-silky)">
      <span
        className={
          mode === "TADZKIRAH" || mode === "TADRIB"
            ? "opacity-100"
            : "opacity-[0.025]"
        }
      >
        {getFirstArabicWord(displayText).trim()}
      </span>{" "}
      <span className={mode === "TADRIB" ? "opacity-100" : "opacity-[0.025]"}>
        {removeFirstArabicWord(displayText).trim()}
      </span>
    </span>
  );
}
