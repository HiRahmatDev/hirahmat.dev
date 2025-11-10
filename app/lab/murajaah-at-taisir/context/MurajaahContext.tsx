"use client";

import { createContext, useContext } from "react";
import { AyahData } from "../lib/fetchAyahBySurahNAyah";

type MurajaahContextState = {
  ayahData: AyahData | null | undefined;
  mode: MurajaahMode;
  changeMode?: (mode: MurajaahMode) => void;
};

export type MurajaahMode = "TADZKIRAH" | "DZIKR" | "TADRIB";
export const DEFAULT_MODE: MurajaahMode = "TADZKIRAH";

const defaultMurajaahContextState: MurajaahContextState = {
  ayahData: undefined,
  mode: DEFAULT_MODE,
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
