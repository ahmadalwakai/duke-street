// Advanced Google Consent Mode: the tag loads on every visit with everything
// denied (no ad cookies, redacted ad identifiers, cookieless pings only).
// Accepting cookies upgrades consent; rejecting downgrades it again.

type ConsentValue = "granted" | "denied";
export type ConsentState = {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
  functionality_storage?: ConsentValue;
  personalization_storage?: ConsentValue;
  security_storage?: ConsentValue;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    dstConsent?: ConsentState;
    dstAppliedConsent?: string;
  }
}

// Google Ads account 283-207-0770 (replaces the retired AW-18255173604 tag).
export const GOOGLE_ADS_ID = "AW-18563782369";
export const CONSENT_STORAGE_KEY = "dst_consent_v2";
export const CONSENT_CHANGE_EVENT = "dst:consent-changed";

const GOOGLE_ADS_CONVERSIONS = {
  callClick: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION ?? "",
  whatsappClick: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION ?? "",
};

function validConsent(value: unknown): value is ConsentState {
  if (!value || typeof value !== "object") return false;
  const state = value as Record<string, unknown>;
  return ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"]
    .every((key) => state[key] === "granted" || state[key] === "denied");
}

export function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  if (window.dstConsent) return window.dstConsent;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    const state: unknown = raw ? JSON.parse(raw) : null;
    return validConsent(state) ? state : null;
  } catch {
    return null;
  }
}

export function hasMeasurementConsent(): boolean {
  const state = readStoredConsent();
  return state?.ad_storage === "granted" && state.ad_user_data === "granted" &&
    state.ad_personalization === "granted" && state.analytics_storage === "granted";
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.gtag?.(...args);
}

export function setConsent(state: ConsentState) {
  if (typeof window === "undefined" || !validConsent(state)) return;
  // Keep this page functional even when browser storage is unavailable.
  window.dstConsent = state;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // A storage-blocking browser will ask again on the next page.
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/**
 * Called on mount and consent changes. The <head> script already loaded the
 * tag with denied defaults; this only pushes the visitor's saved choice.
 */
export function syncGoogleAdsConsent() {
  if (typeof window === "undefined") return;
  const state = readStoredConsent();
  if (!state) return;
  const applied = JSON.stringify(state);
  if (window.dstAppliedConsent === applied) return;
  window.dstAppliedConsent = applied;
  gtag("consent", "update", state);
}

/** Sent in real time; Google honours the current consent state (cookieless when denied). */
export function track(
  event: string,
  params: Record<string, string | number | boolean> = {},
) {
  gtag("event", event, params);
}

function trackConfiguredAdsConversion(
  sendTo: string,
  params: Record<string, string | number | boolean> = {},
) {
  if (!/^AW-\d+\/[A-Za-z0-9_-]+$/.test(sendTo)) return;
  track("conversion", {
    send_to: sendTo,
    transport_type: "beacon",
    event_timeout: 1000,
    ...params,
  });
}

/** Tap on the call CTA — does not block navigation or invent a monetary value. */
export function trackCallClick(location: string) {
  track("call_click", { location });
  trackConfiguredAdsConversion(GOOGLE_ADS_CONVERSIONS.callClick, { location });
}

export function trackWhatsAppClick(location: string) {
  track("whatsapp_click", { location });
  trackConfiguredAdsConversion(GOOGLE_ADS_CONVERSIONS.whatsappClick, { location });
}

/** A handoff to Tyre Rescue is a booking start, not a submitted or confirmed lead. */
export function trackBookingStart(payload: { city?: string }) {
  track("booking_start", { ...payload });
}
