# Port Design System From Local Clone

## What This Repo Is

This repository exists for one production skill only:

- `/port-design-system-from-local-clone`

The skill performs a true FULL VISUAL REPLACEMENT of an existing Next.js target project using a local source clone as the only visual source of truth.

The governing rule is mandatory:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

That rule also means:
- the target's old visual system must be removed
- the source visual system must replace it completely
- the target keeps only text, content, routes, and business logic

## Mission

Given:
1. `<source-path>`: absolute path to the local source clone that owns the visual system
2. `<target-path>`: absolute path to the existing Next.js target app that receives the design
3. `<commit-hash>`: optional target baseline commit

Produce a target frontend that is visually identical to the source, with zero residual target visual identity.

## What Gets Replaced

Replace the entire visual layer with source-derived implementation:
- globals, theme tokens, Tailwind config, CSS Modules, Sass, styled-components, and visual wrappers
- font system, type scale, spacing, radius, shadows, gradients, backgrounds, responsive behavior
- navbar, footer, hero, sections, cards, buttons, forms, dialogs, tables, drawers, shells
- hover, focus, active, sticky, loading, and open states
- GSAP, ScrollTrigger, Lenis, parallax, scrub, cinematic motion, and 3D presentation
- source visual assets including images, videos, SVGs, textures, fonts, models, and decorative media

## What Stays From Target

Preserve all non-visual behavior:
- text content and copy
- content data, CMS data, and user data assets
- routes, redirects, rewrites, and dynamic params
- API routes, server actions, auth, middleware, integrations, analytics, form handlers, and business logic

## Non-Negotiable Rules

### 1. No Legacy Visual System Left Behind
- remove old target tokens, visual classes, theme values, and decorative assets
- delete old target visual files once source replacements are wired
- do not finish with a hybrid design

### 2. Source Visual Fidelity
Apply the source literally:
- tokens, typography, spacing, breakpoints, shell structure, and motion values
- GSAP, ScrollTrigger, Lenis, parallax, 3D, and responsive behavior

### 3. Backend Isolation
Never modify:
- API routes
- server actions
- auth logic
- database code
- business logic
- environment configuration

### 4. Asset Policy
- copy the full source visual asset set needed for fidelity
- log absolute source paths for copied assets
- preserve target content-bearing assets when they are business content

### 5. ASSETS REEMPLAZO IA
Always generate:
- `docs/port-design-system/assets-reemplazo-ia.md`

That doc must contain `# ASSETS REEMPLAZO IA` and include:
- every copied key asset
- recommended target path
- usage explanation
- production-ready prompts for tools such as Flux, Kling, or Runway
- business-adapted replacements, including Granja Mari Pepa-specific prompts when applicable

### 6. MCP Requirement
- use Chrome DevTools MCP for deep extraction when available
- use Chrome DevTools MCP after migration to inspect the local target and report whether it looks spectacular and faithful to the source
- if MCP is unavailable, report the block explicitly

## Required Workflow Order

### Phase 0: Setup And Audit
- resolve optional commit safely with stash handling
- validate source and target
- read both trees deeply
- generate docs in `docs/port-design-system/`
- extract the full source visual system
- map target protected surfaces and target legacy visual surfaces to purge

### Phase 1: Global Replacement
- install missing visual dependencies
- replace source globals, tokens, fonts, motion bootstrapping, navbar shell, and footer shell
- remove target legacy theme values and visual globals

### Phase 2: Full Page Port
- port the home page visually end to end
- port every remaining route, including auth and dashboard shells
- pages missing from the source still receive the full source design language

### Phase 3: Assets And Purge
- copy source visual assets
- wire references
- remove obsolete target visual assets and styles
- write purge documentation and asset manifest

### Phase 4: ASSETS REEMPLAZO IA
- generate `assets-reemplazo-ia.md`
- include cinematic prompts and replacement guidance for key assets

### Phase 5: Final MCP QA And Validation
- run the target locally
- inspect the target in Chrome DevTools MCP when available
- report if it looks spectacular and faithful to the source
- run lint, typecheck, and build
- produce final report

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

## Final Completion Report Format

Include:
- Source path
- Target path
- Baseline commit hash used
- Stash reference created, if any
- Package manager used
- Dependency additions
- Files modified with one-line reasons
- Assets copied with absolute source paths
- Legacy visual purge result
- Page QA matrix
- Animation QA matrix
- Chrome DevTools MCP inspection result and verdict
- Lint, typecheck, and build result
- Deployment readiness confirmation
- Known gaps, if any
- A reproduced section titled exactly `ASSETS REEMPLAZO IA`

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

@docs/research/INSPECTION_GUIDE.md
