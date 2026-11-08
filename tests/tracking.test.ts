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
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION = "AW-18563782369/test-call";
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION = "AW-18563782369/test-whatsapp";
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

const conversionOf = () =>
  calls.find((entry) => entry[1] === "conversion")?.[2] as Record<string, unknown> | undefined;

test("unanswered consent pushes no update and never injects scripts at runtime", () => {
  analytics.syncGoogleAdsConsent();
  assert.deepEqual(calls, []);
  assert.deepEqual(scripts, []);
});

test("clicks before consent send a cookieless conversion without a monetary value", () => {
  analytics.trackCallClick("footer");
  const conversion = conversionOf();
  assert.equal(conversion?.send_to, "AW-18563782369/test-call");
  assert.equal(conversion?.location, "footer");
  assert.equal("value" in (conversion ?? {}), false);
  assert.equal("currency" in (conversion ?? {}), false);
  assert.equal(calls.some((entry) => entry[0] === "consent"), false);
});

test("accepting upgrades consent once, however often it syncs", () => {
  analytics.setConsent(granted);
  analytics.syncGoogleAdsConsent();
  analytics.syncGoogleAdsConsent();
  const updates = calls.filter((entry) => entry[0] === "consent");
  assert.equal(updates.length, 1);
  assert.equal((updates[0][2] as Record<string, string>).ad_storage, "granted");
  analytics.trackWhatsAppClick("fab");
  assert.equal(conversionOf()?.send_to, "AW-18563782369/test-whatsapp");
});

test("rejecting after acceptance returns every optional purpose to denied without reloading", () => {
  analytics.setConsent(granted);
  analytics.syncGoogleAdsConsent();
  analytics.setConsent(denied);
  analytics.syncGoogleAdsConsent();
  assert.equal(reloads, 0);
  assert.equal(analytics.hasMeasurementConsent(), false);
  const last = calls.at(-1) as unknown[];
  assert.deepEqual(last.slice(0, 2), ["consent", "update"]);
  assert.equal((last[2] as Record<string, string>).ad_storage, "denied");
  assert.equal((last[2] as Record<string, string>).personalization_storage, "denied");
});

test("malformed or incomplete stored consent never upgrades consent", () => {
  for (const raw of ["{", "true", "{}", '{"ad_storage":"granted"}', '{"ad_storage":true}']) {
    stored.set(analytics.CONSENT_STORAGE_KEY, raw);
    assert.equal(analytics.readStoredConsent(), null);
    analytics.syncGoogleAdsConsent();
  }
  assert.equal(calls.some((entry) => entry[0] === "consent"), false);
});

test("booking handoff records only a start, without any conversion", () => {
  analytics.setConsent(granted);
  analytics.trackBookingStart({ city: "glasgow" });
  assert.deepEqual(calls, [["event", "booking_start", { city: "glasgow" }]]);
});

test("consent still applies for this page when storage is blocked", () => {
  Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
  assert.equal(analytics.readStoredConsent(), null);
  analytics.setConsent(granted);
  analytics.syncGoogleAdsConsent();
  assert.deepEqual(calls.map((entry) => entry[0]), ["consent"]);
});
