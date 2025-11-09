import { useState, useEffect } from "react";
import useSWR from "swr";

import { DEFAULT_MODE } from "../context/MurajaahContext";
import { fetchAyahBySurahNAyah } from "../lib/fetchAyahBySurahNAyah";
import { fetchSurahByNumber } from "../lib/fetchSurahByNumber";

export function useMurajaah() {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [startAyah, setStartAyah] = useState<number | null>(null);
  const [endAyah, setEndAyah] = useState<number | null>(null);
  const [randoming, setRandoming] = useState(false);
  const [randomAyah, setRandomAyah] = useState<number | null>(null);
  const [mode, setMode] = useState(DEFAULT_MODE);

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

  const generateRandomAyah = () => {
    if (!startAyah || !endAyah) return;
    if (startAyah < 1 || endAyah > maxAyah) return;
    if (startAyah > endAyah) return;

    const randomedAyah =
      Math.floor(Math.random() * (endAyah - startAyah + 1)) + startAyah;

    if (startAyah === endAyah) {
      setRandomAyah(randomedAyah);
      return;
    }

    setRandoming(true);
    setTimeout(() => {
      setRandomAyah(randomedAyah);
      setRandoming(false);
    }, 500);
  };

  return {
    selectedSurah,
    setSelectedSurah,
    startAyah,
    setStartAyah,
    endAyah,
    setEndAyah,
    randomAyah,
    setRandomAyah,
    randoming,
    generateRandomAyah,
    mode,
    setMode,
    ayahData,
    minAyah,
    maxAyah,
  };
}
