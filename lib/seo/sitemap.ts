import { siteUrl } from "../site";
import { getIndexableSeoPages } from "./seo-pages";
import type { SeoSitemapEntry } from "./types";

export const SITEMAP_CHUNK_SIZE = 5000;
export const MAX_SERVICE_SITEMAP_CHUNKS = 4;

const STATIC_SITEMAP_PATHS: readonly Omit<SeoSitemapEntry, "url" | "lastModified">[] = [
  { changeFrequency: "weekly", priority: 1.0 },
  { changeFrequency: "weekly", priority: 0.92 },
  { changeFrequency: "weekly", priority: 0.9 },
  { changeFrequency: "yearly", priority: 0.25 },
  { changeFrequency: "yearly", priority: 0.25 },
];

const STATIC_PATHS: readonly string[] = [
  "/",
  "/mobile-tyre-fitting-scotland",
  "/roadside-tyre-replacement-near-me",
  "/privacy",
  "/terms",
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getStaticSitemapEntries(now = new Date()): readonly SeoSitemapEntry[] {
  return STATIC_PATHS.map((path, index) => ({
    url: siteUrl(path),
    lastModified: now,
    changeFrequency: STATIC_SITEMAP_PATHS[index].changeFrequency,
    priority: STATIC_SITEMAP_PATHS[index].priority,
  }));
}

export function getSeoSitemapEntries(now = new Date()): readonly SeoSitemapEntry[] {
  const seen = new Set<string>();
  const entries: SeoSitemapEntry[] = [];
  for (const page of getIndexableSeoPages()) {
    if (seen.has(page.canonicalUrl)) continue;
    seen.add(page.canonicalUrl);
    entries.push({
      url: page.canonicalUrl,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.sitemapPriority,
    });
  }
  return entries;
}

export function getSeoSitemapChunks(now = new Date()): readonly (readonly SeoSitemapEntry[])[] {
  const entries = getSeoSitemapEntries(now);
  const chunks: SeoSitemapEntry[][] = [];
  for (let index = 0; index < entries.length; index += SITEMAP_CHUNK_SIZE) {
    chunks.push(entries.slice(index, index + SITEMAP_CHUNK_SIZE));
  }
  return chunks.slice(0, MAX_SERVICE_SITEMAP_CHUNKS);
}

export function getSeoSitemapChunk(chunkNumber: number, now = new Date()): readonly SeoSitemapEntry[] {
  if (chunkNumber < 1 || chunkNumber > MAX_SERVICE_SITEMAP_CHUNKS) return [];
  return getSeoSitemapChunks(now)[chunkNumber - 1] ?? [];
}

export function getSitemapIndexEntries(now = new Date()): readonly SeoSitemapEntry[] {
  return [
    {
      url: siteUrl("/sitemap-static.xml"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...Array.from({ length: MAX_SERVICE_SITEMAP_CHUNKS }, (_, index) => ({
      url: siteUrl(`/sitemap-services-${index + 1}.xml`),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
  ];
}

export function buildSitemapIndexXml(entries: readonly SeoSitemapEntry[]): string {
  const body = entries.map((entry) => `  <sitemap>\n    <loc>${escapeXml(entry.url)}</loc>\n    <lastmod>${formatDate(entry.lastModified)}</lastmod>\n  </sitemap>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export function buildSitemapUrlSetXml(entries: readonly SeoSitemapEntry[]): string {
  const body = entries.map((entry) => `  <url>\n    <loc>${escapeXml(entry.url)}</loc>\n    <lastmod>${formatDate(entry.lastModified)}</lastmod>\n    <changefreq>${entry.changeFrequency}</changefreq>\n    <priority>${entry.priority.toFixed(2)}</priority>\n  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function sitemapXmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}