import type { MetadataRoute } from "next";
import { SITE, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const host = new URL(SITE.domain).host;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thanks", "/api/", "/admin/", "/private/", "/debug/"],
      },
    ],
    sitemap: siteUrl("/sitemap.xml"),
    host,
  };
}
