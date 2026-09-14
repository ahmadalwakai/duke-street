import type { PageVariant } from "../cities";
import type { SeoIntent, SeoService, SeoServiceSlug } from "./types";

export const SEO_INTENTS: readonly SeoIntent[] = [
  "near-me",
  "emergency",
  "same-day",
  "24-hour",
  "roadside",
  "mobile",
  "local",
  "call-out",
];

export const SEO_SERVICES: readonly SeoService[] = [
  {
    slug: "mobile-tyre-fitting",
    label: "Mobile Tyre Fitting",
    shortLabel: "Mobile fitting",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Mobile tyre fitting in {location} with live availability confirmed before dispatch.",
    introPattern: "Mobile tyre fitting for {location}, with tyre stock and safe access checked before a fitter is dispatched.",
    supported: true,
    emergencyIntent: false,
    indexable: true,
    schemaServiceType: "Mobile tyre fitting",
    relatedServices: [
      "emergency-tyre-fitting",
      "roadside-tyre-replacement",
      "24-hour-mobile-tyre-fitting",
      "flat-tyre-assistance",
      "tyre-call-out",
      "van-tyre-fitting",
      "run-flat-tyre-replacement",
    ],
  },
  {
    slug: "emergency-tyre-fitting",
    label: "Emergency Tyre Fitting",
    shortLabel: "Emergency fitting",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Emergency tyre fitting in {location} for urgent punctures, flats and tyre damage where safe access is available.",
    introPattern: "Emergency tyre fitting for {location}, with a safe-location check before mobile fitting starts.",
    supported: true,
    emergencyIntent: true,
    indexable: true,
    schemaServiceType: "Emergency tyre fitting",
    relatedServices: [
      "mobile-tyre-fitting",
      "roadside-tyre-replacement",
      "24-hour-mobile-tyre-fitting",
      "flat-tyre-assistance",
      "tyre-call-out",
    ],
  },
  {
    slug: "roadside-tyre-replacement",
    label: "Roadside Tyre Replacement",
    shortLabel: "Roadside replacement",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Roadside tyre replacement in {location} for safe kerbsides, car parks and pull-ins.",
    introPattern: "Roadside tyre replacement for {location}, with safe access confirmed before dispatch.",
    supported: true,
    emergencyIntent: true,
    indexable: true,
    schemaServiceType: "Roadside tyre replacement",
    relatedServices: [
      "mobile-tyre-fitting",
      "emergency-tyre-fitting",
      "24-hour-mobile-tyre-fitting",
      "flat-tyre-assistance",
      "tyre-call-out",
    ],
  },
  {
    slug: "24-hour-mobile-tyre-fitting",
    label: "24 Hour Mobile Tyre Fitting",
    shortLabel: "24 hour fitting",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "24 hour mobile tyre fitting in {location}, subject to tyre stock, fitter availability and safe access.",
    introPattern: "24 hour mobile tyre fitting for {location}, with availability confirmed before a van is sent.",
    supported: true,
    emergencyIntent: true,
    indexable: true,
    schemaServiceType: "24 hour mobile tyre fitting",
    relatedServices: [
      "mobile-tyre-fitting",
      "emergency-tyre-fitting",
      "roadside-tyre-replacement",
      "flat-tyre-assistance",
      "tyre-call-out",
    ],
  },
  {
    slug: "mobile-puncture-repair",
    label: "Mobile Puncture Repair",
    shortLabel: "Puncture repair",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Mobile puncture repair pages are held back until the service is explicitly approved.",
    introPattern: "This service is not published until the offer is confirmed.",
    supported: false,
    emergencyIntent: false,
    indexable: false,
    schemaServiceType: "Mobile puncture repair",
    relatedServices: ["mobile-tyre-fitting", "flat-tyre-assistance"],
  },
  {
    slug: "flat-tyre-assistance",
    label: "Flat Tyre Assistance",
    shortLabel: "Flat tyre help",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Flat tyre assistance in {location} with mobile fitting options confirmed by phone or WhatsApp.",
    introPattern: "Flat tyre assistance for {location}, covering safe kerbside, driveway and car park jobs where availability allows.",
    supported: true,
    emergencyIntent: true,
    indexable: true,
    schemaServiceType: "Flat tyre assistance",
    relatedServices: [
      "mobile-tyre-fitting",
      "emergency-tyre-fitting",
      "roadside-tyre-replacement",
      "tyre-call-out",
      "24-hour-mobile-tyre-fitting",
    ],
  },
  {
    slug: "tyre-call-out",
    label: "Tyre Call Out",
    shortLabel: "Tyre call-out",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Tyre call-out in {location} for mobile fitting and safe roadside tyre help.",
    introPattern: "Tyre call-out support for {location}, with tyre size, stock and access checked before dispatch.",
    supported: true,
    emergencyIntent: true,
    indexable: true,
    schemaServiceType: "Tyre call-out",
    relatedServices: [
      "mobile-tyre-fitting",
      "emergency-tyre-fitting",
      "roadside-tyre-replacement",
      "flat-tyre-assistance",
      "24-hour-mobile-tyre-fitting",
    ],
  },
  {
    slug: "same-day-tyre-fitting",
    label: "Same Day Tyre Fitting",
    shortLabel: "Same day fitting",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Same day tyre fitting pages are held back until this claim is approved for SEO use.",
    introPattern: "This service is not published until the same-day offer is confirmed.",
    supported: false,
    emergencyIntent: false,
    indexable: false,
    schemaServiceType: "Same day tyre fitting",
    relatedServices: ["mobile-tyre-fitting", "24-hour-mobile-tyre-fitting"],
  },
  {
    slug: "van-tyre-fitting",
    label: "Van Tyre Fitting",
    shortLabel: "Van tyres",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Van tyre fitting in {location} with reinforced tyre availability confirmed before dispatch.",
    introPattern: "Van tyre fitting for {location}, with load-rated tyre availability checked before a mobile fitter is sent.",
    supported: true,
    emergencyIntent: false,
    indexable: true,
    schemaServiceType: "Van tyre fitting",
    relatedServices: [
      "mobile-tyre-fitting",
      "emergency-tyre-fitting",
      "roadside-tyre-replacement",
      "24-hour-mobile-tyre-fitting",
    ],
  },
  {
    slug: "run-flat-tyre-replacement",
    label: "Run Flat Tyre Replacement",
    shortLabel: "Run-flat replacement",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Run-flat tyre replacement in {location} with tyre size and stock confirmed before dispatch.",
    introPattern: "Run-flat tyre replacement for {location}, subject to the exact tyre size being available on the van.",
    supported: true,
    emergencyIntent: false,
    indexable: true,
    schemaServiceType: "Run-flat tyre replacement",
    relatedServices: [
      "mobile-tyre-fitting",
      "roadside-tyre-replacement",
      "emergency-tyre-fitting",
      "24-hour-mobile-tyre-fitting",
    ],
  },
  {
    slug: "locking-wheel-nut-help",
    label: "Locking Wheel Nut Help",
    shortLabel: "Locking nut help",
    h1Pattern: "{service} in {location}",
    titlePattern: "{service} {location}",
    descriptionPattern: "Locking wheel nut help pages are held back until this service is explicitly approved.",
    introPattern: "This service is not published until the offer is confirmed.",
    supported: false,
    emergencyIntent: false,
    indexable: false,
    schemaServiceType: "Locking wheel nut help",
    relatedServices: ["mobile-tyre-fitting", "roadside-tyre-replacement"],
  },
];

export const SEO_SERVICE_BY_SLUG: ReadonlyMap<SeoServiceSlug, SeoService> = new Map(
  SEO_SERVICES.map((service) => [service.slug, service]),
);

export const DEFAULT_INTENT_BY_SERVICE: Readonly<Record<SeoServiceSlug, SeoIntent>> = {
  "mobile-tyre-fitting": "local",
  "emergency-tyre-fitting": "emergency",
  "roadside-tyre-replacement": "roadside",
  "24-hour-mobile-tyre-fitting": "24-hour",
  "mobile-puncture-repair": "local",
  "flat-tyre-assistance": "emergency",
  "tyre-call-out": "call-out",
  "same-day-tyre-fitting": "same-day",
  "van-tyre-fitting": "local",
  "run-flat-tyre-replacement": "local",
  "locking-wheel-nut-help": "local",
};

export const LEGACY_VARIANT_TO_SERVICE: Readonly<Record<PageVariant, SeoServiceSlug>> = {
  "mobile-tyre-fitting": "mobile-tyre-fitting",
  "emergency-tyre-call-out": "emergency-tyre-fitting",
  "24-hour-mobile-tyre-fitting": "24-hour-mobile-tyre-fitting",
  "roadside-tyre-replacement": "roadside-tyre-replacement",
};

export function getSeoService(slug: string): SeoService | null {
  return SEO_SERVICE_BY_SLUG.get(slug as SeoServiceSlug) ?? null;
}

export function isSeoServiceSlug(slug: string): slug is SeoServiceSlug {
  return SEO_SERVICE_BY_SLUG.has(slug as SeoServiceSlug);
}

export function getLegacyCanonicalPath(variant: PageVariant, citySlug: string): string {
  return `/${LEGACY_VARIANT_TO_SERVICE[variant]}/${citySlug}`;
}

export function getDefaultIntent(serviceSlug: SeoServiceSlug): SeoIntent {
  return DEFAULT_INTENT_BY_SERVICE[serviceSlug];
}