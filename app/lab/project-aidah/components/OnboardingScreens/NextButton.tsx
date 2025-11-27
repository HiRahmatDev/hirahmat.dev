"use client";

import { twMerge } from "tailwind-merge";
import { useOnboardingContext } from "./OnboardingContext";

export function NextButton({ className }: { className?: string }) {
  const { step, nextStep, isNextDisabled } = useOnboardingContext();

  if (step === 6) {
    return null;
  }

  return (
    <button
      className={twMerge(
        "h-[56px] rounded-[calc(56px/2)] flex items-center justify-center px-6",
        "text-base font-semibold text-white bg-accent",
        "disabled:bg-gray-200",
        "cursor-pointer",
        className
      )}
      onClick={nextStep}
      disabled={isNextDisabled}
    >
      Lanjut
    </button>
  );
}
