# Prompt 5 of 6: sync project facts from the READMEs

Use this whenever a project is finished or its numbers change. Before running it, add the "Portfolio facts" block from `docs/build/readme-facts-templates.md` to that project's README and fill it in.

Paste everything below this line into Claude Code, in the portfolio folder.

---

Update the portfolio's content from the project READMEs. You may edit only files in `content/` and `docs/build/OWNER_TODO.md`. Do not change components, styles, copy that is not listed below, or anything else.

Sources, one per project. Fetch each README from GitHub's raw URL on the default branch. If a fetch fails, ask me for a local path. Do not guess.

| Project | Repository | Content file |
|---|---|---|
| Insightex | `BilalAamir4/Insightex-ASR-Hybrid-RAG-FYP` | `content/projects/insightex.ts` |
| Agentic RAG Docs Assistant | `BilalAamir4/Agentic-RAG-Docs-Assistant` | `content/projects/agentic-rag.ts` |
| Planted Note | `BilalAamir4/Rag-Prompt-Injection-Security` | `content/projects/planted-note.ts` |
| Agent project | ask me for the repository if `content/projects/agent.ts` has no `repoUrl` | `content/projects/agent.ts` |

How to read a README:

1. Find the section headed `## Portfolio facts`. Inside it is one fenced `json` block. That block is the only source of values. Parse it as JSON.
2. If the section or the block is missing, or the JSON does not parse, skip that project, change nothing for it, and tell me exactly what is wrong.
3. Map each JSON key to the content field of the same name, following `content/schema.ts`. `docs/build/readme-facts-templates.md` lists every key per project.
4. A key that is absent or `null` in the JSON leaves the current content value unchanged. Never write a value that is not in the JSON. Never estimate, round, reword or fill a gap from the rest of the README or from memory.
5. Check each value's type and range against the schema before writing: percentages are numbers from 0 to 100, counts are whole numbers, URLs start with `https://`, text fields are plain sentences with no square brackets. Reject a bad value, leave the field unchanged, and report it.

Publishing:

- After updating, set `published: true` for a project only if every field the schema marks as required is non-null. Otherwise leave it as it is and list the missing fields.
- For the Agentic RAG Docs Assistant, `results` is filled only when all three variants have all metrics. Partial results stay `null`.
- Never set `published` to `false` yourself.

Then:

1. Run `node scripts/check-content.mjs`, `npx tsc --noEmit` and `npm run build`. All must pass. If the build fails because of a value you wrote, revert that value and report it.
2. Update `docs/build/OWNER_TODO.md`: tick what is now filled, list what is still missing.
3. Show me a table of every change: project, field, old value, new value. Then a list of fields still `null` per project, and any values you rejected with the reason.
4. Commit with the message "Sync project facts" and the names of the projects updated.
5. If the site is already deployed (a `.vercel` folder or a Git remote exists), push to `main`, wait for the Vercel deployment to finish, then open the live pages you changed with the Claude in Chrome browser tools in a new tab and confirm the new values show. If it is not deployed yet, do not push.
