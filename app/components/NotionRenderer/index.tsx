import { ListBlockChildrenResponse } from "@notionhq/client";

import { Heading1 } from "./common/Heading1";
import { Heading2 } from "./common/Heading2";
import { Paragraph } from "./common/Paragraph";
import { isBlockObjectResponse } from "./utils";

type NotionRendererProps = {
  listBlockChildren?: ListBlockChildrenResponse | null;
};

export function NotionRenderer({ listBlockChildren }: NotionRendererProps) {
  if (!listBlockChildren) return null;
  return (
    <div>
      {listBlockChildren.results.map((block) => {
        if (isBlockObjectResponse(block)) {
          switch (block.type) {
            case "heading_1":
              return (
                <Heading1 key={block.id}>
                  {block.heading_1.rich_text[0].plain_text}
                </Heading1>
              );

            case "heading_2":
              return (
                <Heading2 key={block.id}>
                  {block.heading_2.rich_text[0].plain_text}
                </Heading2>
              );

            case "paragraph":
              return <Paragraph key={`${block.id}`} block={block} />;

            default:
              return null;
          }
        }
        return null;
      })}
    </div>
  );
}
