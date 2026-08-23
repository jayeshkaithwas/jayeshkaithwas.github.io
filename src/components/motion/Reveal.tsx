"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Mask-wipe reveal on scroll.
 *
 * Intentionally IntersectionObserver + CSS rather than a Motion component:
 * this runs on nearly every block on the page, and 34KB of animation library
 * to translate a div would eat most of the JS budget on its own.
 *
 * Content is always in the DOM and always readable — only opacity and transform
 * are animated, so nothing is hidden from search engines or from a user whose
 * JS never runs.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();

  // Derived, not stored: under reduced motion the element is simply always
  // shown, so there is no state to set and no cascading render on mount.
  const shown = reduced || inView;

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref as never}
      style={shown && !reduced ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
