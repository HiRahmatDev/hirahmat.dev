import { BlockObjectResponse, GetBlockResponse } from "@notionhq/client";

export function isBlockObjectResponse(
  block: GetBlockResponse
): block is BlockObjectResponse {
  return (
    "type" in block &&
    typeof block.type === "string" &&
    block.object === "block"
  );
}
