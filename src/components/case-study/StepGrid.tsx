import { cn } from "@/lib/cn";

/**
 * Every step of a run as one small cell. The point is the shape of the block,
 * not the reading: you should see at a glance how few steps can take the run
 * down, and how few still need a person.
 */
export type Step = {
  label: string;
  kind?: "critical" | "best-effort" | "human";
};

const TONE = {
  critical: "border-ink bg-ink text-paper",
  "best-effort": "border-ink bg-paper text-ink",
  human: "border-burnt bg-burnt/[0.07] text-ink",
} as const;

export function StepGrid({ steps, caption }: { steps: Step[]; caption?: string }) {
  const counts = steps.reduce<Record<string, number>>((acc, s) => {
    const k = s.kind ?? "best-effort";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <figure className="mt-10">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {counts.critical ? (
          <Key className="border-ink bg-ink" label={`${counts.critical} critical — a failure stops the run`} />
        ) : null}
        {counts["best-effort"] ? (
          <Key
            className="border-ink bg-paper"
            label={`${counts["best-effort"]} best-effort — failure costs that step only`}
          />
        ) : null}
        {counts.human ? (
          <Key className="border-burnt bg-burnt/[0.07]" label={`${counts.human} to a person`} tone="burnt" />
        ) : null}
      </div>

      <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {steps.map((step, i) => (
          <li
            key={step.label}
            className={cn("border-2 px-2.5 py-2.5", TONE[step.kind ?? "best-effort"])}
          >
            <span className={cn("label tnum block", step.kind === "critical" ? "opacity-60" : "text-ink-3")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 block font-mono text-[0.6875rem] leading-tight">{step.label}</span>
          </li>
        ))}
      </ol>

      {caption ? (
        <figcaption className="mt-4 max-w-[82ch] t-sm text-ink-2">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function Key({ className, label, tone }: { className: string; label: string; tone?: "burnt" }) {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden className={cn("h-3 w-3 border-2", className)} />
      <span className={cn("label", tone === "burnt" ? "text-burnt" : "text-ink-2")}>{label}</span>
    </span>
  );
}
