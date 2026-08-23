"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media queries as an external store.
 *
 * useSyncExternalStore rather than useState+useEffect: it reads the real value
 * during render instead of causing a second cascading render on mount, and it
 * lets the server snapshot be stated explicitly.
 */
function useMediaQuery(query: string, serverValue: boolean): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/**
 * Server snapshot is `true` — during SSR and the first hydration pass we assume
 * reduced motion, so nothing can animate before the real preference is known.
 * The safe answer, not the pretty one.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}

/** Coarse device gate. Keeps expensive effects off phones entirely. */
export function useIsDesktop(minWidth = 1024): boolean {
  return useMediaQuery(`(min-width: ${minWidth}px) and (pointer: fine)`, false);
}
