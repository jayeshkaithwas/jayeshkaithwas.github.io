import type { SkillGroup } from "@/types/content";

/**
 * Grouped as they appear on the resume. `note` is context shown on hover —
 * a tool list without context is a logo wall, which is what we are avoiding.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ai",
    label: "AI, Automation & LLM Engineering",
    glyph: "知",
    items: [
      { name: "Prompt Engineering", note: "Advanced prompt design, not prompt collecting." },
      { name: "LLM Integration", note: "Gemini, OpenAI, Claude, and local LLaMA / Gemma." },
      { name: "AI Agents Development", note: "Multi-agent systems and tool-based workflows." },
      { name: "Claude Code", note: "Orchestrates task routing in the Maalibu agent infrastructure." },
      { name: "Hermes Agent SDK", note: "Handles autonomous execution under Claude's delegation." },
      { name: "Multi-Agent Orchestration", note: "Agent delegation architecture, end to end." },
      { name: "RAG Pipelines", note: "Retrieval and knowledge-base systems." },
      { name: "n8n", note: "The backbone of 100+ production workflows." },
      { name: "Make (Integromat)" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Development",
    glyph: "骨",
    items: [
      { name: "Python" },
      { name: "Node.js" },
      { name: "Flask" },
      { name: "PHP" },
      { name: "Firebase" },
      { name: "REST APIs" },
      { name: "Webhooks", note: "The glue in every cross-platform pipeline here." },
      { name: "SQL", note: "Database design, plus a year of debugging other people's ERP data." },
      { name: "Chrome Extension Development", note: "PDF parsing and multi-page form automation." },
    ],
  },
  {
    id: "integrations",
    label: "Integrations & Tools",
    glyph: "繋",
    items: [
      { name: "WAHA" },
      { name: "Evolution API" },
      { name: "GoGHL.ai" },
      { name: "GoHighLevel", note: "CRM automation across sales and fulfillment." },
      { name: "Google Apps Script" },
      { name: "Google Sheets ERP/CRM", note: "Small businesses run on spreadsheets. Automate where they are." },
      { name: "Browser Automation" },
      { name: "PDF Parsing" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    glyph: "雲",
    items: [
      { name: "Docker" },
      { name: "Linux Administration" },
      { name: "AWS", note: "Deployment basics." },
      { name: "GitHub" },
      { name: "CI/CD", note: "Fundamentals — including the pipeline that ships this site." },
    ],
  },
  {
    id: "security",
    label: "Cybersecurity & Networking",
    glyph: "守",
    items: [
      { name: "Burp Suite", note: "VAPT." },
      { name: "Nmap" },
      { name: "Nessus" },
      { name: "Acunetix" },
      { name: "OWASP Top 10" },
      { name: "Secure Coding" },
      { name: "TCP/IP", note: "Built the socket toolkit to understand it properly." },
      { name: "DNS" },
      { name: "Packet Analysis" },
      { name: "Malware Analysis", note: "Static and dynamic." },
    ],
  },
];
