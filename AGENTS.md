<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Conventions
- Component files: PascalCase in /components
- All client components: "use client" must be the literal first line
- Data files: camelCase exports from /data
- Tailwind: use clsx() + twMerge() for all conditional classes
- Images: always next/image, never <img>
- External links: always target="_blank" rel="noopener noreferrer"
- No inline styles anywhere
- TypeScript strict mode is on — no `any` types

# Redesign rules
- All page content comes from files in content/ (added in P2). No user-facing facts (names, numbers, links, dates) are written inside components.
- All colours, fonts, spacing and radii come from the tokens in app/globals.css (@theme). No hex values, arbitrary colour classes or inline style attributes in components.
- One cn() helper in lib/cn.ts, and one icon module in components/icons.tsx. No copies.
- No framer-motion and no animation on load or scroll. Transitions are colour-only, 150 ms or less, and disabled under prefers-reduced-motion.
- Every interactive element is a real link or button, reachable by keyboard, with a visible focus ring.
- Follow DESIGN.md (added in P1) for every visual decision. If something is not specified there, ask; do not invent a style.
- Each module ends with docs/progress/<module>.md recording what was built, the commands run with their real output, decisions and open questions.
- Commit messages are imperative and prefixed with the module id, for example "P3: add design tokens". Never add Co-authored-by or any other AI attribution trailer.
