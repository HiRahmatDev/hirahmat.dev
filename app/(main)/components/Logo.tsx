import Link from "next/link";
import { GreenText } from "./GreenText";

export function Logo() {
  return (
    <Link className="font-mono text-xl/[40px] font-bold tracking-[-1.5px] animate-hover -rotate-1" href="/">
      {"<"}
      HiRahmat.<GreenText>Dev</GreenText>
      {"/>"}
    </Link>
  );
}
