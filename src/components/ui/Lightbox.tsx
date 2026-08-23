"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export interface LightboxImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** Small badge over the frame — e.g. "sample data". */
  badge?: string;
}

/**
 * One modal image viewer, shared by the certificate gallery and project shots.
 *
 * Escape is bound on the document rather than on the dialog element: a keydown
 * handler on the wrapper only fires while focus is inside it, which silently
 * breaks the moment anything steals focus.
 *
 * Portalled to <body> because callers sit inside `.sweep`, which sets
 * `isolation: isolate` — that opens a stacking context, so a z-index here only
 * competes with the card's own children and later cards paint straight over it.
 */
export function Lightbox({ image, onClose }: { image: LightboxImage; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Stop the page scrolling behind the overlay.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  // Only ever rendered in response to a click, so `document` exists — the guard
  // is here so a future server-side caller fails soft instead of throwing.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      /* Above the vendored Live2D widget, which pins itself at z-index 998. */
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-ink/97 p-2 sm:p-4"
    >
      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="label fixed top-3 right-3 z-10 border-2 border-paper bg-ink px-3 py-1.5 text-paper transition-colors hover:bg-paper hover:text-ink"
      >
        Close ✕
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full object-contain"
      />

      {image.badge ? (
        <span className="label fixed top-3 left-3 bg-paper/90 px-2 py-1 text-ink">
          {image.badge}
        </span>
      ) : null}

      {/* Overlaid rather than stacked: a caption in the flow steals height from
          the image, which is the thing the reader opened this for. */}
      {image.caption ? (
        <p className="t-sm pointer-events-none fixed inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-4 pt-10 pb-4 text-center text-paper/80">
          <span className="mx-auto block max-w-[80ch]">{image.caption}</span>
        </p>
      ) : null}
    </div>,
    document.body,
  );
}
