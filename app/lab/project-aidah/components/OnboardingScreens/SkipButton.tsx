"use client";

import { twMerge } from "tailwind-merge";
import { useOnboardingContext } from "./OnboardingContext";

export function SkipButton({ className }: { className?: string }) {
  const { step, nextStep, isNextDisabled } = useOnboardingContext();

  if (step !== 5) return null;

  return (
    <button
      className={twMerge(
        "h-[56px] rounded-[calc(56px/2)] tracking-[-0.3px] flex items-center justify-center text-text-accent px-2",
        "text-base font-semibold",
        "cursor-pointer",
        className
      )}
      onClick={nextStep}
      disabled={isNextDisabled}
    >
      Lewati saja
    </button>
  );
}
