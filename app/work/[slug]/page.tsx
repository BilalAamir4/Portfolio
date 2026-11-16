import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AgentCaseStudy } from "@/components/case/AgentCaseStudy";
import { InsightexCaseStudy } from "@/components/case/InsightexCaseStudy";
import { PlantedNoteCaseStudy } from "@/components/case/PlantedNoteCaseStudy";
import { agent } from "@/content/projects/agent";
import { insightex } from "@/content/projects/insightex";
import { plantedNote } from "@/content/projects/planted-note";

type CaseStudy = {
  slug: string | null;
  published: boolean;
  title: string | null;
  description: string;
  render: () => ReactNode;
};

/** Every project with a case study page. The Agentic RAG assistant has none. */
const caseStudies: CaseStudy[] = [
  {
    slug: insightex.slug,
    published: insightex.published,
    title: insightex.meta.title,
    description: insightex.meta.description,
    render: () => <InsightexCaseStudy />,
  },
  {
    slug: plantedNote.slug,
    published: plantedNote.published,
    title: plantedNote.meta.title,
    description: plantedNote.meta.description,
    render: () => <PlantedNoteCaseStudy />,
  },
  {
    slug: agent.slug,
    published: agent.published,
    title: agent.name,
    description: agent.meta.description,
    render: () => <AgentCaseStudy />,
  },
];

function published(slug: string) {
  return caseStudies.find((c) => c.published && c.slug !== null && c.slug === slug);
}

/** Only published case studies are built; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies
    .filter((c): c is CaseStudy & { slug: string } => c.published && c.slug !== null)
    .map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = published((await params).slug);
  if (!study || !study.title) return {};
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: study.title, description: study.description, url: `/work/${study.slug}` },
    twitter: { title: study.title, description: study.description },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = published((await params).slug);
  if (!study) notFound();
  // Case studies use a slightly looser line height than home (spec 5).
  return <div className="leading-[1.6]">{study.render()}</div>;
}
