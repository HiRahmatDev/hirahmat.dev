import { twMerge } from "tailwind-merge";
import Image from "next/image";

export function AyahNumberOrnament({
  number,
  className,
}: {
  number: number;
  className?: string;
}) {
  return (
    <span
      className={twMerge(
        "relative inline-block w-9 text-center text-sm",
        className
      )}
    >
      <Image
        width={22}
        height={25}
        src="https://web.mushafmakkah.com/_nuxt/img/aya_num_ico.dedce8b.svg"
        alt=""
        role="presentation"
        className="absolute -top-1.5 pointer-events-none select-none w-full"
      />
      {new Intl.NumberFormat("ar-Sa").format(number)}
    </span>
  );
}
