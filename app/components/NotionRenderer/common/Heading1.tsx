import { ReactNode } from "react";

export function Heading1(props: { children: ReactNode }) {
  return (
    <h1 {...props} className="font-bold text-4xl/[44px] tracking-[-1px] my-8 mb-4" />
  );
}
