import {
  buildSitemapUrlSetXml,
  getSeoSitemapChunk,
  sitemapXmlResponse,
} from "@/lib/seo/sitemap";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return sitemapXmlResponse(buildSitemapUrlSetXml(getSeoSitemapChunk(4)));
}