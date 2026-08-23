"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#$%&";

/**
 * Print-on effect for mono labels. Machine voice only — never body copy, where
 * scrambling text is just an accessibility problem wearing a costume.
 *
 * Renders the final string on the server and as the initial state, so the real
 * text is what gets indexed and what a reduced-motion user sees.
 */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        let frame = 0;
        const total = 14;
        const id = setInterval(() => {
          frame += 1;
          const settled = Math.floor((frame / total) * text.length);
          setDisplay(
            text
              .split("")
              .map((char, i) => {
                if (i < settled || char === " ") return char;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              })
              .join(""),
          );
          if (frame >= total) {
            clearInterval(id);
            setDisplay(text);
          }
        }, 28);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
