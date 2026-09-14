import type { MetadataRoute } from "next";
import type { BreadcrumbItem, FaqItem } from "../schema";

export type SeoServiceSlug =
  | "mobile-tyre-fitting"
  | "emergency-tyre-fitting"
  | "roadside-tyre-replacement"
  | "24-hour-mobile-tyre-fitting"
  | "mobile-puncture-repair"
  | "flat-tyre-assistance"
  | "tyre-call-out"
  | "same-day-tyre-fitting"
  | "van-tyre-fitting"
  | "run-flat-tyre-replacement"
  | "locking-wheel-nut-help";

export type SeoIntent =
  | "near-me"
  | "emergency"
  | "same-day"
  | "24-hour"
  | "roadside"
  | "mobile"
  | "local"
  | "call-out";

export type SeoLocationType =
  | "city"
  | "town"
  | "village"
  | "district"
  | "neighbourhood"
  | "postcodeArea"
  | "roadCorridor";

export type CoverageStatus = "core" | "nearby" | "extended" | "future";
export type ContentDepth = "strong" | "medium" | "thin";
export type LocationPriority = 1 | 2 | 3 | 4 | 5;

export type SeoService = {
  readonly slug: SeoServiceSlug;
  readonly label: string;
  readonly shortLabel: string;
  readonly h1Pattern: string;
  readonly titlePattern: string;
  readonly descriptionPattern: string;
  readonly introPattern: string;
  readonly supported: boolean;
  readonly emergencyIntent: boolean;
  readonly indexable: boolean;
  readonly schemaServiceType: string;
  readonly relatedServices: readonly SeoServiceSlug[];
};

export type SeoLocation = {
  readonly slug: string;
  readonly name: string;
  readonly type: SeoLocationType;
  readonly parentSlug?: string;
  readonly councilArea: string;
  readonly region: string;
  readonly postcodeExamples: readonly string[];
  readonly nearbyLocations: readonly string[];
  readonly keyRoads: readonly string[];
  readonly landmarks: readonly string[];
  readonly latitude?: number;
  readonly longitude?: number;
  readonly priority: LocationPriority;
  readonly coverageStatus: CoverageStatus;
  readonly indexable: boolean;
  readonly contentDepth: ContentDepth;
  readonly localProofNotes?: readonly string[];
  readonly disabledReason?: string;
};

export type SeoInternalLink = {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
};

export type SeoQualityResult = {
  readonly indexable: boolean;
  readonly reasons: readonly string[];
};

export type SeoPageCandidateInput = {
  readonly service: SeoService;
  readonly location: SeoLocation;
  readonly intent: SeoIntent;
  readonly slugPath: string;
  readonly canonicalUrl: string;
  readonly title: string;
  readonly description: string;
  readonly h1: string;
  readonly intro: string;
  readonly bodySignature: string;
};

export type SeoPage = SeoPageCandidateInput & {
  readonly serviceSlug: SeoServiceSlug;
  readonly locationSlug: string;
  readonly indexable: boolean;
  readonly noindexReason?: string;
  readonly faqs: readonly FaqItem[];
  readonly internalLinks: readonly SeoInternalLink[];
  readonly nearbyLinks: readonly SeoInternalLink[];
  readonly relatedServiceLinks: readonly SeoInternalLink[];
  readonly parentLocationLink?: SeoInternalLink;
  readonly priorityCoverageLinks: readonly SeoInternalLink[];
  readonly breadcrumbs: readonly BreadcrumbItem[];
  readonly schema: readonly Record<string, unknown>[];
  readonly beforeYouCall: readonly string[];
  readonly sitemapPriority: number;
  readonly changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  readonly routeSegments: readonly string[];
};

export type SeoSitemapEntry = {
  readonly url: string;
  readonly lastModified: Date;
  readonly changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  readonly priority: number;
};