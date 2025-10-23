import { Heading3BlockObjectResponse } from "@notionhq/client";
import { RichText } from "./RichText";

export function Heading3({ block }: { block: Heading3BlockObjectResponse }) {
  return (
    <h3
      id={block.heading_3.rich_text[0].plain_text}
      className="font-bold text-xl/[28px] tracking-[-0.35px] my-8 mb-4"
    >
      <RichText items={block.heading_3.rich_text} />
    </h3>
  );
}
