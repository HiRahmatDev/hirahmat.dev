import Prism from "prismjs";

import "prismjs/components/prism-powershell";
import "prismjs/components/prism-json";
import "./prism.css";

export function highlightCode(code: string, language: string) {
  const lang = Prism.languages[language] || Prism.languages.markup;
  return Prism.highlight(code, lang, language);
}
