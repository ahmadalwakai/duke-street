import type { FaqItem } from "../schema";
import { SITE } from "../site";
import { getLocationDisplayName, getParentSeoLocation } from "./locations";
import { getDefaultIntent } from "./services";
import type { SeoIntent, SeoLocation, SeoService } from "./types";

const INTENT_TITLE: Readonly<Record<SeoIntent, string>> = {
  "near-me": "Near Me",
  emergency: "Emergency",
  "same-day": "Same Day",
  "24-hour": "24 Hour",
  roadside: "Roadside",
  mobile: "Mobile",
  local: "Local",
  "call-out": "Call-Out",
};

const INTENT_SUMMARY: Readonly<Record<SeoIntent, string>> = {
  "near-me": "nearby mobile help",
  emergency: "urgent tyre help",
  "same-day": "same-day tyre help",
  "24-hour": "24 hour tyre help",
  roadside: "safe roadside tyre help",
  mobile: "mobile fitting at your location",
  local: "local mobile tyre support",
  "call-out": "tyre call-out support",
};

const LOCATION_TYPE_COPY: Readonly<Record<SeoLocation["type"], string>> = {
  city: "city-wide",
  town: "town and nearby routes",
  village: "village and nearby routes",
  district: "district and nearby streets",
  neighbourhood: "local streets and nearby areas",
  postcodeArea: "postcode area",
  roadCorridor: "route corridor",
};

function joinReadable(items: readonly string[], fallback: string): string {
  const selected = items.filter(Boolean).slice(0, 4);
  if (selected.length === 0) return fallback;
  if (selected.length === 1) return selected[0];
  return `${selected.slice(0, -1).join(", ")} and ${selected[selected.length - 1]}`;
}

function locationForCopy(location: SeoLocation): string {
  return getLocationDisplayName(location);
}

function parentCopy(location: SeoLocation): string {
  const parent = getParentSeoLocation(location);
  return parent ? ` within ${parent.name}` : "";
}

function serviceIntentLabel(service: SeoService, intent: SeoIntent): string {
  const defaultIntent = getDefaultIntent(service.slug);
  if (intent === defaultIntent) return service.label;
  if (intent === "local") return `Local ${service.label}`;
  if (intent === "mobile" && service.slug.includes("mobile")) return `${service.label} Service`;
  return `${INTENT_TITLE[intent]} ${service.label}`;
}

export function buildSeoTitle(service: SeoService, location: SeoLocation, intent: SeoIntent): string {
  const serviceLabel = serviceIntentLabel(service, intent);
  return `${serviceLabel} ${locationForCopy(location)} | Duke Street Tyres`;
}

export function buildSeoDescription(service: SeoService, location: SeoLocation, intent: SeoIntent): string {
  const place = locationForCopy(location);
  const roads = joinReadable(location.keyRoads, "nearby routes");
  const postcodes = joinReadable(location.postcodeExamples, "local postcodes");
  const localContext = location.type === "roadCorridor"
    ? `near ${roads}`
    : `around ${postcodes} and ${roads}`;
  return `${serviceIntentLabel(service, intent)} in ${place} for ${INTENT_SUMMARY[intent]}. Call or WhatsApp with your registration, tyre size and exact location; availability and safe access are confirmed before dispatch.`.replace(
    "in " + place + " for same-day tyre help",
    `in ${place} for tyre help ${localContext}`,
  );
}

export function buildSeoH1(service: SeoService, location: SeoLocation, intent: SeoIntent): string {
  return `${serviceIntentLabel(service, intent)} ${locationForCopy(location)}`;
}

export function buildLocalIntro(service: SeoService, location: SeoLocation, intent: SeoIntent): string {
  const place = locationForCopy(location);
  const roads = joinReadable(location.keyRoads, "nearby routes");
  const nearby = joinReadable(location.nearbyLocations.map((item) => item.replace(/-/g, " ")), "nearby areas");
  const landmarks = joinReadable(location.landmarks, "local landmarks");
  const postcodes = joinReadable(location.postcodeExamples, "local postcodes");
  const parent = parentCopy(location);
  const localProof = location.localProofNotes?.[0]
    ? ` ${location.localProofNotes[0]}`
    : "";

  if (location.type === "roadCorridor") {
    return `${serviceIntentLabel(service, intent)} near the ${place} is handled with careful safe-access checks. Share your exact stop, vehicle registration and tyre size before dispatch so the fitter can confirm whether mobile fitting is suitable near ${landmarks}. We describe this as coverage near major routes, not a promise to work in unsafe live-traffic positions.${localProof}`;
  }

  if (location.type === "postcodeArea") {
    return `${serviceIntentLabel(service, intent)} for ${place}${parent} focuses on ${postcodes}, nearby streets and routes such as ${roads}. Call or WhatsApp first so tyre stock, fitter availability and safe access can be confirmed before a van is sent.${localProof}`;
  }

  return `${serviceIntentLabel(service, intent)} in ${place} covers ${LOCATION_TYPE_COPY[location.type]} jobs near ${landmarks}, with nearby coverage around ${nearby}. Send your registration, tyre size and precise location; Duke Street Tyres confirms stock, fitted price and safe access before dispatch.${localProof}`;
}

export function buildBeforeYouCall(service: SeoService, location: SeoLocation): readonly string[] {
  const place = locationForCopy(location);
  const roadAdvice = location.type === "roadCorridor"
    ? "If you are near a major road, move away from traffic and follow emergency guidance before arranging any tyre work."
    : "If the vehicle is roadside, choose the safest nearby kerb, car park or pull-in before fitting is discussed.";
  return [
    `Send your registration, tyre size and exact ${place} location before dispatch.`,
    `Tell us if the vehicle is a car, van, SUV or run-flat fitment so ${service.shortLabel.toLowerCase()} stock can be checked.`,
    roadAdvice,
    "Share a tyre photo only if you can do that safely away from traffic.",
  ];
}

export function buildFaqsForPage(service: SeoService, location: SeoLocation, intent: SeoIntent): readonly FaqItem[] {
  const place = locationForCopy(location);
  const roads = joinReadable(location.keyRoads, "nearby routes");
  const postcodes = joinReadable(location.postcodeExamples, "local postcodes");
  return [
    {
      question: `Do you cover ${place}?`,
      answer: `${place} is treated as a ${location.coverageStatus} mobile tyre service area for ${service.shortLabel.toLowerCase()}. Availability depends on tyre stock, fitter position and safe access at the time you call.`,
    },
    {
      question: "What should I send before a call-out?",
      answer: `Send your registration, tyre size, exact location in or near ${place}, and a photo of the tyre if it is safe to take one. We use that to confirm the fitted price and whether the job can be handled safely.`,
    },
    {
      question: `Can you help near ${roads}?`,
      answer: `We can discuss safe-access mobile tyre help around ${roads}. We do not ask drivers to wait in unsafe live-traffic positions, and dispatch is confirmed only when the location is suitable.`,
    },
    {
      question: `Which postcodes are relevant for ${place}?`,
      answer: location.postcodeExamples.length > 0
        ? `Common local examples include ${postcodes}. If your postcode is nearby, call or WhatsApp and we will confirm coverage before dispatch.`
        : `This page is route-led rather than postcode-led. Share the nearest town, road marker or safe stopping point so we can check coverage.`,
    },
    {
      question: `Is ${place} a separate Duke Street Tyres branch?`,
      answer: `No. ${SITE.name} is based in Glasgow and operates mobile tyre fitting coverage areas. ${place} is a service area page, not a separate office or depot.`,
    },
    {
      question: `Is this page for ${INTENT_SUMMARY[intent]}?`,
      answer: `Yes. The page is matched to ${service.shortLabel.toLowerCase()} and ${INTENT_SUMMARY[intent]}, but every job is still checked for tyre availability, price and safe access before dispatch.`,
    },
  ];
}

export function buildBodySignature(service: SeoService, location: SeoLocation, intent: SeoIntent): string {
  return [
    service.slug,
    intent,
    location.type,
    location.parentSlug ?? "root",
    location.slug,
    location.postcodeExamples.join("|"),
    location.keyRoads.join("|"),
    location.landmarks.join("|"),
  ].join("::").toLowerCase();
}