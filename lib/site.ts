import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { agent } from "@/content/projects/agent";
import { insightex } from "@/content/projects/insightex";
import { plantedNote } from "@/content/projects/planted-note";

/**
 * Absolute base URL for metadata, the sitemap and robots.txt.
 * Production reads NEXT_PUBLIC_SITE_URL (no trailing slash needed). On a
 * Vercel deployment without it, the project's production domain is used, so
 * Open Graph links never point at localhost. Locally it falls back to
 * http://localhost:<PORT>.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const siteUrl = resolveSiteUrl();

/**
 * A page that sets `openGraph` or `twitter` replaces the layout's object
 * rather than merging into it, so every page spreads these in.
 */
export function socialMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  // Pages without their own opengraph-image inherit the root one.
  return {
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: "en",
      title,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export type CaseStudyPage = {
  slug: string;
  /** Page h1 and the page's own part of the <title>. */
  title: string;
  description: string;
};

/** Every project with a case study page. The Agentic RAG assistant has none. */
const caseStudyPages = [
  {
    slug: insightex.slug,
    published: insightex.published,
    title: insightex.meta.title,
    description: insightex.meta.description,
  },
  {
    slug: plantedNote.slug,
    published: plantedNote.published,
    title: plantedNote.meta.title,
    description: plantedNote.meta.description,
  },
  {
    slug: agent.slug,
    published: agent.published,
    title: agent.name,
    description: agent.meta.description,
  },
];

/** Published case studies, in page order. Unpublished ones are 404s. */
export function publishedCaseStudies(): CaseStudyPage[] {
  return caseStudyPages.flatMap(({ slug, published, title, description }) =>
    published && slug !== null && title !== null ? [{ slug, title, description }] : [],
  );
}

export function publishedCaseStudy(slug: string): CaseStudyPage | undefined {
  return publishedCaseStudies().find((c) => c.slug === slug);
}
