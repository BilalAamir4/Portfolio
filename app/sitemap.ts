import type { MetadataRoute } from "next";
import { publishedCaseStudies, siteUrl } from "@/lib/site";

/** Home and the published case studies only (spec 8). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    ...publishedCaseStudies().map(({ slug }) => ({ url: `${siteUrl}/work/${slug}` })),
  ];
}
