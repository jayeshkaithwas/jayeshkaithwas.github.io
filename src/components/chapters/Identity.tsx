import { ChapterSection, Label } from "@/components/ui/primitives";
import { chapterBySlug } from "@/content/chapters";
import { PROFILE } from "@/content/site";

/** 0x02 — the three facts everything else on this site is downstream of. */
export function Identity() {
  const chapter = chapterBySlug("identity")!;
  const [lead, ...rest] = PROFILE.summary.split(". ");

  return (
    <ChapterSection chapter={chapter}>
      <div className="field gap-y-12">
        <div className="col-span-4 md:col-span-8 xl:col-span-6">
          <p className="display text-balance t-statement text-ink">{lead}.</p>
          <p className="mt-6 max-w-[52ch] t-body text-ink-2">
            {rest.join(". ")}
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-16 gap-y-6 border-t-2 border-ink pt-5">
            <div>
              <dt>
                <Label>Based in</Label>
              </dt>
              <dd className="mt-1 text-sm text-ink">{PROFILE.location}</dd>
            </div>
            <div>
              <dt>
                <Label>Status</Label>
              </dt>
              <dd className="mt-1 text-sm text-ink">{PROFILE.availability}</dd>
            </div>
          </dl>
        </div>

        <ul className="col-span-4 md:col-span-8 xl:col-span-5 xl:col-start-8">
          {PROFILE.pillars.map((pillar, i) => (
            <li key={pillar.label} className="border-t-2 border-ink py-5 last:pb-0">
              <div className="flex items-baseline gap-3">
                <span className="label tnum text-burnt">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display t-heading text-ink">{pillar.label}</h3>
              </div>
              <p className="mt-2 t-sm text-ink-2">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </ChapterSection>
  );
}
