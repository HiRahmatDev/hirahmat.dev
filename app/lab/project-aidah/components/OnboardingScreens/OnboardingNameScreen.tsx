"use client";

import clsx from "clsx";

import { useOnboardingContext } from "./OnboardingContext";
import { UserRoundPen } from "lucide-react";

export function OnboardingNameScreen() {
  const { step, onNameChange } = useOnboardingContext();
  const tabIndex = step === 5 ? 0 : -1;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-8 pb-12 px-4">
      <div />
      <div className="w-full flex flex-col items-start justify-center gap-8">
        <div className="space-y-3">
          <h1 className="text-2xl/[34px] font-bold tracking-[-0.6px] max-w-[320px]">
            Boleh tahu nama panggilanmu?
          </h1>
          <p className="text-sm/5 tracking-[-0.4px] max-w-[246px] text-zinc-500">
            Agar kami bisa menyapamu dengan lebih personal.
          </p>
        </div>
        <div className="space-y-3 w-full">
          <div className="relative">
            <UserRoundPen className="size-5 absolute top-1/2 left-4 -translate-y-1/2 text-zinc-500" />
            <input
              tabIndex={tabIndex}
              placeholder="Hamba Allah"
              className={clsx(
                "block w-full text-left text-[16px]/5 tracking-[-0.3px] pl-11 pr-4 py-[13px]",
                "border border-zinc-200 rounded-[24px]"
              )}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
