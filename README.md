# Port Design System From Local Clone

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Single-skill repository for one high-reliability command:

- `/port-design-system-from-local-clone`

This skill performs a full visual replacement of an existing Next.js target project using a local source clone as the only visual source of truth.

The operating rule is simple and strict:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

## What The Skill Does

Given:
- `source-path`: local source clone that owns the design system
- `target-path`: existing Next.js app that receives the design
- `commit-hash`: optional target baseline commit

It ports the full visual layer from source to target:
- tokens, CSS variables, Tailwind config, CSS Modules, global styles, and theme files
- fonts, font files, type scale, line height, tracking, and text transforms
- navbar, footer, hero, section wrappers, cards, buttons, forms, tables, dialogs, shells
- layout structure, spacing system, breakpoints, responsive behavior, and page rhythm
- GSAP, ScrollTrigger, Lenis, parallax, text reveals, pinned sections, and 3D presentation
- source-owned visual assets such as images, videos, SVGs, textures, icons, gradients, fonts, and models

## What The Skill Preserves

The target keeps:
- text content and copy
- content data and data bindings
- routes, route params, redirects, and rewrites
- API routes, server actions, auth, middleware, integrations, and business logic
- form handlers, validation, and mutation flows

Asset boundary:
- source-owned decorative and UI-owned assets get replaced from source
- target content-bearing media stays when it belongs to CMS, catalog, or user data

## Supported Source And Target Stacks

The skill is intended to be general-purpose across:
- Next.js App Router and Pages Router
- Tailwind v3 and v4
- CSS Modules, Sass, styled-components, emotion, vanilla CSS, or mixed styling
- next/font local and google
- GSAP, ScrollTrigger, Lenis, Three.js, React Three Fiber, Framer Motion, and mixed motion stacks
- shadcn/ui, Radix, custom component systems, auth areas, client areas, dashboards, and admin surfaces

## Why This Repo Exists

The repo is tuned for one job only: make the target look like the source without breaking target behavior.

That means the skill must:
- audit both projects deeply before editing
- optionally check out a safe target baseline when a commit hash is provided
- install missing visual dependencies automatically
- apply the source design language to every target route, including pages not present in the source
- document copied assets and modified files
- finish in a deploy-ready state

## Installation

```bash
git clone https://github.com/jlp717/port-design-system.git
cd port-design-system
npm install
```

## Usage In Codex Or Cursor

Use exactly one of these command forms:

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>"
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

Example without commit:

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa"
```

Example with commit:

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa" "dc376a2cd4a33b9485f550fc8ae7a287f0041c96"
```

## Workflow Summary

1. Phase 0: setup, optional checkout, full audit, extraction report, protected-surface map
2. Phase 1: install dependencies, port tokens, fonts, global motion, navbar, footer
3. Phase 2: port the home page shell and motion
4. Phase 3: port every remaining route, including auth and dashboard shells
5. Phase 4: copy source-owned visual assets and verify references
6. Phase 5: run visual QA, animation QA, and validation commands; produce final report

## Reports Written Into The Target

The target receives docs under `docs/port-design-system/`, including:
- `extraction-report.md`
- `protected-surface-map.md`
- `asset-manifest.md`
- `modified-files.md`

## Repository Structure

Source of truth:
- `.claude/skills/port-design-system-from-local-clone/SKILL.md`

Generated platform files:
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

## Validation Standard

The job is only complete when all of the following are true:
- the target is visually a source twin at desktop and mobile breakpoints
- target text, content data, routes, and business logic still work
- copied visual assets are fully resolved
- lint, typecheck, and build results are reported explicitly
- the final report documents files, assets, QA, and readiness

## License

MIT