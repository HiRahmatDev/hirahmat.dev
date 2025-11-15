"use client";

import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
  Pressable,
} from "react-aria-components";
import { Menu } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { AyahInputNumber } from "./AyahInputNumber";
import { Label } from "./Label";
import { ModeRadio } from "./ModeRadio";
import { SurahSelect } from "./SurahSelect";
import { useMurajaahContext } from "../context/MurajaahContext";

export function MenuButton({ className }: { className?: string }) {
  const {
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
  } = useMurajaahContext();

  return (
    <DialogTrigger>
      <Pressable>
        <button
          className={twMerge(
            "size-12 rounded-lg cursor-pointer shrink-0 flex justify-center items-center bg-zinc-100",
            "active:scale-80 transition-transform",
            className
          )}
        >
          <Menu />
        </button>
      </Pressable>
      <ModalOverlay isDismissable className="fixed inset-0 z-20 bg-black/30">
        <Modal>
          <Dialog className="bg-white fixed bottom-0 left-0 right-0 rounded-t-xl pb-8 pt-6">
            <div className="mx-auto max-w-[420px] px-5">
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
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
