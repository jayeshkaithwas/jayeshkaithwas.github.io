"use client";

import { useEffect, useState } from "react";

import { TESTIMONIALS } from "@/content/certifications";
import { CHAPTERS } from "@/content/chapters";
import { cn } from "@/lib/cn";

/**
 * Derived from content, not from probing the DOM after mount — the rail must
 * render correctly in the server HTML, and 0x09 Signals is the only chapter
 * that conditionally exists (it unmounts while there are no real testimonials).
 */
const VISIBLE = CHAPTERS.filter((c) => c.slug !== "signals" || TESTIMONIALS.length > 0);

/**
 * Fixed chapter rail with scroll-spy.
 *
 * Real anchor links, so it works with keyboard, with JS disabled, and with the
 * browser's own find-on-page. The active marker cuts hard rather than tweening.
 */
export function ChapterRail() {
  const [active, setActive] = useState<string>(CHAPTERS[0].slug);
  const onHero = active === CHAPTERS[0].slug;

  useEffect(() => {
    const sections = VISIBLE.map((c) => document.getElementById(c.slug)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section occupying most of the viewport wins, so a short chapter
        // between tall ones cannot flicker the marker.
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActive(best.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Chapters"
      /* Anchored to the right edge with the label expanding leftwards, so a
         long chapter title can never push the rail off-screen.

         Hidden while 0x01 is on screen: the hero's name runs the full width of
         the viewport and the rail would sit on top of it, which reads as a
         mistake rather than as a layer. */
      className={cn(
        "fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 border-y-2 border-l-2 border-ink bg-paper transition-opacity duration-300 xl:block",
        onHero ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      aria-hidden={onHero || undefined}
    >
      <ol className="flex flex-col items-end">
        {VISIBLE.map((chapter) => {
          const isActive = active === chapter.slug;
          return (
            <li key={chapter.id} className="relative w-full border-b border-ink/15 last:border-b-0">
              <a
                href={`#${chapter.slug}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "label group/rail flex items-center justify-end py-2 pr-3 pl-3 transition-colors",
                  isActive ? "bg-ink text-paper" : "text-ink-3 hover:bg-paper-sunk hover:text-ink",
                )}
              >
                {/* The title overlays leftwards out of flow, so the rail's own
                    width stays at the number and body text only ever needs
                    clearance for that — not for the longest chapter name. */}
                <span
                  className={cn(
                    "pointer-events-none absolute top-0 right-full flex h-full items-center border-y border-l-2 border-ink px-3 whitespace-nowrap transition-opacity duration-150",
                    isActive ? "bg-ink text-paper" : "bg-paper text-ink",
                    "opacity-0 group-hover/rail:opacity-100 group-focus-visible/rail:opacity-100",
                  )}
                >
                  {chapter.title}
                </span>
                <span className="tnum shrink-0">{chapter.id}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
