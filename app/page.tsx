import Hero from "@/components/Hero";
import MotionWrapper from "@/components/MotionWrapper";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />

      <MotionWrapper delay={0.2}>
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-muted hover:text-foreground transition-colors flex items-center gap-1"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </MotionWrapper>
    </>
  );
}
