/**
 * Post-export guards.
 *
 * The live site has existing inbound links. Once GitHub Pages serves the
 * uploaded artifact instead of the branch, anything missing from out/ is a hard
 * 404 — so these paths are asserted here rather than trusted. A refactor that
 * drops one fails the build instead of silently breaking the link.
 */
import { access, copyFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../out");

/** Paths that existed on the old site and must keep resolving. */
const LEGACY = [
  "projects/Jayesh-Resume.pdf",
  "projects/index.html",
  "certificates/certificates.html",
  "certificates/index.html",
  "index.html",
];

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

async function main() {
  if (!(await exists(OUT))) {
    console.error("postbuild: out/ does not exist — did `next build` run?");
    process.exit(1);
  }

  // With trailingSlash:true Next has emitted the not-found page as
  // 404/index.html in some versions. GitHub Pages only serves /404.html.
  if (!(await exists(path.join(OUT, "404.html")))) {
    const nested = path.join(OUT, "404/index.html");
    if (await exists(nested)) {
      await copyFile(nested, path.join(OUT, "404.html"));
      console.log("postbuild: lifted 404/index.html -> 404.html");
    } else {
      console.error("postbuild: no 404.html and no 404/index.html in out/");
      process.exit(1);
    }
  }

  const missing = [];
  for (const rel of LEGACY) {
    if (!(await exists(path.join(OUT, rel)))) missing.push(rel);
  }

  if (missing.length > 0) {
    console.error("postbuild: legacy URLs missing from out/:");
    for (const m of missing) console.error(`  - /${m}`);
    console.error("These have inbound links. Restore them before deploying.");
    process.exit(1);
  }

  // The resume is linked directly from the old site and from the PDF itself.
  const pdf = await stat(path.join(OUT, "projects/Jayesh-Resume.pdf"));
  if (pdf.size < 10_000) {
    console.error(`postbuild: resume PDF is only ${pdf.size} bytes — truncated?`);
    process.exit(1);
  }

  console.log(`postbuild: ok — ${LEGACY.length} legacy paths present, 404.html present`);
}

await main();
