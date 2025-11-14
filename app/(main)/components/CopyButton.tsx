"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyButton = { text: string; className?: string };

export function CopyButton({ text, className }: CopyButton) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 700);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleCopy}
      aria-label="Salin ke papan klip"
    >
      {isCopied ? <Check /> : <Copy />}
    </button>
  );
}
