import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AgentCaseStudy } from "@/components/case/AgentCaseStudy";
import { InsightexCaseStudy } from "@/components/case/InsightexCaseStudy";
import { PlantedNoteCaseStudy } from "@/components/case/PlantedNoteCaseStudy";
import { profile } from "@/content/profile";
import { agent } from "@/content/projects/agent";
import { insightex } from "@/content/projects/insightex";
import { plantedNote } from "@/content/projects/planted-note";
import { publishedCaseStudies, publishedCaseStudy, socialMetadata } from "@/lib/site";

/** The page body for each slug. */
function renderCaseStudy(slug: string): ReactNode {
  if (slug === insightex.slug) return <InsightexCaseStudy />;
  if (slug === plantedNote.slug) return <PlantedNoteCaseStudy />;
  if (slug === agent.slug) return <AgentCaseStudy />;
  return null;
}

/** Only published case studies are built; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudies().map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = publishedCaseStudy((await params).slug);
  if (!study) return {};
  const path = `/work/${study.slug}`;
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: path },
    ...socialMetadata({
      title: `${study.title} | ${profile.name}`,
      description: study.description,
      path,
    }),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const body = publishedCaseStudy(slug) ? renderCaseStudy(slug) : null;
  if (!body) notFound();
  // Case studies use a slightly looser line height than home (spec 5).
  return <div className="leading-[1.6]">{body}</div>;
}
