"use client";

import { useRef } from "react";

import { NextButton } from "./NextButton";
import { OnboardingGoalScreen } from "./OnboardingGoalScreen";
import { OnboardingProgressLevelScreen } from "./OnboardingProgressLevelScreen";
import { OnboardingWelcomeScreen } from "./OnboardingWelcomeScreen";
import { StepDots } from "./StepDots";
import { useOnboardingAnimation } from "./hooks/useOnboardingAnimation";
import { useOnboardingContext } from "./OnboardingContext";

const SCREENS = [
  { id: 1, Component: OnboardingWelcomeScreen },
  { id: 2, Component: OnboardingGoalScreen },
  { id: 3, Component: OnboardingProgressLevelScreen },
  { id: 4, Component: OnboardingWelcomeScreen },
  { id: 5, Component: OnboardingGoalScreen },
  { id: 6, Component: OnboardingWelcomeScreen },
];

export function OnboardingScreen() {
  const { step } = useOnboardingContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useOnboardingAnimation({ step, containerRef });

  return (
    <div className="h-[inherit] flex flex-col justify-between items-center pt-20 pb-10">
      <div className="size-full overflow-hidden relative" ref={containerRef}>
        {SCREENS.map(({ id, Component }) => {
          const shouldRender = step === id || (step === id + 1 && id < 6);
          if (!shouldRender) return null;
          return (
            <div
              key={`screen-${id}`}
              className={`screen-${id} bg-white absolute top-0 left-0 w-full h-full ${
                id > 1 ? "translate-x-full" : ""
              }`}
            >
              <Component />
            </div>
          );
        })}
      </div>
      <div className="px-4 gap-8 w-full space-y-8">
        <StepDots />
        <NextButton className="w-full" />
      </div>
    </div>
  );
}
