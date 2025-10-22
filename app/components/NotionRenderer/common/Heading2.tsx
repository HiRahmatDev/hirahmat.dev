import { ReactNode } from "react";

export function Heading2(props: { children?: ReactNode; id?: string }) {
  return (
    <h3
      {...props}
      className="font-bold text-2xl/[30px] tracking-[-0.5px] my-8 mb-4"
    />
  );
}
