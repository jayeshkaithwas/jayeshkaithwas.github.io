"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts the leading number of a metric up from zero when it scrolls into view.
 *
 * Metric values are authored as display strings ("80%+", "50-60", "hours →
 * seconds"), so this parses off the first integer and leaves everything around
 * it untouched. A value with no leading digits renders unchanged.
 *
 * Tabular figures are essential here — without them the number jitters
 * horizontally as digits change and the whole line shifts.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  // No `s` flag — it needs an es2018 target, and metric values are single-line.
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number | null>(null);

  // Depend on the captured digits, not on `match`: String.match returns a fresh
  // array every render, so a dependency on it re-ran this effect on every
  // setDisplay — tearing down the observer, re-observing, and resetting the
  // count to 0 forever. That is why the hero metrics sat at zero.
  const digits = match?.[2];

  useEffect(() => {
    if (digits === undefined) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const goal = Number(digits);
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1100;
        let start: number | null = null;

        const step = (now: number) => {
          start ??= now;
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo — fast out of the gate, long settle.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(Math.round(eased * goal));
          if (t < 1) frame = requestAnimationFrame(step);
        };

        setDisplay(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [digits]);

  if (!match) return <span className={className}>{value}</span>;

  const [, prefix, , suffix] = match;
  const target = Number(match[2]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tnum">{display === null ? target : display}</span>
      {suffix}
    </span>
  );
}
