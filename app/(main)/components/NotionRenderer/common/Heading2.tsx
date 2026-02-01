import { Heading2BlockObjectResponse } from "@notionhq/client";
import { RichText } from "./RichText";

export function Heading2({ block }: { block: Heading2BlockObjectResponse }) {
  return (
    <h3
      id={block.heading_2.rich_text.map((p) => p.plain_text).join("")}
      className="font-bold text-xl/normal sm:text-2xl/normal -tracking-[.2px] mt-12 mb-5"
    >
      <RichText items={block.heading_2.rich_text} />
    </h3>
  );
}
