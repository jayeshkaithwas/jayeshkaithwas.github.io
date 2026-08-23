"use client";

import { useState } from "react";

import { Lightbox } from "@/components/ui/Lightbox";
import projectImages from "@/content/generated/project-images.json";
import type { ProjectShot } from "@/types/content";

const images: Record<string, { src: string; width: number; height: number }> = projectImages;

/**
 * Screenshot strip for a project. Renders nothing when a project has no shots,
 * so cards without imagery keep their current shape exactly.
 *
 * Shots carrying `sampleData` get a visible badge on the thumbnail as well as
 * in the lightbox: a dashboard full of figures reads as a real client result,
 * and the label has to survive being screenshotted off this page.
 */
export function ProjectShots({ shots, title }: { shots: ProjectShot[]; title: string }) {
  const [open, setOpen] = useState<string | null>(null);

  const usable = shots.filter((s) => images[s.image]);
  if (usable.length === 0) return null;

  const openShot = open ? usable.find((s) => s.image === open) : null;
  const openImage = openShot ? images[openShot.image] : null;

  return (
    <>
      <ul className="mt-5 grid grid-cols-2 gap-3">
        {usable.map((shot) => {
          const img = images[shot.image];
          return (
            <li key={shot.image}>
              <button
                type="button"
                onClick={() => setOpen(shot.image)}
                aria-label={`View screenshot: ${shot.alt}`}
                className="group/shot relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden border-2 border-ink/15 bg-paper-sunk"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt=""
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-top transition-transform duration-300 group-hover/shot:scale-[1.03]"
                />
                {shot.sampleData ? (
                  <span className="label absolute bottom-0 left-0 bg-paper/90 px-1.5 py-0.5 text-ink-2">
                    sample data
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      {openShot && openImage ? (
        <Lightbox
          image={{
            src: openImage.src,
            width: openImage.width,
            height: openImage.height,
            alt: `${title} — ${openShot.alt}`,
            caption: openShot.caption,
            badge: openShot.sampleData ? "sample data" : undefined,
          }}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}
