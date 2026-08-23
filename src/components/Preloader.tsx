"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const UNITS = [
  "mount /shrine",
  "load fonts",
  "spawn hero.field",
  "link agent.infra",
  "verify credentials",
  "open 0x01 ignition",
];

/** Never changes within a page's life — subscribing is a no-op. */
const noopSubscribe = () => () => {};

/**
 * Whether this visit should boot at all. Read as an external store so the
 * server snapshot ("no") and the client snapshot are both explicit, instead of
 * flipping state inside an effect and forcing a cascading render.
 */
function useShouldBoot(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      sessionStorage.getItem("daemon.booted") !== "1" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * 0x00 — BOOT.
 *
 * Rules this obeys, because a preloader is the easiest way to make a concept
 * site hostile:
 *   · It overlays content that is already fully rendered underneath, so
 *     removing it cannot shift anything. CLS contribution is zero by construction.
 *   · Hard 2200ms cap. It never waits on fonts, the shader, or the daemon.
 *   · Skippable by click or any key, skipped on repeat visits in the session
 *     and skipped entirely under reduced motion.
 */
export function Preloader() {
  const shouldBoot = useShouldBoot();
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  // Starts at 1: the first unit must be on screen in the first painted frame,
  // otherwise the boot opens on an empty rectangle.
  const [line, setLine] = useState(1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!shouldBoot) return;

    const pending = timers.current;
    document.documentElement.style.overflow = "hidden";

    const step = 1600 / UNITS.length;
    UNITS.slice(1).forEach((_, i) => {
      pending.push(setTimeout(() => setLine(i + 2), step * (i + 1)));
    });

    const finish = () => {
      setLeaving(true);
      pending.push(
        setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
          sessionStorage.setItem("daemon.booted", "1");
        }, 400),
      );
    };

    pending.push(setTimeout(finish, 2200));

    const skip = () => finish();
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });

    return () => {
      for (const t of pending) clearTimeout(t);
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [shouldBoot]);

  if (!shouldBoot || done) return null;

  const pct = Math.round((line / UNITS.length) * 100);

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-100 flex flex-col justify-end bg-paper transition-opacity duration-400 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="bleed pb-10">
        <ol className="space-y-1">
          {UNITS.slice(0, line).map((unit) => (
            <li key={unit} className="label flex items-center gap-3 text-ink-2">
              <span className="text-burnt">[ok]</span>
              <span>{unit}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex items-center gap-4 border-t-2 border-ink pt-3">
          <div className="h-1.5 flex-1 bg-paper-sunk">
            <div
              className="h-full bg-burnt transition-[width] duration-300 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="label tnum text-ink">{String(pct).padStart(3, "0")}%</span>
        </div>

        <p className="label mt-4 text-ink-3">Press any key to skip</p>
      </div>
    </div>
  );
}
