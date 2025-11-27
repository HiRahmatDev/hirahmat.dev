"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type OnboardingContextType = {
  step: number;
  nextStep: () => void;
};

const INITIAL_ONBOARDING_STATE: OnboardingContextType = {
  step: 1,
  nextStep: () => {},
};

const OnboardingContext = createContext(INITIAL_ONBOARDING_STATE);

export function OnboardingProvider({ children }: { children?: ReactNode }) {
  const [step, setStep] = useState<number>(INITIAL_ONBOARDING_STATE.step);

  const nextStep = () => {
    if (step === 6) return;
    setStep((prev) => prev + 1);
  };

  return (
    <OnboardingContext value={{ step, nextStep }}>{children}</OnboardingContext>
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
