import { cn } from "@/lib/cn";

/**
 * Infinite ticker band.
 *
 * Pure CSS — the track holds the items twice and translates exactly -50%, so
 * the loop point is seamless with no JS and no measuring. A server component
 * on purpose: this is the largest piece of visible motion on the page and it
 * costs zero bytes of JavaScript.
 */
export function Marquee({
  items,
  speed = 38,
  invert = false,
  reverse = false,
  className,
}: {
  items: string[];
  /** Seconds for one full pass. Longer = slower. */
  speed?: number;
  invert?: boolean;
  reverse?: boolean;
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      aria-hidden
      className={cn(
        "marquee relative flex overflow-hidden border-y-2 border-ink py-3 select-none",
        invert ? "bg-ink text-paper" : "bg-paper text-ink",
        className,
      )}
    >
      <div
        className="marquee-track flex shrink-0 items-center gap-8 pr-8"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="display flex items-center gap-8 text-2xl sm:text-4xl">
            {item}
            <span className={cn("size-2 shrink-0", invert ? "bg-paper" : "bg-burnt")} />
          </span>
        ))}
      </div>
    </div>
  );
}
