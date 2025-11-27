import clsx from "clsx";
import { ReactNode } from "react";

type RadioButtonProps = {
  children?: ReactNode;
  onValueChange?: (value: string) => void;

  // input props
  name?: string;
  value?: string;
};

export function RadioButton({
  children,
  onValueChange,
  ...inputProps
}: RadioButtonProps) {
  return (
    <label
      className={clsx(
        "block w-full text-left text-sm/5 font-semibold tracking-[-0.3px] px-4 py-[13px]",
        "border border-zinc-200 rounded-[24px]",
        "flex gap-2"
      )}
    >
      <input
        type="radio"
        {...inputProps}
        className="size-5"
        onChange={(e) => onValueChange?.(e.target.value)}
      />
      {children}
    </label>
  );
}
