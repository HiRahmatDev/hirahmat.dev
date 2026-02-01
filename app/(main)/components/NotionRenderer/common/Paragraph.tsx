import { ParagraphBlockObjectResponse } from "@notionhq/client";
import Image from "next/image";

import { RichText } from "./RichText";

export function Paragraph({ block }: { block: ParagraphBlockObjectResponse }) {
  const regex =
    /<LocalImage\s+src="([^"]+)"\s+alt="([^"]+)"(?:\s+maxWidth="([^"]+)")?\s*\/>/;
  const matchAsImage = block.paragraph.rich_text[0]?.plain_text.match(regex);

  if (matchAsImage) {
    const src = matchAsImage[1];
    const alt = matchAsImage[2];
    const maxWidth = matchAsImage[3];

    if (src.endsWith(".gif")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          width={680}
          height={382}
          src={src}
          alt={alt}
          loading="lazy"
          className="mb-7 rounded-xl overflow-hidden w-full"
          style={{ maxWidth }}
        />
      );
    }
    return (
      <Image
        width={680}
        height={382}
        src={src}
        alt={alt}
        priority={false}
        loading="lazy"
        quality={90}
        className="mb-7 rounded-xl overflow-hidden mx-auto w-full"
        style={{ maxWidth }}
      />
    );
  }

  return (
    <p className="text-base/relaxed sm:text-lg/relaxed -tracking-[.2px] mb-7 sm:9">
      <RichText items={block.paragraph.rich_text} />
    </p>
  );
}
