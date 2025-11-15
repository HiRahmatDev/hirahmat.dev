"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AnimatedNumber } from "./components/AnimatedNumber";
import { AyahInputNumber } from "./components/AyahInputNumber";
import { Label } from "./components/Label";
import { MenuButton } from "./components/MenuButton";
import { ModeRadio } from "./components/ModeRadio";
import { MurajaahButton } from "./components/MurajaahButton";
import { MurajaahProvider } from "./context/MurajaahContext";
import { SurahSelect } from "./components/SurahSelect";
import { useMurajaah } from "./hooks/useMurajaah";
import { BottomActionBar } from "./components/BottomActionBar";

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
    isMurajaahButtonDisabled,
  } = useMurajaah();

  useEffect(() => {
    if (ayahData) {
      router.replace(`/lab/murajaah-at-taisir?page=${ayahData.page}`, {
        scroll: false,
      });
    }
  }, [ayahData]);

  return (
    <MurajaahProvider
      value={{
        ayahData,
        selectedSurah,
        changeSurah,
        startAyah,
        changeStartAyah,
        endAyah,
        changeEndAyah,
        mode,
        changeMode,
        minAyah,
        maxAyah,
        randoming,
        randomAyah,
        generateRandomAyah,
        isMurajaahButtonDisabled,
      }}
    >
      <div className="min-h-screen pb-[calc(96px-8px)]">
        <div className="container pt-4">
          <div className="mb-8">
            <h1 className="text-2xl tracking-[-0.5px] font-bold sm:text-4xl sm:tracking-[-1px] sm:font-semibold mb-1">
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
          <div className="flex flex-col sm:flex-row justify-between gap-10">
            <div
              id="murajaah-sidebar"
              className="hidden sm:flex flex-col gap-8 grow-1 sm:sticky z-10 bg-white h-fit"
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
                  disabled={isMurajaahButtonDisabled}
                  onClick={generateRandomAyah}
                />
                <AnimatedNumber
                  min={startAyah || minAyah}
                  max={endAyah || maxAyah}
                  animating={randoming}
                  number={randomAyah}
                />
              </div>
            </div>
            <BottomActionBar />
            <div>{children}</div>
          </div>
        </div>
      </div>
    </MurajaahProvider>
  );
}
