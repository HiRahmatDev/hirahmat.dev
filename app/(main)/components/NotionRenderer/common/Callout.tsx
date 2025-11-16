import { CalloutBlockObjectResponse } from "@notionhq/client";
import clsx from "clsx";

import { COLOR_MAP } from "../constants";
import { RichText } from "./RichText";

export function Callout({ block }: { block: CalloutBlockObjectResponse }) {
  const colorClass =
    block.callout.color !== "default" &&
    COLOR_MAP[block.callout.color as keyof typeof COLOR_MAP]
      ? COLOR_MAP[block.callout.color as keyof typeof COLOR_MAP]
      : undefined;

  return (
    <div
      className={clsx("flex gap-2 pt-5 pb-6 px-4 rounded-2xl mb-7", colorClass)}
    >
      {block.callout.icon && block.callout.icon.type === "emoji" && (
        <span className="text-2xl -mt-1">{block.callout.icon.emoji}</span>
      )}
      <p className="[&>strong:first-of-type]:text-xl text-base/[26px] tracking-[-0.35px]">
        <RichText items={block.callout.rich_text} />
      </p>
    </div>
  );
}
