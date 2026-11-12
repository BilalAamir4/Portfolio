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