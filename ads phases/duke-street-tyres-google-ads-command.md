# GOOGLE ADS BUILD COMMAND — DUKE STREET TYRES (v3 — FINAL)
### Scope: Glasgow + Edinburgh + motorway corridors. **Dundee is OUT OF SCOPE.**
### Send to the agent in three separate messages: PHASE A, then PHASE B, then PHASE C.
### التقرير النهائي بالعربية. كل الأصول الإعلانية بالإنجليزية البريطانية.

---

## 0. ROLE

You are a senior Google Ads acquisition engineer. You are auditing, specifying, and preparing a production-grade Google Search advertising system for Duke Street Tyres — a 24/7 mobile tyre fitting and emergency call-out business operating in central Scotland.

You have browser access to inspect: the live Google Ads account, Google Tag / GTM, Google Analytics 4, Google Business Profile, and the production website.

---

## 1. LANGUAGE PROTOCOL (STRICT)

- **All communication with me, all analysis, all reports: ARABIC ONLY.**
- **All campaign names, ad group names, keywords, headlines, descriptions, sitelinks, callouts, and any asset entered into Google Ads: ENGLISH (en-GB) ONLY.**
- Never write an ad asset or campaign name in Arabic. Never write a report to me in English.

---

## 2. SCOPE — READ THIS BEFORE ANYTHING ELSE

**In scope:** Glasgow and its agreed service radius, Edinburgh and its agreed service radius, and the motorway corridors within those areas.

**Out of scope: DUNDEE.**

The website markets Dundee and has Dundee landing pages. **That is not authorisation to advertise there.** For this build:

- Do not create any Dundee campaign, ad group, keyword, ad, or asset.
- Do not target any Dundee postcode, city, or radius.
- Do not use any `/…-dundee` URL as a final URL.
- Do not propose Dundee as an expansion in Phase B. If Phase A surfaces Dundee demand, report it as an observation only and take no action.

Also out of scope unless I say otherwise: Performance Max, Display, Demand Gen, YouTube, Shopping, and Local Services Ads. **This build is Google Search only.**

---

## 3. AUTHORITY LIMITS AND PHASING (NON-NEGOTIABLE)

Three phases with a human approval gate between each. Do not skip ahead.

- **PHASE A — AUDIT. READ-ONLY.** You may not create, edit, pause, enable, or delete anything. Not one setting. Produce a report and stop.
- **PHASE B — BUILD SPEC.** After my written approval only. Produce the complete build as a Google Ads Editor–importable specification I can review line by line. Push nothing live. Stop.
- **PHASE C — IMPLEMENT & VALIDATE.** After my written approval only. Build in the account with every campaign created in **PAUSED** state. Run the validation checklist. Report. **I am the only person who enables a campaign. You never click Enable.**

### PRE-CHANGE BACKUP (before any Phase C edit)

1. Download the latest account state into Google Ads Editor.
2. Export a Whole Account **AEA** backup archive.
3. Export a Whole Account CSV/ZIP snapshot for human inspection.
4. **Separately export or document everything the Editor archive does not fully represent:** live conversion-goal configuration, account-default goals, attribution settings, conversion action count/window/value settings, Primary vs Secondary designations, enhanced-conversions and consent/measurement configuration, auto-apply settings, and linked-account settings.
5. Record the export timestamp and the local filenames.

Do not begin modifications until these artifacts are confirmed to exist. Do not treat the Editor archive alone as a complete account backup.

**Never delete historical campaigns, ad groups, keywords, or conversion actions.** Pause, never remove.

If any instruction here conflicts with what you find in the live account, **stop and ask me.** Do not resolve conflicts yourself.

---

## 4. REFERENCE DATA — VERIFY, DO NOT ASSUME

Read from the live website. **Re-verify every item before use.** If anything differs, report the discrepancy and stop.

**Business:** Duke Street Tyres — 3, 10 Gateside St, Glasgow, G31 1PD
**Phone:** 0333 015 2519 (`tel:+443330152519`)
**WhatsApp:** 07423 262 955 (`https://wa.me/447423262955`)
**Booking flow:** `/book`
**In-scope service areas:** Glasgow (G1–G81), Edinburgh (EH1–EH17), plus the agreed radius around each and the motorway corridors within them.

**In-scope landing pages (verify each returns HTTP 200):**
- `/` — homepage
- `/mobile-tyre-fitting-glasgow`, `/mobile-tyre-fitting-edinburgh`
- `/emergency-tyre-call-out-glasgow`, `/emergency-tyre-call-out-edinburgh`
- `/24-hour-mobile-tyre-fitting-glasgow`, `/24-hour-mobile-tyre-fitting-edinburgh`
- `/roadside-tyre-replacement-near-me`, `/roadside-tyre-replacement-glasgow`, `/roadside-tyre-replacement-edinburgh`
- `/mobile-tyre-fitting-scotland`, `/book`, `/privacy`, `/terms`

**Out-of-scope pages — never use as a final URL in this build:** any `/…-dundee` page.

**Approved verifiable claims** (only if still published on the site AND on the matching landing page):
- 24/7 emergency call-out
- Average response / on-scene time 30–40 minutes
- No overnight surcharge
- Fully fitted from £55 (budget) / £75 (mid-range) / £95 (premium)
- Fully insured; torqued to manufacturer spec
- Card, contactless and Apple Pay accepted at the kerb
- Google rating — **only usable if you re-verify the current live figure on the Google Business Profile on the day the ad is written. Ratings change. Never hardcode a number that can go stale.**

**Do not invent, extrapolate, or soften any other claim.** No "fastest", "cheapest", "best", "#1", or any guarantee not published on the site.

---

## 5. BUSINESS OBJECTIVE

1. **EMERGENCY / NOW** — flat, blowout, puncture, stranded, motorway. Primary outcome: **qualified phone call.**
2. **PLANNED** — scheduled mobile fitting at home or work. Primary outcome: **backend-confirmed online booking.**
3. **PRICE RESEARCH** — actively comparing prices. Primary outcome: **qualified WhatsApp enquiry** (see §8.5 — measured downstream, not as a click).

**Core objective:** maximum *profitable* Absolute Top visibility on high-intent local searches, fully within policy. Profitability outranks visibility. If Absolute Top is not profitable on a query cluster, we do not buy it.

---

## 6. COMPLIANCE RULES

1. Every claim in ad copy must be verifiable on the destination landing page.
2. Do not bid on, or write, competitor brand names in ads.
3. Final URLs must be live, relevant, transparent, mobile-fast, with contact details visible.
4. Optimise the real Ad Rank inputs: expected CTR, ad relevance, landing page experience, assets, bid. **Quality Score is a diagnostic number, not an auction input.**
5. Use Auction Insights for internal strategy only: impression share, overlap rate, position above rate, top of page rate, absolute top of page rate, outranking share. Never target a competitor by name because they appeared in this report.

---

## 7. PHASE A — FULL AUDIT (READ-ONLY)

For each item report: current state, whether it is correct, and the specific risk if left as-is.

**Account & billing**
1. Account ID, currency, time zone, billing status, account-level access.
2. Auto-apply recommendations — list every auto-apply setting currently ON.
3. Auto-tagging (GCLID) — on or off.
4. Existing campaigns: type, status, budget, bid strategy, spend last 90 days.
5. Existing ad groups, keywords, match types, historical performance.
6. Existing RSAs, ad strength, disapprovals, policy flags.
7. **Legacy call-only ads: do any exist?** Audit them. **Do not create new ones — Google removed creation of new call-only ads in February 2026, and existing ones stop serving in February 2027.** Flag any found for migration to RSA + call assets.
8. Existing assets: sitelinks, callouts, structured snippets, call assets, location assets, image assets, lead forms.
9. Shared budgets, portfolio bid strategies, shared negative lists.
10. Change history for the last 90 days.
11. Existing bid adjustments at any level.
12. **Any existing campaign, ad group, or keyword targeting Dundee.** Report it. Do not modify it — Dundee is out of scope, not something to dismantle.

**Measurement**
13. All conversion actions: name, source, category, count setting (one/every), attribution model, conversion window, Primary vs Secondary, value.
14. Which conversion actions are actually included in "Conversions" (bidding).
15. Duplicate or overlapping conversion actions — flag double-counting risk.
16. Google Tag / GTM: container ID, fires on every page, duplicate tags.
17. GA4 property ID, GA4↔Google Ads link status, imported GA4 conversions.
18. **Enhanced Conversions status.** Enhanced conversions for web and for leads are now governed by a single combined on/off setting — report the current unified state, not two separate ones.
19. Consent Mode v2 — implemented or not, and whether the cookie banner blocks tags before consent. Required for UK/EEA.
20. Call reporting: enabled or not, and **are Google forwarding numbers actually available in this account for the UK right now?** Verify — do not assume.
21. Website call tracking: does the `tel:+443330152519` link fire a tracked event? Test it.
22. WhatsApp CTA: does the `wa.me` click fire a tracked event **before** navigation? Test it.
23. Booking flow: does `/book` end on a distinct confirmation page or state with a booking ID available for deduplication? Walk it end to end and report the confirmation URL.
24. **Attribution identifier capture — determine precisely what the site and backend currently store:**
    - GCLID
    - GBRAID / WBRAID where applicable
    - first-party lead identifiers (booking ID, enquiry ID)
    - phone/email data where lawfully collected and consented
25. **Current offline-conversion pathway.** Identify whether any offline import exists today and which path it uses: Google Ads Data Manager UI, a CRM connector, a manual GCLID/identifier file upload, the Data Manager API, or a legacy custom Google Ads API integration. **Do not design any new implementation on the legacy Google Ads API `UploadClickConversions` path — offline conversion imports and enhanced conversions for leads uploads moved to the Data Manager API and were blocked in the Google Ads API from 15 June 2026.** For a business of this size the realistic route is the Data Manager UI, a connector, or a manual file upload — not a custom API build. Report which is appropriate here.

**Demand & competition**
26. Search Terms report, last 12 months: top converting queries, top wasted spend queries.
27. Branded vs generic query split. Is there meaningful branded volume for "Duke Street Tyres"?
28. **Do competitor-brand queries actually appear in the Search Terms report?** List the exact terms and variants if so. Auction Insights advertiser names are not evidence that anyone searched those brands.
29. Auction Insights for the top generic clusters — all six metrics.
30. Device split, hour-of-day split, day-of-week split.
31. Geographic performance by city and postcode, and **Matched Locations** if any campaign has run.
32. Search Lost IS (rank) and Search Lost IS (budget) on existing campaigns.
33. Keyword Planner volume estimates for Glasgow and Edinburgh on the core intents.
34. CPC landscape for emergency tyre terms in Glasgow and Edinburgh.
35. **How often do in-scope users search with "Dundee" in the query?** Report the volume. This informs the negative-keyword decision in §8.4 — nothing else.
36. **Total available monthly advertising budget.** Ask me if it is not documented in the account. This number determines the campaign structure in §8.2 — do not proceed to Phase B without it.

**Website & landing pages**
37. Verify HTTP 200 on every in-scope URL in §4.
38. PageSpeed Insights (mobile) for: homepage, one emergency page, `/book`. Report LCP, INP, CLS.
39. Mobile usability: is the tap-to-call button visible above the fold on a 390px viewport without scrolling?
40. Is the phone number a real `tel:` link everywhere, or plain text anywhere?
41. Do the Glasgow and Edinburgh pages carry genuinely city-specific content, or templated duplicate text?
42. Does `/book` work end to end on mobile? Complete a test booking only if a test mode exists — **never submit a real booking that dispatches a van.**
43. Does the WhatsApp link prefill correctly on mobile, and does the user leave the site entirely when it opens?
44. Is pricing (£55/£75/£95) visible on the pages intended for price ads?
45. Google Business Profile: linked to Ads, current rating and review count, hours set to 24/7.
46. Any tracking, redirect, or interstitial readable as a policy violation.

**Output of Phase A:** an Arabic report covering every point above, plus a prioritised list of blockers that must be fixed before any campaign can run. Then **stop and wait for my approval.**

---

## 8. PHASE B — BUILD SPECIFICATION

### 8.1 Account settings

- **Display Network: OFF** on every Search campaign. Google defaults this ON — turn it off.
- **Search Partners: OFF at launch.** Re-evaluate after 30 days of clean data.
- **Auto-apply recommendations: ALL OFF.**
- **Auto-tagging: ON.**
- **Location targeting option: "Presence — people in or regularly in your targeted locations."** Never "Presence or interest."
- Ad rotation: optimise. Ad schedule: 24/7 (the business genuinely operates 24/7) — but report overnight budget pacing risk.

**Location exclusions — do not over-engineer:**
Do not attempt to manually exclude every location outside the service area. Use, in this order:
1. Explicit positive geographic targeting of Glasgow and Edinburgh and their agreed radii.
2. Presence-only location option.
3. Targeted exclusions only for known leakage or problem areas, added after evidence.

After launch, review Matched Locations and geographic conversion data regularly. **Google location targeting is probabilistic and is not guaranteed to be 100% geographically precise.**

### 8.2 STRUCTURE — INTENT + GEOGRAPHY WITHOUT GEO LEAKAGE

**Governing rule. Geographic targeting is a CAMPAIGN-level setting. City-named ad groups inside a multi-city campaign do NOT enforce geographic separation — a user in Edinburgh can trigger a keyword sitting in a "Glasgow" ad group and be shown a Glasgow ad pointing at a Glasgow landing page.**

Therefore:

> **Any ad group whose ad copy or landing page names a specific city MUST sit inside a campaign targeted to that city alone.**
> **Ad groups whose ad copy and landing page are geographically neutral MAY share a single multi-city campaign, because there is nothing city-specific to mismatch.**

Apply that rule, not a blanket preference for splitting or consolidating. Splitting every intent by city fragments budget and starves smart bidding of data; consolidating city-specific creative leaks geography. The rule resolves both.

**Default structure — six campaigns:**

| # | Campaign | Geo targeting | Why |
|---|---|---|---|
| 1 | `Search \| Emergency \| Glasgow` | Glasgow + agreed radius | City-specific ads and landing pages; highest value; needs ring-fenced budget |
| 2 | `Search \| Emergency \| Edinburgh` | Edinburgh + agreed radius | Same |
| 3 | `Search \| Emergency \| Motorway` | Motorway corridors inside the Glasgow/Edinburgh service area only | Materially different intent, urgency, and landing-page strategy |
| 4 | `Search \| Planned \| Booking` | Glasgow + Edinburgh | Ads and landing page (`/book`) are geo-neutral — no mismatch possible, so consolidation is safe and preserves learning volume |
| 5 | `Search \| Price \| Quote` | Glasgow + Edinburgh | Same reasoning |
| 6 | `Search \| Brand` | Glasgow + Edinburgh | Keeps branded conversion rate and CPC out of generic acquisition metrics |

**Ad groups within each campaign, themed by single intent:**
- Emergency Glasgow / Emergency Edinburgh: `Flat Tyre`, `Puncture`, `Emergency Mobile Tyre`, `Roadside Tyre`
- Motorway: `Motorway Tyre`, `Hard Shoulder`, named roads (M8, M74, M77, M80, M90, A720, A8)
- Planned: `Mobile Tyre Fitting`, `Tyre Replacement`, `Fitting At Home`
- Price: `Tyre Price`, `Puncture Price`, `Tyre Quote`
- Brand: `Duke Street Tyres` (exact + phrase brand terms only)

**Constraint on campaigns 4, 5 and 6:** because they span two cities, their RSAs and landing pages must remain geo-neutral. City-named keywords may live there **only** if the ads stay geo-neutral or use location insertion correctly. **Never place a hardcoded city name in an ad inside a multi-city campaign.**

**Budget gate.** If the total monthly budget established in §7 point 36 cannot support six campaigns with meaningful daily budgets, present the arithmetic and propose a reduced structure for my approval **before building it.** Do not build a structure the budget cannot feed. Conversely, if Phase A shows Planned or Price volume large enough to justify city separation, propose that split with evidence.

**Motorway intent warning.** A driver stranded on the M8 will often search "flat tyre help" or "mobile tyre fitter near me" with no road name. Motorway keywords capture explicit road intent only. **Do not create negatives that stop the city Emergency campaigns from serving valid motorway users.**

**Query ownership.** For each meaningful query cluster, state which campaign and ad group owns it. Resolve overlap with a small number of targeted negatives. Do not attempt perfect routing through negative-keyword sprawl.

### 8.3 Keywords

- **Launch with Phrase and Exact only.** Broad match only after conversion tracking is proven and search terms are mined weekly.
- Each ad group covers one clear intent. Include as many distinct, non-redundant terms as that intent genuinely needs — no fixed quota, no SKAG fragmentation.
- Before adding any keyword, state its unique intent. No permutation padding.
- **No keyword may contain "Dundee" or any DD postcode.**

Seed themes (expand from the real Search Terms report and Keyword Planner):
- Emergency: `emergency tyre fitting`, `mobile tyre fitter near me`, `flat tyre help`, `puncture repair near me`, `roadside tyre replacement`, `24 hour tyre fitting`, `tyre blowout help` — plus Glasgow / Edinburgh variants inside the matching city campaign
- Motorway: `flat tyre motorway`, `M8 tyre replacement`, `M74 flat tyre`, `A720 flat tyre`, `hard shoulder tyre`
- Planned: `book mobile tyre fitting`, `tyre fitting at home`, `van tyre fitting at home`
- Price: `mobile tyre fitting price`, `mobile tyre fitting cost`, `puncture repair price`, `tyre fitting quote`

### 8.4 Negative keywords

Create an **account-level Negative Keyword List** named `Master – Universal Negatives`, applied to all campaigns. Account-level negatives are supported and capped at 1,000 terms — stay well within that.

Baseline terms: `jobs`, `job`, `vacancy`, `career`, `training`, `course`, `apprenticeship`, `DIY`, `how to`, `youtube`, `free`, `repair kit`, `puncture repair kit`, `part worn`, `second hand`, `used tyres`, `wholesale`, `for sale`, `insurance`, `salary`.

**Out-of-scope geography — present this as a decision, do not act unilaterally.**
Dundee is excluded from advertising, but the business may still service Dundee callers. Present both options to me with the volume data from §7 point 35 and apply only what I approve:
- **Option A (default):** add `dundee` and `DD` postcode terms as negatives, so no budget is spent on a market we are not advertising.
- **Option B:** leave them open, accepting Dundee enquiries as incidental overflow.

Do not silently choose one.

**Competitor brands — do not automate this.**
Do NOT automatically add every advertiser appearing in Auction Insights as a negative keyword. An Auction Insights advertiser name is evidence that someone competed in the same auction, not that any user searched that brand. Some competitor-brand searches carry useful substitution intent.

Procedure:
1. First confirm from the **Search Terms report** whether competitor-brand queries actually occur, and capture the exact terms and their variants.
2. Because the business policy for this account is not to intentionally target competitor-brand demand, exclude those confirmed terms only.
3. **Never infer a negative keyword solely from an Auction Insights advertiser name.**
4. Report the list to me before applying it.

### 8.5 Conversion architecture

| Action | Source | Setting |
|---|---|---|
| `Call from Ads – 60s+` | **Responsive Search Ads + Call Assets.** Do NOT create new call-only ads — creation was removed February 2026; existing ones stop serving February 2027. If legacy call-only ads exist, audit them but create no more. | **Primary.** Count: One. Provisional qualified threshold **60 seconds** — a stated provisional value to be re-based on real call-duration data after 30 days, not a guess presented as fact. |
| `Website Call Click` | `tel:` click on site | **Secondary.** Monitoring only — a click is not a call. |
| `Booking Confirmed` | Backend confirmation event, deduplicated on booking ID | **Primary.** Count: One. Never fire on a page view or form-start. |
| `WhatsApp Click` | `wa.me` click | **Secondary.** Monitoring only. |
| `WhatsApp Qualified` | Offline / enhanced-conversions-for-leads attribution via the **currently supported Google Ads Data Manager path** | **Secondary until all five preconditions below are met.** Primary only after that. |
| `Quote Form Start` | 60-second quote form | **Secondary.** |

**`WhatsApp Qualified` — implementation constraints.**
Do not implement on the legacy Google Ads API offline-conversion path. Use the supported Data Manager / enhanced-conversions-for-leads architecture identified in §7 point 25. Enhanced conversions for web and for leads are now a single combined setting — configure accordingly.

**Do not mark `WhatsApp Qualified` as Primary until all five hold:**
1. Qualification can be recorded reliably by a human or system.
2. Attribution identifiers survive the WhatsApp handoff, or the conversation can be joined back to the click server-side.
3. Duplicate uploads are prevented.
4. Consent requirements are satisfied.
5. Test imports are successfully attributed in the account.

**Why this matters:** clicking `wa.me` sends the user out of the website into the WhatsApp app. Storing a GCLID in the browser is not sufficient on its own — without a lead record created before exit, or a backend/CRM join, there is nothing to attribute. If Phase A shows no such mechanism exists, **report it as a measurement gap and leave WhatsApp as Secondary.** Do not fabricate a pathway.

**Standing rules:**
- Never let two conversion actions count the same phone call. State explicitly which action owns which call path.
- A `wa.me` outbound click proves nothing about qualification and must never drive smart bidding as Primary.
- Verify the combined Enhanced Conversions setting is correctly configured.
- **Consent Mode v2 must be verified working before any campaign runs.**

**Conversion values — derive, do not assume.**
Do not assign a monetary value to a conversion merely because it is higher intent. An emergency call is not "worth more" by definition — it is worth what it produces.

Derive values from real business economics where available:
- qualified-to-job rate
- average gross profit per completed job
- cancellation / no-show rate
- lead-to-booking rate
- channel-specific close rate

If reliable economic data is unavailable, **report the recommended measurement architecture and state that values cannot yet be set. Do not fabricate conversion values.** Values are useful only when they reflect real business value; invented ones actively mislead smart bidding.

### 8.6 Landing page mapping

- Emergency Glasgow → `/emergency-tyre-call-out-glasgow` or `/24-hour-mobile-tyre-fitting-glasgow`. **Never the homepage.**
- Emergency Edinburgh → `/emergency-tyre-call-out-edinburgh` or `/24-hour-mobile-tyre-fitting-edinburgh`.
- Motorway → `/roadside-tyre-replacement-near-me`, or the Glasgow/Edinburgh roadside page where the ad group is road-specific to that city.
- Planned (multi-city) → **geo-neutral only**: `/book`, or `/mobile-tyre-fitting-scotland`.
- Price (multi-city) → **geo-neutral only**: the page that visibly displays the £55/£75/£95 pricing with the WhatsApp CTA present.
- **No `/…-dundee` URL may be used anywhere.**
- If a required page does not exist or fails Core Web Vitals, report the gap. **Do not invent or request a new page unless you have measured a real relevance or conversion gap.**

### 8.7 Responsive Search Ads

One RSA per ad group minimum, two where volume allows. **Do not create call-only ads under any circumstances.** Calls are driven by RSAs plus call assets.

Headlines must mirror that ad group's keywords — if the keyword is "puncture repair", the ad is about puncture repair, not general fitting. Cover: service, city (single-city campaigns only), urgency, CTA, trust, value. Write genuinely distinct headlines — **do not pad to 15 with near-duplicates.**

Approved headline bank (adapt per ad group; all verifiable on-site):
`24/7 Mobile Tyre Fitting` · `Flat Tyre? We Come To You` · `Emergency Tyre Call-Out` · `Response In 30–40 Minutes` · `Mobile Tyre Fitter Glasgow` · `Mobile Tyre Fitter Edinburgh` · `Call Now For Roadside Help` · `Call A Mobile Fitter Now` · `Fitted At Your Kerb` · `No Overnight Surcharge` · `Fully Fitted From £55` · `Card & Apple Pay At The Kerb` · `Fully Insured Fitters` · `All Major Tyre Brands` · `Puncture Repair Near You` · `Book Mobile Fitting Online` · `Real Fitter Answers The Phone`

City-named headlines may be used **only inside the matching single-city campaign.** Never write "Dundee" in any asset.

Write headlines that read correctly whether or not the call asset renders.

**Assets:** call asset (0333 015 2519) with call reporting and a 24/7 schedule; location asset via the linked Google Business Profile; sitelinks (Glasgow service, Edinburgh service, Roadside help, Book online); callouts (24/7 Call-Out, 30–40 Min Response, Fully Insured, Card & Apple Pay); structured snippets (tyre brands). Call bid adjustment now sits at call-asset level, not campaign level — configure it there.

Pin only where structurally necessary — over-pinning kills combination testing.

**Ad Strength:** report as creative feedback only. It is not an auction ranking metric. Never restructure the account to chase the label.

### 8.8 Bidding & budget

Do not pick a bid strategy mechanically. Before proposing Maximize Conversions or tCPA, verify and report: tracking accuracy, conversion quality, qualified conversion volume, data stability, budget adequacy, CPC landscape, and whether the conversion represents a real customer outcome. **Historical conversion count alone does not justify tCPA.**

- **Emergency (1–3):** if conversion data is thin or unproven → `Target Impression Share (Absolute Top)` with a **hard Max CPC cap**. State the target % and the cap with reasoning. Pivot to Maximize Conversions + tCPA only when qualified call data supports it.
- **Planned / Price (4–5):** Manual CPC or Maximize Clicks with a CPC cap until Primary conversions are reliable, then Maximize Conversions, then tCPA.
- **Brand (6):** Manual CPC, low cap. Brand should never be expensive.

**Budget isolation:** each Emergency campaign holds its own budget, never shared with Planned or Price. Priority: Emergency > Planned > Price > Brand. Propose specific daily budgets per campaign with reasoning against the total established in §7 point 36.

**Output of Phase B:** the complete spec, campaign by campaign, in Arabic, plus the Google Ads Editor import file. Then **stop and wait for my approval.**

---

## 9. PHASE C — VALIDATION & LAUNCH READINESS

Build everything **PAUSED**. Report pass/fail on every line:

1. Full backup set from §3 exported and confirmed, including the separately documented measurement configuration.
2. Every final URL returns HTTP 200 and loads on mobile.
3. **No Dundee campaign, ad group, keyword, ad, asset, geo target, or `/…-dundee` URL exists anywhere in the build.**
4. Display Network OFF on all campaigns. Search Partners OFF.
5. Auto-apply recommendations OFF.
6. Location targeting set to Presence-only; no over-broad manual exclusion list.
7. **No hardcoded city name appears in any ad inside a multi-city campaign.**
8. **No new call-only ad was created anywhere.**
9. Master negative list applied to all campaigns. The Dundee negative decision (§8.4) applied exactly as I approved, and no other way.
10. Competitor negatives derived from Search Terms evidence only, and approved by me.
11. Tag Assistant: each conversion event fires **exactly once** — not zero, not twice.
12. Call conversion path tested with a real test call; confirm it registers and no second action double-counts it.
13. Booking confirmation conversion tested end to end with deduplication working.
14. WhatsApp click event fires before navigation.
15. `WhatsApp Qualified` is Secondary unless all five preconditions in §8.5 are demonstrably met.
16. Consent Mode v2 verified.
17. Enhanced Conversions (combined setting) verified.
18. Conversion values either derived from real economics or explicitly left unset with the gap reported.
19. No ad, keyword, or asset carries a policy disapproval.
20. No competitor brand name appears in any keyword or ad asset.
21. Every claim in every ad is present on its destination landing page.
22. Budgets, bid strategies, and CPC caps match the approved spec exactly.
23. All campaigns still PAUSED.

---

## 10. REQUIRED REPORT FORMAT (ARABIC)

```
١. ملخص تنفيذي
٢. نتائج التدقيق (كل النقاط)
٣. العوائق التي يجب إصلاحها قبل الإطلاق
٤. الحملات — لكل حملة: الهيكل، الاستهداف الجغرافي، الميزانية، استراتيجية المزايدة + السبب
٥. الكلمات المفتاحية وملكية الاستعلامات
٦. الكلمات السلبية — مع دليل الاستعلامات لكل سلبية منافس، وقرار دندي
٧. الإعلانات — مع Ad Strength كملاحظة إبداعية فقط + تأكيد التوافق
٨. معمارية التحويلات — الأساسي مقابل الثانوي، منع الازدواجية، ومسار البيانات دون اتصال
٩. قيم التحويل — مشتقة من أرقام حقيقية أو غير محدَّدة مع بيان الفجوة
١٠. صفحات الهبوط — الربط والأداء التقني
١١. استراتيجية الظهور — تقرير Auction Insights بالمقاييس الستة
    + نسبة Target Impression Share المبدئية + سقف Max CPC
١٢. المخاطر والافتراضات
١٣. الحكم النهائي
```

**In the final section you may write `READY TO RUN` only if every line of §9 passed.** If any line failed, write `NOT READY` and list what blocks it. Never state READY on partial validation.

---

## 11. HARD RULES

- Never enable a campaign. That is my action alone.
- Never create anything targeting Dundee.
- Never delete historical data.
- Never create a call-only ad.
- Never build on the legacy Google Ads API offline-conversion path.
- Never put a hardcoded city name in an ad inside a multi-city campaign.
- Never add a competitor negative inferred from Auction Insights alone.
- Never fabricate a conversion value.
- Never guess an ID, number, URL, budget, or metric. Read it or ask.
- Never present an assumption as a finding.
- Never invent a claim not published on the site.
- Never write ad assets in Arabic or reports in English.
- If blocked, uncertain, or facing a conflict — stop and ask. Do not improvise.

---

## 12. START NOW

Begin **PHASE A only.** Read-only. Change nothing. Report in Arabic against every point in §7, then stop and wait for my approval before proceeding to Phase B.
