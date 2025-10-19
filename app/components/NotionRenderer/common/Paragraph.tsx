import { ParagraphBlockObjectResponse } from "@notionhq/client";
import { RichText } from "./RichText";

export function Paragraph({ block }: { block: ParagraphBlockObjectResponse }) {
  return (
    <p className="font-normal text-base/[28px] tracking-[-0.35px] mb-7">
      <RichText items={block.paragraph.rich_text} />
    </p>
  );
}
