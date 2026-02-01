import { Heading1BlockObjectResponse } from "@notionhq/client";
import { RichText } from "./RichText";

export function Heading1({ block }: { block: Heading1BlockObjectResponse }) {
  return (
    <h2
      id={block.heading_1.rich_text.map((p) => p.plain_text).join("")}
      className="font-bold text-2xl/normal sm:text-3xl/normal -tracking-[.2px] mt-12 mb-5"
    >
      <RichText items={block.heading_1.rich_text} />
    </h2>
  );
}
