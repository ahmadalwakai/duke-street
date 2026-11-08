# PHASE B — BUILD SPECIFICATION (NOTHING GOES LIVE)
### Duke Street Tyres — Google Search build. Message 2 of 3.
### Send only after Phase A is reported and approved.

---

## ROLE, LANGUAGE, SCOPE

You are the same senior Google Ads acquisition engineer. Phase A is complete and approved.

- **All communication with me: ARABIC ONLY.** All Google Ads assets: **ENGLISH (en-GB) ONLY.**
- **In scope:** Glasgow + agreed radius, Edinburgh + agreed radius, motorway corridors within them.
- **Out of scope: DUNDEE.** No Dundee campaign, ad group, keyword, ad, asset, geo target, or `/…-dundee` URL. Do not propose Dundee as an expansion.
- **Channel:** Google Search only.

## AUTHORITY LIMIT FOR THIS MESSAGE — ABSOLUTE

**You are writing a specification, not building an account. Push nothing live. Create nothing in the live account. Change no setting.**

Deliverable: a complete written spec plus a Google Ads Editor–importable file that I can review line by line before anything is built.

If Phase A left a question unanswered — especially the monthly budget — **stop and ask. Do not proceed on an assumed number.**

---

## 1. ACCOUNT SETTINGS TO SPECIFY

- **Display Network: OFF** on every Search campaign. Google defaults this ON — turn it off.
- **Search Partners: OFF at launch.** Re-evaluate after 30 days of clean data.
- **Auto-apply recommendations: ALL OFF.**
- **Auto-tagging: ON.**
- **Location option: "Presence — people in or regularly in your targeted locations."** Never "Presence or interest."
- Ad rotation: optimise. Ad schedule: 24/7 — the business genuinely operates 24/7. Report overnight budget pacing risk.

**Location exclusions — do not over-engineer.** Do not manually exclude every location outside the service area. Use, in order: explicit positive targeting of Glasgow and Edinburgh and their radii; Presence-only; then targeted exclusions for known leakage areas only, added on evidence. **Google location targeting is probabilistic and not guaranteed precise** — plan to review Matched Locations after launch.

---

## 2. STRUCTURE — INTENT + GEOGRAPHY WITHOUT GEO LEAKAGE

**Governing rule. Geographic targeting is a CAMPAIGN-level setting. City-named ad groups inside a multi-city campaign do NOT enforce geographic separation — a user in Edinburgh can trigger a keyword sitting in a "Glasgow" ad group and be shown a Glasgow ad pointing at a Glasgow landing page.**

> **Any ad group whose ad copy or landing page names a specific city MUST sit inside a campaign targeted to that city alone.**
> **Ad groups whose ad copy and landing page are geographically neutral MAY share a multi-city campaign, because there is nothing city-specific to mismatch.**

Apply that rule, not a blanket preference for splitting or consolidating. Splitting every intent by city fragments budget and starves smart bidding; consolidating city-specific creative leaks geography. The rule resolves both.

**Default structure — six campaigns:**

| # | Campaign | Geo targeting | Rationale |
|---|---|---|---|
| 1 | `Search \| Emergency \| Glasgow` | Glasgow + agreed radius | City-specific ads and landing pages; highest value; ring-fenced budget |
| 2 | `Search \| Emergency \| Edinburgh` | Edinburgh + agreed radius | Same |
| 3 | `Search \| Emergency \| Motorway` | Motorway corridors inside the Glasgow/Edinburgh service area only | Materially different intent, urgency, landing-page strategy |
| 4 | `Search \| Planned \| Booking` | Glasgow + Edinburgh | Ads and `/book` are geo-neutral — no mismatch possible; consolidation preserves learning volume |
| 5 | `Search \| Price \| Quote` | Glasgow + Edinburgh | Same reasoning |
| 6 | `Search \| Brand` | Glasgow + Edinburgh | Keeps branded conversion rate and CPC out of generic acquisition metrics |

**Ad groups, themed by single intent:**
- Emergency Glasgow / Emergency Edinburgh: `Flat Tyre`, `Puncture`, `Emergency Mobile Tyre`, `Roadside Tyre`
- Motorway: `Motorway Tyre`, `Hard Shoulder`, named roads (M8, M74, M77, M80, M90, A720, A8)
- Planned: `Mobile Tyre Fitting`, `Tyre Replacement`, `Fitting At Home`
- Price: `Tyre Price`, `Puncture Price`, `Tyre Quote`
- Brand: `Duke Street Tyres` (exact + phrase brand terms only)

**Constraint on campaigns 4, 5, 6:** they span two cities, so their RSAs and landing pages must remain geo-neutral. City-named keywords may live there **only** if the ads stay geo-neutral or use location insertion correctly. **Never place a hardcoded city name in an ad inside a multi-city campaign.**

**Budget gate.** If the monthly budget from Phase A cannot support six campaigns with meaningful daily budgets, present the arithmetic and propose a reduced structure **for my approval before building it.** Do not build a structure the budget cannot feed. If Phase A shows Planned or Price volume large enough to justify city separation, propose that split with evidence.

**Motorway intent warning.** A driver stranded on the M8 will often search "flat tyre help" or "mobile tyre fitter near me" with no road name. Motorway keywords capture explicit road intent only. **Do not create negatives that stop the city Emergency campaigns from serving valid motorway users.**

**Query ownership.** For each meaningful query cluster, state which campaign and ad group owns it. Resolve overlap with a small number of targeted negatives. Do not attempt perfect routing through negative-keyword sprawl.

---

## 3. KEYWORDS

- **Phrase and Exact only at launch.** Broad match only after conversion tracking is proven and search terms are mined weekly.
- Each ad group covers one clear intent. Include as many distinct, non-redundant terms as the intent genuinely needs — no fixed quota, no SKAG fragmentation.
- Before adding any keyword, state its unique intent. No permutation padding.
- **No keyword may contain "Dundee" or any DD postcode.**

Seed themes — expand from the real Search Terms report and Keyword Planner:
- Emergency: `emergency tyre fitting`, `mobile tyre fitter near me`, `flat tyre help`, `puncture repair near me`, `roadside tyre replacement`, `24 hour tyre fitting`, `tyre blowout help` — plus Glasgow / Edinburgh variants inside the matching city campaign
- Motorway: `flat tyre motorway`, `M8 tyre replacement`, `M74 flat tyre`, `A720 flat tyre`, `hard shoulder tyre`
- Planned: `book mobile tyre fitting`, `tyre fitting at home`, `van tyre fitting at home`
- Price: `mobile tyre fitting price`, `mobile tyre fitting cost`, `puncture repair price`, `tyre fitting quote`

---

## 4. NEGATIVE KEYWORDS

Create an **account-level Negative Keyword List** named `Master – Universal Negatives`, applied to all campaigns. Account-level negatives are capped at 1,000 terms — stay well within it.

Baseline: `jobs`, `job`, `vacancy`, `career`, `training`, `course`, `apprenticeship`, `DIY`, `how to`, `youtube`, `free`, `repair kit`, `puncture repair kit`, `part worn`, `second hand`, `used tyres`, `wholesale`, `for sale`, `insurance`, `salary`.

**Dundee — present as a decision, do not act unilaterally.** Dundee is excluded from advertising, but the business may still service Dundee callers. Present both options with the volume data from Phase A point 35, and apply only what I approve:
- **Option A (default):** add `dundee` and DD postcode terms as negatives, so no budget goes to a market we are not advertising.
- **Option B:** leave open, accepting Dundee enquiries as incidental overflow.

**Competitor brands — do not automate.** Do NOT add every Auction Insights advertiser as a negative. An Auction Insights name means someone competed in the same auction, not that any user searched that brand. Some competitor-brand searches carry useful substitution intent.
1. Confirm from the **Search Terms report** whether competitor-brand queries actually occur; capture exact terms and variants.
2. Because this account's policy is not to target competitor-brand demand, exclude those confirmed terms only.
3. **Never infer a negative solely from an Auction Insights advertiser name.**
4. Report the list to me before it is applied.

---

## 5. CONVERSION ARCHITECTURE

| Action | Source | Setting |
|---|---|---|
| `Call from Ads – 60s+` | **RSAs + Call Assets.** Do NOT create new call-only ads — creation removed February 2026, existing stop serving February 2027. | **Primary.** Count: One. Provisional qualified threshold **60 seconds** — a declared provisional value to be re-based on real call-duration data after 30 days, not a guess presented as fact. |
| `Website Call Click` | `tel:` click on site | **Secondary.** Monitoring only — a click is not a call. |
| `Booking Confirmed` | Backend confirmation event, deduplicated on booking ID | **Primary.** Count: One. Never fire on a page view or form-start. |
| `WhatsApp Click` | `wa.me` click | **Secondary.** Monitoring only. |
| `WhatsApp Qualified` | Offline / enhanced-conversions-for-leads via the **currently supported Google Ads Data Manager path** | **Secondary until all five preconditions below hold.** Primary only after. |
| `Quote Form Start` | 60-second quote form | **Secondary.** |

**`WhatsApp Qualified` constraints.** Do not implement on the legacy Google Ads API offline-conversion path. Use the supported Data Manager / enhanced-conversions-for-leads architecture identified in Phase A point 25. Enhanced conversions for web and leads are now a single combined setting — configure accordingly.

Do not mark it Primary until all five hold:
1. Qualification can be recorded reliably by a human or system.
2. Attribution identifiers survive the WhatsApp handoff, or the conversation can be joined back to the click server-side.
3. Duplicate uploads are prevented.
4. Consent requirements are satisfied.
5. Test imports are successfully attributed in the account.

**Why:** clicking `wa.me` sends the user out of the site into the WhatsApp app. A GCLID in the browser is not enough on its own — without a lead record created before exit, or a backend join, there is nothing to attribute. If Phase A showed no such mechanism, **report the measurement gap and leave WhatsApp Secondary. Do not fabricate a pathway.**

**Standing rules:**
- Never let two conversion actions count the same phone call. State explicitly which action owns which call path.
- A `wa.me` outbound click proves nothing about qualification and must never drive smart bidding as Primary.
- Verify the combined Enhanced Conversions setting.
- **Consent Mode v2 must be working before any campaign runs.**

**Conversion values — derive, do not assume.** Do not assign value merely because a conversion is higher intent. An emergency call is not "worth more" by definition — it is worth what it produces. Derive from: qualified-to-job rate; average gross profit per completed job; cancellation / no-show rate; lead-to-booking rate; channel-specific close rate.

If reliable economic data is unavailable, **report the recommended measurement architecture and state that values cannot yet be set. Do not fabricate conversion values** — invented ones actively mislead smart bidding.

---

## 6. LANDING PAGE MAPPING

- Emergency Glasgow → `/emergency-tyre-call-out-glasgow` or `/24-hour-mobile-tyre-fitting-glasgow`. **Never the homepage.**
- Emergency Edinburgh → the Edinburgh equivalents.
- Motorway → `/roadside-tyre-replacement-near-me`, or the city roadside page where the ad group is road-specific to that city.
- Planned (multi-city) → **geo-neutral only:** `/book` or `/mobile-tyre-fitting-scotland`.
- Price (multi-city) → **geo-neutral only:** the page that visibly displays the £55 / £75 / £95 pricing with the WhatsApp CTA present.
- **No `/…-dundee` URL anywhere.**
- If a required page does not exist or fails Core Web Vitals, report the gap. **Do not invent or request a new page unless you have measured a real relevance or conversion gap.**

---

## 7. RESPONSIVE SEARCH ADS

One RSA per ad group minimum, two where volume allows. **Do not create call-only ads under any circumstances.** Calls come from RSAs plus call assets.

Headlines must mirror that ad group's keywords — if the keyword is "puncture repair", the ad is about puncture repair, not general fitting. Cover service, city (single-city campaigns only), urgency, CTA, trust, value. **Do not pad to 15 with near-duplicates** — distinctiveness beats slot-filling.

**Approved claims** (only if still published on the site AND on the matching landing page): 24/7 emergency call-out; average on-scene 30–40 minutes; no overnight surcharge; fully fitted from £55 / £75 / £95; fully insured, torqued to manufacturer spec; card, contactless and Apple Pay at the kerb. Google rating is usable **only if you re-verify the live figure on the Google Business Profile the day the ad is written** — never hardcode a number that can go stale. **Invent nothing else.** No "fastest", "cheapest", "best", "#1", or any guarantee not on the site.

Headline bank: `24/7 Mobile Tyre Fitting` · `Flat Tyre? We Come To You` · `Emergency Tyre Call-Out` · `Response In 30–40 Minutes` · `Mobile Tyre Fitter Glasgow` · `Mobile Tyre Fitter Edinburgh` · `Call Now For Roadside Help` · `Call A Mobile Fitter Now` · `Fitted At Your Kerb` · `No Overnight Surcharge` · `Fully Fitted From £55` · `Card & Apple Pay At The Kerb` · `Fully Insured Fitters` · `All Major Tyre Brands` · `Puncture Repair Near You` · `Book Mobile Fitting Online` · `Real Fitter Answers The Phone`

City-named headlines only inside the matching single-city campaign. Never write "Dundee" in any asset. Write headlines that read correctly whether or not the call asset renders.

**Assets:** call asset (0333 015 2519) with call reporting and a 24/7 schedule; location asset via the linked Google Business Profile; sitelinks (Glasgow service, Edinburgh service, Roadside help, Book online); callouts (24/7 Call-Out, 30–40 Min Response, Fully Insured, Card & Apple Pay); structured snippets (tyre brands). **Call bid adjustment now sits at call-asset level, not campaign level** — configure it there.

Pin only where structurally necessary — over-pinning kills combination testing.

**Ad Strength:** report as creative feedback only. It is not an auction ranking metric. Never restructure the account to chase the label.

---

## 8. BIDDING & BUDGET

Do not pick a bid strategy mechanically. Before proposing Maximize Conversions or tCPA, verify and report: tracking accuracy, conversion quality, qualified conversion volume, data stability, budget adequacy, CPC landscape, and whether the conversion represents a real customer outcome. **Historical conversion count alone does not justify tCPA.**

- **Emergency (1–3):** if conversion data is thin or unproven → `Target Impression Share (Absolute Top)` with a **hard Max CPC cap.** State the target % and the cap with reasoning. Pivot to Maximize Conversions + tCPA only when qualified call data supports it.
- **Planned / Price (4–5):** Manual CPC or Maximize Clicks with a CPC cap until Primary conversions are reliable, then Maximize Conversions, then tCPA.
- **Brand (6):** Manual CPC, low cap. Brand should never be expensive.

**Budget isolation:** each Emergency campaign holds its own budget, never shared with Planned or Price. Priority: Emergency > Planned > Price > Brand. Propose specific daily budgets per campaign, reasoned against the monthly total from Phase A.

---

## OUTPUT

Report in Arabic:

```
١. ملخص المواصفات
٢. إعدادات الحساب
٣. الحملات — لكل حملة: الاستهداف الجغرافي، المجموعات، الميزانية اليومية، استراتيجية المزايدة + السبب
٤. الكلمات المفتاحية وملكية الاستعلامات
٥. الكلمات السلبية — مع دليل الاستعلامات لكل سلبية منافس، وخياري دندي
٦. معمارية التحويلات — الأساسي مقابل الثانوي، ومنع الازدواجية
٧. قيم التحويل — مشتقة من أرقام حقيقية أو غير محدَّدة مع بيان الفجوة
٨. صفحات الهبوط — الربط النهائي
٩. الإعلانات — النصوص الكاملة لكل RSA
١٠. ما يحتاج قراراً منك قبل البناء
```

Attach the Google Ads Editor import file. Then **stop.** Build nothing until I approve in writing.
