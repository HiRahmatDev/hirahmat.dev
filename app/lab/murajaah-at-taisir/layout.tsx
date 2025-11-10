"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AnimatedNumber } from "./components/AnimatedNumber";
import { AyahInputNumber } from "./components/AyahInputNumber";
import { ContactCTA } from "@/app/components/ContactCTA";
import { Label } from "./components/Label";
import { ModeRadio } from "./components/ModeRadio";
import { MurajaahButton } from "./components/MurajaahButton";
import { MurajaahProvider } from "./context/MurajaahContext";
import { SurahSelect } from "./components/SurahSelect";
import { useMurajaah } from "./hooks/useMurajaah";

export default function MurajaahAtTaisirLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const router = useRouter();

  const {
    selectedSurah,
    changeSurah,
    startAyah,
    changeStartAyah,
    endAyah,
    changeEndAyah,
    randomAyah,
    randoming,
    generateRandomAyah,
    mode,
    changeMode,
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
    <MurajaahProvider value={{ ayahData, mode, changeMode }}>
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
                  <Label>Surah dan Ayat</Label>
                  <div className="flex flex-col gap-2">
                    <SurahSelect
                      value={selectedSurah ?? undefined}
                      onChange={(surahNumber) => {
                        changeSurah(surahNumber);
                      }}
                    />
                    <div className="flex gap-2">
                      <AyahInputNumber
                        placeholder="Dari ayat ke-"
                        min={minAyah}
                        max={maxAyah}
                        value={startAyah}
                        disabled={!selectedSurah}
                        onChange={(ayah) => changeStartAyah(ayah)}
                      />
                      <AyahInputNumber
                        placeholder="Sampai ayat ke-"
                        min={startAyah || minAyah}
                        max={maxAyah}
                        value={endAyah}
                        disabled={!selectedSurah}
                        onChange={(ayah) => changeEndAyah(ayah)}
                      />
                    </div>
                  </div>
                </div>
                <ModeRadio value={mode} onChange={changeMode} />
              </div>
              <div>
                <MurajaahButton
                  mode={mode}
                  disabled={disabledButton}
                  onClick={generateRandomAyah}
                  className="hidden sm:block"
                />
                <div className="-translate-x-1/2 sm:hidden fixed bottom-0 left-1/2 w-full bg-white">
                  <div className="flex gap-3 max-w-[420px] w-full px-5 pt-4 pb-8 mx-auto">
                    <MurajaahButton
                      mode={mode}
                      disabled={disabledButton}
                      onClick={generateRandomAyah}
                    />
                    <div className="relative min-w-[80px] border border-zinc-200 rounded-lg flex justify-center items-center">
                      <div className="absolute -top-2 left-1 text-xs italic semibold text-zinc-400 px-1 bg-white tracking-[-0.5px]">
                        ayat ke-
                      </div>
                      <AnimatedNumber
                        min={minAyah}
                        max={maxAyah}
                        animating={randoming}
                        number={randomAyah}
                        className="text-3xl py-0"
                      />
                    </div>
                  </div>
                </div>
                <AnimatedNumber
                  min={minAyah}
                  max={maxAyah}
                  animating={randoming}
                  number={randomAyah}
                  className="hidden sm:block"
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
