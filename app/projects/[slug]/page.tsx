import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

// Define the type for params. In Next.js 15+, params is a Promise.
type Props = {
  params: Promise<{ slug: string }>;
};

// Custom Github icon since it's missing from lucide-react
function Github(props: React.SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.1-3.3 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6.2 1.2 5 1.6 5 1.6c-.7 1.7-.2 3-.1 3.3-1 .9-1.5 2-1.5 3.4 0 4.9 3 6.2 6 6.5-.4.4-.8 1.1-.8 2.2v4" />
      <path d="M9 18c-4.5 1.6-5-2-7-2" />
    </svg>
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return { title: project.title };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <Link href="/projects" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
        &larr; Projects
      </Link>
      
      <div className="relative w-full h-[400px] mb-8">
        <Image
          src={project.image}
          alt={project.title}
          fill
          unoptimized={true}
          className="rounded-xl object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold text-white mt-6">{project.title}</h1>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {project.metrics.map((metric) => (
            <span key={metric} className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded font-mono">
              {metric}
            </span>
          ))}
        </div>
      )}

      <p className="text-gray-300 leading-relaxed mt-6 text-lg">
        {project.description}
      </p>

      <div className="flex gap-4 mt-8">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Github size={20} />
            GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ExternalLink size={20} />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
