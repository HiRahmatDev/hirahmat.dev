"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type OnboardingContextType = {
  step: number;
  isNextDisabled: boolean;
  isFinishOnboarding: boolean;
  name: string;
  nextStep: () => void;
  backStep: () => void;
  finishOnboarding: () => void;
  onGoalChange: (goal: string) => void;
  onProgressLevelChange: (progressLevel: string) => void;
  onNameChange: (name: string) => void;
};

const INITIAL_ONBOARDING_STATE: OnboardingContextType = {
  step: 1,
  isNextDisabled: false,
  isFinishOnboarding: false,
  name: "",
  nextStep() {},
  backStep() {},
  finishOnboarding() {},
  onGoalChange() {},
  onProgressLevelChange() {},
  onNameChange() {},
};

const OnboardingContext = createContext(INITIAL_ONBOARDING_STATE);

export function OnboardingProvider({ children }: { children?: ReactNode }) {
  const [step, setStep] = useState<number>(INITIAL_ONBOARDING_STATE.step);
  const [goal, setGoal] = useState<string>("");
  const [progressLevel, setProgressLevel] = useState<string>("");
  const [name, setName] = useState<string>("");

  const isFinishOnboarding = step === 0;
  const isNextDisabled = (() => {
    if (step === 2) return goal === "";
    if (step === 3) return progressLevel === "";
    if (step === 5) return name === "";
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

  const onProgressLevelChange = (progressLevel: string) => {
    setProgressLevel(progressLevel);
  };

  const onNameChange = (name: string) => {
    setName(name);
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
        name,
        finishOnboarding,
        onGoalChange,
        onProgressLevelChange,
        onNameChange,
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
