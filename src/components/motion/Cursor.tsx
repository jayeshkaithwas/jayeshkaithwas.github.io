"use client";

import { useEffect, useRef } from "react";

/**
 * Custom ink cursor.
 *
 * A hard burnt-orange square that trails the pointer with a spring, and snaps
 * into a larger outlined box over anything interactive. No blur, no glow — it
 * obeys the same print rules as everything else.
 *
 * Written against the DOM directly rather than through React state: this
 * updates every frame, and re-rendering a component 60 times a second to move
 * one element is the classic way to make a cursor effect feel worse than none.
 *
 * Desktop + fine pointer only, and never under reduced motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const eased = { x: pointer.x, y: pointer.y };
    let hovering = false;
    let frame = 0;
    let visible = false;

    const INTERACTIVE = "a, button, [role='button'], input, summary";

    function onMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!visible) {
        visible = true;
        dot!.style.opacity = "1";
        ring!.style.opacity = "1";
      }
      hovering = Boolean((e.target as Element | null)?.closest?.(INTERACTIVE));
    }

    function onLeave() {
      visible = false;
      dot!.style.opacity = "0";
      ring!.style.opacity = "0";
    }

    function render() {
      frame = requestAnimationFrame(render);
      // Dot tracks 1:1; the ring lags, which is what reads as weight.
      eased.x += (pointer.x - eased.x) * 0.16;
      eased.y += (pointer.y - eased.y) * 0.16;

      dot!.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      ring!.style.transform =
        `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%) scale(${hovering ? 2.1 : 1})`;
      ring!.style.borderColor = hovering ? "var(--color-burnt)" : "var(--color-ink)";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] hidden lg:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 size-1.5 bg-burnt opacity-0 transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 size-7 border-2 border-ink opacity-0 transition-opacity duration-200"
      />
    </div>
  );
}
