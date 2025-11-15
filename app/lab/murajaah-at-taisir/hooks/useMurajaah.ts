import { useState, useEffect } from "react";
import useSWR from "swr";

import {
  DEFAULT_MAX_AYAH,
  DEFAULT_MIN_AYAH,
  DEFAULT_MODE,
  type MurajaahMode,
} from "../context/MurajaahContext";
import { fetchAyahBySurahNAyah } from "../lib/fetchAyahBySurahNAyah";
import { fetchSurahByNumber } from "../lib/fetchSurahByNumber";

export function useMurajaah() {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [startAyah, setStartAyah] = useState<number | null>(null);
  const [endAyah, setEndAyah] = useState<number | null>(null);
  const [randoming, setRandoming] = useState(false);
  const [randomAyah, setRandomAyah] = useState<number | null>(null);
  const [mode, setMode] = useState(DEFAULT_MODE);

  const changeSurah = (surahNumber: number) => {
    if (!surahNumber || surahNumber < 1 || surahNumber > 114) return;
    setSelectedSurah(surahNumber);
    setRandomAyah(null);
    localStorage.setItem("murajaah-selected-surah", surahNumber.toString());
    localStorage.setItem(
      "previous-murajaah-selected-surah",
      (selectedSurah || surahNumber).toString()
    );
  };

  const changeMode = (newMode: MurajaahMode) => {
    setMode(newMode);
    localStorage.setItem("murajaah-selected-mode", newMode);
  };

  const changeStartAyah = (ayahNumber: number) => {
    setStartAyah(ayahNumber);
    localStorage.setItem("murajaah-start-ayah", ayahNumber.toString());
  };

  const changeEndAyah = (ayahNumber: number) => {
    setEndAyah(ayahNumber);
    localStorage.setItem("murajaah-end-ayah", ayahNumber.toString());
  };

  useEffect(() => {
    const storedSurah = localStorage.getItem("murajaah-selected-surah");
    const storedMode =
      localStorage.getItem("murajaah-selected-mode") || DEFAULT_MODE;
    if (storedSurah) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      changeSurah(Number(storedSurah));
    }
    if (storedMode) {
      changeMode(storedMode as MurajaahMode);
    }
  }, []);

  const { data: ayahData } = useSWR(
    selectedSurah && randomAyah
      ? `ayah-by-surah-${selectedSurah}-n-ayah-${randomAyah}`
      : null,
    () => fetchAyahBySurahNAyah({ surah: selectedSurah!, ayah: randomAyah! })
  );

  const { data: selectedSurahData } = useSWR(
    selectedSurah ? `surah-by-number-${selectedSurah}` : null,
    () => fetchSurahByNumber(selectedSurah!)
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
      const storedStartAyah = localStorage.getItem("murajaah-start-ayah");
      const storedEndAyah = localStorage.getItem("murajaah-end-ayah");
      const storedSurah = localStorage.getItem("murajaah-selected-surah");
      const storedPrevSurah = localStorage.getItem(
        "previous-murajaah-selected-surah"
      );
      const isNewSurah = storedSurah !== storedPrevSurah;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      changeStartAyah(
        storedStartAyah && !isNewSurah ? Number(storedStartAyah) : minAyah
      );
      changeEndAyah(
        storedEndAyah && !isNewSurah ? Number(storedEndAyah) : maxAyah
      );
    }
  }, [selectedSurahData]);

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
