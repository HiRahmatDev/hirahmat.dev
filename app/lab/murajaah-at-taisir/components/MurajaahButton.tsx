"use client";

import { twMerge } from "tailwind-merge";
import { MurajaahMode } from "../context/MurajaahContext";

type MurajaahButtonProps = Readonly<{
  className?: string;
  disabled?: boolean;
  mode?: MurajaahMode;
  onClick?: () => void;
}>;

export function MurajaahButton({
  className,
  disabled,
  mode,
  onClick,
}: MurajaahButtonProps) {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "text-white px-4 py-3 font-medium rounded-lg w-full ease-silky duration-150 active:scale-98 sm:active:scale-100",
        mode === "TADRIB"
          ? "bg-calm hover:bg-calm-hover"
          : "bg-accent hover:bg-accent-hover",
        disabled
          ? "bg-zinc-300 hover:bg-zinc-300 cursor-not-allowed"
          : "sm:animate-hover cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      Mulai {mode === "TADRIB" ? "Latihan" : "Murajaah"}
    </button>
  );
}
