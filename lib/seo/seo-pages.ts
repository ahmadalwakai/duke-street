import { buildPageMetadata } from "../metadata";
import {
  breadcrumbSchema,
  faqSchema,
  programmaticServiceSchema,
  type BreadcrumbItem,
} from "../schema";
import { siteUrl } from "../site";
import {
  buildBeforeYouCall,
  buildBodySignature,
  buildFaqsForPage,
  buildLocalIntro,
  buildSeoDescription,
  buildSeoH1,
  buildSeoTitle,
} from "./content";
import {
  findLocationsBySlugs,
  getDirectSeoLocation,
  getLocationDisplayName,
  getLocationKey,
  getLocationPathSegments,
  getParentSeoLocation,
  getPriorityLocations,
  SEO_LOCATIONS,
} from "./locations";
import {
  getDefaultIntent,
  getSeoService,
  SEO_INTENTS,
  SEO_SERVICES,
} from "./services";
import type {
  SeoIntent,
  SeoInternalLink,
  SeoLocation,
  SeoPage,
  SeoPageCandidateInput,
  SeoQualityResult,
  SeoService,
  SeoServiceSlug,
} from "./types";

// Caps each dynamic route depth during build; remaining valid pages render on demand.
export const SEO_STATIC_PARAMS_LIMIT = 200;

function normalizePath(path: string): string {
  if (path === "/") return path;
  return `/${path.split("/").filter(Boolean).join("/")}`;
}

function pagePath(service: SeoService, location: SeoLocation, intent: SeoIntent): string {
  const routeSegments = [service.slug, ...getLocationPathSegments(location)];
  const defaultIntent = getDefaultIntent(service.slug);
  if (intent !== defaultIntent) routeSegments.push(intent);
  return `/${routeSegments.join("/")}`;
}

function routeSegmentsFromPath(path: string): readonly string[] {
  return normalizePath(path).split("/").filter(Boolean);
}

function hasLocalSubstance(location: SeoLocation): boolean {
  return (
    location.nearbyLocations.length > 0 ||
    location.postcodeExamples.length > 0 ||
    location.keyRoads.length > 0 ||
    Boolean(location.localProofNotes?.length)
  );
}

function unsafeIntentReason(service: SeoService, location: SeoLocation, intent: SeoIntent): string | null {
  if (intent === "same-day") {
    return "Same-day intent is held back until that claim is explicitly approved.";
  }
  if (service.slug === "mobile-tyre-fitting" && intent === "24-hour") {
    return "Dedicated 24 hour mobile tyre fitting service pages own this intent.";
  }
  if (service.slug === "mobile-puncture-repair") {
    return "Mobile puncture repair is not confirmed as a publishable service.";
  }
  if (service.slug === "locking-wheel-nut-help") {
    return "Locking wheel nut help is not confirmed as a publishable service.";
  }
  if (service.slug === "same-day-tyre-fitting") {
    return "Same-day tyre fitting is not confirmed as a publishable service.";
  }
  if (location.type === "roadCorridor" && intent === "near-me") {
    return "Near-me intent is not suitable for road corridor pages.";
  }
  return null;
}

export function shouldIndexSeoPage(pageCandidate: SeoPageCandidateInput): SeoQualityResult {
  const reasons: string[] = [];
  const { service, location, intent, title, description, intro } = pageCandidate;
  const unsafeReason = unsafeIntentReason(service, location, intent);

  if (!service.supported) reasons.push("Service is not confirmed as supported.");
  if (!service.indexable) reasons.push("Service is not approved for indexation.");
  if (!location.indexable) reasons.push(location.disabledReason ?? "Location is not approved for indexation.");
  if (location.coverageStatus !== "core" && location.coverageStatus !== "nearby") {
    reasons.push(`Location coverage status is ${location.coverageStatus}.`);
  }
  if (location.contentDepth === "thin") reasons.push("Location content depth is thin.");
  if (!hasLocalSubstance(location)) reasons.push("Location lacks nearby areas, postcodes, roads or local proof notes.");
  if (unsafeReason) reasons.push(unsafeReason);
  if (title.length < 30 || title.length > 80) reasons.push("Title length is outside the safe SEO range.");
  if (description.length < 100 || description.length > 240) reasons.push("Description length is outside the safe SEO range.");
  if (intro.length < 180) reasons.push("Intro copy is too short for a useful local page.");

  return { indexable: reasons.length === 0, reasons };
}

function getSitemapPriority(service: SeoService, location: SeoLocation, intent: SeoIntent): number {
  const locationScore = location.priority === 1 ? 0.17 : location.priority === 2 ? 0.11 : 0.06;
  const serviceScore = service.emergencyIntent ? 0.08 : 0.05;
  const intentScore = intent === getDefaultIntent(service.slug) ? 0.06 : 0.02;
  const raw = 0.62 + locationScore + serviceScore + intentScore;
  return Math.min(0.98, Number(raw.toFixed(2)));
}

function getChangeFrequency(location: SeoLocation): SeoPage["changeFrequency"] {
  if (location.coverageStatus === "core") return "weekly";
  if (location.contentDepth === "strong") return "weekly";
  return "monthly";
}

function buildBreadcrumbs(service: SeoService, location: SeoLocation, path: string): readonly BreadcrumbItem[] {
  const parent = getParentSeoLocation(location);
  const crumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Scotland Coverage", path: "/mobile-tyre-fitting-scotland" },
  ];
  if (parent) {
    crumbs.push({ name: parent.name, path: pagePath(service, parent, getDefaultIntent(service.slug)) });
  }
  crumbs.push({ name: `${service.label} ${getLocationDisplayName(location)}`, path });
  return crumbs;
}

function buildLink(service: SeoService, location: SeoLocation, label: string, description?: string): SeoInternalLink {
  return {
    label,
    href: pagePath(service, location, getDefaultIntent(service.slug)),
    ...(description ? { description } : {}),
  };
}

export function getParentLocationLink(page: Pick<SeoPage, "service" | "location">): SeoInternalLink | undefined {
  const parent = getParentSeoLocation(page.location);
  if (!parent) return undefined;
  return buildLink(
    page.service,
    parent,
    `${page.service.shortLabel} ${parent.name}`,
    `Parent coverage page for ${getLocationDisplayName(page.location)}.`,
  );
}

export function getNearbyLocationLinks(page: Pick<SeoPage, "service" | "location">, limit = 8): readonly SeoInternalLink[] {
  const locations = findLocationsBySlugs(page.location.nearbyLocations, page.location.parentSlug).filter(
    (location) => location.indexable && location.coverageStatus !== "future",
  );
  return locations.slice(0, limit).map((location) => buildLink(
    page.service,
    location,
    `${page.service.shortLabel} ${getLocationDisplayName(location)}`,
    `Nearby tyre help around ${getLocationDisplayName(location)}.`,
  ));
}

export function getRelatedServiceLinks(page: Pick<SeoPage, "service" | "location">, limit = 6): readonly SeoInternalLink[] {
  return page.service.relatedServices
    .map((slug) => getSeoService(slug))
    .filter((service): service is SeoService => Boolean(service?.supported && service.indexable))
    .slice(0, limit)
    .map((service) => buildLink(
      service,
      page.location,
      `${service.label} ${getLocationDisplayName(page.location)}`,
      `Related service for the same local area.`,
    ));
}

export function getPriorityCoverageLinks(page: Pick<SeoPage, "service" | "location">, limit = 12): readonly SeoInternalLink[] {
  return getPriorityLocations(limit)
    .filter((location) => getLocationKey(location) !== getLocationKey(page.location))
    .slice(0, limit)
    .map((location) => buildLink(
      page.service,
      location,
      `${page.service.shortLabel} ${location.name}`,
      `Priority Scotland coverage for ${location.name}.`,
    ));
}

function buildInternalLinks(page: Pick<SeoPage, "service" | "location">): {
  readonly parentLocationLink?: SeoInternalLink;
  readonly nearbyLinks: readonly SeoInternalLink[];
  readonly relatedServiceLinks: readonly SeoInternalLink[];
  readonly priorityCoverageLinks: readonly SeoInternalLink[];
  readonly internalLinks: readonly SeoInternalLink[];
} {
  const parentLocationLink = getParentLocationLink(page);
  const nearbyLinks = getNearbyLocationLinks(page, 8);
  const relatedServiceLinks = getRelatedServiceLinks(page, 6);
  const priorityCoverageLinks = getPriorityCoverageLinks(page, 12);
  const fixedLinks: readonly SeoInternalLink[] = [
    { label: "Scotland coverage", href: "/mobile-tyre-fitting-scotland", description: "Core and nearby Scotland service areas." },
    { label: "Home", href: "/", description: "Duke Street Tyres homepage." },
  ];
  const internalLinks = [
    ...(parentLocationLink ? [parentLocationLink] : []),
    ...nearbyLinks,
    ...relatedServiceLinks,
    ...priorityCoverageLinks.slice(0, 4),
    ...fixedLinks,
  ];
  return {
    ...(parentLocationLink ? { parentLocationLink } : {}),
    nearbyLinks,
    relatedServiceLinks,
    priorityCoverageLinks,
    internalLinks,
  };
}

function createSeoPage(service: SeoService, location: SeoLocation, intent: SeoIntent): SeoPage {
  const slugPath = pagePath(service, location, intent);
  const title = buildSeoTitle(service, location, intent);
  const description = buildSeoDescription(service, location, intent);
  const h1 = buildSeoH1(service, location, intent);
  const intro = buildLocalIntro(service, location, intent);
  const candidate: SeoPageCandidateInput = {
    service,
    location,
    intent,
    slugPath,
    canonicalUrl: siteUrl(slugPath),
    title,
    description,
    h1,
    intro,
    bodySignature: buildBodySignature(service, location, intent),
  };
  const quality = shouldIndexSeoPage(candidate);
  const routeSegments = routeSegmentsFromPath(slugPath);
  const faqs = buildFaqsForPage(service, location, intent);
  const breadcrumbs = buildBreadcrumbs(service, location, slugPath);
  const linkGroups = buildInternalLinks({ service, location });
  return {
    ...candidate,
    serviceSlug: service.slug,
    locationSlug: location.slug,
    indexable: quality.indexable,
    ...(quality.reasons.length > 0 ? { noindexReason: quality.reasons.join(" ") } : {}),
    faqs,
    breadcrumbs,
    beforeYouCall: buildBeforeYouCall(service, location),
    schema: [
      programmaticServiceSchema({
        serviceName: h1,
        serviceType: service.schemaServiceType,
        path: slugPath,
        areaName: getLocationDisplayName(location),
        areaRegion: location.region,
        areaType: location.type === "city" ? "City" : "Place",
      }),
      faqSchema(faqs),
      breadcrumbSchema(breadcrumbs),
    ],
    sitemapPriority: getSitemapPriority(service, location, intent),
    changeFrequency: getChangeFrequency(location),
    routeSegments,
    ...linkGroups,
  };
}

function applyDuplicateQuality(pages: readonly SeoPage[]): readonly SeoPage[] {
  const titleCounts = new Map<string, number>();
  const descriptionCounts = new Map<string, number>();
  const bodyCounts = new Map<string, number>();

  for (const page of pages) {
    if (!page.indexable) continue;
    titleCounts.set(page.title, (titleCounts.get(page.title) ?? 0) + 1);
    descriptionCounts.set(page.description, (descriptionCounts.get(page.description) ?? 0) + 1);
    bodyCounts.set(page.bodySignature, (bodyCounts.get(page.bodySignature) ?? 0) + 1);
  }

  return pages.map((page) => {
    if (!page.indexable) return page;
    const reasons: string[] = [];
    if ((titleCounts.get(page.title) ?? 0) > 1) reasons.push("Duplicate SEO title detected.");
    if ((descriptionCounts.get(page.description) ?? 0) > 1) reasons.push("Duplicate SEO description detected.");
    if ((bodyCounts.get(page.bodySignature) ?? 0) > 1) reasons.push("Body content signature is too similar to another page.");
    if (reasons.length === 0) return page;
    return {
      ...page,
      indexable: false,
      noindexReason: [page.noindexReason, ...reasons].filter(Boolean).join(" "),
    };
  });
}

let cachedPages: readonly SeoPage[] | null = null;

export function generateSeoPageCandidates(): readonly SeoPage[] {
  if (cachedPages) return cachedPages;
  const pages: SeoPage[] = [];
  for (const service of SEO_SERVICES) {
    for (const location of SEO_LOCATIONS) {
      for (const intent of SEO_INTENTS) {
        pages.push(createSeoPage(service, location, intent));
      }
    }
  }
  cachedPages = applyDuplicateQuality(pages);
  return cachedPages;
}

export function getIndexableSeoPages(): readonly SeoPage[] {
  return generateSeoPageCandidates().filter((page) => page.indexable);
}

export function getSeoPageByPath(path: string): SeoPage | null {
  const normalized = normalizePath(path);
  return generateSeoPageCandidates().find((page) => page.slugPath === normalized) ?? null;
}

export function getSeoPageBySegments(segments: readonly string[]): SeoPage | null {
  const exactPage = getSeoPageByPath(`/${segments.join("/")}`);
  if (exactPage) return exactPage;

  const [serviceSlug, locationSlug, detailSlug] = segments;
  if (!serviceSlug || !locationSlug || segments.length < 2 || segments.length > 3) return null;

  const service = getSeoService(serviceSlug);
  const roadCorridor = getDirectSeoLocation(locationSlug);
  if (!service || roadCorridor?.type !== "roadCorridor") return null;

  const aliasSegments = [service.slug, ...getLocationPathSegments(roadCorridor), ...(detailSlug ? [detailSlug] : [])];
  return getSeoPageByPath(`/${aliasSegments.join("/")}`);
}

export function getIndexableSeoPageBySegments(segments: readonly string[]): SeoPage | null {
  const page = getSeoPageBySegments(segments);
  return page?.indexable ? page : null;
}

export function getStaticSeoPagesBySegmentCount(segmentCount: number, limit = SEO_STATIC_PARAMS_LIMIT): readonly SeoPage[] {
  return getIndexableSeoPages()
    .filter((page) => page.routeSegments.length === segmentCount)
    .slice(0, limit);
}

export function buildSeoMetadata(page: SeoPage) {
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: page.slugPath,
    robots: page.indexable ? { index: true, follow: true } : { index: false, follow: false },
  });
}

export function getLocationForDirectRoute(locationSlug: string): SeoLocation | null {
  return getDirectSeoLocation(locationSlug);
}

export function getPathForServiceLocation(
  serviceSlug: SeoServiceSlug,
  location: SeoLocation,
  intent?: SeoIntent,
): string {
  const service = getSeoService(serviceSlug);
  if (!service) return "/";
  return pagePath(service, location, intent ?? getDefaultIntent(serviceSlug));
}