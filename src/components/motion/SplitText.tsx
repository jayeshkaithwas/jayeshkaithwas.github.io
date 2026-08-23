"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Per-character mask wipe.
 *
 * Each glyph sits inside an overflow-hidden box and slides up from below the
 * baseline on a stagger, so a heading assembles itself rather than fading in.
 * This is the primary "something happened" moment on every chapter.
 *
 * The full string is always in the DOM as one accessible label; the animated
 * glyphs are aria-hidden, so screen readers and search engines read the word
 * once, not letter by letter.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 26,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);
  // Under reduced motion the characters never split — the plain string renders
  // and nothing moves. Derived from the store, not set inside the effect.
  const reduced = useReducedMotion();
  const enabled = !reduced;

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  if (!enabled) {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      <span className="sr-only">{text}</span>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden
          // leading-none + the matching padding keeps descenders from being
          // clipped by the mask box.
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <span
            className="inline-block will-change-transform"
            style={{
              transform: shown ? "translateY(0)" : "translateY(110%)",
              transition: `transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms`,
            }}
          >
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </span>
  );
}
