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
      className={clsx("flex gap-1 sm:gap-2 pt-4 sm:pt-5 pb-5 sm:pb-6 pl-2 sm:pl-3 pr-3 sm:pr-5 rounded-2xl mb-7", colorClass)}
    >
      {block.callout.icon && block.callout.icon.type === "emoji" && (
        <span className="text-xl sm:text-2xl -mt-0.5 sm:-mt-1">{block.callout.icon.emoji}</span>
      )}
      <p className="[&>strong:first-of-type]:text-lg sm:[&>strong:first-of-type]:text-xl text-sm/[22px] sm:text-base/[26px] tracking-[-0.35px]">
        <RichText items={block.callout.rich_text} />
      </p>
    </div>
  );
}
