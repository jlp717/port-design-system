# Port Design System From Local Clone v3.0

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Autonomous visual porting skill for AI coding agents. One command clones the complete design system from any public URL into a Next.js target — tokens, animations, 3D scenes, interactions, dark mode, responsive behavior, and assets.

## The Command

```txt
/port-design-system-from-local-clone "<target-path>" "<source-url>"
```

Example:

```txt
/port-design-system-from-local-clone "/Users/user/projects/my-site" "https://jobyaviation.com"
```

- `<target-path>`: local path to the Next.js project to modify
- `<source-url>`: public URL of the website whose design to clone

## What It Does

The skill instructs the AI to:

1. **Discover** all pages of the source website automatically (nav links + sitemap)
2. **Extract** the complete design system via 7 MCP browser scripts:
   - Design tokens (CSS vars, typography, colors, spacing, shadows, gradients, z-index, breakpoints, @font-face)
   - Animation system (GSAP, Lenis, Framer Motion, CSS keyframes/transitions, IntersectionObserver, RAF, video scrub)
   - DOM structure (sections, grid/flexbox layout, component hierarchy, responsive hints)
   - Interactive states (hover, focus, active, nav behavior, mobile menu)
   - Asset inventory (images, videos, SVGs, fonts, background-images, icons)
   - Three.js/WebGL scenes (camera, lights, meshes, materials, animations)
   - Dark mode (mechanism detection, light/dark token pairs)
3. **Generate** a textual scroll narrative (pseudo-video) for each page
4. **Reconstruct** the design section-by-section in the target
5. **Verify** pixel-perfect fidelity at 3 viewports (375px, 768px, 1440px)
6. **Deliver** complete documentation and AI asset replacement prompts

## Operating Rule

> The source URL is the ONLY visual truth.
> The target must become a visual EXACT COPY of the source.
> Only the target's visible text and business logic are preserved.

## What Gets Replaced

The full visual layer:
- Globals, tokens, Tailwind config, CSS, fonts, type scale, spacing, grids, breakpoints, shadows, gradients
- Navbar, footer, hero, sections, cards, buttons, forms, dialogs
- Hover, focus, active, sticky, open, loading states
- GSAP, ScrollTrigger, Lenis, parallax, video scrub, 3D scenes
- Visual assets (videos, images, SVGs, fonts, textures)
- Dark mode implementation

## What Stays Untouched

The target keeps:
- Text content and copy
- Routes, redirects, rewrites, dynamic params
- API routes, server actions, auth, middleware, analytics
- Business logic, form handlers, data fetching, mutations

## Supported Stack

- Next.js App Router and Pages Router
- Tailwind v3 and v4
- CSS Modules, Sass, styled-components, emotion, vanilla CSS
- GSAP, ScrollTrigger, Lenis, Framer Motion, Three.js, React Three Fiber
- shadcn/ui, Radix, custom component systems

## Installation

```bash
git clone https://github.com/jlp717/port-design-system.git
cd port-design-system
npm install
```

## Deliverables Written Into Target

Before reconstruction:
- `PAGE_MAPPING.md` — auto-generated route mapping
- `ANIMATION_MANIFEST.md` — every animation effect cataloged
- `docs/pds/extraction/` — 7 JSON extraction files + scroll narratives

During migration:
- `docs/pds/modified-files.md`
- `docs/pds/qa-evidence/`

Final:
- `docs/pds/assets-reemplazo-ia.md` — AI prompts for asset generation
- `MIGRATION_COMPLETE.md`

## Generated Platform Files

Source of truth:
- `.claude/skills/port-design-system-from-local-clone/SKILL.md`

Generated to 9 platforms via `node scripts/sync-skills.mjs`:
- `.codex/`, `.github/skills/`, `.cursor/commands/`, `.windsurf/workflows/`,
  `.gemini/commands/`, `.opencode/commands/`, `.augment/commands/`,
  `.continue/commands/`, `.amazonq/cli-agents/`

## Maintenance Commands

```bash
node scripts/sync-skills.mjs        # Sync SKILL.md to all platforms
bash scripts/sync-agent-rules.sh    # Sync AGENTS.md to all platforms
npm run lint
npm run typecheck
npm run build
npm run check
```

## Completion Standard

Complete only when ALL of:
- PAGE_MAPPING: all routes verified
- ANIMATION_MANIFEST: full coverage
- Pixel delta <= 1.5% where applicable
- Computed style PASS where video present
- Build PASS (exit 0)
- Zero legacy visual residues
- Target text preserved
- AI asset prompts documented
- Multi-viewport (375/768/1440) PASS

## License

MIT
