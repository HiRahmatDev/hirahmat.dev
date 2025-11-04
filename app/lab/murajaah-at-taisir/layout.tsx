"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import { fetchAllSurah } from "./lib/fetchAllSurah";
import { fetchSurahByNumber } from "./lib/fetchSurahByNumber";
import { fetchAyahBySurahNAyah } from "./lib/fetchAyahBySurahNAyah";
import { AyahDataProvider } from "./context/AyahDataContext";

export default function MurajaahAtTaisirLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [startAyah, setStartAyah] = useState<number | null>(null);
  const [endAyah, setEndAyah] = useState<number | null>(null);
  const [randomAyah, setRandomAyah] = useState<number | null>(null);

  const { data, isLoading } = useSWR("all-surah", fetchAllSurah);

  const { data: selectedSurahData } = useSWR(
    selectedSurah ? `surah-by-number-${selectedSurah}` : null,
    () => fetchSurahByNumber(selectedSurah!)
  );

  const { data: ayahData } = useSWR(
    selectedSurah && randomAyah
      ? `ayah-by-surah-${selectedSurah}-n-ayah-${randomAyah}`
      : null,
    () => {
      if (!selectedSurah || !randomAyah) return null;
      return fetchAyahBySurahNAyah({
        surah: selectedSurah,
        ayah: randomAyah,
      });
    }
  );

  const minAyah = 1;
  const maxAyah = selectedSurahData ? selectedSurahData.data.numberOfAyahs : 1;

  useEffect(() => {
    if (!selectedSurahData) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartAyah(minAyah);
    setEndAyah(maxAyah);
  }, [selectedSurahData]);

  useEffect(() => {
    if (!ayahData) return;

    router.replace(`/lab/murajaah-at-taisir?page=${ayahData.page}`);
  }, [ayahData]);

  return (
    <AyahDataProvider value={ayahData}>
      <div className="min-h-[calc(100vh-calc(64px+88px))]">
        <div className="container">
          <div className="text-center mb-4">
            <h1 className="text-4xl tracking-[-1px] font-semibold mb-2">
              Murajaah at Taisir
            </h1>
            <p className="text-zinc-500 italic text-sm max-w-[32ch] mx-auto">
              Terinspirasi dari buku{" "}
              <b className="font-medium text-foreground">
                Muraja&lsquo;ah At-Taisir (30 Hari Hafal Al-Qur&lsquo;an)
              </b>{" "}
              - Adi Hidayat
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex flex-col gap-3 grow-1">
              <select
                className="border border-gray-300 rounded-md p-2"
                onChange={(e) => {
                  setSelectedSurah(Number(e.target.value));
                  setRandomAyah(null);
                }}
              >
                {isLoading ? (
                  <option>Memuat...</option>
                ) : (
                  <option disabled>-- Pilih Surat Alquran --</option>
                )}

                {data?.data.map(({ englishName: name, number }) => (
                  <option key={`${number}-${name}`} value={number}>
                    {number}. {name}
                  </option>
                ))}
              </select>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Dari ayat ke-"
                  min={minAyah}
                  max={maxAyah}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={startAyah ?? ""}
                  onChange={(e) => setStartAyah(Number(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="Sampai ayat ke-"
                  min={startAyah ?? minAyah}
                  max={maxAyah}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={endAyah ?? ""}
                  onChange={(e) => setEndAyah(Number(e.target.value))}
                />
              </div>
              <div>
                <button
                  className="bg-accent hover:bg-accent-hover animate-hover text-white px-4 py-3 font-medium rounded-md w-full cursor-pointer"
                  onClick={() => {
                    if (startAyah === null || endAyah === null) return;
                    if (startAyah < 1 || endAyah < 1) return;
                    if (startAyah > endAyah) return;

                    setRandomAyah(
                      Math.floor(Math.random() * (endAyah - startAyah + 1)) +
                        startAyah
                    );
                  }}
                >
                  Mulai Murajaah
                </button>
              </div>
              <div className="text-center py-6">
                <p className="text-7xl font-bold">{randomAyah}</p>
              </div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </AyahDataProvider>
  );
}
