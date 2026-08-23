import { cn } from "@/lib/cn";

/**
 * A pipeline read left-to-right on desktop, top-to-bottom on phones.
 *
 * The one rule that carries every diagram on this site: burnt marks a step that
 * still needs a person. Ink marks a step that runs on its own. That is the whole
 * argument of the portfolio, so it is the thing the eye should resolve first —
 * before any label has been read.
 *
 * Deliberately HTML rather than SVG: an SVG pipeline needs a min-width and then
 * scrolls sideways on a phone, which is where "understand it at a glance" dies.
 */
export type FlowStep = {
  label: string;
  /** One short line. Under ~40 characters — this is scanned, not read. */
  note?: string;
  kind?: "machine" | "human";
  /** Renders a "repeats" marker rather than drawing a return arrow. */
  loop?: boolean;
};

export function Flow({ steps, caption }: { steps: FlowStep[]; caption?: string }) {
  return (
    <figure className="mt-10">
      <Legend />
      <ol className="mt-4 flex flex-col items-stretch gap-0 md:flex-row md:items-stretch">
        {steps.map((step, i) => {
          const human = step.kind === "human";
          return (
            <li key={step.label} className="flex flex-col md:flex-1 md:flex-row md:items-stretch">
              <div
                className={cn(
                  "flex flex-1 flex-col justify-between border-2 p-4",
                  human ? "border-burnt bg-burnt/[0.07]" : "border-ink bg-paper",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={cn("label tnum", human ? "text-burnt" : "text-ink-3")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.loop ? <span className="label text-ink-3">repeats</span> : null}
                  {human ? <span className="label text-burnt">human</span> : null}
                </div>
                <p className="mt-3 font-sans text-[0.9375rem] leading-snug font-medium text-ink">
                  {step.label}
                </p>
                {step.note ? <p className="mt-1.5 t-sm text-ink-2">{step.note}</p> : null}
              </div>

              {i < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="flex shrink-0 items-center justify-center py-1 font-mono text-ink-3 md:px-1.5 md:py-0"
                >
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      {caption ? (
        <figcaption className="mt-4 max-w-[82ch] t-sm text-ink-2">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className="flex items-center gap-2">
        <span aria-hidden className="h-3 w-3 border-2 border-ink bg-paper" />
        <span className="label text-ink-2">runs itself</span>
      </span>
      <span className="flex items-center gap-2">
        <span aria-hidden className="h-3 w-3 border-2 border-burnt bg-burnt/[0.07]" />
        <span className="label text-burnt">needs a person</span>
      </span>
    </div>
  );
}
