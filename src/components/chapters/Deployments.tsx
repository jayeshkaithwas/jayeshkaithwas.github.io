import { ChapterSection, Tag, UnitState } from "@/components/ui/primitives";
import { chapterBySlug } from "@/content/chapters";
import { EXPERIENCE } from "@/content/experience";
import { formatRange } from "@/lib/cn";

/**
 * 0x03 — experience.
 *
 * None of this existed anywhere on the previous site. Three roles, laid out as
 * a full-bleed table rather than a stack of cards.
 */
export function Deployments() {
  const chapter = chapterBySlug("deployments")!;

  return (
    <ChapterSection chapter={chapter}>
      <ol>
        {EXPERIENCE.map((role) => (
          <li key={role.id} className="field border-t-2 border-ink py-8 first:pt-0">
            <div className="col-span-4 md:col-span-8 xl:col-span-4">
              <h3 className="display t-heading text-ink">{role.role}</h3>
              <p className="label mt-2 text-burnt">{role.org}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <UnitState state={role.state} />
                <span className="label tnum text-ink-3">
                  {formatRange(role.start, role.end)}
                </span>
              </div>

              {role.metrics ? (
                <ul className="mt-6 space-y-1">
                  {role.metrics.map((m) => (
                    <li key={m.label} className="label text-ink">
                      <span className="tnum text-burnt">{m.value}</span> {m.label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="col-span-4 mt-6 md:col-span-8 xl:col-span-7 xl:col-start-6 xl:mt-0">
              <p className="max-w-[60ch] t-body text-ink">{role.summary}</p>

              <ul className="mt-6 space-y-2.5">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-3 t-sm text-ink-2">
                    <span aria-hidden className="mt-1.5 h-1.5 w-3 shrink-0 bg-burnt" />
                    <span className="max-w-[70ch]">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {role.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

    </ChapterSection>
  );
}
