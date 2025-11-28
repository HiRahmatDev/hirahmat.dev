"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type OnboardingContextType = {
  step: number;
  isNextDisabled: boolean;
  isFinishOnboarding: boolean;
  nextStep: () => void;
  backStep: () => void;
  finishOnboarding: () => void;
  onGoalChange: (goal: string) => void;
};

const INITIAL_ONBOARDING_STATE: OnboardingContextType = {
  step: 1,
  isNextDisabled: false,
  isFinishOnboarding: false,
  nextStep() {},
  backStep() {},
  finishOnboarding() {},
  onGoalChange() {},
};

const OnboardingContext = createContext(INITIAL_ONBOARDING_STATE);

export function OnboardingProvider({ children }: { children?: ReactNode }) {
  const [step, setStep] = useState<number>(INITIAL_ONBOARDING_STATE.step);
  const [goal, setGoal] = useState<string>("");

  const isFinishOnboarding = step === 0;
  const isNextDisabled = (() => {
    if (step === 2) return goal === "";
    return false;
  })();

  const nextStep = () => {
    if (step === 6) return;
    setStep((prev) => prev + 1);
  };

  const backStep = () => {
    if (step === 1) return;
    setStep((prev) => prev - 1);
  };

  const onGoalChange = (goal: string) => {
    setGoal(goal);
  };

  const finishOnboarding = () => {
    setStep(0);
  };

  return (
    <OnboardingContext
      value={{
        step,
        isNextDisabled,
        isFinishOnboarding,
        nextStep,
        backStep,
        finishOnboarding,
        onGoalChange,
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
