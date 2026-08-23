import Link from "next/link";

import { ThemeToggle } from "@/components/hud/ThemeToggle";
import { PROFILE } from "@/content/site";

/**
 * Persistent, never-animating HUD, edge to edge.
 *
 * The mitigation for the main risk of a concept site: a recruiter with forty
 * seconds is always one click from the resume, at every scroll position, on
 * every route. Nothing here moves, hides on scroll, or waits for JS.
 */
export function Hud() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="bleed flex h-12 items-center justify-between gap-3 sm:gap-4">
        <Link
          href="/"
          className="label -my-2 flex h-11 shrink-0 items-center text-ink transition-colors hover:text-burnt"
          aria-label="Jayesh Kaithwas — home"
        >
          {/* Initials on a phone so the three nav links still fit. */}
          <span className="sm:hidden">JK</span>
          <span className="hidden sm:inline">Jayesh Kaithwas</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-3 sm:gap-6">
          <HudLink href="/projects/">Work</HudLink>
          <HudLink href="/certificates/">Certs</HudLink>
          <HudLink href="/resume/">Resume</HudLink>
          <ThemeToggle />
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="label -mr-1 inline-flex h-10 shrink-0 items-center gap-1.5 bg-ink px-2.5 text-paper transition-colors hover:bg-burnt sm:px-3"
          >
            PDF <span aria-hidden>↓</span>
            <span className="sr-only">Download resume as PDF</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function HudLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      /* Visible at every width: hiding these below sm left a phone with no way
         to reach Work, Certs or Resume at all. */
      className="label -my-2 flex h-11 items-center text-ink-2 transition-colors hover:text-ink"
    >
      {children}
    </Link>
  );
}
