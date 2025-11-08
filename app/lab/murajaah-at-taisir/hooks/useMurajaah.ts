import { useState, useEffect } from "react";
import useSWR from "swr";

import { DEFAULT_MODE } from "../context/MurajaahContext";
import { fetchAllSurah } from "../lib/fetchAllSurah";
import { fetchAyahBySurahNAyah } from "../lib/fetchAyahBySurahNAyah";
import { fetchSurahByNumber } from "../lib/fetchSurahByNumber";

export function useMurajaah() {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [startAyah, setStartAyah] = useState<number | null>(null);
  const [endAyah, setEndAyah] = useState<number | null>(null);
  const [randomAyah, setRandomAyah] = useState<number | null>(null);
  const [mode, setMode] = useState(DEFAULT_MODE);

  const { data: allSurah, isLoading: isLoadingSurah } = useSWR(
    "all-surah",
    fetchAllSurah
  );

  const { data: selectedSurahData } = useSWR(
    selectedSurah ? `surah-by-number-${selectedSurah}` : null,
    () => fetchSurahByNumber(selectedSurah!)
  );

  const { data: ayahData } = useSWR(
    selectedSurah && randomAyah
      ? `ayah-by-surah-${selectedSurah}-n-ayah-${randomAyah}`
      : null,
    () => fetchAyahBySurahNAyah({ surah: selectedSurah!, ayah: randomAyah! })
  );

  const minAyah = 1;
  const maxAyah = selectedSurahData?.data.numberOfAyahs || 1;

  useEffect(() => {
    if (selectedSurahData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStartAyah(minAyah);
      setEndAyah(maxAyah);
    }
  }, [selectedSurahData]);

  return {
    allSurah,
    isLoadingSurah,
    selectedSurah,
    setSelectedSurah,
    startAyah,
    setStartAyah,
    endAyah,
    setEndAyah,
    randomAyah,
    setRandomAyah,
    mode,
    setMode,
    ayahData,
    minAyah,
    maxAyah,
  };
}
