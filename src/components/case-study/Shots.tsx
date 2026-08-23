"use client";

import { useState } from "react";

import { Lightbox } from "@/components/ui/Lightbox";
import projectImages from "@/content/generated/project-images.json";

const images: Record<string, { src: string; width: number; height: number }> = projectImages;

export type Shot = {
  /** Key into src/content/generated/project-images.json. */
  image: string;
  alt: string;
  /** One line under the figure. This is what gets read — keep it short. */
  caption?: string;
  /** Figures showing sample rather than live figures carry a visible badge. */
  sampleData?: boolean;
};

/**
 * Thumbnails for a case study, two-up, cropped to one ratio so the grid stays
 * even however tall the sources are.
 *
 * They are deliberately not shown at full size: a 1,580px dashboard rendered
 * edge to edge dominates the page and still is not read. The thumbnail's job is
 * to say "this is a dashboard"; the lightbox's job is to make it legible. Pass
 * `cols={1}` for a shot whose point needs the width.
 */
export function Shots({ shots, cols = 2 }: { shots: Shot[]; cols?: 1 | 2 }) {
  const [open, setOpen] = useState<string | null>(null);

  const usable = shots.filter((s) => images[s.image]);
  if (usable.length === 0) return null;

  const openShot = open ? usable.find((s) => s.image === open) : null;
  const openImage = openShot ? images[openShot.image] : null;

  return (
    <>
      {/* A lone shot in a two-column grid leaves a conspicuous empty half, so it
          gets its own capped column instead. */}
      <div
        className={`mt-10 grid gap-x-6 gap-y-8 ${
          usable.length === 1 ? "max-w-3xl" : cols === 2 ? "sm:grid-cols-2" : ""
        }`}
      >
        {usable.map((shot) => {
          const img = images[shot.image];
          return (
            <figure key={shot.image} className="m-0">
              <button
                type="button"
                onClick={() => setOpen(shot.image)}
                aria-label={`Enlarge: ${shot.alt}`}
                className="group/shot relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden border-2 border-ink bg-paper-sunk"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={shot.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  /* Left-anchored: these are wider than 16/10, and cropping
                     equally from both sides eats the row labels and the nav —
                     the parts that say what you are looking at. */
                  className="size-full object-cover object-left-top transition-transform duration-500 group-hover/shot:scale-[1.03]"
                />
                {/* Affordance: these are cropped, so say that they open. */}
                <span className="label absolute right-0 bottom-0 bg-ink px-2 py-1 text-paper opacity-0 transition-opacity group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100">
                  Expand ⤢
                </span>
                {shot.sampleData ? (
                  <span className="label absolute top-0 left-0 bg-paper/90 px-2 py-1 text-ink-2">
                    sample data
                  </span>
                ) : null}
              </button>
              {shot.caption ? (
                <figcaption className="mt-3 t-sm text-ink-2">{shot.caption}</figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>

      {openShot && openImage ? (
        <Lightbox
          image={{
            src: openImage.src,
            width: openImage.width,
            height: openImage.height,
            alt: openShot.alt,
            caption: openShot.caption,
            badge: openShot.sampleData ? "sample data" : undefined,
          }}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}
