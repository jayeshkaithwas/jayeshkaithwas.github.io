import Link from "next/link";

import { Label } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className="bleed flex min-h-[100svh] flex-col justify-center py-24">
      <Label>Error</Label>
      <p className="label mt-4 text-burnt">kernel: process not found</p>
      <h1 className="display mt-4 text-[clamp(5rem,22vw,20rem)] text-ink">404</h1>
      <p className="mt-6 max-w-[42ch] t-lead text-ink-2">
        Nothing is running at this address. It may have moved when the site was rebuilt.
      </p>
      <nav aria-label="Recovery" className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
        {[
          { href: "/", label: "Home" },
          { href: "/projects/", label: "Work" },
          { href: "/certificates/", label: "Certificates" },
          { href: "/resume/", label: "Resume" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="label border-b-2 border-ink pb-0.5 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {l.label} →
          </Link>
        ))}
      </nav>
    </div>
  );
}
