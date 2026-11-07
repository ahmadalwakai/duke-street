import assert from "node:assert/strict";
import { afterEach, before, beforeEach, test } from "node:test";

let analytics: typeof import("../lib/analytics");
let calls: unknown[][];
let scripts: unknown[];
let reloads: number;
let stored: Map<string, string>;
const granted = {
  ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted",
  analytics_storage: "granted", personalization_storage: "granted",
} as const;
const denied = {
  ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  analytics_storage: "denied", personalization_storage: "denied",
} as const;

before(async () => {
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION = "AW-18255173604/test-call";
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION = "AW-18255173604/test-whatsapp";
  analytics = await import("../lib/analytics");
});

beforeEach(() => {
  calls = [];
  scripts = [];
  reloads = 0;
  stored = new Map();
  const browser = Object.assign(new EventTarget(), {
    gtag: (...args: unknown[]) => calls.push(args),
    localStorage: {
      getItem: (key: string) => stored.get(key) ?? null,
      setItem: (key: string, value: string) => stored.set(key, value),
    },
    location: { reload: () => { reloads++; } },
  });
  Object.defineProperty(globalThis, "window", { value: browser, configurable: true });
  Object.defineProperty(globalThis, "document", {
    value: { createElement: () => ({}), head: { appendChild: (script: unknown) => scripts.push(script) } },
    configurable: true,
  });
});

afterEach(() => {
  Reflect.deleteProperty(globalThis, "window");
  Reflect.deleteProperty(globalThis, "document");
});

test("unanswered and rejected consent load no Google tag and discard clicks", () => {
  analytics.syncGoogleAdsConsent();
  analytics.trackCallClick("footer");
  analytics.setConsent(denied);
  analytics.syncGoogleAdsConsent();
  analytics.trackWhatsAppClick("footer");
  assert.deepEqual(scripts, []);
  assert.deepEqual(calls, []);
});

test("accept loads the tag once without replaying earlier events", () => {
  analytics.trackCallClick("before-consent");
  analytics.setConsent(granted);
  analytics.syncGoogleAdsConsent();
  analytics.syncGoogleAdsConsent();
  assert.equal(scripts.length, 1);
  assert.deepEqual(calls.map((entry) => entry[0]), ["consent", "js", "config"]);
  analytics.trackCallClick("footer");
  const conversion = calls.find((entry) => entry[1] === "conversion")?.[2] as Record<string, unknown>;
  assert.equal(conversion.send_to, "AW-18255173604/test-call");
  assert.equal(conversion.location, "footer");
  assert.equal("value" in conversion, false);
  assert.equal("currency" in conversion, false);
});

test("rejecting after acceptance denies every optional purpose and reloads", () => {
  analytics.setConsent(granted);
  analytics.syncGoogleAdsConsent();
  analytics.setConsent(denied);
  analytics.syncGoogleAdsConsent();
  assert.equal(reloads, 1);
  assert.equal(analytics.hasMeasurementConsent(), false);
  assert.equal((calls.at(-1)?.[2] as Record<string, string>).personalization_storage, "denied");
  const count = calls.length;
  analytics.trackCallClick("rejected");
  assert.equal(calls.length, count);
});

test("malformed or incomplete stored consent cannot enable tracking", () => {
  for (const raw of ["{", "true", "{}", '{"ad_storage":"granted"}', '{"ad_storage":true}']) {
    stored.set(analytics.CONSENT_STORAGE_KEY, raw);
    assert.equal(analytics.readStoredConsent(), null);
    analytics.syncGoogleAdsConsent();
  }
  assert.equal(scripts.length, 0);
});

test("booking handoff records only a start, without any conversion", () => {
  analytics.setConsent(granted);
  analytics.trackBookingStart({ city: "glasgow" });
  assert.deepEqual(calls, [["event", "booking_start", { city: "glasgow" }]]);
});

test("consent remains usable for this page when storage is blocked", () => {
  Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
  assert.equal(analytics.readStoredConsent(), null);
  analytics.setConsent(granted);
  analytics.syncGoogleAdsConsent();
  assert.equal(scripts.length, 1);
});
