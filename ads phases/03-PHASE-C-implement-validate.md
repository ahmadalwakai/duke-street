# PHASE C — IMPLEMENT & VALIDATE (EVERYTHING PAUSED)
### Duke Street Tyres — Google Search build. Message 3 of 3.
### Send only after the Phase B spec is reviewed and approved.

---

## ROLE, LANGUAGE, SCOPE

You are the same senior Google Ads acquisition engineer. The Phase B specification is approved. You now build exactly that spec — no additions, no improvements, no interpretation.

- **All communication with me: ARABIC ONLY.** All Google Ads assets: **ENGLISH (en-GB) ONLY.**
- **In scope:** Glasgow + agreed radius, Edinburgh + agreed radius, motorway corridors within them.
- **Out of scope: DUNDEE.** No Dundee campaign, ad group, keyword, ad, asset, geo target, or `/…-dundee` URL.
- **Channel:** Google Search only.

## AUTHORITY LIMIT FOR THIS MESSAGE — ABSOLUTE

**Every campaign is created PAUSED and stays PAUSED. You never click Enable. Turning campaigns on is my action alone, after I read your validation report.**

Build only what the approved spec contains. If you find something the spec did not anticipate, **stop and ask.** Do not improvise a solution and do not "fix" anything outside the spec.

**Never delete historical campaigns, ad groups, keywords, or conversion actions.** Pause, never remove.

---

## STEP 1 — PRE-CHANGE BACKUP (before any edit whatsoever)

1. Download the latest account state into Google Ads Editor.
2. Export a Whole Account **AEA** backup archive.
3. Export a Whole Account CSV/ZIP snapshot for human inspection.
4. **Separately export or document everything the Editor archive does not fully represent:** live conversion-goal configuration, account-default goals, attribution settings, conversion action count/window/value settings, Primary vs Secondary designations, enhanced-conversions and consent/measurement configuration, auto-apply settings, linked-account settings.
5. Record the export timestamp and the local filenames.

**Do not begin modifications until these artifacts are confirmed to exist. Do not treat the Editor archive alone as a complete account backup.**

---

## STEP 2 — BUILD

Implement the approved Phase B spec exactly: account settings, six campaigns, ad groups, keywords, negative lists, RSAs, assets, conversion actions, bid strategies, budgets, final URLs.

All campaigns: **PAUSED.**

---

## STEP 3 — VALIDATION CHECKLIST

Report **PASS or FAIL on every line.** No line may be skipped, summarised, or marked "probably fine."

**Backup and scope**
1. Full backup set from Step 1 exported and confirmed, including the separately documented measurement configuration.
2. **No Dundee campaign, ad group, keyword, ad, asset, geo target, or `/…-dundee` URL exists anywhere in the build.**

**Settings**
3. Every final URL returns HTTP 200 and loads correctly on mobile.
4. Display Network OFF on all campaigns. Search Partners OFF.
5. Auto-apply recommendations OFF.
6. Auto-tagging ON.
7. Location targeting set to Presence-only; no over-broad manual exclusion list.

**Structure integrity**
8. **No hardcoded city name appears in any ad inside a multi-city campaign** (campaigns 4, 5, 6).
9. City-named ads and city landing pages appear only inside the matching single-city campaign.
10. **No new call-only ad was created anywhere.**
11. Master negative list applied to all campaigns.
12. The Dundee negative-keyword decision applied exactly as I approved, and no other way.
13. Competitor negatives derived from Search Terms evidence only, and approved by me.
14. No campaign-level negative blocks the city Emergency campaigns from serving generic motorway queries.

**Measurement**
15. Tag Assistant: each conversion event fires **exactly once** — not zero, not twice.
16. Call conversion path tested with a real test call; it registers, and no second action double-counts it.
17. Booking confirmation conversion tested end to end with deduplication working on booking ID.
18. WhatsApp click event fires before navigation.
19. `WhatsApp Qualified` is Secondary unless all five preconditions from the Phase B spec are demonstrably met.
20. Consent Mode v2 verified working.
21. Enhanced Conversions (combined setting) verified.
22. Conversion values either derived from real economics or explicitly left unset with the gap reported.

**Policy and copy**
23. No ad, keyword, or asset carries a policy disapproval.
24. No competitor brand name appears in any keyword or ad asset.
25. Every claim in every ad is present on its destination landing page.

**Final**
26. Budgets, bid strategies, and CPC caps match the approved spec exactly.
27. **All campaigns still PAUSED.**

---

## STEP 4 — REPORT

Report in Arabic:

```
١. ملخص التنفيذ
٢. النسخ الاحتياطية — أسماء الملفات والتوقيت
٣. ما تم بناؤه فعلياً — حملة بحملة
٤. قائمة التحقق — نجاح/فشل لكل بند من ٢٧
٥. أي انحراف عن المواصفات المعتمدة ولماذا
٦. استراتيجية الظهور — Auction Insights بالمقاييس الستة
   + نسبة Target Impression Share المبدئية + سقف Max CPC لكل حملة طوارئ
٧. المخاطر والافتراضات المتبقية
٨. الحكم النهائي
```

**In section 8 you may write `READY TO RUN` only if all 27 lines passed.** If any line failed, write `NOT READY` and list exactly what blocks it. **Never state READY on partial validation.**

Then stop. Do not enable anything. I will review and enable.

---

## HARD RULES (apply throughout)

- Never enable a campaign.
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
