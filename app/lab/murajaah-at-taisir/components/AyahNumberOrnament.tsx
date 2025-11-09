import { twMerge } from "tailwind-merge";
import Image from "next/image";

import ayaNumIco from "../assets/aya-num-ico.svg";

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
        "relative inline-block w-7 sm:w-9 text-center text-xs sm:text-sm",
        className
      )}
    >
      <Image
        width={22}
        height={25}
        loading="eager"
        src={ayaNumIco}
        alt=""
        role="presentation"
        className="absolute -top-1 sm:-top-1.5 pointer-events-none select-none w-[30px] sm:w-[38px]"
      />
      {new Intl.NumberFormat("ar-Sa").format(number)}
    </span>
  );
}
