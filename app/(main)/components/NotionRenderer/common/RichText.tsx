import { Fragment, ReactNode } from "react";
import { RichTextItemResponse } from "@notionhq/client";
import clsx from "clsx";

import { COLOR_MAP } from "../constants";
import { isPlainText } from "../utils";

export function RichText({ items }: { items?: RichTextItemResponse[] | null }) {
  if (!items) return null;

  return (
    <>
      {items.map((item, index) => {
        if (isPlainText(item)) {
          return (
            <Fragment key={index}>{withNewlines(item.plain_text)}</Fragment>
          );
        }

        const annotations = item.annotations;
        const content = item.plain_text;

        const colorClass =
          annotations.color !== "default" &&
            COLOR_MAP[annotations.color as keyof typeof COLOR_MAP]
            ? COLOR_MAP[annotations.color as keyof typeof COLOR_MAP]
            : undefined;

        let element: ReactNode = withNewlines(content);

        // Code first (always inner-most)
        if (annotations.code) {
          element = (
            <code className="tracking-[-1px] font-semibold leading-[1] inline-block bg-gray-200 text-amber-600 rounded-[4px] px-1 pt-1">
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
              className={clsx(annotations.underline && "underline", colorClass)}
            >
              {element}
            </span>
          );
        }

        // Hyperlink
        if (item.href) {
          element = (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-accent hover:text-accent underline transition animate-hover inline-block"
            >
              {element}
            </a>
          );
        }

        return <Fragment key={index}>{element}</Fragment>;
      })}
    </>
  );
}

function withNewlines(text: string): (string | ReactNode)[] {
  return text
    .split("\n")
    .flatMap((line, i) => (i === 0 ? [line] : [<br key={`br-${i}`} />, line]));
}
