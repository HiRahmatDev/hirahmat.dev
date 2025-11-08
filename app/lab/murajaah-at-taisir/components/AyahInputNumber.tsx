import { ChangeEventHandler } from "react";

type AyahInputNumberProps = {
  placeholder: string;
  min: number;
  max: number;
  value: number | null;
  disabled?: boolean;
  onChange: (value: number) => void;
};

export function AyahInputNumber({
  placeholder,
  min,
  max,
  value,
  disabled,
  onChange,
}: AyahInputNumberProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const normalizedValue = Math.min(
      Math.max(Number(e.target.value), min),
      max
    );
    onChange(normalizedValue);
  };

  return (
    <input
      type="number"
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
      className="border border-gray-300 rounded-md p-2 w-full disabled:bg-zinc-100 placeholder:text-sm"
      value={value ?? ""}
      onChange={handleChange}
      onFocus={(e) => e.target.select()}
    />
  );
}
