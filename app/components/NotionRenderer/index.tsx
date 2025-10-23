import { ListBlockChildrenResponse } from "@notionhq/client";

import { Blockquote } from "./common/Blockquote";
import { Heading1 } from "./common/Heading1";
import { Heading2 } from "./common/Heading2";
import { Heading3 } from "./common/Heading3";
import { isBlockObjectResponse } from "./utils";
import { Paragraph } from "./common/Paragraph";

type NotionRendererProps = {
  listBlockChildren?: ListBlockChildrenResponse | null;
};

export function NotionRenderer({ listBlockChildren }: NotionRendererProps) {
  if (!listBlockChildren) return null;
  return (
    <div className="[&>h1,&>h2,&>h3]:scroll-mt-20">
      {listBlockChildren.results.map((block) => {
        if (isBlockObjectResponse(block)) {
          switch (block.type) {
            case "heading_1":
              return <Heading1 key={block.id} block={block} />;

            case "heading_2":
              return <Heading2 key={block.id} block={block} />;

            case "heading_3":
              return <Heading3 key={block.id} block={block} />;

            case "paragraph":
              return <Paragraph key={`${block.id}`} block={block} />;

            case "quote":
              return <Blockquote key={block.id} block={block} />;

            default:
              return null;
          }
        }
        return null;
      })}
    </div>
  );
}
