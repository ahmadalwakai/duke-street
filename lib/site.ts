export type SiteConfig = {
  readonly name: string;
  readonly legalName: string;
  readonly alternateName: string;
  readonly tagline: string;
  readonly phoneDisplay: string;
  readonly phoneE164: string;
  readonly whatsappDisplay: string;
  readonly whatsappE164: string;
  readonly defaultWaMessage: string;
  readonly address: {
    readonly street: string;
    readonly city: string;
    readonly region: string;
    readonly postalCode: string;
    readonly country: string;
  };
  readonly geo: { readonly lat: number; readonly lng: number };
  readonly hours: string;
  readonly responseTime: string;
  readonly domain: string;
  readonly priceRange: string;
  readonly googleMapsUrl: string;
  readonly googleMapsShortUrl: string;
};

export const SITE: SiteConfig = {
  name: "Duke Street Tyres",
  legalName: "Duke Street Tyres",
  alternateName: "Duke Street Tyres",
  tagline: "24/7 Mobile Tyre Fitting — Glasgow, Edinburgh & Dundee",
  phoneDisplay: "0333 015 2519",
  phoneE164: "+443330152519",
  whatsappDisplay: "07423 262 955",
  whatsappE164: "447423262955",
  defaultWaMessage: "Hi, I need mobile tyre fitting",
  address: {
    street: "3, 10 Gateside St",
    city: "Glasgow",
    region: "Glasgow City",
    postalCode: "G31 1PD",
    country: "GB",
  },
  geo: { lat: 55.8579876, lng: -4.2106679 },
  hours: "24/7",
  responseTime: "30–40 mins",
  domain: "https://www.dukestreettyres.com",
  priceRange: "££",
  googleMapsUrl:
    "https://maps.app.goo.gl/sqZLL3ArLuSmnsJj7?g_st=ic",
  googleMapsShortUrl: "https://maps.app.goo.gl/sqZLL3ArLuSmnsJj7?g_st=ic",
};

export function telHref(): string {
  return `tel:${SITE.phoneE164}`;
}

export function waHref(msg?: string): string {
  const text = encodeURIComponent(msg ?? SITE.defaultWaMessage);
  return `https://wa.me/${SITE.whatsappE164}?text=${text}`;
}

export function siteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? SITE.domain : `${SITE.domain}${normalizedPath}`;
}

const SHARED_DUKE_BOOKING_URL = "https://www.tyrerescue.uk/book?sourceApp=duke_street_tyres";

export function bookingHref(params?: URLSearchParams): string {
  const configured = process.env.NEXT_PUBLIC_DUKE_SHARED_BOOKING_URL?.trim();
  const selfBookingUrl = siteUrl("/book");
  const base =
    configured && configured !== selfBookingUrl
      ? configured
      : process.env.NODE_ENV === "development"
        ? "http://localhost:3026/book"
        : SHARED_DUKE_BOOKING_URL;
  const query = params?.toString();

  if (!query) return base;
  return `${base}${base.includes("?") ? "&" : "?"}${query}`;
}
