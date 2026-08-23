/**
 * The hard parts, one line each. A case study earns its keep on these — but
 * only if they stay short enough to scan in a single pass.
 */
export function Notes({
  title = "Where it got hard",
  items,
}: {
  title?: string;
  items: { head: string; body: string }[];
}) {
  return (
    <section className="mt-12">
      <h3 className="label text-burnt">{title}</h3>
      <dl className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.head} className="border-t-2 border-ink pt-3">
            <dt className="font-sans text-[0.9375rem] leading-snug font-medium text-ink">
              {item.head}
            </dt>
            <dd className="mt-1 t-sm text-ink-2">{item.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
