import { ChapterSection } from "@/components/ui/primitives";
import { chapterBySlug } from "@/content/chapters";
import { TESTIMONIALS } from "@/content/certifications";

/**
 * 0x09 — testimonials.
 *
 * Returns null while TESTIMONIALS is empty, so the chapter does not exist on
 * the live site until there are real quotes. Adding entries to
 * src/content/certifications.ts turns the section on; nothing is seeded with
 * placeholder people.
 */
export function Signals() {
  const chapter = chapterBySlug("signals")!;
  if (TESTIMONIALS.length === 0) return null;

  return (
    <ChapterSection chapter={chapter}>
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <li key={t.id} className="border-t-2 border-ink pt-5">
            <blockquote className="font-sans text-lg leading-snug text-ink">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-5 flex items-center gap-3 border-t border-ink/15 pt-4">
              {t.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.avatar.src}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  className="size-9 shrink-0 object-cover grayscale"
                />
              ) : null}
              <div className="min-w-0">
                <p className="text-sm text-ink">{t.name}</p>
                {t.role || t.org ? (
                  <p className="label text-ink-3">{[t.role, t.org].filter(Boolean).join(" · ")}</p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ChapterSection>
  );
}
