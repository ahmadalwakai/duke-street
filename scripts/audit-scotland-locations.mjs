import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const tempDir = path.join(root, ".scotland-location-audit");
const tscBin = path.join(root, "node_modules", "typescript", "bin", "tsc");
const require = createRequire(import.meta.url);

const VALID_LOCATION_TYPES = new Set([
  "city",
  "town",
  "village",
  "district",
  "neighbourhood",
  "postcodeArea",
  "roadCorridor",
]);

const PARENT_REQUIRED_TYPES = new Set(["district", "neighbourhood", "postcodeArea"]);

const REQUIRED_SCOTLAND_CITY_SLUGS = [
  "aberdeen",
  "dundee",
  "dunfermline",
  "edinburgh",
  "glasgow",
  "inverness",
  "perth",
  "stirling",
];

const REQUESTED_POSTCODE_AREA_SLUGS = [
  "g1", "g2", "g3", "g4", "g5", "g11", "g12", "g13", "g20", "g31", "g32", "g40", "g41", "g42", "g43", "g44", "g51", "g52", "g53",
  "eh1", "eh2", "eh3", "eh4", "eh6", "eh7", "eh8", "eh10", "eh11", "eh12", "eh15",
  "dd1", "dd2", "dd3", "dd4", "dd5",
  "pa1", "pa2", "pa3", "pa4",
  "ml1", "ml2", "ml3", "ml4", "ml5", "ml6",
  "fk1", "fk2", "fk7", "fk8",
  "ky1", "ky2", "ky11", "ky12",
  "ka1", "ka7", "ka8", "ka12",
];

const REQUESTED_ROAD_CORRIDOR_SLUGS = [
  "m8",
  "m74",
  "m77",
  "m80",
  "m90",
  "a9",
  "a90",
  "a720",
  "a82",
  "a8",
  "a725",
  "a737",
  "a71",
  "a77",
  "a92",
];

const SCOTLAND_MOTORWAY_SLUGS = ["m8", "m9", "m73", "m74", "m77", "m80", "m90", "m876", "m898"];

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
      "lib/seo/locations.ts",
      "lib/seo/seo-pages.ts",
      "lib/seo/sitemap.ts",
      "lib/seo/services.ts",
      "lib/seo/scotland-location-seeds.ts",
      "lib/cities.ts",
      "lib/reviews.ts",
    ],
    { cwd: root, stdio: "pipe" },
  );
}

function locationKey(location) {
  return location.parentSlug ? `${location.parentSlug}/${location.slug}` : location.slug;
}

function normalizeName(name) {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

function countBy(items, selector) {
  const counts = new Map();
  for (const item of items) {
    const key = selector(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function duplicatesBy(items, selector) {
  const grouped = new Map();
  for (const item of items) {
    const key = selector(item);
    const values = grouped.get(key) ?? [];
    values.push(item);
    grouped.set(key, values);
  }
  return [...grouped.entries()].filter(([, values]) => values.length > 1);
}

function slugsFor(items) {
  return items.map(locationKey).sort((left, right) => left.localeCompare(right));
}

function printSection(title) {
  console.log(`\n${title}`);
}

function printCount(label, count) {
  console.log(`${label}: ${count}`);
}

function printList(label, values) {
  console.log(`${label}: ${values.length}`);
  for (const value of values) console.log(`- ${value}`);
}

function toSitemapPath(url) {
  return new URL(url).pathname;
}

function getCoverageGaps(locations) {
  const slugs = new Set(locations.map((location) => location.slug));
  const missingCities = REQUIRED_SCOTLAND_CITY_SLUGS.filter((slug) => !slugs.has(slug));
  const missingRequestedPostcodes = REQUESTED_POSTCODE_AREA_SLUGS.filter((slug) => !slugs.has(slug));
  const missingRequestedRoads = REQUESTED_ROAD_CORRIDOR_SLUGS.filter((slug) => !slugs.has(slug));
  const missingMotorways = SCOTLAND_MOTORWAY_SLUGS.filter((slug) => !slugs.has(slug));
  const futureCities = locations
    .filter((location) => REQUIRED_SCOTLAND_CITY_SLUGS.includes(location.slug) && location.coverageStatus === "future")
    .map(locationKey)
    .sort((left, right) => left.localeCompare(right));

  return [
    ...(missingCities.length > 0 ? [`Missing official Scotland city entries: ${missingCities.join(", ")}`] : []),
    ...(futureCities.length > 0 ? [`Official Scotland city entries held as future/noindex: ${futureCities.join(", ")}`] : []),
    ...(missingRequestedPostcodes.length > 0 ? [`Missing requested postcode area entries: ${missingRequestedPostcodes.join(", ")}`] : []),
    ...(missingRequestedRoads.length > 0 ? [`Missing requested road corridor entries: ${missingRequestedRoads.join(", ")}`] : []),
    ...(missingMotorways.length > 0 ? [`Missing Scotland motorway corridor entries: ${missingMotorways.join(", ")}`] : []),
    "The dataset is not an exhaustive gazetteer of every Scotland town or village.",
    "The dataset is not a complete Scotland postcode district index across AB, DD, DG, EH, FK, G, HS, IV, KA, KW, KY, ML, PA, PH, TD and ZE areas.",
    "Highlands, islands, Borders and North East locations remain future/noindex unless service coverage is confirmed.",
  ];
}

try {
  compileSeoModules();
  const locationsModule = require(path.join(tempDir, "lib", "seo", "locations.js"));
  const seoPages = require(path.join(tempDir, "lib", "seo", "seo-pages.js"));
  const sitemap = require(path.join(tempDir, "lib", "seo", "sitemap.js"));

  const locations = locationsModule.SEO_LOCATIONS;
  const pages = seoPages.generateSeoPageCandidates();
  const indexablePages = seoPages.getIndexableSeoPages();
  const sitemapEntries = sitemap.getSeoSitemapEntries();
  const sitemapUrls = new Set(sitemapEntries.map((entry) => entry.url));
  const sitemapPaths = new Set(sitemapEntries.map((entry) => toSitemapPath(entry.url)));
  const sitemapChunks = sitemap.getSeoSitemapChunks();
  const locationTypeCounts = countBy(locations, (location) => location.type);
  const indexableLocationKeys = new Set(indexablePages.map((page) => locationKey(page.location)));

  const duplicateSlugs = duplicatesBy(locations, locationKey);
  const duplicateRawSlugs = duplicatesBy(locations, (location) => location.slug)
    .filter(([, values]) => new Set(values.map(locationKey)).size > 1);
  const duplicateNamesUnderSameParent = duplicatesBy(
    locations,
    (location) => `${location.parentSlug ?? "root"}:${normalizeName(location.name)}`,
  );
  const invalidTypes = locations.filter((location) => !VALID_LOCATION_TYPES.has(location.type));
  const missingParents = locations.filter((location) => PARENT_REQUIRED_TYPES.has(location.type) && !location.parentSlug);
  const missingParentTargets = locations.filter((location) => (
    location.parentSlug && !locations.some((candidate) => !candidate.parentSlug && candidate.slug === location.parentSlug)
  ));
  const unsupportedIndexableLocations = locations.filter((location) => (
    location.indexable && (
      location.coverageStatus === "future" ||
      location.contentDepth === "thin" ||
      Boolean(location.disabledReason) ||
      (location.coverageStatus !== "core" && location.coverageStatus !== "nearby")
    )
  ));
  const indexableFutureLocations = locations.filter((location) => location.coverageStatus === "future" && location.indexable);
  const futureLocationsInSitemap = indexablePages.filter((page) => (
    sitemapUrls.has(page.canonicalUrl) && page.location.coverageStatus === "future"
  ));
  const unsupportedFutureLocationsInSitemap = pages.filter((page) => (
    page.location.coverageStatus === "future" && sitemapPaths.has(page.slugPath)
  ));
  const unsafeRoadNearMePages = pages.filter((page) => (
    page.indexable && page.location.type === "roadCorridor" && page.intent === "near-me"
  ));
  const oversizedChunks = sitemapChunks
    .map((chunk, index) => ({ index: index + 1, size: chunk.length }))
    .filter((chunk) => chunk.size > sitemap.SITEMAP_CHUNK_SIZE);
  const sitemapCapacityExceeded = sitemapEntries.length > sitemap.SITEMAP_CHUNK_SIZE * sitemap.MAX_SERVICE_SITEMAP_CHUNKS;

  const futureLocations = locations.filter((location) => location.coverageStatus === "future");
  const missingPostcodeExamples = locations.filter((location) => location.postcodeExamples.length === 0);
  const missingRoads = locations.filter((location) => location.keyRoads.length === 0);
  const groupedByType = [...VALID_LOCATION_TYPES].map((type) => ({
    type,
    locations: locations.filter((location) => location.type === type),
  }));
  const coverageGaps = getCoverageGaps(locations);

  printSection("Coverage Counts");
  printCount("total locations", locations.length);
  printCount("indexable locations", locations.filter((location) => location.indexable).length);
  printCount("locations with indexable URLs", indexableLocationKeys.size);
  printCount("indexable URLs", indexablePages.length);
  printCount("core locations", locations.filter((location) => location.coverageStatus === "core").length);
  printCount("nearby locations", locations.filter((location) => location.coverageStatus === "nearby").length);
  printCount("extended locations", locations.filter((location) => location.coverageStatus === "extended").length);
  printCount("future locations", futureLocations.length);
  printCount("cities", locationTypeCounts.get("city") ?? 0);
  printCount("towns", locationTypeCounts.get("town") ?? 0);
  printCount("districts", locationTypeCounts.get("district") ?? 0);
  printCount("neighbourhoods", locationTypeCounts.get("neighbourhood") ?? 0);
  printCount("villages", locationTypeCounts.get("village") ?? 0);
  printCount("postcodeArea", locationTypeCounts.get("postcodeArea") ?? 0);
  printCount("roadCorridor", locationTypeCounts.get("roadCorridor") ?? 0);
  printCount("motorways", locations.filter((location) => location.type === "roadCorridor" && /^m\d/i.test(location.slug)).length);
  printCount("A-roads", locations.filter((location) => location.type === "roadCorridor" && /^a\d/i.test(location.slug)).length);
  printCount("locations with postcodeExamples", locations.filter((location) => location.postcodeExamples.length > 0).length);
  printCount("locations missing postcodeExamples", missingPostcodeExamples.length);
  printCount("locations with keyRoads", locations.filter((location) => location.keyRoads.length > 0).length);
  printCount("locations missing keyRoads", missingRoads.length);
  printCount("locations with nearbyLocations", locations.filter((location) => location.nearbyLocations.length > 0).length);
  printCount("locations missing nearbyLocations", locations.filter((location) => location.nearbyLocations.length === 0).length);
  printCount(`sitemap chunks over ${sitemap.SITEMAP_CHUNK_SIZE}`, oversizedChunks.length);

  printSection("Location Slugs By Type");
  for (const group of groupedByType) {
    printList(group.type, slugsFor(group.locations));
  }

  printSection("Future Locations");
  printList("all future locations", futureLocations.map((location) => `${locationKey(location)} (${location.name}; ${location.type}; ${location.disabledReason ?? "No reason"})`).sort((left, right) => left.localeCompare(right)));

  printSection("Indexable Locations");
  printList("all indexable locations", slugsFor(locations.filter((location) => location.indexable)));

  printSection("Data Quality Lists");
  printList("missing postcode examples", slugsFor(missingPostcodeExamples));
  printList("missing roads", slugsFor(missingRoads));
  printList("duplicate slugs", duplicateSlugs.map(([key, values]) => `${key} (${values.length})`).sort((left, right) => left.localeCompare(right)));
  printList("shared raw slugs across scoped parents", duplicateRawSlugs.map(([slug, values]) => `${slug}: ${values.map(locationKey).sort((left, right) => left.localeCompare(right)).join(", ")}`).sort((left, right) => left.localeCompare(right)));
  printList("duplicate names under same parent", duplicateNamesUnderSameParent.map(([key, values]) => `${key} (${values.map(locationKey).join(", ")})`).sort((left, right) => left.localeCompare(right)));
  printList("unsupported locations accidentally indexable", unsupportedIndexableLocations.map((location) => `${locationKey(location)} (${location.coverageStatus}; ${location.contentDepth})`).sort((left, right) => left.localeCompare(right)));

  printSection("Scotland-Wide Coverage Gaps");
  printList("coverage gaps", coverageGaps);

  const errors = [
    ...duplicateSlugs.map(([key]) => `Duplicate location slug: ${key}`),
    ...indexableFutureLocations.map((location) => `Future location is indexable: ${locationKey(location)}`),
    ...futureLocationsInSitemap.map((page) => `Future location in sitemap: ${page.slugPath}`),
    ...unsupportedFutureLocationsInSitemap.map((page) => `Unsupported future location in sitemap: ${page.slugPath}`),
    ...invalidTypes.map((location) => `Invalid location type for ${locationKey(location)}: ${location.type}`),
    ...missingParents.map((location) => `Missing parentSlug for ${location.type}: ${locationKey(location)}`),
    ...missingParentTargets.map((location) => `Missing parent location for ${locationKey(location)}: ${location.parentSlug}`),
    ...unsafeRoadNearMePages.map((page) => `Road corridor near-me page is indexable: ${page.slugPath}`),
    ...oversizedChunks.map((chunk) => `Sitemap chunk ${chunk.index} has ${chunk.size} URLs`),
    ...(sitemapCapacityExceeded ? [`SEO sitemap entries exceed configured chunk capacity: ${sitemapEntries.length}`] : []),
  ];

  printSection("Audit Errors");
  printList("errors", errors);

  if (errors.length > 0) process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}