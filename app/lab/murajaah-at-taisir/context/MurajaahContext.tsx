"use client";

import { createContext, useContext } from "react";
import { AyahData } from "../lib/fetchAyahBySurahNAyah";

type MurajaahContextState = {
  ayahData: AyahData | null | undefined;
  selectedSurah: number | null;
  changeSurah: (surahNumber: number) => void;
  mode: MurajaahMode;
  changeMode: (mode: MurajaahMode) => void;
  startAyah: number | null;
  changeStartAyah: (ayahNumber: number) => void;
  endAyah: number | null;
  changeEndAyah: (ayahNumber: number) => void;
  minAyah: number;
  maxAyah: number;
};

export type MurajaahMode = "TADZKIRAH" | "DZIKR" | "TADRIB";
export const DEFAULT_MODE: MurajaahMode = "TADZKIRAH";
export const DEFAULT_MIN_AYAH = 1;
export const DEFAULT_MAX_AYAH = 1;

const defaultMurajaahContextState: MurajaahContextState = {
  ayahData: undefined,
  selectedSurah: null,
  changeSurah: function () {},
  startAyah: null,
  changeStartAyah: function () {},
  endAyah: null,
  changeEndAyah: function () {},
  mode: DEFAULT_MODE,
  changeMode: function () {},
  minAyah: DEFAULT_MIN_AYAH,
  maxAyah: DEFAULT_MAX_AYAH,
};

export const MurajaahContext = createContext(defaultMurajaahContextState);

export function useMurajaahContext() {
  const context = useContext(MurajaahContext);

  if (!context) {
    throw new Error(
      "`useMurajaahContext` must be used within a `<MurajaahProvider>`"
    );
  }

  return context;
}

export const MurajaahProvider = MurajaahContext.Provider;
