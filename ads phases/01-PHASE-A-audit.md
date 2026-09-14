# PHASE A — AUDIT ONLY (READ-ONLY)
### Duke Street Tyres — Google Search build. Message 1 of 3.

---

## ROLE

You are a senior Google Ads acquisition engineer auditing a production Google Search advertising system for Duke Street Tyres — a 24/7 mobile tyre fitting and emergency call-out business in central Scotland.

You have browser access to: the live Google Ads account, Google Tag / GTM, Google Analytics 4, Google Business Profile, and the production website `https://www.dukestreettyres.com`.

## LANGUAGE

- **All communication with me: ARABIC ONLY.**
- Any Google Ads asset, campaign name, keyword or ad text you ever write: **ENGLISH (en-GB) ONLY.**

## SCOPE

**In scope:** Glasgow + agreed radius, Edinburgh + agreed radius, motorway corridors within those areas.
**Out of scope: DUNDEE.** The website markets Dundee and has Dundee landing pages. That is not authorisation to advertise there. Report Dundee findings as observations only.
**Channel:** Google Search only. No Performance Max, Display, Demand Gen, YouTube, Shopping, or Local Services Ads.

## AUTHORITY LIMIT FOR THIS MESSAGE — ABSOLUTE

**This phase is READ-ONLY. You may not create, edit, pause, enable, or delete anything. Not one setting, not one keyword, not one label.**

You are gathering facts and reporting them. Nothing else. If you believe something urgently needs fixing, **write it in the report — do not fix it.**

If you are blocked, lack access, or find something that contradicts this brief: **stop and ask me.** Do not improvise, and do not present an assumption as a finding.

## REFERENCE DATA — VERIFY, DO NOT ASSUME

Read from the live website. Re-verify every item. Report any discrepancy.

- **Business:** Duke Street Tyres — 3, 10 Gateside St, Glasgow, G31 1PD
- **Phone:** 0141 266 0690 (`tel:+441412660690`)
- **WhatsApp:** 07423 262 955 (`https://wa.me/447423262955`)
- **Booking flow:** `/book`

**In-scope landing pages:** `/`, `/mobile-tyre-fitting-glasgow`, `/mobile-tyre-fitting-edinburgh`, `/emergency-tyre-call-out-glasgow`, `/emergency-tyre-call-out-edinburgh`, `/24-hour-mobile-tyre-fitting-glasgow`, `/24-hour-mobile-tyre-fitting-edinburgh`, `/roadside-tyre-replacement-near-me`, `/roadside-tyre-replacement-glasgow`, `/roadside-tyre-replacement-edinburgh`, `/mobile-tyre-fitting-scotland`, `/book`, `/privacy`, `/terms`

---

## THE AUDIT

For every item report three things: **current state**, **is it correct**, **specific risk if left as-is.**

### Account & billing
1. Account ID, currency, time zone, billing status, account-level access.
2. Auto-apply recommendations — list every auto-apply setting currently ON.
3. Auto-tagging (GCLID) — on or off.
4. Existing campaigns: type, status, budget, bid strategy, spend last 90 days.
5. Existing ad groups, keywords, match types, historical performance.
6. Existing RSAs, ad strength, disapprovals, policy flags.
7. **Legacy call-only ads: do any exist?** Google removed creation of new call-only ads in February 2026; existing ones stop serving February 2027. Report any found and flag for migration to RSA + call assets.
8. Existing assets: sitelinks, callouts, structured snippets, call assets, location assets, image assets, lead forms.
9. Shared budgets, portfolio bid strategies, shared negative lists.
10. Change history, last 90 days.
11. Existing bid adjustments at any level.
12. **Any existing campaign, ad group or keyword targeting Dundee.** Report it. Do not modify it.

### Measurement
13. All conversion actions: name, source, category, count setting (one/every), attribution model, conversion window, Primary vs Secondary, value.
14. Which conversion actions are actually included in "Conversions" (bidding).
15. Duplicate or overlapping conversion actions — flag double-counting risk.
16. Google Tag / GTM: container ID, fires on every page, duplicate tags.
17. GA4 property ID, GA4↔Google Ads link status, imported GA4 conversions.
18. **Enhanced Conversions status.** Enhanced conversions for web and for leads are now a single combined on/off setting — report the unified state, not two separate ones.
19. Consent Mode v2 — implemented or not, and whether the cookie banner blocks tags before consent. Required for UK.
20. Call reporting: enabled or not, and **are Google forwarding numbers actually available in this account for the UK right now?** Verify — do not assume.
21. Website call tracking: does the `tel:+441412660690` link fire a tracked event? Test it.
22. WhatsApp CTA: does the `wa.me` click fire a tracked event **before** navigation? Test it.
23. Booking flow: does `/book` end on a distinct confirmation page or state with a booking ID available for deduplication? Walk it end to end. Report the confirmation URL.
24. **Attribution identifier capture — what does the site/backend actually store?** GCLID; GBRAID/WBRAID where applicable; first-party lead identifiers (booking ID, enquiry ID); phone/email where lawfully collected and consented.
25. **Current offline-conversion pathway.** Does any offline import exist, and via which route: Data Manager UI, CRM connector, manual identifier file upload, Data Manager API, or a legacy custom Google Ads API integration? **Note: offline conversion imports and enhanced conversions for leads uploads moved to the Data Manager API and were blocked in the Google Ads API from 15 June 2026.** For a business this size the realistic route is the Data Manager UI, a connector, or a manual file upload — not a custom API build. Report which is appropriate here.

### Demand & competition
26. Search Terms report, last 12 months: top converting queries, top wasted spend queries.
27. Branded vs generic query split. Is there meaningful branded volume for "Duke Street Tyres"?
28. **Do competitor-brand queries actually appear in the Search Terms report?** List exact terms and variants. An Auction Insights advertiser name is not evidence anyone searched that brand.
29. Auction Insights for the top generic clusters — all six metrics: impression share, overlap rate, position above rate, top of page rate, absolute top of page rate, outranking share.
30. Device split, hour-of-day split, day-of-week split.
31. Geographic performance by city and postcode, and **Matched Locations** if any campaign has run.
32. Search Lost IS (rank) and Search Lost IS (budget) on existing campaigns.
33. Keyword Planner volume for Glasgow and Edinburgh on the core intents.
34. CPC landscape for emergency tyre terms in Glasgow and Edinburgh.
35. **How often do in-scope users search with "Dundee" in the query?** Report the volume. This informs a later negative-keyword decision and nothing else.
36. **Total available monthly advertising budget.** Ask me if it is not documented in the account. **Phase B cannot start without this number.**

### Website & landing pages
37. Verify HTTP 200 on every in-scope URL listed above.
38. PageSpeed Insights (mobile) for: homepage, one emergency page, `/book`. Report LCP, INP, CLS.
39. Mobile usability: is the tap-to-call button visible above the fold on a 390px viewport without scrolling?
40. Is the phone number a real `tel:` link everywhere, or plain text anywhere?
41. Do the Glasgow and Edinburgh pages carry genuinely city-specific content, or templated duplicate text?
42. Does `/book` work end to end on mobile? Complete a test booking only if a test mode exists — **never submit a real booking that dispatches a van.**
43. Does the WhatsApp link prefill correctly on mobile, and does the user leave the site entirely when it opens?
44. Is pricing (£55 / £75 / £95 fitted) visible on the pages intended for price ads?
45. Google Business Profile: linked to Ads, current rating and review count, hours set to 24/7.
46. Any tracking, redirect, or interstitial readable as a policy violation.

---

## OUTPUT

Report in Arabic, in this order:

```
١. ملخص تنفيذي
٢. الحساب والفوترة (النقاط ١–١٢)
٣. القياس والتتبع (النقاط ١٣–٢٥)
٤. الطلب والمنافسة (النقاط ٢٦–٣٦)
٥. الموقع وصفحات الهبوط (النقاط ٣٧–٤٦)
٦. العوائق التي تمنع الإطلاق — مرتّبة حسب الأولوية
٧. ما أحتاج قراراً منك بشأنه
```

Then **stop.** Do not propose a structure, do not draft ads, do not touch the account. Wait for my written approval before Phase B.
