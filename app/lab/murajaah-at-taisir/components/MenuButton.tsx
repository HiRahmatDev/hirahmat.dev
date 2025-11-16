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
import { useEffect, useRef, useState } from "react";

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

  const modalOverlayRef = useRef<HTMLDivElement | null>(null);
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const modalOverlay = modalOverlayRef.current;
    if (!modalOverlay) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        modalOverlay.classList.replace("overlay-enter-active", "overlay-enter");
      }, 300);
    } else {
      modalOverlay.classList.replace("overlay-enter", "overlay-leave-active");
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    const bottomSheet = bottomSheetRef.current;
    if (!bottomSheet) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        bottomSheet.classList.replace("slide-up-active", "slide-up");
      }, 300);
    } else {
      bottomSheet.classList.replace("slide-up", "slide-down-active");
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setOpen(true);
      setIsVisible(true);
    } else {
      setOpen(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  };

  return (
    <DialogTrigger isOpen={isVisible} onOpenChange={handleOpenChange}>
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
      <ModalOverlay
        ref={modalOverlayRef}
        isDismissable
        className="fixed inset-0 z-20 overlay-enter-active"
      >
        <Modal>
          <Dialog
            ref={bottomSheetRef}
            className="bg-white fixed bottom-0 left-0 right-0 rounded-t-xl pb-8 pt-6 slide-up-active"
          >
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
