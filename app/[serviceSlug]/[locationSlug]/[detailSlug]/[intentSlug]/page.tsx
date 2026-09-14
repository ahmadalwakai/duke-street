import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticSeoPage } from "@/components/pages/ProgrammaticSeoPage";
import {
  buildSeoMetadata,
  getIndexableSeoPageBySegments,
  getStaticSeoPagesBySegmentCount,
} from "@/lib/seo/seo-pages";

type RouteParams = {
  readonly serviceSlug: string;
  readonly locationSlug: string;
  readonly detailSlug: string;
  readonly intentSlug: string;
};

type PageProps = {
  readonly params: Promise<RouteParams>;
};

export function generateStaticParams(): RouteParams[] {
  return getStaticSeoPagesBySegmentCount(4).map((page) => ({
    serviceSlug: page.routeSegments[0],
    locationSlug: page.routeSegments[1],
    detailSlug: page.routeSegments[2],
    intentSlug: page.routeSegments[3],
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug, locationSlug, detailSlug, intentSlug } = await params;
  const page = getIndexableSeoPageBySegments([serviceSlug, locationSlug, detailSlug, intentSlug]);
  if (!page) return { robots: { index: false, follow: false } };
  return buildSeoMetadata(page);
}

export default async function Page({ params }: PageProps) {
  const { serviceSlug, locationSlug, detailSlug, intentSlug } = await params;
  const page = getIndexableSeoPageBySegments([serviceSlug, locationSlug, detailSlug, intentSlug]);
  if (!page) notFound();
  return <ProgrammaticSeoPage page={page} />;
}