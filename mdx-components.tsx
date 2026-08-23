import type { MDXComponents } from "mdx/types";

import { Flow } from "@/components/case-study/Flow";
import { Notes } from "@/components/case-study/Notes";
import { Shots } from "@/components/case-study/Shots";
import { Split } from "@/components/case-study/Split";
import { StepGrid } from "@/components/case-study/StepGrid";

/**
 * Case-study prose styling, plus the diagram set.
 *
 * The diagram components are registered globally rather than imported per file
 * so the MDX stays close to plain content. All four are server components — a
 * case study adds no JavaScript to the page.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2 className="display mt-14 border-t-2 border-ink pt-5 text-2xl text-ink sm:text-4xl" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="label mt-10 text-burnt" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-ink-2" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mt-5 max-w-[68ch] space-y-2.5" {...props}>
        {children}
      </ul>
    ),
    li: ({ children, ...props }) => (
      <li className="flex gap-3 text-base leading-relaxed text-ink-2" {...props}>
        <span aria-hidden className="mt-2 h-1.5 w-3 shrink-0 bg-burnt" />
        <span>{children}</span>
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-medium text-ink" {...props}>
        {children}
      </strong>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mt-8 max-w-[60ch] border-l-4 border-burnt bg-paper-sunk py-4 pl-5 font-sans text-lg leading-snug text-ink"
        {...props}
      >
        {children}
      </blockquote>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
        className="tap border-b-2 border-burnt text-burnt transition-colors hover:bg-burnt hover:text-paper"
        {...props}
      >
        {children}
      </a>
    ),
    Flow,
    Notes,
    Shots,
    Split,
    StepGrid,
    hr: (props) => <hr className="mt-14 border-t-2 border-ink" {...props} />,
    ...components,
  };
}
