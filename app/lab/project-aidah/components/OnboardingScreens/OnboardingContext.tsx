"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type OnboardingContextType = {
  step: number;
  nextStep: () => void;
  isNextDisabled: boolean;
  finishOnboarding: () => void;
  isFinishOnboarding: boolean;
};

const INITIAL_ONBOARDING_STATE: OnboardingContextType = {
  step: 1,
  nextStep() {},
  isNextDisabled: false,
  finishOnboarding() {},
  isFinishOnboarding: false,
};

const OnboardingContext = createContext(INITIAL_ONBOARDING_STATE);

export function OnboardingProvider({ children }: { children?: ReactNode }) {
  const [step, setStep] = useState<number>(INITIAL_ONBOARDING_STATE.step);
  const isNextDisabled = false;
  const isFinishOnboarding = step === 0;

  const nextStep = () => {
    if (step === 6) return;
    setStep((prev) => prev + 1);
  };

  const finishOnboarding = () => {
    setStep(0);
  };

  return (
    <OnboardingContext
      value={{
        step,
        nextStep,
        isNextDisabled,
        finishOnboarding,
        isFinishOnboarding,
      }}
    >
      {children}
    </OnboardingContext>
  );
}

export function useOnboardingContext() {
  const ctx = useContext(OnboardingContext);

  if (!ctx) {
    throw new Error(
      "useOnboardingContext must be used within an <OnboardingProvider>"
    );
  }

  return ctx;
}
