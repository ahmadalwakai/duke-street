import type { Metadata } from "next";
import { SITE, siteUrl } from "./site";

type PageMetadataInput = {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly robots?: Metadata["robots"];
};

const DEFAULT_IMAGE = "/photos/van.webp";

export function buildPageMetadata({
  title,
  description,
  path,
  robots = { index: true, follow: true },
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_GB",
      url: siteUrl(path),
      title,
      description,
      images: [{ url: DEFAULT_IMAGE, alt: `${SITE.name} mobile tyre fitting van` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_IMAGE],
    },
    robots,
  };
}