"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // silent fail
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={
        className ??
        "rounded-md border border-white/10 bg-neutral-950/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-white"
      }
    >
      {copied ? "Copied" : label}
    </button>
  );
}
