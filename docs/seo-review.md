# SEO review — 7 November 2026

The local route model contains **13,043 indexable service URLs**, plus **5 static sitemap URLs**. This is the site's publication scope, not a count of URLs actually indexed by Google. Search Console access is required to establish Google's selected canonicals, indexed counts and traffic.

## Implemented repairs

- The metadata helper resolves the brand once and sets an absolute title, avoiding the layout adding `Duke Street Tyres` again. Open Graph and Twitter use the same title. Canonicals are absolute production `www` URLs.
- All LocalBusiness records use the Glasgow premises coordinates from `SITE.geo`; Edinburgh and Dundee remain `areaServed` entries. They no longer change the coordinates of the same business ID/address.
- `public/favicon.ico` contains 16, 32 and 48 pixel images rendered from the existing logo SVG.
- `seo:check` checks generated production metadata, schema, booking URL and sitemap URLs for localhost leakage. A development-only source literal no longer fails the check.
- The sitemap index lists only non-empty chunks. A future expansion beyond the four configured routes fails clearly instead of silently omitting URLs.

## Canonical and route evidence

`npm run seo:check` validates all 13,043 service metadata records and sitemap entries, 18 representative supported routes, 9 withheld/invalid routes and 12 legacy-to-canonical mappings. There are no duplicate canonical URLs, titles, descriptions, H1s or sitemap entries, and no internal links from generated pages to unavailable routes. The three published service chunks contain 5,000, 5,000 and 3,043 URLs. The empty fourth route remains available but is no longer advertised in the sitemap index.

These tests validate the local publication model. They do not establish that Google accepts a canonical or regards the content as useful and distinct.

## Content and indexation scope

The 13,043 URLs cover only **2,080 distinct service/location combinations**. There are **2,080 default-intent pages** and **10,963 extra intent variants**; 2,004 combinations have multiple indexable intent pages. Existing `bodySignature` checks include the service slug, intent and location identifiers, so a unique signature is not a semantic content-quality check.

A bounded content comparison of three representative groups found:

| Default page | Indexable intent variants including default | Intro similarity to default | First five FAQs |
| --- | ---: | ---: | --- |
| `/mobile-tyre-fitting/glasgow` | 6 | 95.8–100% | Identical across variants |
| `/emergency-tyre-fitting/glasgow/finnieston` | 7 | 95.5–100% | Identical across variants |
| `/van-tyre-fitting/paisley` | 7 | 95.3–100% | Identical across variants |

Similarity is case-insensitive word-set Jaccard similarity of the intro, measured locally. It is a review signal, not a Google ranking metric or a claim that all 13,043 complete pages are duplicates. Inspection of `lib/seo/content.ts` shows that variants share most copy and swap intent wording. The first five FAQ entries ignore the intent parameter.

**Recommended next step:** export Search Console performance and indexation data by these URL groups, preserve useful landing pages, then consolidate variants that do not provide distinct user value into the relevant default-intent route. Use permanent redirects for retired duplicates, align canonical and internal links, and remove redirected URLs from sitemaps. Pages that remain should contain verified service-specific and local information rather than additional keyword permutations. No mass noindex, redirects or route removals were applied in this repair.

This recommendation follows [Google's canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). Google recommends choosing preferred URLs for duplicate or very similar content; a sitemap is a weaker canonical signal than redirects or `rel="canonical"`.

## Business data verification

The configured Google Maps short link resolves to the business at **3, 10 Gateside St, Glasgow G31 1PD**, with place feature ID `0x4888415129746dc7:0xfc1bfcf326bd9572`. Direct HTTP retrieval returned a Maps application shell without the current rating, review count or business pin coordinates. The cached site claim of **5.0 from 154 reviews** is not independent evidence of the Google listing. The base coordinates `55.8579876, -4.2106679` remain the existing configuration; only the erroneous per-city substitution has been corrected. Confirm the pin and ratings through the live Business Profile before recording them as freshly verified.

No aggregate rating or review count is emitted in structured data. Google's [LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business) describes geographic coordinates as the business location; coverage cities should not move the business premises.
