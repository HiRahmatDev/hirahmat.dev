"use client";

import { RadioButton } from "./RadioButton";
import { useOnboardingContext } from "./OnboardingContext";

export function OnboardingProgressLevelScreen() {
  const { step } = useOnboardingContext();
  const tabIndex = step === 3 ? 0 : -1;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-8 pb-12 px-4">
      <div />
      <div className="w-full flex flex-col items-start justify-center gap-8">
        <div className="space-y-3">
          <h1 className="text-2xl/[34px] font-bold tracking-[-0.6px] max-w-[320px] mx-auto">
            Sudah sampai mana hafalanmu?
          </h1>
          <p className="text-sm/5 tracking-[-0.4px] max-w-[320px] mx-auto text-zinc-500">
            Kami akan menyesuaikan pengalaman sesuai perjalanan hafalanmu.
          </p>
        </div>
        <div className="space-y-3 w-full">
          <RadioButton name="progressLevel" tabIndex={tabIndex}>
            Belum mulai menghafal
          </RadioButton>
          <RadioButton name="progressLevel" tabIndex={tabIndex}>
            Baru mulai beberapa ayat / surat pendek
          </RadioButton>
          <RadioButton name="progressLevel" tabIndex={tabIndex}>
            Sudah hafal beberapa juz
          </RadioButton>
          <RadioButton name="progressLevel" tabIndex={tabIndex}>
            Hampir atau sudah 30 juz
          </RadioButton>
        </div>
      </div>
    </div>
  );
}
