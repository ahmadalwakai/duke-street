import assert from "node:assert/strict";
import test from "node:test";
import { buildPageMetadata } from "../lib/metadata";
import { localBusinessSchema } from "../lib/schema";
import { SITE, siteUrl } from "../lib/site";
import { buildSeoMetadata, getIndexableSeoPages, getSeoPageBySegments } from "../lib/seo/seo-pages";
import { getSeoSitemapChunks, getSitemapIndexEntries, SITEMAP_CHUNK_SIZE } from "../lib/seo/sitemap";

test("titles bypass the layout template and include the brand exactly once", () => {
  for (const title of ["Mobile Tyre Fitting Glasgow", "Mobile Tyre Fitting Glasgow | Duke Street Tyres"]) {
    const metadata = buildPageMetadata({ title, description: "Mobile tyre fitting", path: "/mobile-tyre-fitting/glasgow" });
    const expected = "Mobile Tyre Fitting Glasgow | Duke Street Tyres";
    assert.deepEqual(metadata.title, { absolute: expected });
    assert.equal(metadata.openGraph?.title, expected);
    assert.equal(metadata.twitter?.title, expected);
    assert.equal(metadata.alternates?.canonical, siteUrl("/mobile-tyre-fitting/glasgow"));
  }
});

test("coverage-city schema always describes the actual Glasgow business premises", () => {
  const business = localBusinessSchema();
  for (const city of ["glasgow", "edinburgh", "dundee"] as const) {
    const schema = localBusinessSchema(city);
    assert.deepEqual(schema.address, business.address);
    assert.deepEqual(schema.geo, { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng });
    assert.deepEqual(schema["@id"], business["@id"]);
    assert.ok(Array.isArray(schema.areaServed) && schema.areaServed.length > 0);
  }
});

test("road-corridor aliases point metadata at the canonical route", () => {
  const alias = getSeoPageBySegments(["roadside-tyre-replacement", "m8"]);
  assert.ok(alias?.indexable);
  assert.notEqual(alias.slugPath, "/roadside-tyre-replacement/m8");
  assert.equal(buildSeoMetadata(alias).alternates?.canonical, alias.canonicalUrl);
});

test("every published service URL has a matching production canonical and sitemap entry", () => {
  const pages = getIndexableSeoPages();
  const chunks = getSeoSitemapChunks();
  const entries = chunks.flat();
  const urls = new Set(entries.map((entry) => entry.url));
  assert.ok(pages.length > 0);
  assert.equal(urls.size, pages.length);
  assert.equal(entries.length, urls.size);
  for (const page of pages) {
    const metadata = buildSeoMetadata(page);
    assert.equal(metadata.alternates?.canonical, siteUrl(page.slugPath));
    assert.ok(urls.has(page.canonicalUrl), page.slugPath);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
  }
  assert.ok(chunks.every((chunk) => chunk.length > 0 && chunk.length <= SITEMAP_CHUNK_SIZE));
  assert.deepEqual(
    getSitemapIndexEntries().slice(1).map((entry) => entry.url),
    chunks.map((_, index) => siteUrl(`/sitemap-services-${index + 1}.xml`)),
  );
});
