"use client";

import dynamic from "next/dynamic";

/**
 * ssr:false boundary for the daemon.
 *
 * Keeps the Live2D shell and its gate out of the server-rendered HTML and out
 * of the initial chunk graph entirely. The heavy part — a 474KB bundle plus a
 * 5MB model — is only requested by DaemonBoundary once every condition passes.
 */
export const Daemon = dynamic(
  () => import("@/components/daemon/DaemonBoundary").then((m) => m.DaemonBoundary),
  { ssr: false },
);
