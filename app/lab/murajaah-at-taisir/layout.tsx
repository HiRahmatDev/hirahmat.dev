"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AyahDataProvider } from "./context/AyahDataContext";
import { ContactCTA } from "@/app/components/ContactCTA";
import { useMurajaah } from "./hooks/useMurajaah";

export default function MurajaahAtTaisirLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const router = useRouter();

  const {
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
    ayahData,
    minAyah,
    maxAyah,
  } = useMurajaah();

  useEffect(() => {
    if (ayahData) {
      router.replace(`/lab/murajaah-at-taisir?page=${ayahData.page}`, {
        scroll: false,
      });
    }
  }, [ayahData]);

  return (
    <AyahDataProvider value={ayahData}>
      <div className="min-h-[calc(100vh-calc(64px+88px))]">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl tracking-[-1px] font-semibold mb-1">
              Aplikasi Murajaah at Taisir
            </h1>
            <p className="text-zinc-500 italic text-sm max-w-prose">
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
                value={selectedSurah ?? undefined}
                onChange={(e) => {
                  setSelectedSurah(Number(e.target.value));
                  setRandomAyah(null);
                }}
              >
                {isLoadingSurah ? (
                  <option>Memuat...</option>
                ) : (
                  <option disabled>-- Pilih Surat Alquran --</option>
                )}

                {allSurah?.data.map(({ englishName: name, number }) => (
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
                    if (!startAyah || !endAyah) return;
                    if (startAyah < 1 || endAyah > maxAyah) return;
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
            <div className="pb-10">{children}</div>
          </div>
        </div>
      </div>
      <ContactCTA />
    </AyahDataProvider>
  );
}
