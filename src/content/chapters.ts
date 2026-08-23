import type { Chapter } from "@/types/content";

/**
 * Single source of truth for chapter order, anchors and glyphs.
 *
 * The home page, the HUD chapter rail and the daemon's dialogue all map over
 * this array — adding or reordering a chapter is a one-line change here.
 */
export const CHAPTERS: Chapter[] = [
  {
    id: "0x01",
    slug: "ignition",
    glyph: "起動",
    glyphRoman: "kidou",
    title: "Ignition",
    kicker: "Start",
    daemonLine: "System up. He is the one who wrote me.",
  },
  {
    id: "0x02",
    slug: "identity",
    glyph: "名",
    glyphRoman: "na",
    title: "Identity",
    kicker: "Who",
    daemonLine: "Agents, systems, security. Everything else is a consequence of those three.",
  },
  {
    id: "0x03",
    slug: "deployments",
    glyph: "実績",
    glyphRoman: "jisseki",
    title: "Deployments",
    kicker: "Where",
    daemonLine: "Three units. One still running.",
  },
  {
    id: "0x04",
    slug: "workshop",
    glyph: "工房",
    glyphRoman: "koubou",
    title: "Workshop",
    kicker: "Client systems",
    daemonLine: "Client work. The code is sealed — the outcomes are not.",
  },
  {
    id: "0x05",
    slug: "artifacts",
    glyph: "資材",
    glyphRoman: "shizai",
    title: "Artifacts",
    kicker: "Open source",
    daemonLine: "These ones you can read the source of.",
  },
  {
    id: "0x06",
    slug: "arsenal",
    glyph: "兵装",
    glyphRoman: "heisou",
    title: "Arsenal",
    kicker: "Tooling",
    daemonLine: "Tools are not a personality. He would still like you to know.",
  },
  {
    id: "0x07",
    slug: "credentials",
    glyph: "証",
    glyphRoman: "akashi",
    title: "Credentials",
    kicker: "Proof",
    daemonLine: "Twenty-six of them. He keeps the paper.",
  },
  {
    id: "0x08",
    slug: "lab",
    glyph: "実験",
    glyphRoman: "jikken",
    title: "The Lab",
    kicker: "HackLab",
    daemonLine: "This is where he breaks things on purpose.",
  },
  {
    id: "0x09",
    slug: "signals",
    glyph: "声",
    glyphRoman: "koe",
    title: "Signals",
    kicker: "Words",
    daemonLine: "Other people's words. He is bad at asking for them.",
  },
  {
    id: "0x0A",
    slug: "contact",
    glyph: "交信",
    glyphRoman: "koushin",
    title: "Contact",
    kicker: "Reach",
    daemonLine: "End of process. You know where to find him.",
  },
];

export const chapterBySlug = (slug: string) => CHAPTERS.find((c) => c.slug === slug);
