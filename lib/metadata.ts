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
  // Some legacy and generated titles already include the brand. Resolve it here
  // once and bypass the layout template so every metadata surface stays aligned.
  const suffix = ` | ${SITE.name}`;
  let unbrandedTitle = title.trim();
  while (unbrandedTitle.endsWith(suffix)) {
    unbrandedTitle = unbrandedTitle.slice(0, -suffix.length).trimEnd();
  }
  const pageTitle = `${unbrandedTitle}${suffix}`;

  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical: siteUrl(path) },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_GB",
      url: siteUrl(path),
      title: pageTitle,
      description,
      images: [{ url: DEFAULT_IMAGE, alt: `${SITE.name} mobile tyre fitting van` }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [DEFAULT_IMAGE],
    },
    robots,
  };
}
