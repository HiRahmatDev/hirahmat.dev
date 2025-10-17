import { ListBlockChildrenResponse } from "@notionhq/client";

import { Heading1 } from "./common/Heading1";
import { Heading2 } from "./common/Heading2";
import { Paragraph } from "./common/Paragraph";
import { isBlockObjectResponse } from "./utils";

type NotionRendererProps = { page?: ListBlockChildrenResponse | null };

export function NotionRenderer({ page }: NotionRendererProps) {
  if (!page) return null;
  return (
    <div>
      {page.results.map((block) => {
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
              console.log(block.paragraph);

              return (
                <Paragraph key={`${block.id}`}>
                  {block.paragraph.rich_text.map(
                    ({ plain_text }) => plain_text
                  )}
                </Paragraph>
              );

            default:
              return null;
          }
        }
        return null;
      })}
    </div>
  );
}
