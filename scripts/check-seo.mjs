import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const tempDir = path.join(root, ".seo-check");
const tscBin = path.join(root, "node_modules", "typescript", "bin", "tsc");
const require = createRequire(import.meta.url);
const productionDomain = "https://www.dukestreettyres.com";

const QA_INDEXABLE_ROUTES = [
  "/mobile-tyre-fitting/glasgow",
  "/mobile-tyre-fitting/edinburgh",
  "/mobile-tyre-fitting/dundee",
  "/emergency-tyre-fitting/glasgow",
  "/emergency-tyre-fitting/edinburgh",
  "/emergency-tyre-fitting/dundee",
  "/roadside-tyre-replacement/glasgow",
  "/roadside-tyre-replacement/edinburgh",
  "/roadside-tyre-replacement/dundee",
  "/24-hour-mobile-tyre-fitting/glasgow",
  "/mobile-tyre-fitting/glasgow/finnieston",
  "/mobile-tyre-fitting/glasgow/partick",
  "/mobile-tyre-fitting/edinburgh/leith",
  "/mobile-tyre-fitting/dundee/broughty-ferry",
  "/emergency-tyre-fitting/glasgow/finnieston",
  "/roadside-tyre-replacement/glasgow/m8",
  "/flat-tyre-assistance/paisley",
  "/tyre-call-out/hamilton",
];

const QA_BLOCKED_ROUTES = [
  "/same-day-tyre-fitting/glasgow",
  "/mobile-puncture-repair/glasgow",
  "/locking-wheel-nut-help/glasgow",
  "/mobile-tyre-fitting/aberdeen",
  "/mobile-tyre-fitting/inverness",
  "/mobile-tyre-fitting/dumfries",
  "/roadside-tyre-replacement/m8/near-me",
  "/emergency-tyre-fitting/scotland",
  "/mobile-tyre-fitting/fake-location",
];

function walkFiles(dir, extensions) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath, extensions));
    } else if (extensions.some((extension) => entry.name.endsWith(extension))) {
      files.push(fullPath);
    }
  }
  return files;
}

function countDuplicates(items, keySelector) {
  const counts = new Map();
  for (const item of items) {
    const key = keySelector(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1);
}

function routeSegments(routePath) {
  return routePath.split("/").filter(Boolean);
}

function productionUrl(routePath) {
  return routePath === "/" ? productionDomain : `${productionDomain}${routePath}`;
}

function isProductionWwwUrl(url) {
  return url === productionDomain || url.startsWith(`${productionDomain}/`);
}

function hasSchemaType(page, schemaType) {
  return page.schema.some((item) => item["@type"] === schemaType);
}

function extractXmlLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

function compileSeoModules() {
  fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir, { recursive: true });
  execFileSync(
    process.execPath,
    [
      tscBin,
      "--target",
      "ES2022",
      "--module",
      "CommonJS",
      "--moduleResolution",
      "Node",
      "--rootDir",
      root,
      "--outDir",
      tempDir,
      "--skipLibCheck",
      "--esModuleInterop",
      "--jsx",
      "react-jsx",
      "--noEmit",
      "false",
      "lib/seo/seo-pages.ts",
      "lib/seo/sitemap.ts",
      "lib/seo/services.ts",
      "lib/seo/locations.ts",
      "lib/cities.ts",
      "lib/reviews.ts",
    ],
    { cwd: root, stdio: "pipe" },
  );
}

function scanSource() {
  const checkedDirs = ["app", "lib", "components"].map((dir) => path.join(root, dir));
  const files = checkedDirs.flatMap((dir) => walkFiles(dir, [".ts", ".tsx", ".mjs"]));
  const result = {
    nonWww: [],
    localhost: [],
    aggregateFields: [],
  };
  for (const file of files) {
    const relative = path.relative(root, file).replace(/\\/g, "/");
    const content = fs.readFileSync(file, "utf8");
    if (/https?:\/\/dukestreettyres\.com/i.test(content)) {
      result.nonWww.push(`${relative}: non-www Duke Street Tyres URL found`);
    }
    if (/localhost|127\.0\.0\.1/i.test(content)) {
      result.localhost.push(`${relative}: localhost URL found`);
    }
    if (/aggregateRating|reviewCount/.test(content)) {
      result.aggregateFields.push(`${relative}: aggregateRating or reviewCount found`);
    }
  }
  return result;
}

function printList(label, values) {
  if (values.length === 0) {
    console.log(`${label}: 0`);
    return;
  }
  console.log(`${label}: ${values.length}`);
  for (const value of values.slice(0, 10)) {
    console.log(`- ${String(value)}`);
  }
}

try {
  compileSeoModules();
  const seoPages = require(path.join(tempDir, "lib", "seo", "seo-pages.js"));
  const sitemap = require(path.join(tempDir, "lib", "seo", "sitemap.js"));
  const services = require(path.join(tempDir, "lib", "seo", "services.js"));
  const cities = require(path.join(tempDir, "lib", "cities.js"));
  const reviews = require(path.join(tempDir, "lib", "reviews.js"));
  const site = require(path.join(tempDir, "lib", "site.js"));
  const pages = seoPages.generateSeoPageCandidates();
  const indexablePages = seoPages.getIndexableSeoPages();
  const sitemapEntries = sitemap.getSeoSitemapEntries();
  const staticEntries = sitemap.getStaticSitemapEntries();
  const chunks = sitemap.getSeoSitemapChunks();
  const configuredChunkNumbers = Array.from({ length: sitemap.MAX_SERVICE_SITEMAP_CHUNKS }, (_, index) => index + 1);
  const configuredChunks = configuredChunkNumbers.map((chunkNumber) => (
    sitemap.getSeoSitemapChunk(chunkNumber)
  ));
  const allSitemapEntries = [...staticEntries, ...sitemapEntries];
  const sitemapUrls = new Set(sitemapEntries.map((entry) => entry.url));
  const sitemapIndexLocs = extractXmlLocs(sitemap.buildSitemapIndexXml(sitemap.getSitemapIndexEntries()));
  const expectedIndexLocs = [
    productionUrl("/sitemap-static.xml"),
    ...chunks.map((_, index) => productionUrl(`/sitemap-services-${index + 1}.xml`)),
  ];

  const duplicateCanonicals = countDuplicates(indexablePages, (page) => page.canonicalUrl);
  const duplicateTitles = countDuplicates(indexablePages, (page) => page.title);
  const duplicateDescriptions = countDuplicates(indexablePages, (page) => page.description);
  const duplicateH1s = countDuplicates(indexablePages, (page) => page.h1);
  const duplicateSitemapLocs = countDuplicates(allSitemapEntries, (entry) => entry.url);
  const unsupportedIndexed = indexablePages.filter((page) => !page.service.supported || !page.location.indexable);
  const unsupportedServicesInSitemap = indexablePages.filter((page) => (
    sitemapUrls.has(page.canonicalUrl) && (!page.service.supported || !page.service.indexable)
  ));
  const futureLocationsInSitemap = indexablePages.filter((page) => (
    sitemapUrls.has(page.canonicalUrl) && (page.location.coverageStatus === "future" || !page.location.indexable)
  ));
  const nonWwwSitemap = allSitemapEntries.filter((entry) => !isProductionWwwUrl(entry.url));
  const localhostSitemap = allSitemapEntries.filter((entry) => /localhost|127\.0\.0\.1/i.test(entry.url));
  const disallowedSitemapUrls = allSitemapEntries.filter((entry) => /\/(thanks|api|admin)(\/|$)/.test(new URL(entry.url).pathname));
  const oversizedChunks = configuredChunks
    .map((chunk, index) => ({ index: index + 1, size: chunk.length }))
    .filter((chunk) => chunk.size > sitemap.SITEMAP_CHUNK_SIZE);
  const sitemapIndexMissing = expectedIndexLocs.filter((loc) => !sitemapIndexLocs.includes(loc));
  const sitemapIndexUnexpected = sitemapIndexLocs.filter((loc) => !expectedIndexLocs.includes(loc));
  const sourceScan = scanSource();
  const hardcodedReviews = Array.isArray(reviews.REVIEWS) ? reviews.REVIEWS.length : 0;
  // Source code may legitimately contain development-only URLs. Inspect the
  // production outputs instead of treating the presence of a string as a leak.
  const metadataFailures = indexablePages.flatMap((page) => {
    const metadata = seoPages.buildSeoMetadata(page);
    const reasons = [];
    const title = metadata.title?.absolute;
    if (typeof title !== "string" || title.split(site.SITE.name).length !== 2) {
      reasons.push(`Title must contain the brand exactly once: ${page.slugPath}`);
    }
    if (metadata.alternates?.canonical !== page.canonicalUrl) {
      reasons.push(`Metadata canonical mismatch: ${page.slugPath}`);
    }
    if (/localhost|127\.0\.0\.1/i.test(JSON.stringify([metadata, page.schema]))) {
      reasons.push(`Localhost leaked into production metadata/schema: ${page.slugPath}`);
    }
    return reasons;
  });
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  let productionBookingUrl;
  try {
    productionBookingUrl = site.bookingHref();
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
  const bookingUrlLeaks = /localhost|127\.0\.0\.1/i.test(productionBookingUrl)
    ? ["Production booking URL points to localhost"]
    : [];
  const publishedServiceUrls = new Set(chunks.flat().map((entry) => entry.url));
  const omittedSitemapUrls = sitemapEntries.filter((entry) => !publishedServiceUrls.has(entry.url));
  const indexablePaths = new Set(indexablePages.map((page) => page.slugPath));
  const staticPaths = new Set(staticEntries.map((entry) => new URL(entry.url).pathname));
  const brokenInternalLinks = new Set();
  for (const page of indexablePages) {
    for (const link of page.internalLinks) {
      if (!indexablePaths.has(link.href) && !staticPaths.has(link.href)) brokenInternalLinks.add(link.href);
    }
  }
  const defaultIntentPages = indexablePages.filter((page) => page.intent === services.getDefaultIntent(page.serviceSlug));

  const h1Counts = new Map(indexablePages.map((page) => [page.h1, 0]));
  for (const page of indexablePages) h1Counts.set(page.h1, (h1Counts.get(page.h1) ?? 0) + 1);

  const indexableRouteChecks = QA_INDEXABLE_ROUTES.map((routePath) => {
    const segments = routeSegments(routePath);
    const candidate = seoPages.getSeoPageBySegments(segments);
    const page = seoPages.getIndexableSeoPageBySegments(segments);
    const reasons = [];
    if (!page) {
      reasons.push(candidate?.noindexReason ? `candidate is noindex: ${candidate.noindexReason}` : "route did not resolve to an indexable page");
    } else {
      if (!isProductionWwwUrl(page.canonicalUrl)) reasons.push(`canonical is not www: ${page.canonicalUrl}`);
      if (!page.title) reasons.push("missing title");
      if (!page.description) reasons.push("missing description");
      if (!page.h1) reasons.push("missing H1");
      if ((h1Counts.get(page.h1) ?? 0) > 1) reasons.push(`duplicate H1: ${page.h1}`);
      if (page.schema.length === 0) reasons.push("missing JSON-LD");
      if (!hasSchemaType(page, "BreadcrumbList")) reasons.push("missing BreadcrumbList schema");
      if (!hasSchemaType(page, "Service")) reasons.push("missing Service schema");
      if (page.faqs.length > 0 && !hasSchemaType(page, "FAQPage")) reasons.push("missing FAQPage schema");
      if (page.internalLinks.length === 0) reasons.push("missing crawlable internal links");
      if (/localhost|127\.0\.0\.1/i.test(page.canonicalUrl)) reasons.push("canonical contains localhost");
      if (/aggregateRating|reviewCount/.test(JSON.stringify(page.schema))) {
        reasons.push("schema contains aggregateRating or reviewCount");
      }
    }
    return { routePath, pass: reasons.length === 0, reasons };
  });

  const blockedRouteChecks = QA_BLOCKED_ROUTES.map((routePath) => {
    const page = seoPages.getSeoPageBySegments(routeSegments(routePath));
    const indexablePage = seoPages.getIndexableSeoPageBySegments(routeSegments(routePath));
    const sitemapUrl = productionUrl(routePath);
    const reasons = [];
    if (indexablePage) reasons.push("blocked route resolved to an indexable page");
    if (sitemapUrls.has(sitemapUrl)) reasons.push("blocked route appears in service sitemap");
    if (page?.canonicalUrl && sitemapUrls.has(page.canonicalUrl) && page.slugPath === routePath) {
      reasons.push("blocked route canonical appears in service sitemap");
    }
    return {
      routePath,
      mode: page ? "noindex candidate" : "notFound",
      pass: reasons.length === 0,
      reasons,
    };
  });

  const legacyMappings = cities.CITY_SERVICE_VARIANTS.flatMap((variant) => (
    cities.CITY_SLUGS.map((citySlug) => {
      const legacyPath = `/${variant}-${citySlug}`;
      const canonicalPath = services.getLegacyCanonicalPath(variant, citySlug);
      const legacyFile = path.join(root, "app", `${variant}-${citySlug}`, "page.tsx");
      const targetPage = seoPages.getIndexableSeoPageBySegments(routeSegments(canonicalPath));
      return {
        legacyPath,
        canonicalPath,
        legacyFileExists: fs.existsSync(legacyFile),
        targetExists: Boolean(targetPage),
      };
    })
  ));
  const legacyMappingFailures = legacyMappings.filter((mapping) => !mapping.legacyFileExists || !mapping.targetExists);

  const errors = [
    ...sourceScan.nonWww,
    ...sourceScan.aggregateFields,
    ...metadataFailures,
    ...bookingUrlLeaks,
    ...omittedSitemapUrls.map((entry) => `Indexable URL omitted from sitemap chunks: ${entry.url}`),
    ...[...brokenInternalLinks].map((href) => `Internal link targets an unavailable route: ${href}`),
    ...duplicateCanonicals.map(([url]) => `Duplicate canonical URL: ${url}`),
    ...duplicateTitles.map(([title]) => `Duplicate title: ${title}`),
    ...duplicateDescriptions.map(([description]) => `Duplicate description: ${description}`),
    ...duplicateSitemapLocs.map(([url]) => `Duplicate sitemap loc value: ${url}`),
    ...unsupportedIndexed.map((page) => `Unsupported page is indexable: ${page.slugPath}`),
    ...unsupportedServicesInSitemap.map((page) => `Unsupported service in sitemap: ${page.slugPath}`),
    ...futureLocationsInSitemap.map((page) => `Future location in sitemap: ${page.slugPath}`),
    ...nonWwwSitemap.map((entry) => `Sitemap URL is not production www: ${entry.url}`),
    ...localhostSitemap.map((entry) => `Sitemap URL contains localhost: ${entry.url}`),
    ...disallowedSitemapUrls.map((entry) => `Disallowed URL found in sitemap: ${entry.url}`),
    ...oversizedChunks.map((chunk) => `Sitemap chunk ${chunk.index} has ${chunk.size} URLs`),
    ...sitemapIndexMissing.map((loc) => `Sitemap index missing loc: ${loc}`),
    ...sitemapIndexUnexpected.map((loc) => `Sitemap index unexpected loc: ${loc}`),
    ...indexableRouteChecks.filter((check) => !check.pass).map((check) => `Sample indexable route failed: ${check.routePath} (${check.reasons.join("; ")})`),
    ...blockedRouteChecks.filter((check) => !check.pass).map((check) => `Sample blocked route failed: ${check.routePath} (${check.reasons.join("; ")})`),
    ...legacyMappingFailures.map((mapping) => `Legacy mapping failed: ${mapping.legacyPath} -> ${mapping.canonicalPath}`),
    ...(hardcodedReviews > 0 ? [`Hardcoded review entries found: ${hardcodedReviews}`] : []),
  ];

  console.log(`Total candidates: ${pages.length}`);
  console.log(`Indexable pages: ${indexablePages.length}`);
  console.log(`Default-intent pages: ${defaultIntentPages.length}`);
  console.log(`Additional intent variants: ${indexablePages.length - defaultIntentPages.length}`);
  console.log("Content review: unique URL/title checks do not prove substantive uniqueness; see docs/seo-review.md.");
  console.log("Indexable pages by service:");
  services.SEO_SERVICES.forEach((service) => {
    const count = indexablePages.filter((page) => page.serviceSlug === service.slug).length;
    if (count > 0) console.log(`- ${service.slug}: ${count}`);
  });
  console.log("Indexable pages by intent:");
  services.SEO_INTENTS.forEach((intent) => {
    const count = indexablePages.filter((page) => page.intent === intent).length;
    if (count > 0) console.log(`- ${intent}: ${count}`);
  });
  console.log(`Noindex/notFound candidates: ${pages.length - indexablePages.length}`);
  console.log(`Sitemap chunks: ${configuredChunks.length} configured, ${chunks.length} non-empty`);
  configuredChunks.forEach((chunk, index) => console.log(`- sitemap-services-${index + 1}.xml: ${chunk.length}`));
  console.log(`Static sitemap URLs: ${staticEntries.length}`);
  console.log(`Duplicate canonical URLs: ${duplicateCanonicals.length}`);
  console.log(`Duplicate titles: ${duplicateTitles.length}`);
  console.log(`Duplicate descriptions: ${duplicateDescriptions.length}`);
  console.log(`Duplicate H1s: ${duplicateH1s.length}`);
  console.log(`Duplicate sitemap loc values: ${duplicateSitemapLocs.length}`);
  console.log(`Non-www leaks: ${sourceScan.nonWww.length + nonWwwSitemap.length}`);
  console.log(`Development URL declarations (informational): ${sourceScan.localhost.length}`);
  console.log(`Production localhost URL failures: ${bookingUrlLeaks.length + localhostSitemap.length}`);
  console.log(`Metadata contract failures: ${metadataFailures.length}`);
  console.log(`Indexable URLs omitted from sitemap chunks: ${omittedSitemapUrls.length}`);
  console.log(`Unavailable internal link targets: ${brokenInternalLinks.size}`);
  console.log(`aggregateRating/reviewCount leaks: ${sourceScan.aggregateFields.length}`);
  console.log(`Unsupported services in sitemap: ${unsupportedServicesInSitemap.length}`);
  console.log(`Future locations in sitemap: ${futureLocationsInSitemap.length}`);
  console.log(`Sitemap chunks over ${sitemap.SITEMAP_CHUNK_SIZE}: ${oversizedChunks.length}`);
  console.log(`Legacy URL canonical mapping count: ${legacyMappings.length}`);
  console.log(`Static generation cap per dynamic route depth: ${seoPages.SEO_STATIC_PARAMS_LIMIT}`);
  console.log(`Prebuilt params by route depth:`);
  [2, 3, 4].forEach((segmentCount) => {
    console.log(`- ${segmentCount} segments: ${seoPages.getStaticSeoPagesBySegmentCount(segmentCount).length}`);
  });
  console.log(`Hardcoded review entries: ${hardcodedReviews}`);
  console.log(`Sample indexable routes: ${indexableRouteChecks.filter((check) => check.pass).length}/${indexableRouteChecks.length} passed`);
  indexableRouteChecks.forEach((check) => console.log(`- ${check.pass ? "PASS" : "FAIL"} ${check.routePath}`));
  console.log(`Sample blocked routes: ${blockedRouteChecks.filter((check) => check.pass).length}/${blockedRouteChecks.length} passed`);
  blockedRouteChecks.forEach((check) => console.log(`- ${check.pass ? "PASS" : "FAIL"} ${check.routePath} (${check.mode})`));
  printList("Errors", errors);

  if (errors.length > 0) process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
