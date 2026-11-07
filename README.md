# Duke Street Tyres

Next.js 15 / React 19 / TypeScript marketing site for mobile tyre fitting. Customers call, use WhatsApp, or continue to the shared Tyre Rescue booking platform. There is no local booking database. A separate optional API authenticates the mobile admin client using environment-configured credentials.

## Local setup

Use Node 24 and npm. Copy `.env.example` to `.env.local` and configure only the integrations you need. Public pages build without credentials; the admin login returns 503 until configured.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

`NEXT_PUBLIC_DUKE_SHARED_BOOKING_URL` controls the booking handoff. The example points to hosted Tyre Rescue. Without that variable, development uses `http://localhost:3026/book`; production uses `https://www.tyrerescue.uk/book?sourceApp=duke_street_tyres`. The quote form pre-fills that flow; it does not create a booking here.

## Checks and build

```powershell
npm run check
npm audit --audit-level=moderate
npm run build
npm start
```

`check` runs ESLint, TypeScript, Node regression tests via `tsx`, and the SEO audit. `npm run lint` uses ESLint 9 flat config instead of deprecated `next lint`. GitHub Actions runs the same checks and a production build. Security tests cover invalid requests, password verification, signing configuration, throttling and headers; tracking and SEO tests cover consent, conversion semantics, metadata and sitemap contracts.

The scoped `minimatch` override under `@typescript-eslint/typescript-estree` uses the patched 11.x release for GHSA-g3hv-75wg-m249. Other consumers retain their compatible major. Keep the override until upstream ships a fixed dependency range; re-run lint, typecheck, tests and the audit when changing it.

## Consent and conversions

The site uses basic Google Consent Mode. Before opt-in it creates the local consent queue but loads no Google measurement script and drops measurement events. Acceptance loads the Google Ads tag. Rejecting after acceptance denies consent and reloads to stop the loaded tag. Stored choices are validated and synchronized across tabs. Cookie Settings reopens the choice.

The footer and other phone CTAs emit `call_click`; WhatsApp emits `whatsapp_click`. Configured Google Ads click conversions carry no invented monetary value. The form handoff emits `booking_start`, not a completed lead. `/thanks` does not emit Booking Confirmed or assert that a booking exists.

A genuine Duke booking conversion belongs to Tyre Rescue's server-verified successful-payment flow. The accompanying changes in `C:\tyrerescue` route the confirmed booking's stored `sourceApp` to a Duke-specific conversion label and retain the stable transaction ID. Both projects need deployment and the Tyre Rescue public environment variable needs configuring before live verification. See [verification status](docs/repair-verification.md).

## Admin API and deployment

Administration is through the Assisted Chat iOS app signing in to Tyre Rescue, then **My account & settings → Switch workspace → Duke Street Tyres**. The central service verifies its own admin device session. Changing workspace filters booking sources without changing the login backend or credential. Stock, drivers and quotes remain shared. This source configuration was reviewed and its 60 focused app session/workspace tests passed; the installed iPhone build was not verified.

`POST /api/mobile/admin/auth/login` expects JSON `{ "email": "...", "password": "..." }`. Configure `MOBILE_ADMIN_EMAIL`, a bcrypt `MOBILE_ADMIN_PASSWORD_HASH`, and `MOBILE_ADMIN_JWT_SECRET`; `AUTH_SECRET` remains a legacy fallback. Secrets must stay server-only. Responses are uncached and preserve the existing token/user contract. This repository has no protected endpoint consuming that token; verify that any backend accepting it checks signature, expiry and authorization. Never put the signing secret in the mobile client.

That Duke endpoint is legacy compatibility code; it is not the central Assisted Chat authentication path and does not need configuring to manage Duke bookings through Tyre Rescue.

API burst limiting and login throttling use memory local to each running instance. They are not a distributed abuse-control service. Forwarded client IP headers require a trusted reverse proxy such as Vercel. A shared limiter or platform rate limit remains operational work.

Security headers are configured in `next.config.ts`: nosniff, SAMEORIGIN framing, restricted base/object/frame CSP, referrer and permissions policies, and production HSTS. The CSP is a baseline; it does not enforce a script nonce policy.

Set public conversion variables before building, since Next.js embeds `NEXT_PUBLIC_*` values in browser bundles. Configure Production and Preview separately. Inspect the linked project and environment scope before deploying; this repair has not deployed either project or changed live Ads settings.

## Routes and SEO

The route model contains 13,043 indexable service URLs across 260 supported locations, plus five static sitemap URLs. Three non-empty service sitemap chunks contain 5,000 / 5,000 / 3,043 entries. Dynamic routes prebuild up to 200 entries per route depth and generate other supported pages on demand. Withheld locations/services stay noindex or unavailable.

Titles use one brand suffix; canonicals point to the production `www` domain. The shared LocalBusiness identity keeps the Glasgow address and coordinates while other cities appear as service areas. No aggregate rating is emitted in JSON-LD. The visible rating count and exact map pin still require live Business Profile verification.

A unique URL/title is not evidence of distinct content: 10,963 intent variants share substantial copy. [SEO review](docs/seo-review.md) records the audit and the proposed Search Console-led consolidation. No bulk indexing change has been applied.

## Project references

- [Site details and booking URL](lib/site.ts)
- [Metadata](lib/metadata.ts), [schema](lib/schema.ts), [SEO route model](lib/seo/seo-pages.ts)
- [Environment template](.env.example)
- [Repair verification and outstanding checks](docs/repair-verification.md)
- [Historical Google Ads briefs](<ads phases/duke-street-tyres-google-ads-command.md>)

Historical duplicate briefs now point to their canonical files under `ads phases`. Local screenshots, logs and measurement outputs are retained under ignored `.artifacts` and excluded from deployment; operational Ads backups remain intact.
