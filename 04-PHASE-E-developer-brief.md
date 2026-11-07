# Developer Brief — Phase E

> Historical brief. The implementation and remaining live checks are recorded in [repair verification](docs/repair-verification.md). In particular, `/thanks` must not fire a conversion without verified completion, and booking conversions are now integrated at Tyre Rescue's verified payment flow. The old optional-ID fallback below is superseded.

Hand this to the developer unchanged. Do not implement any of these items yourself.

---

## 1. Footer phone link — missing call tracking

**File:** `components/layout/Footer.tsx`

**Problem:** The `tel:` link at line 73 has no click-tracking. Every other call CTA on the site fires `trackCallClick(location)` but the footer is silent.

**Exact change:**

```tsx
// Line 5 — add to existing imports:
import { trackCallClick } from "@/lib/analytics";

// Lines 72–75 — current:
<a
  href={`tel:${SITE.phoneE164}`}
  style={{ color: "var(--chakra-colors-accent-red)" }}
>

// Lines 72–75 — after:
<a
  href={`tel:${SITE.phoneE164}`}
  style={{ color: "var(--chakra-colors-accent-red)" }}
  onClick={() => trackCallClick("footer")}
>
```

---

## 2. Remove hardcoded value:40 / currency:"GBP" from call conversion

**File:** `lib/analytics.ts`, lines 84–88

**Problem:** `trackCallClick` passes `value: 40` and `currency: "GBP"` to the conversion. The value 40 is not derived from real economics. Per project decision: **remove these fields entirely** — conversion value will be set in the Google Ads UI or left unset.

**Exact change:**

```ts
// Current (lines 81–89):
export function trackCallClick(location: string) {
  track("call_click", { location });
  trackConfiguredAdsConversion(GOOGLE_ADS_CONVERSIONS.callClick, {
    location,
    value: 40,
    currency: "GBP",
  });
}

// After:
export function trackCallClick(location: string) {
  track("call_click", { location });
  trackConfiguredAdsConversion(GOOGLE_ADS_CONVERSIONS.callClick, { location });
}
```

---

## 3. Four NEXT_PUBLIC_GOOGLE_ADS_* env vars — confirmed labels

**File:** `lib/analytics.ts`, lines 25–29 (already wired; env vars are missing values)

```ts
const GOOGLE_ADS_CONVERSIONS = {
  callClick:    process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION    ?? "",
  whatsappClick: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION ?? "",
  leadForm:     process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_FORM_CONVERSION ?? "",
  leadThanks:   process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_THANKS_CONVERSION ?? "",
};
```

**Confirmed Phase F labels** (Google Ads UI -> Goals -> Conversions -> [action] -> Tag setup -> "Use Google tag" -> `send_to`):

| Env var | Conversion action name | Format |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION` | Website Call Click (Secondary) | `AW-18255173604/SFN-CI2o68IcEOSv34BE` |
| `NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION` | WhatsApp Click (Secondary) | `AW-18255173604/hJNQCLys2-kcEOSv34BE` |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_FORM_CONVERSION` | Quote Form Submit (Secondary) | `AW-18255173604/IlfkCOav2-kcEOSv34BE` |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_THANKS_CONVERSION` | Booking Confirmed (Secondary) | `AW-18255173604/ugTDCLms2-kcEOSv34BE` |

Use these exact production env values:

```
NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION=AW-18255173604/SFN-CI2o68IcEOSv34BE
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION=AW-18255173604/hJNQCLys2-kcEOSv34BE
NEXT_PUBLIC_GOOGLE_ADS_LEAD_FORM_CONVERSION=AW-18255173604/IlfkCOav2-kcEOSv34BE
NEXT_PUBLIC_GOOGLE_ADS_LEAD_THANKS_CONVERSION=AW-18255173604/ugTDCLms2-kcEOSv34BE
```

Do not use `Call from Ads - 60s+` as a website env var. It is the ad-call conversion action, conversion type ID `7654903604`, and does not expose a website event `send_to` label in the UI.

**F5-FIX confirmation:** `NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION` is deliberately mapped to the Secondary `Website Call Click` action. It must never be replaced with `Call from Ads - 60s+`; that Primary action is measured entirely by Google call reporting and has no site-code env var.

**Where to set:**
- `.env.local` for local dev
- Vercel dashboard → Project → Settings → Environment Variables → Production

---

## 4. TyreRescue booking_id passback + transaction_id dedup on /thanks

**File:** `app/thanks/page.tsx` and `components/analytics/ConversionFire.tsx`

**Problem:** The `/thanks` page fires `trackLeadThanks()` unconditionally on every mount. If a user refreshes the page, the conversion fires twice. There is no `transaction_id` to deduplicate, and no `booking_id` from TyreRescue.

**What TyreRescue must do (confirm with them first):** When redirecting back to `https://www.dukestreettyres.com/thanks`, append a stable booking ID as a URL param, e.g.:
```
https://www.dukestreettyres.com/thanks?booking_id=abc123
```

**Changes needed:**

`app/thanks/page.tsx` — make it a server component that reads `searchParams`, extract `booking_id`, and pass it down to a client child.

`components/analytics/ConversionFire.tsx` — accept a `transactionId?: string` prop. On mount:
1. If `transactionId` is absent, fire as today (no dedup possible).
2. If `transactionId` is present, check `sessionStorage.getItem("dst_conversion_fired_" + transactionId)`. If already set, skip. If not set, fire `trackLeadThanks(transactionId)` and then `sessionStorage.setItem(...)`.

`lib/analytics.ts` — extend `trackLeadThanks` to accept an optional `transactionId` and pass it to `trackConfiguredAdsConversion` as `{ transaction_id: transactionId }` (Google's dedup field).

**Do not implement until TyreRescue confirms the `booking_id` param is stable and present on every redirect.**

---

## 5. Consent-gated setUserData() — Enhanced Conversions (Phase F)

**File:** `lib/analytics.ts`

**Problem:** Phase F will require sending hashed user data (email / phone) for Enhanced Conversions. This MUST NOT be sent under denied consent. The consent state is already persisted in `localStorage` via `readStoredConsent()` (line 50).

**Do not call or implement the final version yet.** The toggle in Google Ads UI must be enabled (E3 action) and verified working before this code ships.

**When ready, add this function:**

```ts
export function setUserData(data: { email?: string; phone?: string }): void {
  const consent = readStoredConsent();
  if (consent?.ad_user_data !== "granted") {
    // Consent not given — silently skip. Never send PII under denied consent.
    return;
  }
  // Values must be SHA-256 hashed before sending.
  // Use the Web Crypto API or a hashing library — never send raw email/phone.
  // gtag Enhanced Conversions format:
  gtag("set", "user_data", {
    sha256_email_address: data.email,   // caller must pre-hash
    sha256_phone_number:  data.phone,   // caller must pre-hash
  });
}
```

**Caller responsibility:** The component that calls `setUserData` must hash the values with SHA-256 before passing them. Raw PII must never reach this function.

**Consent gate is non-negotiable:** If `ad_user_data` is `"denied"` or absent, return immediately. Do not log, do not store, do not send.

---

## 6. Phase F validated Google Ads conversion labels

Account-level Google tag reused: `AW-18255173604`. No second Conversion ID was created.

| Conversion action | send_to / identifier | Status |
|---|---|---|
| Call from Ads - 60s+ | Call-from-ads conversion type ID `7654903604`; no website event `send_to` label shown in the UI | Primary, One, 60-second threshold |
| Website Call Click | `AW-18255173604/SFN-CI2o68IcEOSv34BE` | Secondary, One |
| Booking Confirmed | `AW-18255173604/ugTDCLms2-kcEOSv34BE` | Secondary, One |
| WhatsApp Click | `AW-18255173604/hJNQCLys2-kcEOSv34BE` | Secondary, One |
| WhatsApp Qualified | `AW-18255173604/U9Y8COOv2-kcEOSv34BE` | Secondary, One |
| Quote Form Submit | `AW-18255173604/IlfkCOav2-kcEOSv34BE` | Secondary, One |
