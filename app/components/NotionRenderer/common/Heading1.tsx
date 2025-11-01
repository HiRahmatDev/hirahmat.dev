import { Heading1BlockObjectResponse } from "@notionhq/client";
import { RichText } from "./RichText";

export function Heading1({ block }: { block: Heading1BlockObjectResponse }) {
  return (
    <h2
      id={block.heading_1.rich_text.map((p) => p.plain_text).join("")}
      className="font-bold text-2xl/[30px] sm:text-3xl/[38px] tracking-[-0.8px] my-8 mb-4"
    >
      <RichText items={block.heading_1.rich_text} />
    </h2>
  );
}
