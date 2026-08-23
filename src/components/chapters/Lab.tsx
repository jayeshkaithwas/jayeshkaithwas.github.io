import { ChapterSection } from "@/components/ui/primitives";
import { chapterBySlug } from "@/content/chapters";
import { HACKLAB } from "@/content/site";

/**
 * 0x08 — HackLab, a separate repo serving at /hacklab/. Featured rather than
 * duplicated: it is the strongest standing evidence for the security half of
 * the story, and on the old site it was buried in a nav link nobody clicks.
 */
export function Lab() {
  const chapter = chapterBySlug("lab")!;

  return (
    <ChapterSection chapter={chapter}>
      <div className="relative overflow-hidden border-2 border-ink bg-ink text-paper">
        <div aria-hidden className="halftone absolute inset-0 opacity-[0.07] invert" />

        <div className="relative field p-6 sm:p-10">
          <div className="col-span-4 md:col-span-8 xl:col-span-7">
            <h3 className="display t-title">{HACKLAB.title}</h3>
            <p className="mt-4 font-sans t-statement text-paper">{HACKLAB.tagline}</p>
            <p className="mt-5 max-w-[55ch] t-body text-paper/75">
              {HACKLAB.body}
            </p>
          </div>

          <div className="col-span-4 mt-8 flex flex-col justify-end gap-6 md:col-span-8 xl:col-span-4 xl:col-start-9 xl:mt-0">
            <div className="flex flex-wrap gap-1.5">
              {HACKLAB.tags.map((t) => (
                <span key={t} className="label border border-paper/30 px-2 py-1 text-paper/70">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={HACKLAB.href}
                target="_blank"
                rel="noreferrer noopener"
                className="label inline-flex min-h-11 items-center gap-1.5 bg-paper px-4 text-ink transition-colors hover:bg-burnt hover:text-paper"
              >
                Open HackLab <span aria-hidden>↗</span>
              </a>
              <a
                href={HACKLAB.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="label tap border-b-2 border-paper/40 pb-0.5 text-paper/70 transition-colors hover:border-paper hover:text-paper"
              >
                Source ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
