# Bilal Aamir, portfolio

Personal portfolio for an aspiring AI engineer focused on RAG and agents. It shows retrieval and agent projects with their measured results, and nothing on it is invented: every number comes from the files in `content/`.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4. No UI, animation or icon libraries; all motion is CSS plus two small hooks. The design spec is `docs/build/DESIGN_SPEC.md`.

## Run it

Needs Node 22.18 or later.

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build        # runs the content check first
npm start            # serve the production build
```

Set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`) in production; `.env.example` documents it. It is the base URL for Open Graph images, the sitemap, robots.txt and canonical links. Without it, a Vercel deployment uses the project's production domain and a local build uses `http://localhost:3000`.

## Where content lives

All copy and every number is in `content/`. Components hold no project text.

| File | What it holds |
|---|---|
| `content/profile.ts` | Name, intro, navigation, education, experience, certificates, contact links, footer |
| `content/projects/insightex.ts` | Insightex: home entry, hero demo, case study |
| `content/projects/agentic-rag.ts` | Agentic RAG Docs Assistant: home entry and evaluation results |
| `content/projects/planted-note.ts` | Planted Note: home panel and case study |
| `content/projects/agent.ts` | The multi-agent PR reviewer, unpublished until its results exist |
| `content/projects/earlier.ts` | Earlier ML and NLP projects |
| `content/schema.ts` | Types for all of the above, and which fields may stay empty |

Each project file starts with a `facts` object whose keys match the "Portfolio facts" block in that project's README (see `docs/build/readme-facts-templates.md`). Values that are not known yet are `null`, and `null` is never shown on the site. What is still missing is listed in `docs/build/OWNER_TODO.md`.

## Publishing a project

Every project has `published: true | false`. An unpublished project is left off the home page and the sitemap, and its page returns 404.

To publish one:

1. Fill in the "Portfolio facts" block in the project's README and run prompt 5 (`docs/build/prompts/5-sync-project-facts.md`), or edit the `facts` object in its content file by hand.
2. Set `published: true`.
3. Run `npm run build`. Before building, `scripts/check-content.mjs` fails with a list of problems if a published project still has a required field set to `null`, if any text in `content/` contains a `[PLACEHOLDER]`, or if a published project still has the mockup's template wording. Fix what it lists and build again.

Fields that may stay empty on a published project (the Insightex role line, the RAG results table) are listed in `optionalWhenPublished` in `content/schema.ts`.
