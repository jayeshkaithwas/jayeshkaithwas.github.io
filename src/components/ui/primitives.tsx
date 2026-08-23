import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { SplitText } from "@/components/motion/SplitText";
import { cn } from "@/lib/cn";
import type { Certification, Chapter, Metric } from "@/types/content";

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("label text-ink-2", className)}>{children}</span>;
}

export function Tag({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "solid";
}) {
  return (
    <span
      className={cn(
        "label inline-flex items-center border px-2 py-1 whitespace-nowrap",
        tone === "default" && "border-ink/25 text-ink-2",
        tone === "accent" && "border-burnt text-burnt",
        tone === "solid" && "border-ink bg-ink text-paper",
      )}
    >
      {children}
    </span>
  );
}

/** Big flat number, hard rule above it. No tooltip — nothing hidden on hover. */
export function Stat({ metric, size = "md" }: { metric: Metric; size?: "sm" | "md" | "lg" }) {
  return (
    <div className="min-w-0 border-t-2 border-ink pt-3">
      <div
        className={cn(
          "display tnum text-ink",
          size === "sm" && "text-3xl",
          size === "md" && "text-4xl sm:text-5xl",
          size === "lg" && "text-5xl sm:text-7xl",
        )}
      >
        <Counter value={metric.value} />
      </div>
      <div className="label mt-2 text-ink-2">{metric.label}</div>
      {metric.detail ? (
        <p className="mt-2 max-w-[28ch] text-[0.8125rem] leading-snug text-ink-2">{metric.detail}</p>
      ) : null}
    </div>
  );
}

/**
 * Chapter shell. Full-bleed: the only horizontal padding is `bleed`, and the
 * heading row pins its number and kicker to opposite edges of the screen.
 */
export function ChapterSection({
  chapter,
  children,
  className,
}: {
  chapter: Chapter;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${chapter.slug}-title`;
  return (
    <section
      id={chapter.slug}
      aria-labelledby={headingId}
      className={cn("relative border-t-2 border-ink", className)}
    >
      {/* xl:pr clears the fixed chapter rail so body text never runs underneath
          it. The hero deliberately does not do this — the rail hides there. */}
      <div className="bleed py-20 sm:py-28 rail-clear">
        <Reveal>
          <header className="mb-12 sm:mb-16">
            <div className="flex items-center gap-4">
              <span className="label tnum text-burnt">
                <ScrambleText text={chapter.id} />
              </span>
              <span aria-hidden className="h-px flex-1 bg-ink/20" />
              {chapter.kicker ? <Label>{chapter.kicker}</Label> : null}
            </div>
            <h2 id={headingId} className="display mt-4 t-title text-ink">
              <SplitText text={chapter.title} />
            </h2>
          </header>
        </Reveal>
        <Reveal delay={60}>{children}</Reveal>
      </div>
    </section>
  );
}

export function ExternalLink({
  href,
  children,
  className,
  ...rest
}: ComponentProps<"a"> & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "label tap group/link inline-flex items-center gap-1.5 border-b-2 border-burnt pb-0.5 text-burnt transition-colors hover:bg-burnt hover:text-paper",
        className,
      )}
      {...rest}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover/link:translate-x-0.5">
        ↗
      </span>
    </a>
  );
}

export function InternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "label tap group/link inline-flex items-center gap-1.5 border-b-2 border-ink pb-0.5 text-ink transition-colors hover:bg-ink hover:text-paper",
        className,
      )}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover/link:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

/**
 * Certificate validity. Renders the window the certificate states and marks a
 * lapsed one as lapsed — evaluated at build time so it re-checks every deploy.
 */
export function CertValidity({ cert }: { cert: Certification }) {
  if (!cert.issued && !cert.expires) return null;
  const expired = cert.expiresOn ? new Date(cert.expiresOn) < new Date() : false;

  return (
    <p className="label tnum mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-3">
      {cert.issued ? <span>{cert.issued}</span> : null}
      {cert.expires ? (
        <>
          <span aria-hidden>→</span>
          <span>{cert.expires}</span>
          <span className={expired ? "text-burnt" : "text-ink-2"}>
            {expired ? "· lapsed" : "· valid"}
          </span>
        </>
      ) : null}
      {cert.distinction ? <span className="text-burnt">· {cert.distinction}</span> : null}
    </p>
  );
}

export function UnitState({ state }: { state: "active" | "completed" }) {
  const active = state === "active";
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2 border px-2 py-1 whitespace-nowrap",
        active ? "border-burnt bg-burnt text-paper" : "border-ink/25 text-ink-3",
      )}
    >
      {active ? "active" : "completed"}
    </span>
  );
}
