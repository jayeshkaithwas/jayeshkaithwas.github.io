import { ChapterSection } from "@/components/ui/primitives";
import { chapterBySlug } from "@/content/chapters";
import { SKILL_GROUPS } from "@/content/skills";

/**
 * 0x06 — tooling, as loadout columns with a one-line context per tool rather
 * than a grid of vendor logos. The old repo carried 27 template SVGs for
 * skills he does not claim; none survived.
 */
export function Arsenal() {
  const chapter = chapterBySlug("arsenal")!;

  return (
    <ChapterSection chapter={chapter}>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-5">
        {SKILL_GROUPS.map((group) => (
          <section key={group.id} aria-label={group.label} className="border-t-2 border-ink pt-4">
            <h3 className="label text-burnt">{group.label}</h3>
            <ul className="mt-5 space-y-3.5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <span className="font-sans text-sm text-ink">{item.name}</span>
                  {item.note ? (
                    <span className="mt-0.5 block text-xs leading-snug text-ink-3">
                      {item.note}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ChapterSection>
  );
}
