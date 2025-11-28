"use client";

import { useOnboardingContext } from "./OnboardingContext";
import { RadioButton } from "./RadioButton";

export function OnboardingGoalScreen() {
  const { step, onGoalChange } = useOnboardingContext();
  const tabIndex = step === 2 ? 0 : -1;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-8 pb-12 px-4">
      <div />
      <div className="w-full flex flex-col items-start justify-center gap-8">
        <div className="space-y-3">
          <h1 className="text-2xl/[34px] font-bold tracking-[-0.6px] max-w-[320px]">
            Apa tujuanmu sekarang?
          </h1>
          <p className="text-sm/5 tracking-[-0.4px] max-w-[320px] text-zinc-500">
            Kami akan menyesuaikan pengalaman sesuai perjalanan hafalanmu.
          </p>
        </div>
        <div className="space-y-3 w-full">
          <RadioButton
            name="goal"
            value="new"
            onValueChange={onGoalChange}
            tabIndex={tabIndex}
          >
            Hafalan Baru
          </RadioButton>
          <RadioButton
            name="goal"
            value="strongen"
            onValueChange={onGoalChange}
            tabIndex={tabIndex}
          >
            Perkuat Hafalan
          </RadioButton>
          <RadioButton
            name="goal"
            value="focus"
            onValueChange={onGoalChange}
            tabIndex={tabIndex}
          >
            Fokus Muraja{"'"}ah
          </RadioButton>
        </div>
      </div>
    </div>
  );
}
