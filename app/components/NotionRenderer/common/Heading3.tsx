import { ReactNode } from "react";

export function Heading3(props: { children?: ReactNode; id?: string }) {
  return (
    <h3
      {...props}
      className="font-bold text-xl/[28px] tracking-[-0.35px] my-8 mb-4"
    />
  );
}
