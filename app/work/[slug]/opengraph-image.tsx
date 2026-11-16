import { profile } from "@/content/profile";
import { ogSize, renderOgImage } from "@/lib/og";
import { publishedCaseStudies, publishedCaseStudy } from "@/lib/site";

/** One image per published case study: its name and its lead sentence. */
export function generateStaticParams() {
  return publishedCaseStudies().map(({ slug }) => ({ slug }));
}

const label = (title: string) => `${title} | ${profile.name}`;

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const study = publishedCaseStudy(params.slug);
  if (!study) return [];
  return [{ id: "card", alt: label(study.title), size: ogSize, contentType: "image/png" }];
}

export default async function CaseStudyImage({ params }: { params: Promise<{ slug: string }> }) {
  const study = publishedCaseStudy((await params).slug);
  if (!study) return new Response(null, { status: 404 });
  return renderOgImage({ label: label(study.title), text: study.description });
}
