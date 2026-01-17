import Link from "next/link";
import { GreenText } from "./GreenText";
import { twJoin } from "tailwind-merge";

export function Logo() {
  return (
    <Link
      className={twJoin(
        "font-mono font-bold animate-hover -rotate-1",
        "text-lg/[44px] md:text-xl/[44px] tracking-[-1.5px]",
      )}
      href="/"
    >
      {"<"}
      HiRahmat.<GreenText>Dev</GreenText>
      {"/>"}
    </Link>
  );
}
