"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { AyahInputNumber } from "./components/AyahInputNumber";
import { ContactCTA } from "@/app/components/ContactCTA";
import { MurajaahProvider } from "./context/MurajaahContext";
import { useMurajaah } from "./hooks/useMurajaah";
import { ModeRadio } from "./components/ModeRadio";
import { Label } from "./components/Label";
import { AnimatedNumber } from "./components/AnimatedNumber";

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
    randoming,
    generateRandomAyah,
    mode,
    setMode,
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

  const disabledButton = !selectedSurah || randoming;

  return (
    <MurajaahProvider value={{ ayahData, mode, setMode }}>
      <div className="min-h-[calc(100vh-calc(64px+88px))]">
        <div className="container pb-10">
          <div className="mb-8">
            <h1 className="text-4xl tracking-[-1px] font-semibold mb-1">
              Muraja{"'"}ah at-Taisir
            </h1>
            <p className="text-zinc-500 italic text-sm max-w-prose">
              Terinspirasi dari buku{" "}
              <b className="font-medium text-foreground">
                Muraja{"'"}ah at-Taisir (30 Hari Hafal Al-Qur{"'"}an)
              </b>{" "}
              - Adi Hidayat
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-5">
            <div
              id="murajaah-sidebar"
              className="flex flex-col gap-8 grow-1 sm:sticky z-10 bg-white h-fit"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <Label>Surat dan Ayat</Label>
                  <div className="flex flex-col gap-2">
                    <select
                      className="border border-gray-300 rounded-lg p-2 cursor-pointer"
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
                    <div className="flex gap-2">
                      <AyahInputNumber
                        placeholder="Dari ayat ke-"
                        min={minAyah}
                        max={maxAyah}
                        value={startAyah}
                        disabled={!selectedSurah}
                        onChange={(ayah) => setStartAyah(ayah)}
                      />
                      <AyahInputNumber
                        placeholder="Sampai ayat ke-"
                        min={startAyah || minAyah}
                        max={maxAyah}
                        value={endAyah}
                        disabled={!selectedSurah}
                        onChange={(ayah) => setEndAyah(ayah)}
                      />
                    </div>
                  </div>
                </div>
                <ModeRadio value={mode} onChange={setMode} />
              </div>
              <div>
                <button
                  disabled={disabledButton}
                  className={clsx(
                    "text-white px-4 py-3 font-medium rounded-lg w-full",
                    disabledButton
                      ? "bg-zinc-300 hover:bg-zinc-300 cursor-not-allowed"
                      : "animate-hover cursor-pointer",
                    mode === "TADRIB"
                      ? "bg-calm hover:bg-calm-hover"
                      : "bg-accent hover:bg-accent-hover"
                  )}
                  onClick={generateRandomAyah}
                >
                  Mulai {mode === "TADRIB" ? "Latihan" : "Murajaah"}
                </button>
                <AnimatedNumber
                  min={minAyah}
                  max={maxAyah}
                  animating={randoming}
                  number={randomAyah}
                />
              </div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
      <ContactCTA />
    </MurajaahProvider>
  );
}
