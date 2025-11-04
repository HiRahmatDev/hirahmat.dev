"use client";

import { createContext, useContext } from "react";
import { AyahData } from "../lib/fetchAyahBySurahNAyah";

export const AyahDataContext = createContext<AyahData | null | undefined>(
  undefined
);

export function useAyahData() {
  const context = useContext(AyahDataContext);
  return context;
}

export const AyahDataProvider = AyahDataContext.Provider;
