"use client";

import { twMerge } from "tailwind-merge";
import { useOnboardingContext } from "./OnboardingContext";

export function FinishButton({ className }: { className?: string }) {
  const { step, finishOnboarding, isNextDisabled } = useOnboardingContext();

  if (step !== 6) {
    return null;
  }

  return (
    <button
      className={twMerge(
        "h-[56px] rounded-[calc(56px/2)] flex items-center justify-center bg-accent text-white px-6",
        "text-base font-semibold",
        "cursor-pointer",
        className
      )}
      onClick={finishOnboarding}
      disabled={isNextDisabled}
    >
      Selesai
    </button>
  );
}
