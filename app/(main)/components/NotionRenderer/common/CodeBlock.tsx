import { CodeBlockObjectResponse } from "@notionhq/client";

import { CopyButton } from "../../CopyButton";
import { highlightCode } from "@/app/lib/prism";

export function CodeBlock({ block }: { block: CodeBlockObjectResponse }) {
  const language = block.code.language;

  const codeBlock =
    block.code.rich_text.map((rt) => rt.plain_text).join("") || "";
  const highlighted = highlightCode(
    codeBlock,
    language === "typescript" ? "tsx" : language,
  );

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#222] -mx-4 sm:mx-0 mb-7">
      <pre className={`language-${language} -mx-6`}>
        <div className="code-block__header">
          <span className="lang">{language}</span>
          <CopyButton text={codeBlock} className="code-block__button-copy" />
        </div>
        <code
          dangerouslySetInnerHTML={{ __html: highlighted }}
          className={`language-${language}`}
        />
      </pre>
    </div>
  );
}
