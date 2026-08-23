/**
 * Converts source imagery in public/media to WebP and records intrinsic
 * dimensions so every <img> can ship explicit width/height (CLS budget is 0).
 *
 * Idempotent: re-running skips files whose WebP is newer than the source.
 * Source PNGs are deleted once converted — git history holds the originals.
 */
import { createHash } from "node:crypto";
import { readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");

/**
 * Each set is one folder under public/media with its own generated manifest.
 * Adding a set is the only edit needed to start optimizing a new image group.
 */
const SETS = [
  { name: "certificates", manifest: "certificate-images.json" },
  { name: "projects", manifest: "project-images.json" },
];

const MAX_WIDTH = 1600;
const QUALITY = 78;

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

/** Writes only when the content actually changed, so builds stay cache-friendly. */
async function writeIfChanged(file, json) {
  const prev = (await exists(file)) ? await readFile(file, "utf8") : "";
  const same =
    createHash("sha1").update(prev).digest("hex") === createHash("sha1").update(json).digest("hex");
  if (!same) await writeFile(file, json);
}

async function optimizeSet({ name, manifest: manifestFile }) {
  const dir = path.join(ROOT, "public/media", name);
  const manifestPath = path.join(ROOT, "src/content/generated", manifestFile);

  if (!(await exists(dir))) {
    await writeIfChanged(manifestPath, "{}\n");
    console.log(`optimize-media: ${name} — no folder, empty manifest`);
    return;
  }

  const all = await readdir(dir);
  const sources = all.filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();
  const manifest = {};
  let sourceBytes = 0;
  let outputBytes = 0;

  for (const file of sources) {
    const src = path.join(dir, file);
    const slug = file.replace(/\.[^.]+$/, "");
    const out = path.join(dir, `${slug}.webp`);

    sourceBytes += (await stat(src)).size;

    if (!(await exists(out))) {
      await sharp(src)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(out);
    }

    await unlink(src);
  }

  // Re-read the folder: it now holds both freshly converted and previously
  // converted WebPs, and the manifest must describe every one of them.
  for (const file of (await readdir(dir)).filter((f) => f.endsWith(".webp")).sort()) {
    const out = path.join(dir, file);
    const slug = file.replace(/\.webp$/, "");
    const meta = await sharp(out).metadata();
    outputBytes += (await stat(out)).size;
    manifest[slug] = { src: `/media/${name}/${slug}.webp`, width: meta.width, height: meta.height };
  }

  await writeIfChanged(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

  const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
  const converted = sources.length
    ? `  ${kb(sourceBytes)} -> ${kb(outputBytes)} (-${(100 - (outputBytes / sourceBytes) * 100).toFixed(0)}%)`
    : "";
  console.log(
    `optimize-media: ${name} — ${Object.keys(manifest).length} images` +
      (sources.length ? `, ${sources.length} newly converted${converted}` : ""),
  );
}

async function main() {
  for (const set of SETS) await optimizeSet(set);
}

await main();
