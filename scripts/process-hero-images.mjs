// One-off image processor. Run with: node scripts/process-hero-images.mjs
// Reads from public/hero-tmp/, outputs optimised webp to public/photos/.
import sharp from "sharp";
import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const SRC = "public/hero-tmp";
const OUT = "public/photos";

const targets = [
  // file index suffix -> output name + rotate degrees + portrait crop?
  { match: "(6)", out: "van.webp", rotate: -90, width: 1600 },
  { match: "(4)", out: "wheel-bmw.webp", rotate: 0, width: 1400 },
  { match: "(5)", out: "puncture.webp", rotate: 0, width: 1400 },
  { match: "(7)", out: "wheel-night.webp", rotate: 0, width: 1400 },
];

await mkdir(OUT, { recursive: true });

const files = await readdir(SRC);
for (const t of targets) {
  const src = files.find((f) => f.includes(t.match));
  if (!src) {
    console.warn("Skipping", t.out, "— no source matching", t.match);
    continue;
  }
  const inPath = path.join(SRC, src);
  const outPath = path.join(OUT, t.out);
  const pipeline = sharp(inPath).rotate(t.rotate);
  await pipeline
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(outPath);
  console.log("OK", outPath);
}

// Clean up the temp folder so it doesn't end up in the deploy.
await rm(SRC, { recursive: true, force: true });
console.log("Removed", SRC);
