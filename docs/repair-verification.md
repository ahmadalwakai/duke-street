# Repair verification — 7 November 2026

The requested repairs are implemented locally in Duke Street Tyres, with the payment-completion integration in `C:\tyrerescue`. Existing work in both repositories was preserved. Neither project has been deployed by this task, and no live booking, payment or Google Ads account change was made.

## Implemented

| Area | Result |
| --- | --- |
| Website click tracking | Footer phone uses a small client tracking component. Call conversions no longer invent `value: 40` or a currency. |
| Consent | Duke uses basic consent mode: no Google measurement script before acceptance, no replay of earlier clicks, validated storage, cross-tab updates, and reload on withdrawal. Banner/privacy text describes this behavior. |
| Booking semantics | Form handoff records only `booking_start`; `/thanks` no longer records completion or claims a request was received. |
| Actual completion | Tyre Rescue preserves the allowlisted Duke source through booking creation, then reads the stored source when successful payment is verified. The conversion uses the paid booking reference as `transaction_id`, actual booking value, consent checks and session/memory deduplication. Duke enhanced user data remains off. |
| Admin login | Handles null/primitive JSON, malformed input, Unicode emails, oversized bodies, malformed hash and absent signing configuration. Wrong and known emails both run bcrypt. Token response compatibility remains. |
| Security headers | Production HSTS, nosniff, SAMEORIGIN, referrer/permissions policies, baseline frame/base/object CSP, and no-store login/throttle responses. |
| SEO | Brand suffix resolved once; absolute production canonicals; Glasgow business coordinates retained across coverage cities; sitemap excludes empty chunk; working ICO; generated-output SEO checks replace false localhost alarm. |
| Tooling | ESLint flat config replaces `next lint`; environment example, regression tests, production HTTP smoke script and GitHub Actions checks added. Scoped minimatch override removes the reported advisory. |
| Documentation and cleanup | README updated; four identical historical briefs replaced with links to canonical copies; 65 temporary files archived with hashes in ignored `.artifacts/repair-2026-11-07`. Operational Ads backups preserved. |

## Validation

- Duke: 23 regression tests passed (13 security, 4 SEO, 6 tracking); ESLint and TypeScript passed.
- `npm run seo:check`: no errors across 13,043 service metadata records, sitemap entries, internal links, 18 allowed routes and 9 blocked routes.
- `npm run build`: passed, 630 pages generated.
- `npm run test:smoke` against the production server on localhost:3094: five pages rendered with one brand in the title, production canonical and expected security headers; `/thanks` noindex; `/book` returned 307 to the correct Tyre Rescue URL; `/favicon.ico` returned a valid ICO; sitemap advertised three service chunks plus static; null login returned 400 with no-store and security headers.
- `npm audit`: **0 vulnerabilities**, including development dependencies, after the scoped minimatch update. The [reviewed advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249) identifies 11.0.1 as patched.
- Tyre Rescue: 37 focused Vitest tests passed across `gtag`, `booking-conversion`, and `booking-confirm-security`. Tests include Duke account routing, consent, duplicate suppression, verified payment payload and ignoring a caller-spoofed completion source.
- Tyre Rescue application TypeScript passed using `tsc --noEmit --pretty false -p tsconfig.next.json`. Scoped ESLint found two existing `react-hooks/set-state-in-effect` errors, in `SuccessContent.tsx:120` and `StepCustomerDetails.tsx:64`; both were reproduced against HEAD source. No new scoped lint error was found.
- Browser interaction ended automatically because Computer Use could not determine the current browser URL confidently. Full interactive consent/network QA and a paid booking were not completed. Mocked tracking tests and HTTP smoke checks do not prove Google received a live conversion.

To repeat the local smoke check after a build, start `npm start -- --port 3094 --hostname 127.0.0.1` in one terminal and run `npm run test:smoke` in another. This script refuses remote hosts to avoid exercising a live admin endpoint. GitHub Actions does this after its build.

## Booking integration and required environment

Flow: Duke booking CTA → Tyre Rescue `/book?sourceApp=duke_street_tyres` → booking create request → stored source → verified successful/full-settlement payment response → consent-gated Google Ads conversion.

The source is an attribution hint, not proof of payment or a security credential. Payment completion is checked separately server-side. Merely visiting `/thanks`, appending `booking_id`, or supplying a source on the confirmation request cannot establish a conversion.

Duke's implementation follows Google's [basic consent mode model](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic), where measurement tags are blocked until the visitor grants consent. Unit tests confirm that the site's own click handlers drop earlier events.

In **Tyre Rescue's** Production environment, set before building:

```dotenv
NEXT_PUBLIC_DUKE_GOOGLE_ADS_BOOKING_CONVERSION=AW-18255173604/ugTDCLms2-kcEOSv34BE
```

The label comes from the historical verified Ads brief; its current account settings still require review. An empty/invalid Duke label emits no Duke Ads conversion and never falls back to Tyre Rescue's Ads destination. The Tyre Rescue cookie banner is now available to Duke-origin visits; consent is separate from the Duke domain. Tyre Rescue retains its existing broader tag/advanced-consent implementation. These changes do not claim to make its entire platform use Duke's basic-consent policy.

Website click labels belong to the Duke project:

```dotenv
NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION=AW-18255173604/SFN-CI2o68IcEOSv34BE
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION=AW-18255173604/hJNQCLys2-kcEOSv34BE
```

Old Duke `LEAD_FORM_CONVERSION` and `LEAD_THANKS_CONVERSION` variables are no longer consumed. A booking-start handoff is not a submitted quote or paid booking. Google call reporting's `Call from Ads - 60s+` remains separate from website clicks.

## Live checks and access limits

At 12:57 UTC, read-only fetching of 15 JavaScript chunks referenced by the live Duke homepage found all four historical public labels: call, WhatsApp, quote form and booking confirmed. This proves the current deployment embeds those values; it does **not** inspect Vercel's saved Production/Preview configuration, establish Ads action settings, or show that events reached Ads.

The Vercel connector returned 403 for project `prj_G2tJLgxf9bI9YYdVKxCt7T3IvJK8` under team `team_YbFFTwYDhbX9PBOoxXET1A90`. Its authorization-link recovery returned Team not found, and the connection listed no teams. Therefore no Vercel variables were changed or marked verified. Access through a connection authorized for that team is required.

Google Ads E1–E5 remain unverified live. Historical exports/screenshots are not current account evidence. Review conversion goals/count/value settings, tag/linker and cross-domain attribution, and any enhanced-conversions setting in the actual Duke account before asserting end-to-end attribution. No new enhanced PII transmission was enabled.

A full booking test needs a known Stripe Test Mode environment and test data, or a separately arranged real transaction. No test card or invented customer booking was submitted to production. The requested sandbox details were not available during this verification.

## Performance remeasurement

Single live Lighthouse 12.8.2 mobile lab runs, simulated throttling, 7 November 2026. These are before deployment of these repairs, not field metrics or a controlled before/after comparison.

| Live page | Performance | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Duke homepage | 70/100 | 1.05 s | 3.51 s | 810 ms | 0 |
| Tyre Rescue Duke booking entry | 55/100 | 1.04 s | 8.97 s | 883 ms | 0 |

The booking run used the destination URL directly, avoiding redirect timing. Lighthouse reported approximately 370 KB unused JavaScript in one first-party booking chunk, plus unused Google tag code. Profile and split/defer that bundle before drawing conclusions about individual components; no broad Tyre Rescue performance refactor was made here. The older August report was also 55/100 but measured through a redirect, so its 15.3 s LCP is not an apples-to-apples comparison. [Machine-readable results](performance-2026-11-07.json) reference the preserved raw reports.

## Remaining architecture/data decisions

- **Indexation:** 13,043 service URLs represent 2,080 service/location pairs and 10,963 extra intent variants. Sample intros share 95.3–100% word-set similarity. Use Search Console evidence before consolidating routes; no mass noindex or deletion was applied. See [SEO review](seo-review.md).
- **Business data:** the per-city coordinate bug is fixed, but the exact base Google Maps pin and displayed 5.0 / 154 review claim were not freshly verified. No aggregate rating is emitted in JSON-LD.
- **Rate limits:** API/login counters remain separate per running instance. A shared counter service or Vercel rule requires a deployment/infrastructure decision and verification.
- **Token use:** follow-up review confirmed the current Assisted Chat iOS source authenticates with Tyre Rescue and selects Duke as a workspace under the same session. Tyre Rescue verifies its own admin device sessions. The standalone Duke JWT is not that operational credential; this marketing repository has no consuming protected route. The Duke endpoint is retained only for legacy compatibility. The 60 focused app session/workspace tests passed; the installed iOS build remains unverified.
