import clsx from "clsx";

import { MurajaahMode } from "../context/MurajaahContext";
import { Label } from "./Label";
import { Brain, Dumbbell, Lightbulb, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type ModeRadioProps = {
  value: MurajaahMode;
  onChange: (mode: MurajaahMode) => void;
};

const RADIO_OPTIONS: {
  label: string;
  value: MurajaahMode;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    label: "Tadzkirah (dengan kata awal)",
    value: "TADZKIRAH",
    icon: Lightbulb,
  },
  { label: "Dzikr (tanpa bantuan)", value: "DZIKR", icon: Brain },
  { label: "Tadrib (latihan)", value: "TADRIB", icon: Dumbbell },
];

export function ModeRadio({ value: valueProp, onChange }: ModeRadioProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label>Mode</Label>
      <div className="flex flex-col gap-2">
        {RADIO_OPTIONS.map(({ label, value, icon: Icon }) => {
          const isActive = value === valueProp;

          return (
            <label
              key={value}
              className={clsx(
                "flex items-center gap-2 text-base tracking-[-0.3px] border px-3 py-2 rounded-lg cursor-pointer",
                value === "TADRIB"
                  ? clsx(
                      "bg-calm/10 text-text-calm",
                      isActive
                        ? "border-calm/60 [&>svg]:stroke-calm"
                        : "border-calm/20 [&>svg]:stroke-blue-hover"
                    )
                  : clsx(
                      "bg-accent/10 text-text-accent",
                      isActive
                        ? "border-accent/60 [&>svg]:stroke-accent"
                        : "border-accent/20 [&>svg]:stroke-accent-hover"
                    ),
                isActive && "border-2 font-semibold"
              )}
            >
              <input
                hidden
                type="radio"
                name="mode"
                value={value}
                checked={isActive}
                onChange={() => onChange(value)}
              />
              <Icon className="size-5" />
              {label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
