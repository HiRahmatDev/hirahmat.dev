import { ReactNode } from "react";

export function Paragraph(props: { children: ReactNode }) {
  return (
    <p {...props} className="font-medium text-lg/[32px] tracking-[-0.35px] mb-9" />
  );
}
