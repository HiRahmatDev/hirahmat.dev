import { Fragment, ReactNode } from "react";
import { ParagraphBlockObjectResponse } from "@notionhq/client";
import clsx from "clsx";

import { COLOR_MAP } from "../constants";
import { isPlainText } from "../utils";

export function Paragraph({ block }: { block: ParagraphBlockObjectResponse }) {
  return (
    <p className="font-normal text-base/[28px] tracking-[-0.35px] mb-7">
      {block.paragraph.rich_text.map((richTextItem, index) => {
        if (isPlainText(richTextItem)) {
          return richTextItem.plain_text;
        }

        const annotations = richTextItem.annotations;
        const content = richTextItem.plain_text;

        const colorClass =
          annotations.color !== "default" &&
          COLOR_MAP[annotations.color as keyof typeof COLOR_MAP]
            ? COLOR_MAP[annotations.color as keyof typeof COLOR_MAP]
            : undefined;

        let element: ReactNode = content;

        // Code first (always inner-most)
        if (annotations.code) {
          element = (
            <code className="tracking-[-1.5px] font-semibold leading-[1] inline-block bg-gray-200 text-amber-600 rounded-[4px] px-1 pt-1">
              {element}
            </code>
          );
        }

        // Italic
        if (annotations.italic) {
          element = <em>{element}</em>;
        }

        // Bold
        if (annotations.bold) {
          element = <strong>{element}</strong>;
        }

        // Strikethrough
        if (annotations.strikethrough) {
          element = <del>{element}</del>;
        }

        // Underline and colors
        if (annotations.underline || colorClass) {
          element = (
            <span
              className={clsx(
                annotations.underline && "underline",
                colorClass && colorClass
              )}
            >
              {element}
            </span>
          );
        }

        // Hyperlink
        if (richTextItem.href) {
          element = (
            <a
              href={richTextItem.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline transition animate-hover inline-block"
            >
              {element}
            </a>
          );
        }

        return <Fragment key={index}>{element}</Fragment>;
      })}
    </p>
  );
}
