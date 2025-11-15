"use client";

import { AnimatedNumber } from "./AnimatedNumber";
import { MenuButton } from "./MenuButton";
import { MurajaahButton } from "./MurajaahButton";
import { useMurajaahContext } from "../context/MurajaahContext";

export function BottomActionBar() {
  const {
    startAyah,
    endAyah,
    mode,
    minAyah,
    maxAyah,
    randoming,
    randomAyah,
    generateRandomAyah,
    isMurajaahButtonDisabled,
  } = useMurajaahContext();

  return (
    <div className="-translate-x-1/2 sm:hidden z-20 fixed bottom-0 left-1/2 w-full rounded-t-2xl bg-white overflow-hidden shadow-2xl">
      <div className="flex gap-3 max-w-[420px] w-full px-5 pt-4 pb-8 mx-auto">
        <div className="relative min-w-[80px] border border-zinc-200 rounded-lg flex justify-center items-center">
          <div className="absolute -top-2 left-1 text-xs italic semibold text-zinc-400 px-1 bg-white tracking-[-0.5px]">
            ayat ke-
          </div>
          <AnimatedNumber
            min={startAyah || minAyah}
            max={endAyah || maxAyah}
            animating={randoming}
            number={randomAyah}
            className="text-3xl py-0"
          />
        </div>
        <MurajaahButton
          mode={mode}
          disabled={isMurajaahButtonDisabled}
          onClick={generateRandomAyah}
        />
        <MenuButton />
      </div>
    </div>
  );
}
