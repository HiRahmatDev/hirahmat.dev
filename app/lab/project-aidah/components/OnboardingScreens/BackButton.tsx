"use client";

import { ChevronLeft } from "lucide-react";
import { useOnboardingContext } from "./OnboardingContext";

export function BackButton() {
  const { step, backStep } = useOnboardingContext();

  if (step === 1) return null;

  return (
    <button
      type="button"
      className="absolute top-8 left-2 flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer"
      onClick={backStep}
    >
      <ChevronLeft size={20} className="-ml-1.5 text-zinc-700" />
      <span className="text-sm font-medium text-zinc-800">Kembali</span>
    </button>
  );
}
