"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const KEY = "theme";
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", emit);
  window.addEventListener("storage", emit);
  return () => {
    listeners.delete(fn);
    media.removeEventListener("change", emit);
    window.removeEventListener("storage", emit);
  };
}

/** Read from the DOM, which the inline boot script has already resolved. */
function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * The server has no idea which theme will apply, so it renders the light label
 * and the client corrects it on hydration. Reading through
 * useSyncExternalStore rather than useEffect+useState keeps that correction in
 * one place and avoids a set-state-in-effect.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem(KEY, next);
        } catch {
          // Private mode: the choice just does not persist.
        }
        emit();
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="label -my-2 flex h-11 items-center gap-1.5 text-ink-2 transition-colors hover:text-ink"
    >
      <span aria-hidden className="text-[0.875rem] leading-none">
        {theme === "dark" ? "☾" : "☀"}
      </span>
      <span className="hidden sm:inline">{next}</span>
    </button>
  );
}
