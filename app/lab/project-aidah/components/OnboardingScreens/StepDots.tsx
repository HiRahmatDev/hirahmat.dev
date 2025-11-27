"use client";

import clsx from "clsx";
import { useOnboardingContext } from "./OnboardingContext";

export function StepDots() {
  const { step } = useOnboardingContext();

  return (
    <div className="flex justify-center items-center h-3">
      <div className="flex gap-1">
        {Array.from({ length: 6 }).map((_, index) => {
          const isActive = step === index + 1;
          return (
            <div
              key={`step-${index + 1}`}
              className={clsx(
                "h-1.5 rounded-[3px] transition-[width,background] duration-500 shrink-0",
                isActive ? "w-3 bg-accent" : "w-1.5 bg-accent/20"
              )}
            />
          );
        })}
        <div />
      </div>
    </div>
  );
}
