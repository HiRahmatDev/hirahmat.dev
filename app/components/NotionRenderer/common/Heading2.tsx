import { Heading2BlockObjectResponse } from "@notionhq/client";
import { RichText } from "./RichText";

export function Heading2({ block }: { block: Heading2BlockObjectResponse }) {
  return (
    <h3
      id={block.heading_2.rich_text[0].plain_text}
      className="font-bold text-2xl/[30px] tracking-[-0.5px] my-8 mb-4"
    >
      <RichText items={block.heading_2.rich_text} />
    </h3>
  );
}
