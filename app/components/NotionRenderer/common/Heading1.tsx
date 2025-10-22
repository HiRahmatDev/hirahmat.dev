import { ReactNode } from "react";

export function Heading1(props: { children?: ReactNode; id?: string }) {
  return (
    <h2
      {...props}
      className="font-bold text-3xl/[38px] tracking-[-0.8px] my-8 mb-4"
    />
  );
}
