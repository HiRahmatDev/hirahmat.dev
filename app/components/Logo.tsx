import Link from "next/link";

export function Logo() {
  return (
    <Link className="font-mono text-xl/[40px] font-bold tracking-[-1.5px] animate-hover" href="/">
      {"<"}
      HiRahmat.<span className="text-accent">Dev</span>
      {"/>"}
    </Link>
  );
}
