import {
  BulletedListItemBlockObjectResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client";
import { RichText } from "./RichText";
import { isBlockObjectResponse } from "../utils";

export function BulletedListItem({
  allBlocks,
  index,
}: {
  allBlocks: ListBlockChildrenResponse["results"];
  index: number;
}) {
  // Tentukan apakah ini item pertama dalam run bulleted_list_item
  const prev = allBlocks[index - 1];
  const isFirstInRun =
    !prev ||
    !isBlockObjectResponse(prev) ||
    prev?.type !== "bulleted_list_item";

  if (!isFirstInRun) {
    // Bukan item pertama: di-skip agar tidak render dobel
    return null;
  }

  // Kumpulkan semua item berurutan mulai dari index saat ini
  const items: BulletedListItemBlockObjectResponse[] = [];
  for (let i = index; i < allBlocks.length; i++) {
    const b = allBlocks[i];
    if (isBlockObjectResponse(b) && b?.type === "bulleted_list_item") {
      items.push(b as BulletedListItemBlockObjectResponse);
    } else {
      break;
    }
  }

  return (
    <ul className="list-disc pl-8 mb-7 sm:mb-9 text-base/relaxed sm:text-lg/relaxed -tracking-[.2px]">
      {items.map((it) => (
        <li key={it.id}>
          <RichText items={it.bulleted_list_item.rich_text} />
        </li>
      ))}
    </ul>
  );
}
