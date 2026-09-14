# Duke Street Tyres

Production-ready Next.js 15 (App Router, TypeScript strict) marketing site for **Duke Street Tyres** — 24/7 mobile tyre fitting in Glasgow, Edinburgh and Dundee.

No database, no forms, no backend. Two CTAs everywhere: **Call** and **WhatsApp**.

## Stack

- Next.js 15 (App Router, statically rendered)
- TypeScript (strict, no `any`)
- Chakra UI v3 (`createSystem` with semantic tokens + `solidRed` / `solidGreen` / `ghostLight` Button recipe variants)
- framer-motion (fade-up on scroll, marquee, rotating tyre, sticky bar slide-in — all respect `prefers-reduced-motion`)
- next/font (Inter body + Bebas Neue headlines)

## Brand

- Phone: `0141 266 0690` (`tel:+441412660690`)
- WhatsApp: `07423 262 955` (`https://wa.me/447423262955`)
- Address: 3, 10 Gateside St, Glasgow G31 1PD
- Hours: 24/7, response 30–40 mins
- Domain: https://www.dukestreettyres.com

All in [lib/site.ts](lib/site.ts) as a typed `SITE` const with `telHref()` and `waHref(msg?)` helpers.

## Routes (16 statically prerendered)

```
/                                                  Glasgow-primary home
/mobile-tyre-fitting-scotland
/mobile-tyre-fitting-{glasgow|edinburgh|dundee}
/emergency-tyre-call-out-{glasgow|edinburgh|dundee}
/24-hour-mobile-tyre-fitting-{glasgow|edinburgh|dundee}
/roadside-tyre-replacement-{glasgow|edinburgh|dundee}
/roadside-tyre-replacement-near-me
/sitemap.xml
/robots.txt
```

City data, service variants, Scotland coverage data and unique local intros live in [lib/cities.ts](lib/cities.ts). Wider Scotland areas are coverage data, not separate local offices or indexable town doorway pages.

## SEO

- Metadata template `%s | Duke Street Tyres`, default title under 60 chars, descriptions under 155 chars
- `metadataBase`, OpenGraph, Twitter, theme-color `#0B0F14`, `lang="en-GB"`
- Per-page `alternates.canonical`
- JSON-LD via [lib/schema.ts](lib/schema.ts):
  - `localBusinessSchema(city?)` — `AutoRepair`, NAP, geo, 24/7 `openingHoursSpecification`, `areaServed`, `priceRange: "££"` — injected on **every** page
  - `serviceSchema(name, city)` — injected on city pages
  - `faqSchema(items)` — injected wherever the FAQ accordion renders
- `app/sitemap.ts` lists all live indexable URLs with priorities; `app/robots.ts` allows public assets/pages, disallows noindex/private paths, and references the canonical sitemap
- All animations respect `prefers-reduced-motion` (CSS-level kill in [app/globals.css](app/globals.css) and component-level `useReducedMotion` checks)
- Hero image / SVG marked `priority` semantics; map iframe is `IntersectionObserver`-lazy
- AVIF + WebP via [next.config.ts](next.config.ts)

## Develop

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run build
npm start
```

Build output: static marketing pages + sitemap/robots.

## Deploy

Push to a Git repo and import into Vercel — zero config required.
