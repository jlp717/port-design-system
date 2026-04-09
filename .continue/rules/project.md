<!-- AUTO-GENERATED from AGENTS.md - do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

---
description: Project conventions for Port Design System From Local Clone
alwaysApply: true
---
# Port Design System From Local Clone

## What This Repo Is

This repository exists for one production skill only:

- `/port-design-system-from-local-clone`

That skill performs a complete frontend visual replacement of an existing Next.js target project using a local source clone as the only visual source of truth.

The governing rule is not optional:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

Repeat it during planning, implementation, and QA:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

## Mission

Given:
1. `<source-path>`: absolute path to the local source clone that owns the visual system
2. `<target-path>`: absolute path to the existing Next.js target app that receives the design
3. `<commit-hash>`: optional target baseline commit

Produce a target frontend that is visually identical to the source while preserving target text content, content data, routes, auth, server actions, API routes, and business logic.

## What Gets Replaced

Replace the complete visual layer with the source system:
- tokens, CSS variables, theme files, Tailwind config, CSS Modules, styled-components, and global styles
- font setup, font files, type scale, line height, tracking, text transforms
- navbar, footer, hero, sections, cards, buttons, forms, modals, tables, empty states, shells
- layout structure, section order, spacing scale, grid system, breakpoints, responsive behavior
- GSAP, ScrollTrigger, Lenis, parallax, pinned sections, scrub behaviors, text reveals, 3D presentation
- source-owned visual assets such as images, videos, textures, SVGs, icons, gradients, Lottie files, fonts, and 3D models

## What Stays From Target

Preserve all non-visual concerns:
- text content and copy
- content data, CMS data, database-driven data, and user data assets
- route contracts, route groups, redirects, rewrites, and dynamic params
- API routes, server actions, middleware, auth, integrations, analytics, form handlers, and business logic

Asset rule:
- replace source-owned decorative or UI-owned assets
- preserve target content-bearing media and user data assets when they belong to content, catalog, CMS, or account data
- if an asset is ambiguous, preserve the target content asset and restyle the surrounding shell

## Supported Scope

The skill must be general-purpose across:
- source Next.js projects using App Router or Pages Router
- target Next.js projects using App Router or Pages Router
- Tailwind v3, Tailwind v4, CSS Modules, Sass, styled-components, emotion, vanilla CSS, or mixed styling
- next/font google and next/font local
- GSAP, ScrollTrigger, Lenis, Three.js, React Three Fiber, Framer Motion, Motion One, or mixed motion stacks
- shadcn/ui, Radix, custom component systems, auth areas, dashboards, admin panels, and client areas

## Input Contract

Use exactly:

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>"
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

Quoted Windows paths are required whenever the path contains spaces.

## Hard Constraints

### 1. Source-Owned Visual Fidelity
Apply literally:
- CSS token values
- typography values
- spacing and radius scales
- hover, focus, active, and scrolled states
- animation timings, eases, staggers, delays, scrubs, pins, and trigger points
- breakpoint behavior and layout shifts
- source visual shell structure and rhythm

### 2. Backend Isolation
Never modify:
- API routes
- server actions
- auth logic
- database schema or queries
- business logic
- environment configuration

### 3. Content Integrity
Preserve:
- target text content
- target content data
- target route structure
- target data-fetching and mutation flows

### 4. Asset Policy
- use the source as the only visual asset truth
- never reference source visuals from an external CDN
- copy source visual assets locally into the target
- keep absolute source paths for every copied asset in the docs

### 5. MCP Policy
- use Chrome DevTools MCP for deep extraction in Phase 0 when available
- use Chrome DevTools MCP for visual QA in Phase 5 when available

### 6. Deployment Readiness
At completion the target must be push-ready:
- no temporary files
- no broken imports
- no unresolved asset refs
- validation results reported exactly

## Required Workflow Order

### Phase 0: Setup And Deep Audit
1. If commit is provided, resolve it safely in target with stash handling when the tree is dirty.
2. If commit is not provided, work from the current target state without discarding edits.
3. Validate source and target.
4. Read both trees deeply.
5. Create `docs/port-design-system/` in target.
6. Produce:
   - `docs/port-design-system/extraction-report.md`
   - `docs/port-design-system/protected-surface-map.md`
   - `docs/port-design-system/asset-manifest.md`
   - `docs/port-design-system/modified-files.md`

### Phase 1: Global Base
Apply globally in target:
- dependency installation for missing visual packages
- source token system
- font setup
- base utilities and theme scopes
- Lenis and GSAP bootstrapping where used
- navbar shell
- footer shell

### Phase 2: Home Page
Apply source visual structure and motion to the home page end to end while preserving target text and behavior.

### Phase 3: Remaining Pages
Apply the same standard to every route, including:
- services and product pages
- about and contact pages
- legal pages
- auth, client area, admin, and dashboard shells
- dynamic routes

Pages that do not exist in the source still receive the full source design language. They are not token-only leftovers.

### Phase 4: Asset Integration
1. Copy required source-owned visual assets.
2. Fix every runtime reference.
3. Update `docs/port-design-system/asset-manifest.md` with absolute source paths.
4. Update `docs/port-design-system/modified-files.md` with all touched files.

### Phase 5: QA And Final Report
1. Run visual QA page by page on desktop and mobile.
2. Run animation QA.
3. Run lint, typecheck, and build where available.
4. Confirm no protected-surface regressions.
5. Produce the final completion report.

## Required Per-Phase Output Format

After every phase output exactly:

```txt
1. Files modified
- <path>: one-line change summary

2. Assets used
- <absolute source path>

3. Phase checklist
- [PASS|FAIL] <item>
```

If a phase uses no new assets, write `- none` under Assets used.

## Final Completion Report Format

Include:
- Source path
- Target path
- Baseline commit hash used
- Stash reference created, if any
- Files modified list with one-line reason
- Assets copied with absolute source paths
- Dependency additions with package manager used
- Page QA matrix with PASS or FAIL
- Animation QA matrix with PASS or FAIL
- Build, typecheck, and lint result
- Deployment readiness confirmation
- Known gaps, if any

## Maintenance Notes

Source of truth:
- `.claude/skills/port-design-system-from-local-clone/SKILL.md`

Generated platform outputs:
- `.codex/skills/port-design-system-from-local-clone/SKILL.md`
- `.github/skills/port-design-system-from-local-clone/SKILL.md`
- `.cursor/commands/port-design-system-from-local-clone.md`
- `.windsurf/workflows/port-design-system-from-local-clone.md`
- `.gemini/commands/port-design-system-from-local-clone.toml`
- `.opencode/commands/port-design-system-from-local-clone.md`
- `.augment/commands/port-design-system-from-local-clone.md`
- `.continue/commands/port-design-system-from-local-clone.md`
- `.amazonq/cli-agents/port-design-system-from-local-clone.json`

After editing the skill source of truth, run:
- `node scripts/sync-skills.mjs`

After editing `AGENTS.md`, run:
- `bash scripts/sync-agent-rules.sh`

# Local Clone Inspection Guide

## Goal
Extract the complete visual system from a local source clone so it can be ported to a separate target Next.js project with literal fidelity.

## Inputs
- `<source-path>`: local clone with desired design language
- `<target-path>`: production Next.js app receiving the visual port
- `<commit-hash>`: baseline target commit

## Phase 0 Extraction Checklist

### Design tokens
- [ ] Every css custom property in `:root`, `.dark`, and scoped blocks
- [ ] Full color system values
- [ ] Typography system: font family, size, line-height, letter-spacing, weights
- [ ] Spacing, radius, shadow, blur, z-index tokens
- [ ] Responsive breakpoints and media queries

### Animation system
- [ ] Lenis constructor options and raf wiring
- [ ] GSAP global config and plugin registration
- [ ] All timelines with exact values
- [ ] ScrollTrigger trigger/start/end/scrub/pin settings
- [ ] Parallax multipliers and transform maps
- [ ] Hover/focus transitions and easing curves
- [ ] 3D scene settings if present

### Component mapping
- [ ] Navbar visual shell and states
- [ ] Footer visual shell and states
- [ ] Home page section ordering and behavior
- [ ] Inner page section equivalents
- [ ] Auth/client area visual wrappers only

### Asset mapping
- [ ] Fonts used by source
- [ ] Images, videos, SVGs, models used by source UI
- [ ] Absolute source paths recorded for every copied asset

### Protected target surface
- [ ] API routes listed (read-only)
- [ ] server actions listed (read-only)
- [ ] auth/business logic files listed (read-only)

## Recommended MCP Steps
If Chrome DevTools MCP is available:
1. Load source app route-by-route.
2. Capture computed styles for body, headings, nav, buttons, cards, footer.
3. Inspect runtime animation registrations (GSAP/ScrollTrigger) where accessible.
4. Validate key breakpoints at 390, 768, 1024, 1440 widths.

## Target Verification Checklist
- [ ] `npm run build` passes after each phase
- [ ] no broken asset references
- [ ] no backend/auth/server-action edits
- [ ] visual QA pass for each page and animation
- [ ] final report includes PASS/FAIL per check item
