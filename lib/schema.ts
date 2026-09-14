import { CITIES, ENABLED_SCOTLAND_SERVICE_AREAS, type CitySlug } from "./cities";
import { SITE, siteUrl } from "./site";

type JsonLd = Record<string, unknown>;

type AreaServed = {
  "@type": "City" | "Place";
  name: string;
  address?: {
    "@type": "PostalAddress";
    addressRegion: string;
    addressCountry: string;
  };
};

export type FaqItem = { question: string; answer: string };

export type BreadcrumbItem = {
  readonly name: string;
  readonly path: string;
};

export type ProgrammaticServiceSchemaInput = {
  readonly serviceName: string;
  readonly serviceType: string;
  readonly path: string;
  readonly areaName: string;
  readonly areaRegion: string;
  readonly areaType?: "City" | "Place";
};

function placeArea(name: string, region: string): AreaServed {
  return {
    "@type": "Place",
    name,
    address: {
      "@type": "PostalAddress",
      addressRegion: region,
      addressCountry: SITE.address.country,
    },
  };
}

function cityArea(city: CitySlug): AreaServed[] {
  const area = CITIES[city];
  return [
    {
      "@type": "City",
      name: area.name,
      address: {
        "@type": "PostalAddress",
        addressRegion: area.countyOrRegion,
        addressCountry: SITE.address.country,
      },
    },
    ...area.nearbyAreas.map((name) => placeArea(name, area.countyOrRegion)),
  ];
}

function scotlandServiceAreas(): AreaServed[] {
  return ENABLED_SCOTLAND_SERVICE_AREAS.map((area) =>
    placeArea(area.name, area.countyOrRegion),
  );
}

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": siteUrl("/#organization"),
    name: SITE.legalName,
    alternateName: SITE.alternateName,
    url: siteUrl("/"),
    logo: siteUrl("/logo.svg"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneE164,
        contactType: "customer service",
        areaServed: "GB-SCT",
        availableLanguage: "English",
      },
    ],
    sameAs: [SITE.googleMapsUrl],
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteUrl("/#website"),
    name: SITE.name,
    url: siteUrl("/"),
    inLanguage: "en-GB",
    publisher: { "@id": siteUrl("/#organization") },
  };
}

export function localBusinessSchema(city?: CitySlug): JsonLd {
  const selectedCity = city ? CITIES[city] : null;
  const areaServed = city ? cityArea(city) : scotlandServiceAreas();
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": siteUrl("/#business"),
    name: SITE.name,
    alternateName: SITE.alternateName,
    image: siteUrl("/photos/van.webp"),
    url: siteUrl("/"),
    telephone: SITE.phoneE164,
    priceRange: SITE.priceRange,
    hasMap: SITE.googleMapsUrl,
    sameAs: [SITE.googleMapsUrl],
    parentOrganization: { "@id": siteUrl("/#organization") },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: selectedCity?.lat ?? SITE.geo.lat,
      longitude: selectedCity?.lng ?? SITE.geo.lng,
    },
    areaServed,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
}

export function serviceSchema(
  serviceName: string,
  city?: CitySlug,
  path = "/",
): JsonLd {
  const areaServed = city ? cityArea(city) : scotlandServiceAreas();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl(path)}#service`,
    name: serviceName,
    serviceType: serviceName,
    url: siteUrl(path),
    provider: { "@id": siteUrl("/#business") },
    areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: SITE.phoneE164,
      availableLanguage: "English",
    },
  };
}

export function programmaticServiceSchema({
  serviceName,
  serviceType,
  path,
  areaName,
  areaRegion,
  areaType = "Place",
}: ProgrammaticServiceSchemaInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl(path)}#service`,
    name: serviceName,
    serviceType,
    url: siteUrl(path),
    provider: { "@id": siteUrl("/#business") },
    areaServed: [
      {
        "@type": areaType,
        name: areaName,
        address: {
          "@type": "PostalAddress",
          addressRegion: areaRegion,
          addressCountry: SITE.address.country,
        },
      },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: SITE.phoneE164,
      availableLanguage: "English",
    },
  };
}

export function breadcrumbSchema(items: readonly BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  };
}

export function faqSchema(items: readonly FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export function jsonLdScript(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}