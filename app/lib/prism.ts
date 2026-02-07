import Prism from "prismjs";

import "prismjs/components/prism-powershell";
import "prismjs/components/prism-json";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "./prism.css";

export function highlightCode(code: string, language: string) {
  const lang = Prism.languages[language] || Prism.languages.markup;
  return Prism.highlight(code, lang, language);
}
