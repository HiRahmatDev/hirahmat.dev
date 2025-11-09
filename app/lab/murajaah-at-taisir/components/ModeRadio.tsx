import clsx from "clsx";

import { MurajaahMode } from "../context/MurajaahContext";
import { Label } from "./Label";

type ModeRadioProps = {
  value: MurajaahMode;
  onChange: (mode: MurajaahMode) => void;
};

const RADIO_OPTIONS: { label: string; value: MurajaahMode }[] = [
  { label: "Tadzkirah (dengan kata awal)", value: "TADZKIRAH" },
  { label: "Dzikr (tanpa bantuan)", value: "DZIKR" },
  { label: "Tadrib (latihan)", value: "TADRIB" },
];

export function ModeRadio({ value: valueProp, onChange }: ModeRadioProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label>Mode</Label>
      <div className="flex flex-col gap-2">
        {RADIO_OPTIONS.map(({ label, value }) => {
          const isActive = value === valueProp;

          return (
            <label
              key={value}
              className={clsx(
                "flex items-center gap-2 text-base tracking-[-0.3px] border px-3 py-2 rounded-lg cursor-pointer",
                value === "TADRIB"
                  ? clsx(
                      "bg-calm/10 border-calm/20 text-text-calm",
                      isActive && "border-calm/60"
                    )
                  : clsx(
                      "bg-accent/10 border-accent/20 text-text-accent",
                      isActive && "border-accent/60"
                    ),
                isActive && "border-2 font-semibold"
              )}
            >
              <input
                type="radio"
                name="mode"
                value={value}
                checked={isActive}
                onChange={() => onChange(value)}
              />
              {label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
