# Owner to-do

Values only you can supply. Each one is `null` (or needs confirming) in `content/` until you fill it in. `npm run build` refuses to ship a placeholder: it fails if a published project has a required `null`, or if any text contains `[` followed by capital letters.

When a project's README has its "Portfolio facts" block filled in, prompt 5 (`docs/build/prompts/5-sync-project-facts.md`) copies the values across and ticks the boxes here.

## Before launch

- [x] **Certificate 1 name : Machine Learning Specialization.** `content/profile.ts` → `background.certificates.items[0].name`. URL already set: https://coursera.org/share/34f2d5ef4070acd2f9a61f182f1d2334
- [x] **Certificate 2 name.** `content/profile.ts` → `background.certificates.items[1].name`. URL already set: https://coursera.org/share/712773fd156ec00beff0032736461611
- [x] **Certificate 3 name.** `content/profile.ts` → `background.certificates.items[2].name`. URL already set: https://coursera.org/share/8476c5dec1d619f60d6b35b7dbdae591
      A certificate shows only when both its name and URL are set. The issuer, DeepLearning.AI, is already filled in.
- [x] **Insightex role line**, one line on your part of the two-person project. `content/projects/insightex.ts` → `facts.roleLine` (key `roleLine` in the README facts block). Hidden until supplied.
- [ ] **Résumé PDF.** Put the file at `public/resume.pdf`, then set `content/profile.ts` → `contact.resume.href` to `"/resume.pdf"` and `contact.resume.label` to the link text you want. The link stays hidden until both are set.
- [x] **Confirm the LinkedIn URL.** `content/profile.ts` → `contact.links` (LinkedIn), currently `https://www.linkedin.com/in/bilalaamir4`.
- [x] **Production site URL.** Set the environment variable `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`, no trailing slash) in the hosting provider. It is the base for Open Graph, the sitemap, robots.txt and canonical links. See `.env.example`. Without it a Vercel deployment falls back to the project's production `*.vercel.app` domain, and a local build to `http://localhost:3000`. : Use the Vercel address

## Agentic RAG Docs Assistant (published, results pending)

Optional. Until these exist the home page shows "The comparison table goes here once the evaluation runs are finished."

- [ ] `content/projects/agentic-rag.ts` → `facts.results`: one row per variant (Baseline, Corrective RAG, Self-RAG) with `faithfulness`, `answerRelevancy`, `contextPrecision`, `contextRecall`, `medianLatencySeconds`. Leave `null` until every cell is filled.
- [ ] `content/projects/agentic-rag.ts` → `facts.evalSetSize`
- [ ] `content/projects/agentic-rag.ts` → `facts.headline`

## Agent project (unpublished)

Every field below is required before `published` can be set to `true` in `content/projects/agent.ts`. All are keys in the `facts` object of that file and in the README facts block.

- [ ] `name`, the project name (also the case-study page `h1`)
- [ ] `slug`, lowercase letters and hyphens; the page becomes `/work/<slug>`
- [ ] `repoUrl`, the repository link
- [ ] `demoUrl`, the demo recording link
- [ ] `caseStudy.demoLabel` (outside the `facts` object), the text of the demo recording link
- [ ] `homeHeadline`, one sentence with the headline result, shown on the home page
- [ ] `datasetSize`, how many pull requests were prepared with planted bugs
- [ ] `runsPerConfig`, how many times each version ran on the full set
- [ ] `resultsHeadline`, one sentence: which version won and by how much
- [ ] `results`, for each of the four versions (One agent; Orchestrator calling specialists; Plus spawned workers; Plus verifier): `recallPct`, `precisionPct`, `falseAlarmsPerCleanPr`, `costPerReviewUsd`, `medianSeconds`
- [ ] `smallVsLargeLine`, one line on small changes versus large changes, where spawning workers should matter most
- [ ] `caught.bug`, the planted bug it caught, in one sentence
- [ ] `caught.comment`, the review comment the agent posted
- [ ] `missed.bug`, a bug no version found
- [ ] `missed.why`, why it was missed, and what would fix it
- [ ] `limitsLine`, your actual limits on steps, tokens and time
- [ ] `injectionResultLine`, the result of the injection test
- [ ] `costliestAgentLine`, which agent cost the most, and what you did about it
- [ ] `stackLine`, the stack you actually used. The mockup's draft is kept as a comment at the top of `agent.ts`.
- [ ] Replace the mockup's template wording in `agent.ts`: `home.statusLine` ("Planned. Template entry, fill in when built") and `caseStudy.introLine` ("Template page. ..."). The build fails if a published project still contains it.
