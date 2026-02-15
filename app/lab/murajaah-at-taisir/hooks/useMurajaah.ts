import { useState, useEffect } from "react";
import useSWR from "swr";

import {
  DEFAULT_MAX_AYAH,
  DEFAULT_MIN_AYAH,
  DEFAULT_MODE,
  type MurajaahMode,
} from "../context/MurajaahContext";
import { fetchAyahBySurahNAyah } from "../lib/fetchAyahBySurahNAyah";
import {
  isSurahNumber,
  type SurahNumber,
} from "../lib/fetchAllSurah";
import { fetchSurahByNumber } from "../lib/fetchSurahByNumber";
import { STORAGE_KEYS } from "../lib/constants";

export function useMurajaah() {
  const [selectedSurah, setSelectedSurah] = useState<SurahNumber | null>(null);
  const [startAyah, setStartAyah] = useState<number | null>(null);
  const [endAyah, setEndAyah] = useState<number | null>(null);
  const [randoming, setRandoming] = useState(false);
  const [randomAyah, setRandomAyah] = useState<number | null>(null);
  const [mode, setMode] = useState(DEFAULT_MODE);

  const changeSurah = (surahNumber: number) => {
    if (!isSurahNumber(surahNumber)) return;
    setSelectedSurah(surahNumber);
    setRandomAyah(null);
    localStorage.setItem(STORAGE_KEYS.SELECTED_SURAH, surahNumber.toString());
    localStorage.setItem(
      STORAGE_KEYS.PREVIOUS_SELECTED_SURAH,
      (selectedSurah || surahNumber).toString(),
    );
  };

  const changeMode = (newMode: MurajaahMode) => {
    setMode(newMode);
    localStorage.setItem(STORAGE_KEYS.SELECTED_MODE, newMode);
  };

  const changeStartAyah = (ayahNumber: number) => {
    setStartAyah(ayahNumber);
    localStorage.setItem(STORAGE_KEYS.START_AYAH, ayahNumber.toString());
  };

  const changeEndAyah = (ayahNumber: number) => {
    setEndAyah(ayahNumber);
    localStorage.setItem(STORAGE_KEYS.END_AYAH, ayahNumber.toString());
  };

  useEffect(() => {
    const storedSurah = localStorage.getItem(STORAGE_KEYS.SELECTED_SURAH);
    const storedMode =
      localStorage.getItem(STORAGE_KEYS.SELECTED_MODE) || DEFAULT_MODE;

    if (storedSurah) changeSurah(Number(storedSurah));
    if (storedMode) changeMode(storedMode as MurajaahMode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: ayahData } = useSWR(
    selectedSurah && randomAyah
      ? `ayah-by-surah-${selectedSurah}-n-ayah-${randomAyah}`
      : null,
    () => fetchAyahBySurahNAyah({ surah: selectedSurah!, ayah: randomAyah! }),
  );

  const { data: selectedSurahData } = useSWR(
    selectedSurah ? `surah-by-number-${selectedSurah}` : null,
    () => fetchSurahByNumber(selectedSurah!),
  );

  const minAyah = DEFAULT_MIN_AYAH;
  const maxAyah = selectedSurahData?.data.numberOfAyahs || DEFAULT_MAX_AYAH;
  const isMurajaahButtonDisabled = !selectedSurah || randoming;

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

  useEffect(() => {
    if (selectedSurahData) {
      const storedSurah = localStorage.getItem(STORAGE_KEYS.SELECTED_SURAH);
      const storedPrevSurah = localStorage.getItem(
        STORAGE_KEYS.PREVIOUS_SELECTED_SURAH,
      );
      const isNewSurah = storedSurah !== storedPrevSurah;

      // Only update ayah range when switching to a new surah
      if (isNewSurah) {
        changeStartAyah(minAyah);
        changeEndAyah(maxAyah);
      } else {
        // Validate and clamp existing values to the valid range
        if (startAyah !== null && startAyah < minAyah) {
          changeStartAyah(minAyah);
        }
        if (endAyah !== null && endAyah > maxAyah) {
          changeEndAyah(maxAyah);
        }
        // Initialize with defaults if not set
        if (startAyah === null) {
          changeStartAyah(minAyah);
        }
        if (endAyah === null) {
          changeEndAyah(maxAyah);
        }
      }
    }
  }, [selectedSurahData, startAyah, endAyah, minAyah, maxAyah]);

  return {
    selectedSurah,
    setSelectedSurah,
    changeSurah,
    startAyah,
    changeStartAyah,
    endAyah,
    changeEndAyah,
    randomAyah,
    setRandomAyah,
    randoming,
    generateRandomAyah,
    mode,
    setMode,
    changeMode,
    ayahData,
    minAyah,
    maxAyah,
    isMurajaahButtonDisabled,
  };
}
