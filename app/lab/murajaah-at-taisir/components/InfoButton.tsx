"use client";

import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
  Pressable,
} from "react-aria-components";
import { Info } from "lucide-react";

import { Logo } from "@/app/(main)/components/Logo";
import { useBottomSheet } from "../hooks/useBottomSheet";

export function InfoButton() {
  const { isVisible, onVisibleChange, modalOverlayRef, bottomSheetRef } =
    useBottomSheet();

  return (
    <DialogTrigger isOpen={isVisible} onOpenChange={onVisibleChange}>
      <Pressable>
        <button className="size-12 rounded-lg cursor-pointer shrink-0 flex justify-center items-center bg-zinc-100 active:scale-90 transition-transform">
          <Info className="text-zinc-700" />
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
            className="bg-white fixed bottom-0 left-0 right-0 rounded-t-xl pb-8 pt-5 slide-up-active"
          >
            <div className="px-4">
              <h1 className="text-2xl tracking-[-0.5px] font-bold sm:text-4xl sm:tracking-[-1px] sm:font-semibold mb-1.5">
                Muraja{"'"}ah at-Taisir
              </h1>
              <p className="text-zinc-500 italic text-sm max-w-prose">
                Terinspirasi dari buku{" "}
                <b className="font-medium text-foreground">
                  Muraja{"'"}ah at-Taisir (30 Hari Hafal Al-Qur{"'"}an)
                </b>{" "}
                - Ust. Adi Hidayat
              </p>
              <div className="flex items-center justify-end h-fit pl-2 mt-4">
                <p className="italic text-xs font-medium text-zinc-400 -mr-5 -mt-9 -rotate-4">
                  by
                </p>
                <Logo />
              </div>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
