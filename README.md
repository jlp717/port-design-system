# Port Design System From Local Clone

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Single-skill repository for one command:

- `/port-design-system-from-local-clone`

This repo exists to define and distribute one high-reliability skill for FULL VISUAL REPLACEMENT of a Next.js target from a local source clone.

The operating rule is strict:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

## What This Skill Guarantees

The skill is designed to:
- make the target visually identical to the source
- remove the target's old visual system entirely
- preserve target text, content data, routes, and business logic
- copy source visual assets into the target
- generate an `ASSETS REEMPLAZO IA` appendix with cinematic prompts for adapted asset generation
- inspect the local target with Chrome DevTools MCP when available and report whether it looks spectacular and faithful to the source

## What Gets Replaced

The full visual layer is in scope:
- globals, tokens, Tailwind config, CSS Modules, Sass, styled-components, and presentational wrappers
- font system, type scale, spacing, grids, breakpoints, shadows, gradients, radii, and surfaces
- navbar, footer, hero, sections, cards, buttons, forms, dialogs, tables, tabs, drawers, and shells
- hover, focus, active, sticky, open, and loading states
- GSAP, ScrollTrigger, Lenis, parallax, scrub, cinematic motion, and 3D presentation
- source-owned visual assets including videos, images, SVGs, fonts, models, textures, and decorative media

## What Stays Untouched

The target keeps:
- text content and copy
- content data, CMS data, and user data assets
- routes, redirects, rewrites, and dynamic params
- API routes, server actions, auth, middleware, analytics, integrations, and business logic
- form handlers, validation logic, data fetching, and mutation flows

## Legacy Visual Purge

This skill is not a merge strategy.
It explicitly requires removal of the target's legacy visual system:
- old target tokens must be removed or replaced
- old target visual classes and wrappers must be removed or rewritten
- old target decorative assets must be removed when the source equivalents are installed
- the final target cannot remain a visual hybrid

## ASSETS REEMPLAZO IA

After migration the skill must generate:
- `docs/port-design-system/assets-reemplazo-ia.md`

That doc must contain `# ASSETS REEMPLAZO IA` and list the copied source assets, including for each key asset:
- exact filename
- recommended target path
- usage in the UI
- production-ready prompt for Flux, Kling, Runway, or similar tools
- business adaptation guidance

If the target business is Granja Mari Pepa, the prompts must explicitly adapt the visuals to Granja Mari Pepa.

## Supported Stack Variants

The skill is intended to be general-purpose across:
- Next.js App Router and Pages Router
- Tailwind v3 and v4
- CSS Modules, Sass, styled-components, emotion, vanilla CSS, or mixed styling
- next/font local and google
- GSAP, ScrollTrigger, Lenis, Framer Motion, Three.js, React Three Fiber, and mixed motion stacks
- shadcn/ui, Radix, custom component systems, dashboards, auth pages, client areas, and admin panels

## Installation

```bash
git clone https://github.com/jlp717/port-design-system.git
cd port-design-system
npm install
```

## Usage In Codex Or Cursor

Use exactly:

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>"
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

Example:

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa"
```

With commit:

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa" "dc376a2cd4a33b9485f550fc8ae7a287f0041c96"
```

## Workflow Summary

1. Setup, optional checkout, deep audit, source extraction, protected-surface map, legacy visual purge plan
2. Global visual replacement, font port, motion bootstrapping, navbar and footer replacement
3. Home page and remaining pages full visual port
4. Full source asset copy and reference verification
5. Legacy visual purge verification
6. `ASSETS REEMPLAZO IA` generation
7. Final Chrome DevTools MCP local inspection and validation

## Docs Written Into The Target

The target must receive docs under `docs/port-design-system/`, including:
- `extraction-report.md`
- `protected-surface-map.md`
- `source-asset-inventory.md`
- `legacy-visual-purge.md`
- `asset-manifest.md`
- `modified-files.md`
- `assets-reemplazo-ia.md`

## Generated Platform Files

Source of truth:
- `.claude/skills/port-design-system-from-local-clone/SKILL.md`

Generated outputs:
- `.codex/skills/port-design-system-from-local-clone/SKILL.md`
- `.github/skills/port-design-system-from-local-clone/SKILL.md`
- `.cursor/commands/port-design-system-from-local-clone.md`
- `.windsurf/workflows/port-design-system-from-local-clone.md`
- `.gemini/commands/port-design-system-from-local-clone.toml`
- `.opencode/commands/port-design-system-from-local-clone.md`
- `.augment/commands/port-design-system-from-local-clone.md`
- `.continue/commands/port-design-system-from-local-clone.md`
- `.amazonq/cli-agents/port-design-system-from-local-clone.json`

## Maintenance Commands

```bash
node scripts/sync-skills.mjs
bash scripts/sync-agent-rules.sh
npm run lint
npm run typecheck
npm run build
npm run check
```

## Completion Standard

The job is only complete when all of the following are true:
- the target is visually a source twin on desktop and mobile
- the target's old visual system is gone
- copied assets are fully wired
- `ASSETS REEMPLAZO IA` exists and is useful
- Chrome DevTools MCP local inspection was performed when available and reported honestly
- lint, typecheck, and build status are reported explicitly

## License

MIT
