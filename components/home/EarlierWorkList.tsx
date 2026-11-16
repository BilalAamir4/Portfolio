import { Reveal } from "@/components/Reveal";
import type { EarlierProject } from "@/content/schema";

/** Each row is one link to its repository. Rows rise in 70ms apart (spec 7.2). */
export function EarlierWorkList({ projects }: { projects: readonly EarlierProject[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {projects.map((project, i) => (
        <Reveal as="li" key={project.href} delay={i * 70} className="border-b border-line">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="sweep grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-12 gap-y-1 px-3 py-[22px] text-ink no-underline hover:text-ink"
          >
            <span className="rowname font-display text-[22px] font-semibold">{project.name}</span>
            <span className="text-ink-soft">{project.line}</span>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
