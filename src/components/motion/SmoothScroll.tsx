"use client";

import { useEffect } from "react";

import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Lenis smooth scroll, plus the focus fix it requires.
 *
 * Smooth-scroll libraries drive scroll position themselves, so tabbing to an
 * offscreen element moves DOM focus without moving the viewport — the user ends
 * up typing into something they cannot see. The `focusin` handler below is not
 * optional polish; without it the site is keyboard-hostile.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // Imported dynamically so ~12KB gz of scroll library stays out of the
    // entry bundle. Native scrolling works perfectly until this resolves.
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.6,
      });

      let frame = requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      });

      function onFocusIn(event: FocusEvent) {
        const target = event.target as HTMLElement | null;
        if (!target || typeof target.getBoundingClientRect !== "function") return;

        const rect = target.getBoundingClientRect();
        const offscreen = rect.top < 0 || rect.bottom > window.innerHeight;
        if (offscreen) lenis.scrollTo(target, { immediate: true, offset: -120 });
      }

      document.addEventListener("focusin", onFocusIn);

      cleanup = () => {
        document.removeEventListener("focusin", onFocusIn);
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);

  return null;
}
