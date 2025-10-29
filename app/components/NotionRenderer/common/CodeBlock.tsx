import { CodeBlockObjectResponse } from "@notionhq/client";

import { CopyButton } from "../../CopyButton";
import { highlightCode } from "@/app/lib/prism";

export function CodeBlock({ block }: { block: CodeBlockObjectResponse }) {
  const codeBlock =
    block.code.rich_text.map((rt) => rt.plain_text).join("") || "";
  const highlighted = highlightCode(codeBlock, block.code.language);

  return (
    <pre className={`language-${block.code.language}`}>
      <div className="code-block__header">
        <span className="lang">{block.code.language}</span>
        <CopyButton text={codeBlock} className="code-block__button-copy" />
      </div>
      <code
        dangerouslySetInnerHTML={{ __html: highlighted }}
        className={`language-${block.code.language}`}
      />
    </pre>
  );
}
