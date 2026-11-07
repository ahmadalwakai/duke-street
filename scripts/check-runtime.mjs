import assert from "node:assert/strict";

// Run against an already-built local server; never exercise a live admin endpoint.
const base = new URL(process.env.SMOKE_BASE_URL || "http://127.0.0.1:3094");
assert.ok(["127.0.0.1", "localhost", "[::1]"].includes(base.hostname), "Use a local test server");
const fetchPath = (path, options) => fetch(new URL(path, base), options);

for (const path of ["/", "/mobile-tyre-fitting/glasgow", "/mobile-tyre-fitting/edinburgh", "/privacy", "/thanks"]) {
  const response = await fetchPath(path);
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.ok(response.headers.get("strict-transport-security")?.includes("max-age="));
  assert.ok(response.headers.get("content-security-policy")?.includes("frame-ancestors 'self'"));
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.equal((title?.match(/Duke Street Tyres/g) || []).length, 1, `${path}: one brand in title`);
  assert.ok(html.includes('rel="canonical" href="https://www.dukestreettyres.com'), `${path}: canonical`);
  assert.equal(/<script[^>]+src="https:\/\/www.googletagmanager.com/.test(html), false, "No Google script in pre-consent HTML");
  if (path === "/thanks") assert.ok(html.includes('content="noindex, nofollow"'));
  console.log(`PASS rendered page + headers: ${path}`);
}

const booking = await fetchPath("/book", { redirect: "manual" });
assert.equal(booking.status, 307);
assert.equal(booking.headers.get("location"), "https://www.tyrerescue.uk/book?sourceApp=duke_street_tyres");

const icon = await fetchPath("/favicon.ico");
assert.equal(icon.status, 200);
assert.deepEqual([...new Uint8Array(await icon.arrayBuffer()).slice(0, 4)], [0, 0, 1, 0]);

const sitemap = await fetchPath("/sitemap.xml");
const sitemapXml = await sitemap.text();
assert.equal((sitemapXml.match(/<sitemap>/g) || []).length, 4);
assert.equal(sitemapXml.includes("sitemap-services-4.xml"), false);

const login = await fetchPath("/api/mobile/admin/auth/login", {
  method: "POST", headers: { "content-type": "application/json" }, body: "null",
});
assert.equal(login.status, 400);
assert.equal(login.headers.get("cache-control"), "no-store");
assert.equal(login.headers.get("x-content-type-options"), "nosniff");
assert.ok((await login.json()).error);
console.log("PASS booking redirect, ICO signature, sitemap index, malformed login response");
