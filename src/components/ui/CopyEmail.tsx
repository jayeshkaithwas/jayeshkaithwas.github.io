"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The email is a plain mailto first — it works with JS disabled and is the
 * whole contact mechanism. The copy button is additive.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, permissions). The mailto still works.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
      <a
        href={`mailto:${email}`}
        className="display text-[clamp(1.5rem,5.5vw,4.5rem)] break-all text-ink transition-colors hover:text-burnt"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="label inline-flex min-h-11 shrink-0 items-center gap-2 border-2 border-ink px-4 text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        {copied ? "Copied ✓" : "Copy ⧉"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
