import { clsx, type ClassValue } from "clsx";

/**
 * Plain clsx — no tailwind-merge.
 *
 * twMerge exists to resolve conflicting Tailwind classes at runtime, which is
 * worth ~5KB gz when component APIs let callers override styles. Nothing here
 * does: every className is authored in this repo, and the one genuine conflict
 * (a card's link row using both mt-5 and mt-auto) was a bug, now fixed. If a
 * component ever takes untrusted class overrides, bring twMerge back.
 */
export const cn = (...inputs: ClassValue[]) => clsx(inputs);

/** "2025-09" -> "Sep 2025". Dates are authored as YYYY-MM, rendered for humans. */
export function formatMonth(value: string): string {
  if (value === "present") return "Present";
  const [year, month] = value.split("-");
  const name = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ][Number(month) - 1];
  return name ? `${name} ${year}` : value;
}

export const formatRange = (start: string, end: string) =>
  `${formatMonth(start)} — ${formatMonth(end)}`;
