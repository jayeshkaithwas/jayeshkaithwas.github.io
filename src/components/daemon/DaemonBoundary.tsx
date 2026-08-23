"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const BUNDLE = "/live2d/live2d_bundle.js";
const TIPS = "/live2d/waifu-tips.js";
const STYLES = "/live2d/waifu.css";
const KILLED = "daemon.killed";

/**
 * The gate between the site and 5MB of 2018-era Cubism 2 code.
 *
 * Every condition below has to pass before a single byte is requested. Nothing
 * here is imported or bundled — the widget is a sealed artifact in public/ and
 * a bundler never touches it, so it cannot leak into the initial JS.
 *
 * If any of it fails, it fails silently. The site must be completely functional
 * with these scripts blocked at the network level, and that is a test, not a hope.
 */
/** Killed state lives in localStorage; read it as a store, not as mount state. */
const noopSubscribe = () => () => {};

function useKilled(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => localStorage.getItem(KILLED) === "1",
    () => false,
  );
}

export function DaemonBoundary() {
  const killed = useKilled();
  const [spawned, setSpawned] = useState(false);

  useEffect(() => {
    if (killed) return;

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };

    // Cubism 2 renders through WebGL. Without a context the SDK fails after the
    // toolbar has already been styled and positioned, leaving an orphan close
    // button floating over the page with no character attached to it. Check
    // first and simply never spawn.
    const hasWebGL = (() => {
      try {
        const probe = document.createElement("canvas");
        return Boolean(probe.getContext("webgl") || probe.getContext("experimental-webgl"));
      } catch {
        return false;
      }
    })();

    const blocked =
      !hasWebGL ||
      window.innerWidth < 1024 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      nav.connection?.saveData === true ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4);

    if (blocked) return;

    let cancelled = false;

    function spawn() {
      if (cancelled || document.getElementById("daemon-bundle")) return;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLES;
      document.head.appendChild(link);

      const bundle = document.createElement("script");
      bundle.id = "daemon-bundle";
      bundle.src = BUNDLE;
      bundle.async = true;

      // If the widget does not load, nothing else on the page should care.
      const timeout = setTimeout(() => {
        bundle.onload = null;
      }, 10_000);

      bundle.onerror = () => clearTimeout(timeout);
      bundle.onload = () => {
        clearTimeout(timeout);
        if (cancelled) return;
        // Unhide #waifu before the tips script runs: it queries the element
        // and positions the toolbar against it during init.
        setSpawned(true);
        const tips = document.createElement("script");
        tips.src = TIPS;
        tips.type = "module";
        tips.async = true;
        tips.onerror = () => {};
        document.body.appendChild(tips);
      };

      document.body.appendChild(bundle);
    }

    // After LCP, never before. requestIdleCallback where available, a hard
    // 4s floor everywhere else so it still spawns on Safari.
    const ric = (
      window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    ).requestIdleCallback;

    const handle = ric
      ? ric(spawn, { timeout: 6000 })
      : window.setTimeout(spawn, 4000);

    return () => {
      cancelled = true;
      if (!ric) clearTimeout(handle);
    };
  }, [killed]);

  return (
    <>
      {/*
        The widget queries #waifu on load rather than creating it, so the shell
        has to exist first. It is empty and 0×0 until the bundle mounts canvases
        into it, so it contributes nothing to layout or to CLS.
        Every tool icon has to be present even though the config disables most
        of them: the widget queries each one unconditionally and calls
        classList/addEventListener on the result, so a missing span throws
        during init. The disabled ones get `hide` applied by the config.
      */}
      {/* Hidden until the bundle mounts a canvas into it — otherwise the
          absolutely-positioned toolbar is visible with nothing behind it. */}
      <div id="waifu" aria-hidden style={{ right: 0, display: spawned ? undefined : "none" }}>
        <div id="waifu-message" />
        <div className="waifu-tool">
          <span className="icon-next" />
          <span className="icon-message" />
          <span className="icon-home" />
          <span className="icon-camera" />
          <span className="icon-volumeup" />
          <span className="icon-volumedown" />
          <span className="icon-about" />
          <span className="icon-cross" />
        </div>
        <canvas id="live2d2" />
        <canvas id="live2d4" />
      </div>
      <DaemonStatus killed={killed} spawned={spawned} />
    </>
  );
}

/** HUD chip. The widget's own toolbar is disabled; control lives here. */
function DaemonStatus({ killed, spawned }: { killed: boolean; spawned: boolean }) {
  // Nothing to control until it is either running or deliberately stopped.
  if (!killed && !spawned) return null;

  return (
    <button
      type="button"
      onClick={() => {
        if (killed) {
          localStorage.removeItem(KILLED);
        } else {
          localStorage.setItem(KILLED, "1");
        }
        window.location.reload();
      }}
      /* Bottom-left: bottom-right is where the character itself docks, and the
         hero metrics run along the bottom of the first screen. */
      className="label fixed bottom-0 left-0 z-50 hidden items-center gap-2 border-t-2 border-r-2 border-ink bg-paper px-3 py-2 text-ink-2 transition-colors hover:bg-ink hover:text-paper lg:inline-flex"
    >
      <span aria-hidden className={`size-1.5 ${killed ? "bg-ink-3" : "bg-burnt"}`} />
      <span>daemon.miku</span>
      <span className="text-ink-3">{killed ? "· spawn" : "· kill"}</span>
    </button>
  );
}
