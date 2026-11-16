# Prompt 3 of 6: case study pages

Paste everything below this line into Claude Code after prompt 2 is finished and committed.

---

Re-read `docs/build/DESIGN_SPEC.md` and the three case study mockups: `Insightex.dc.html`, `PlantedNote.dc.html`, `AgentReview.dc.html`. Build `app/work/[slug]/page.tsx` so each published project with a case study renders at `/work/<slug>`. Match each mockup exactly: sections, order, copy, sizes, behaviour.

Routing:

- `generateStaticParams` returns only published projects that have a case study. Set `dynamicParams = false` so any other slug is a 404.
- Slugs: `insightex`, `planted-note`, and the agent project's `slug` field from content.
- Each page sets its own title and meta description from content.
- The header on case study pages shows the name linking home and a "Back to all work" link, with the same scroll progress bar.

Insightex page: intro, the problem, `PipelineStepper` with the optional-track note, the 8 GB section with `MemoryBars`, `DecisionLedger` (7 rows), "What works today" and "What is still hard", back link. The role line renders only if it is not `null`.

Planted Note page: intro, the attack with the planted note figure and its highlighter draw, `DefenseSwitcher`, what the numbers say, where the measuring was wrong, how it is built (4 rows), what comes next, back link.

Agent page: build it fully from `AgentReview.dc.html`, with `AgentRunDiagram` and `ResultsTable`. Every bracketed value comes from `content/projects/agent.ts`. The project is unpublished, so the route is a 404 for now. To test, temporarily publish it with dummy values, check the page, then revert. Do not commit dummy values.

Build every motion and interaction in spec section 7 that applies. Follow the component paragraphs in 7.5 exactly. The detail panels in `PipelineStepper` and `DefenseSwitcher` must replay their slide-in on every change: use a React `key`.

The memory bars are a chart for sighted users only: give the wrapper `role="img"` and the `aria-label` from the mockup. Tables use real `<table>`, `<th scope>` and scroll sideways inside their own box on narrow screens.

Also build `app/not-found.tsx`: the same header and footer, a short heading, one sentence, and a link home, in the site's style.

Done when all of these are true. Check each one and report the result:

- `npm run lint`, `npx tsc --noEmit` and `npm run build` pass with zero warnings.
- `/work/insightex` and `/work/planted-note` render. `/work/anything-else` and the agent slug return 404.
- Each motion item that applies works. List them one by one with pass or fail.
- Keyboard, no-JavaScript and reduced-motion checks pass on both pages, as in prompt 2.
- At 390px wide nothing scrolls sideways except inside the results table's own box.
- Every number on both pages matches `content/`, and `content/` matches the mockup. Spot-check ten values and list them.

Browser checks: use the Claude in Chrome browser tools to open the local dev server in a new tab (never reuse or close my open tabs), resize the window to the widths asked for, read the console, and operate the page. Do the checks yourself; do not ask me to do them. If the browser tools are not connected, say so and continue with the checks you can run.

Commit with the message "Case study pages".
