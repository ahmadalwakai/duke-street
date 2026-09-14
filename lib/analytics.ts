// Lightweight typed wrapper around Google tag (gtag) + Consent Mode v2.
// All calls are no-ops if gtag is not loaded yet (e.g. consent not granted).

type ConsentValue = "granted" | "denied";
type ConsentState = {
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
  }
}

export const GOOGLE_ADS_ID = "AW-18255173604";

const GOOGLE_ADS_CONVERSIONS = {
  callClick: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION ?? "",
  whatsappClick: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION ?? "",
  leadForm: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_FORM_CONVERSION ?? "",
  leadThanks: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_THANKS_CONVERSION ?? "",
};

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    (window.gtag as (...a: unknown[]) => void)(...args);
    return;
  }
  window.dataLayer.push(args);
}

export function setConsent(state: Partial<ConsentState>) {
  gtag("consent", "update", state);
  try {
    localStorage.setItem("dst_consent_v2", JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function readStoredConsent(): Partial<ConsentState> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("dst_consent_v2");
    return raw ? (JSON.parse(raw) as Partial<ConsentState>) : null;
  } catch {
    return null;
  }
}

/** Fire a generic event. Safe before consent — ends up in dataLayer only. */
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
  if (!sendTo) return;
  track("conversion", {
    send_to: sendTo,
    transport_type: "beacon",
    event_timeout: 1000,
    ...params,
  });
}

/** Tap on the call CTA — does NOT block navigation. */
export function trackCallClick(location: string) {
  track("call_click", { location });
  trackConfiguredAdsConversion(GOOGLE_ADS_CONVERSIONS.callClick, {
    location,
    value: 40,
    currency: "GBP",
  });
}

/** Tap on the WhatsApp CTA. */
export function trackWhatsAppClick(location: string) {
  track("whatsapp_click", { location });
  trackConfiguredAdsConversion(GOOGLE_ADS_CONVERSIONS.whatsappClick, {
    location,
  });
}

/** Quote-form submission. */
export function trackQuoteSubmit(payload: { city?: string }) {
  track("generate_lead", { ...payload });
  trackConfiguredAdsConversion(GOOGLE_ADS_CONVERSIONS.leadForm, { ...payload });
}

/** Thank-you page lead event. */
export function trackLeadThanks(page = "/thanks") {
  track("lead_thanks", { page });
  trackConfiguredAdsConversion(GOOGLE_ADS_CONVERSIONS.leadThanks, { page });
}
