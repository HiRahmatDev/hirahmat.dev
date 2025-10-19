import { QuoteBlockObjectResponse } from "@notionhq/client";
import { RichText } from "./RichText";

export function Blockquote({ block }: { block: QuoteBlockObjectResponse }) {
  return (
    <blockquote
      className="
        relative my-8 px-8 font-light text-base/[26px] text-zinc-700 tracking-[-0.4px] before:content-['“'] before:absolute before:-left-2 before:-top-4 before:text-8xl before:leading-none before:font-serif before:font-bold before:-z-10 before:text-zinc-100 before:pointer-events-none before:select-none"
    >
      <RichText items={block.quote.rich_text} />
    </blockquote>
  );
}
