/**
 * Content shapes for the site.
 *
 * Everything rendered comes from typed data in src/content — adding a project
 * or a certificate is a data edit, never a component edit. The previous site
 * required hand-patching 86KB of generated HTML to change a sentence.
 */

/** Hex chapter ids. Ordering lives in src/content/chapters.ts. */
export type ChapterId =
  | "0x01"
  | "0x02"
  | "0x03"
  | "0x04"
  | "0x05"
  | "0x06"
  | "0x07"
  | "0x08"
  | "0x09"
  | "0x0A";

export interface Chapter {
  id: ChapterId;
  /** Anchor target, e.g. "ignition" -> <section id="ignition"> */
  slug: string;
  /** Kanji mark. Rendered from an SVG sprite, never a Japanese webfont. */
  glyph: string;
  /** Romaji, for the aria-label and the sprite key. */
  glyphRoman: string;
  title: string;
  /** Sub-label in the chapter rail. */
  kicker?: string;
  /** What daemon.miku says on entering this chapter. */
  daemonLine?: string;
}

export interface Metric {
  /** Pre-formatted: "80%+", "100+", "50-60". Never a raw number. */
  value: string;
  label: string;
  /** Longer form for the tooltip / screen readers. */
  detail?: string;
}

export interface MediaRef {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  /** Key into the icon sprite. */
  icon: "github" | "linkedin" | "telegram" | "mail" | "codepen" | "external";
}

export interface Profile {
  name: string;
  title: string;
  /** One line, used in the hero. */
  thesis: string;
  location: string;
  locationShort: string;
  email: string;
  /** Deliberately not linked from the site; resume-only. */
  phone: string;
  availability: string;
  summary: string;
  /** The three facts the whole site is built on. */
  pillars: { glyph: string; label: string; body: string }[];
  socials: SocialLink[];
  /** Canonical resume path. */
  resume: string;
  /** Legacy resume path — kept alive for inbound links. Do not rename. */
  resumeLegacy: string;
  /** Headline metrics for the hero strip. */
  headlineMetrics: Metric[];
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  orgUrl?: string;
  /** ISO-ish "YYYY-MM". */
  start: string;
  end: string | "present";
  /** Rendered as a systemd-style unit state. */
  state: "active" | "completed";
  summary: string;
  highlights: string[];
  metrics?: Metric[];
  stack: string[];
}

export interface ProjectShot {
  /** Key into src/content/generated/project-images.json (the filename stem). */
  image: string;
  /** Describes what the screenshot shows. Never decorative — always written. */
  alt: string;
  /** Shown under the shot in the lightbox and the case-study figure. */
  caption?: string;
  /**
   * Set when the shot shows sample/placeholder figures rather than live client
   * numbers. Rendered as a visible badge — a dashboard screenshot implies real
   * results unless it says otherwise.
   */
  sampleData?: boolean;
}

export type ProjectKind = "case-study" | "card";
export type ProjectStatus = "live" | "internal" | "open-source" | "archived";

export interface Project {
  slug: string;
  title: string;
  /** One line, under ~90 chars. */
  tagline: string;
  /** Which chapter this belongs to. */
  track: "client" | "open-source" | "codepen";
  kind: ProjectKind;
  status: ProjectStatus;
  year: string;
  role?: string;
  summary: string;
  stack: string[];
  metrics?: Metric[];
  links?: { live?: string; repo?: string; demo?: string };
  /** Screenshots. Empty/absent renders nothing — no placeholder frames. */
  shots?: ProjectShot[];
  featured?: boolean;
  /** Client work under NDA: no screenshots, no links, say so plainly. */
  confidential?: boolean;
}

export interface SkillGroup {
  id: string;
  label: string;
  glyph?: string;
  /** `note` surfaces on hover — context, not decoration. */
  items: { name: string; note?: string }[];
}

export type CertCategory = "eccouncil" | "secops" | "star" | "udemy" | "forage" | "other";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  category: CertCategory;
  /** Human-readable issue date, transcribed from the certificate itself. */
  issued?: string;
  /**
   * Expiry, where the certificate states one. Rendered plainly — a lapsed
   * credential still evidences a passed exam, and hiding the date would be
   * the only dishonest option.
   */
  expires?: string;
  /** ISO date backing `expires`, so "expired" is computed rather than asserted. */
  expiresOn?: string;
  /** e.g. "with Merit" — a distinction the certificate records. */
  distinction?: string;
  credentialId?: string;
  credentialUrl?: string;
  /** Key into src/content/generated/certificate-images.json */
  image?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  org?: string;
  quote: string;
  avatar?: MediaRef;
  source?: "linkedin" | "client" | "colleague";
}
