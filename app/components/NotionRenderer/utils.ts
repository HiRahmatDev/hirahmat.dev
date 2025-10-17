import {
  BlockObjectResponse,
  GetBlockResponse,
  RichTextItemResponse,
} from "@notionhq/client";

export function isBlockObjectResponse(
  block: GetBlockResponse
): block is BlockObjectResponse {
  return (
    "type" in block &&
    typeof block.type === "string" &&
    block.object === "block"
  );
}

export function isPlainText(richTextItem: RichTextItemResponse) {
  const ann = richTextItem.annotations;
  return (
    !ann.bold &&
    !ann.italic &&
    !ann.strikethrough &&
    !ann.underline &&
    !ann.code &&
    !richTextItem.href &&
    ann.color === "default"
  );
}
