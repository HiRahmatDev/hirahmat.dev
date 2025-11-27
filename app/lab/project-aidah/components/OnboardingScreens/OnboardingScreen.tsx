"use client";

import { useRef } from "react";
import clsx from "clsx";

import { FinishButton } from "./FinishButton";
import { NextButton } from "./NextButton";
import { OnboardingGoalScreen } from "./OnboardingGoalScreen";
import { OnboardingMethodIntroScreen } from "./OnboardingMethodIntroScreen";
import { OnboardingMoodScreen } from "./OnboardingMoodScreen";
import { OnboardingNameScreen } from "./OnboardingNameScreen";
import { OnboardingProgressLevelScreen } from "./OnboardingProgressLevelScreen";
import { OnboardingWelcomeScreen } from "./OnboardingWelcomeScreen";
import { StepDots } from "./StepDots";
import { useOnboardingAnimation } from "./hooks/useOnboardingAnimation";
import { useOnboardingContext } from "./OnboardingContext";
import { SkipButton } from "./SkipButton";

const ONBOARDING_SCREENS = [
  { id: 1, Component: OnboardingWelcomeScreen },
  { id: 2, Component: OnboardingGoalScreen },
  { id: 3, Component: OnboardingProgressLevelScreen },
  { id: 4, Component: OnboardingMethodIntroScreen },
  { id: 5, Component: OnboardingNameScreen },
  { id: 6, Component: OnboardingMoodScreen },
];

export function OnboardingScreen() {
  const { step, isFinishOnboarding } = useOnboardingContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useOnboardingAnimation({ step, containerRef });

  if (isFinishOnboarding) {
    return null;
  }

  return (
    <div className="h-[inherit] flex flex-col justify-between items-center pt-20 pb-10">
      <div className="size-full overflow-hidden relative" ref={containerRef}>
        {ONBOARDING_SCREENS.map(({ id, Component }) => {
          const beforeStep = step - 1 === id;
          const currentStep = step === id;
          const nextStep = step + 1 === id;

          const shouldRender = beforeStep || currentStep || nextStep;
          if (!shouldRender) return null;

          return (
            <div
              key={`screen-${id}`}
              className={clsx(
                `screen-${id}`,
                "bg-white absolute top-0 left-0 w-full h-full",
                id > 1 && "translate-x-full"
              )}
            >
              <Component />
            </div>
          );
        })}
      </div>
      <div className="px-4 gap-8 w-full space-y-8">
        <StepDots />
        <div className="flex items-center justify-between w-full gap-3">
          <SkipButton className="shrink-0" />
          <NextButton className="grow" />
          <FinishButton className="grow" />
        </div>
      </div>
    </div>
  );
}
