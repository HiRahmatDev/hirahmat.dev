import { ReactNode } from "react";

export function GreenText(props: { children?: ReactNode }) {
  return <span className="text-accent" {...props}></span>;
}
