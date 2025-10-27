import { CodeBlockObjectResponse } from "@notionhq/client";
import { highlightCode } from "@/app/lib/prism";

export function CodeBlock({ block }: { block: CodeBlockObjectResponse }) {
  const highlighted = highlightCode(
    block.code.rich_text.map((rt) => rt.plain_text).join("") || "",
    block.code.language
  );

  return (
    <pre className={`language-${block.code.language}`}>
      <code
        dangerouslySetInnerHTML={{ __html: highlighted }}
        className={`language-${block.code.language}`}
      />
    </pre>
  );
}
