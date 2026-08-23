import { cn } from "@/lib/cn";

/**
 * Before / after, side by side. The fastest way to say what changed without
 * writing a paragraph about it — each item is a fragment, not a sentence.
 */
export function Split({
  before,
  after,
}: {
  before: { title?: string; items: string[] };
  after: { title?: string; items: string[] };
}) {
  return (
    <div className="mt-10 grid gap-px border-2 border-ink bg-ink sm:grid-cols-2">
      <Column title={before.title ?? "Before"} items={before.items} tone="muted" />
      <Column title={after.title ?? "After"} items={after.items} tone="live" />
    </div>
  );
}

function Column({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "muted" | "live";
}) {
  const muted = tone === "muted";
  return (
    <section className={cn("p-5 sm:p-6", muted ? "bg-paper-sunk" : "bg-paper")}>
      <h3 className={cn("label", muted ? "text-ink-3" : "text-burnt")}>{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 t-sm">
            <span
              aria-hidden
              className={cn("mt-2 h-px w-3 shrink-0", muted ? "bg-ink-3" : "bg-burnt")}
            />
            <span className={muted ? "text-ink-2 line-through decoration-ink-3/40" : "text-ink"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
