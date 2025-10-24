import { ParagraphBlockObjectResponse } from "@notionhq/client";
import Image from "next/image";

import { RichText } from "./RichText";

export function Paragraph({ block }: { block: ParagraphBlockObjectResponse }) {
  const regex = /<localImage="([^"]+)"\s*>/;
  const matchAsImage = block.paragraph.rich_text[0]?.plain_text.match(regex);

  if (matchAsImage) {
    const src = matchAsImage[1];
    if (src.endsWith(".gif")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          width={1200}
          height={720}
          src={src}
          alt=""
          loading="lazy"
          className="mb-7"
        />
      );
    }
    return (
      <Image
        width={1200}
        height={720}
        src={src}
        alt=""
        priority={false}
        loading="lazy"
        quality={90}
        className="mb-7"
      />
    );
  }

  return (
    <p className="font-normal text-base/[28px] tracking-[-0.35px] mb-7 [&:has(+img),&:has(+ul)]:mb-3">
      <RichText items={block.paragraph.rich_text} />
    </p>
  );
}
