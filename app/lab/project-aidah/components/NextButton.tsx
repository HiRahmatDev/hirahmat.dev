import { twMerge } from "tailwind-merge"

export function NextButton({ className }: { className?: string }) {
  return (
    <button className={twMerge(
      "h-[56px] rounded-[calc(56px/2)] flex items-center justify-center bg-accent text-white px-6",
      "text-base font-semibold",
      "cursor-pointer",
      className
    )}>
      Lanjut
    </button>
  )
}