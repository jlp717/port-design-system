---
description: "Full visual replacement of a Next.js target from a local source clone, including legacy-style purge, full source asset copy, ASSETS REEMPLAZO IA appendix generation, and final Chrome DevTools MCP fidelity inspection."
argument-hint: "<source-path> <target-path> [<commit-hash>]"
---
<!-- AUTO-GENERATED from .claude/skills/port-design-system-from-local-clone/SKILL.md - do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# /port-design-system-from-local-clone

## Core Purpose

Perform a FULL VISUAL REPLACEMENT of the target using the source as the only visual truth.

Repeat this rule before every meaningful decision:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

Repeat it again when editing files:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

Repeat it one last time before declaring success:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

This skill is not a theme merge, not a token merge, and not a partial redesign. It is a full replacement of the target's visual system.

## Exact Command Forms

Accept exactly these command forms:

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>"
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

Parse `$ARGUMENTS` as:
1. `<source-path>`: absolute path to the local source clone that owns the visual system
2. `<target-path>`: absolute path to the existing Next.js target project that will receive the design
3. `<commit-hash>`: optional target baseline commit

Argument rules:
- Preserve quoted Windows paths exactly.
- Do not split inside quoted strings.
- If `$ARGUMENTS` is missing, recover the same values from the user request.
- If fewer than two absolute paths are available, stop and ask for the missing path.
- If a commit hash is present, use it as an optional baseline state only. Never rewrite history.

## What Success Looks Like

The target must be visually indistinguishable from the source when compared side by side in a browser.

That means matching literally:
- layout and section order
- type system and font rendering
- spacing, rhythm, and proportions
- backgrounds, surfaces, gradients, borders, and shadows
- hover, focus, active, open, sticky, and scrolled states
- GSAP timelines, ScrollTrigger behavior, Lenis behavior, parallax, scrub effects, and 3D presentation
- desktop and mobile responsive behavior
- navbar, footer, hero, section shells, cards, forms, tables, dialogs, and every other visual wrapper

The only things that remain from the target are:
- text and content
- routes and route params
- backend, auth, data fetching, server actions, API routes, and business logic

## FULL VISUAL REPLACEMENT Means Zero Legacy Visual Surface

The source is the only visual truth.
The target's legacy visual system must be removed.

Do not keep any target-origin visual artifact just because it is convenient.
That includes:
- old CSS tokens
- old Tailwind theme values
- old visual utility classes
- old CSS Modules and Sass partials
- old styled-components or emotion styles
- old visual wrappers in components
- old decorative assets from the target
- old animations, transitions, and interaction styling
- old radius, shadow, gradient, and spacing systems

If a legacy target visual definition is no longer source-derived, remove it or replace it.
If a legacy target file exists only to support the old design, delete it.
If a file mixes logic and visuals, preserve the logic and rewrite the visual shell completely.

The target must not finish with a hybrid identity.

## What Must Be Replaced Completely

Replace the complete target frontend visual layer, including:
- `globals.css` and any other global style entrypoint
- Tailwind theme config, `@theme` blocks, theme token files, and design-token modules
- font setup, font files, font variables, font smoothing, variable axes, font fallbacks used by the source
- CSS custom properties in every scope
- component shells and presentational wrappers
- layout shells, grid systems, spacing scales, container widths, breakpoint behavior
- navbars, menus, drawers, footers, heroes, feature sections, CTA sections, cards, badges, chips, tabs, tables, lists, forms, modals, accordions, pagination, empty states, toasts, skeletons
- hover, focus, active, disabled, selected, visited, loading, sticky, scrolled, and open states
- animations and motion libraries, including GSAP, ScrollTrigger, Lenis, Framer Motion, Motion One, Three.js or React Three Fiber presentation code when used visually
- parallax, pinned sections, scrub videos, split-text reveals, cinematic transitions, background media behavior, depth effects, and 3D presentation
- all source-owned visual assets: images, hero videos, SVGs, masks, textures, icons, fonts, Lottie files, shaders, models, and decorative media

## What Must Never Change

Never modify the target's non-visual behavior:
- API routes
- server actions
- auth logic
- middleware and permissions
- database code and queries
- business rules and calculations
- form handlers and validation logic
- analytics and third-party integrations
- route structure, route params, redirects, and rewrites
- text content, labels, descriptions, button text, legal copy, CMS content, and user-facing copy
- data fetching and mutation flows

If a component contains both logic and visuals:
- keep the logic intact
- rebuild the presentation layer so it looks like the source

## Asset Policy

Copy all source visual assets needed to reproduce the source faithfully.
Treat the source asset tree as authoritative for presentation.

Copy categories include:
- hero videos
- background images and overlays
- section textures and patterns
- SVG icons, illustrations, masks, and logos used visually
- fonts and font files
- Lottie files and JSON animations
- 3D models, shaders, HDRIs, or media used by visual scenes
- card, section, and footer media
- any imported asset referenced from source components or CSS

Target content-bearing assets can remain when they are business content rather than decorative visual-system assets. When in doubt:
- preserve target content assets
- still copy the full source visual asset set
- style the target content inside the source shell

## Required Legacy Visual Purge

This skill must explicitly purge the target's old visual system.

Do all of the following:
1. Inventory every target visual file, token file, CSS Module, Sass file, styled-component, Tailwind theme entry, and design asset.
2. Mark each item as one of:
   - replace completely
   - rewrite in place while preserving logic
   - keep only if it is non-visual or content-bearing
3. Remove or overwrite old target visual tokens so the source system is the only active system.
4. Delete unused target visual assets and style files once the source replacements are wired.
5. Search the target for stale target token names, old color constants, old typography utilities, and old class patterns. Remove or replace them.
6. Confirm no legacy target visual system remains active at runtime.

The post-migration target must not contain a mixed visual identity.

## Supported Source And Target Variants

Support these combinations without changing the mission:
- source or target using App Router
- source or target using Pages Router
- Tailwind v3 or Tailwind v4
- CSS Modules, Sass, vanilla CSS, styled-components, emotion, or mixed styling
- `next/font/google` and `next/font/local`
- GSAP, `@gsap/react`, ScrollTrigger, Lenis, Framer Motion, Motion One
- Three.js, React Three Fiber, Drei, or visual canvas scenes
- shadcn/ui, Radix, custom UI systems, dashboards, client areas, auth pages, admin panels

## Detection Checklist

Before editing, inspect:
- `package.json` and lockfiles in source and target
- `next.config.*`, `tailwind.config.*`, `postcss.config.*`
- `app/`, `pages/`, `src/app/`, `src/pages/`
- `public/` and any asset directories used by imported media
- `globals.css`, `layout.*`, `_app.*`, `_document.*`
- imports for `gsap`, `@gsap/react`, `ScrollTrigger`, `lenis`, `@studio-freight/lenis`, `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `motion`, `styled-components`, `@emotion`, `next/font`
- presentational components and any file mixing visuals with behavior

Detect the package manager from lockfiles:
- `pnpm-lock.yaml` -> use `pnpm`
- `yarn.lock` -> use `yarn`
- `bun.lock` or `bun.lockb` -> use `bun`
- otherwise use `npm`

Install missing visual dependencies automatically. Never remove target dependencies unless a dependency exists only for the removed legacy visual system and is provably unused after migration.

## Mandatory Docs Generated In The Target

Always create and maintain these docs inside the target:
- `docs/port-design-system/extraction-report.md`
- `docs/port-design-system/protected-surface-map.md`
- `docs/port-design-system/source-asset-inventory.md`
- `docs/port-design-system/legacy-visual-purge.md`
- `docs/port-design-system/asset-manifest.md`
- `docs/port-design-system/modified-files.md`
- `docs/port-design-system/assets-reemplazo-ia.md`

`assets-reemplazo-ia.md` must contain a top-level heading exactly equal to:

```md
# ASSETS REEMPLAZO IA
```

## Mandatory Workflow Order

### Phase 0 - Setup, Baseline, And Deep Audit

1. Resolve `<source-path>` and `<target-path>`.
2. Validate source and target.
3. If `<commit-hash>` exists:
   - enter target
   - verify the commit resolves
   - inspect `git status --short`
   - if dirty, create a safe stash including untracked files and record the stash reference
   - checkout the requested commit
4. If `<commit-hash>` does not exist:
   - work from current target state
   - record whether the tree was already dirty
5. Read source and target deeply before edits.
6. Create the target docs listed above.
7. Build the extraction report, protected-surface map, source asset inventory, and initial legacy-visual-purge plan.

Extract literally from the source:
- every CSS custom property
- every typography value
- every layout rule and breakpoint shift
- every hover/focus/active state
- every GSAP, ScrollTrigger, Lenis, parallax, scrub, or 3D presentation value
- every component shell and page shell
- every visual asset path

Map in the target:
- routes and layouts
- API routes and server actions
- auth and middleware
- business logic modules
- visual files to purge or overwrite

### Phase 0b - Chrome DevTools MCP Extraction

When Chrome DevTools MCP is available, use it during audit.
This is mandatory when the tool is available.

If the source can run locally or is reachable:
- inspect desktop at 1440 width
- inspect mobile at 390 width
- inspect computed styles for body, headings, nav, buttons, cards, forms, footer, and hero media
- inspect runtime GSAP timelines and ScrollTrigger state when accessible
- inspect scroll behavior and responsive transitions

If MCP is unavailable, state that explicitly in the report.

### Phase 1 - Dependency And Global Foundation Replacement

1. Install any missing visual dependencies used by the source.
2. Replace the target's global visual foundation with the source foundation.
3. Port source fonts exactly.
4. Port source globals and theme scopes exactly.
5. Remove target legacy tokens and theme values that are not source-derived.
6. Port global motion bootstrapping, including Lenis, GSAP plugin registration, ScrollTrigger setup, and source-specific presentation providers.
7. Verify the target still builds.

This phase is not a merge-first phase. It is a replacement-first phase.
Only preserve target code required for non-visual behavior.

### Phase 2 - Structural Shell Replacement

Replace the target's core page shells with source-derived shells:
- root layout shell
- navbar shell
- footer shell
- page wrappers
- section containers
- shell-level responsive behavior

Preserve only target logic, routes, and dynamic data wiring.

### Phase 3 - Home Page Full Port

Rebuild the home page so it looks like the source home page in structure, motion, and feel:
- hero media composition
- section ordering
- reveal choreography
- parallax layers
- scrub or pinned sections
- cards, CTA blocks, and transitions

Target text and content stay, but every visual wrapper must be source-derived.

### Phase 4 - All Remaining Pages Full Port

Apply the same standard to every route in the target, including pages not present in the source.

For pages without a direct source equivalent:
- derive the shell from source primitives
- use source cards, forms, table chrome, surfaces, spacing, buttons, inputs, tabs, badges, filters, and section patterns
- ensure those pages still feel native to the source system

For auth, client area, dashboard, and admin pages:
- preserve every handler, session guard, mutation, and permission boundary
- replace the entire visual shell with source-derived presentation
- do not settle for token-only styling

### Phase 5 - Full Asset Copy And Reference Verification

Copy the full set of source visual assets needed for fidelity.
For each copied asset, record:
- absolute source path
- absolute or repo-relative target destination
- asset purpose
- pages or components where it is used

Then:
- update every import or URL reference
- remove obsolete target visual assets no longer needed
- verify no broken asset references remain

### Phase 6 - ASSETS REEMPLAZO IA

After the full visual migration is complete, generate:
- `docs/port-design-system/assets-reemplazo-ia.md`

That file must contain a section titled exactly `ASSETS REEMPLAZO IA` and include a complete list of copied source assets.

For every key asset, provide all of the following:
1. exact source filename
2. recommended exact target destination path
3. asset role in the experience
4. where it appears in the target UI
5. what business adaptation is recommended
6. an ultra-detailed prompt for generating the adapted asset
7. recommended generation tool or tool family such as Flux for still images, Kling for cinematic motion, or Runway for video
8. implementation notes for replacing the copied source asset later

Key assets must include at minimum:
- hero video or hero background media
- section backgrounds
- large cards or featured media
- CTA media
- footer or divider media when present
- any signature visual asset that materially defines the look

Prompt-writing rules for `ASSETS REEMPLAZO IA`:
- tailor prompts to the target business context inferred from the target app's content, metadata, repo name, and page copy
- if the target is Granja Mari Pepa, explicitly write Granja Mari Pepa-specific prompts
- prompts must be cinematic, detailed, and production-ready
- prompts must describe framing, lighting, atmosphere, motion, lens feel, color palette, texture, composition, subject matter, exclusions, and intended emotion
- prompts must be practical for real tools such as Flux, Kling, and Runway
- explain clearly how the generated asset will replace the copied source asset without breaking layout fidelity

### Phase 7 - Legacy Visual Purge Verification

Before final QA, verify the purge is complete:
- confirm old target token systems are gone
- confirm old target visual utility classes are gone or no longer used
- confirm old target CSS Modules or styled visual wrappers are deleted or overwritten
- confirm old target decorative assets are removed if replaced
- confirm no runtime screen still renders the legacy design
- document the result in `docs/port-design-system/legacy-visual-purge.md`

### Phase 8 - Final Local QA With Chrome DevTools MCP

After migration, run the target locally and inspect it with Chrome DevTools MCP.
This final MCP pass is mandatory when the tool is available.

Required final QA flow:
1. run the target locally
2. open the local target in Chrome DevTools MCP
3. inspect desktop and mobile views
4. compare target against source behavior and presentation
5. verify scroll behavior, hover states, animations, sticky states, and media loading
6. verify there are no obvious fidelity gaps
7. report plainly whether the result looks spectacular and faithful to the source

If Chrome DevTools MCP is unavailable, say so explicitly and mark the final MCP inspection as blocked.
Never pretend the inspection happened if it did not.

### Phase 9 - Validation And Final Report

Run target validation commands when available:
- lint
- typecheck
- build
- any project-level combined check script

Distinguish baseline failures from new failures.
The migration is not complete while new failures remain.

## Required Per-Phase Output Format

After every phase, output exactly:

```txt
1. Files modified
- <path>: one-line change summary

2. Assets used
- <absolute source path>

3. Phase checklist
- [PASS|FAIL] <item>
```

If no new assets were used, write `- none`.

## Final Completion Report Format

The final completion report must include:
- Source path
- Target path
- Baseline commit hash used
- Stash reference created, if any
- Package manager used
- Dependencies added
- Files modified with one-line reason
- Assets copied with absolute source paths
- Legacy visual purge result
- Page QA matrix with PASS or FAIL
- Animation QA matrix with PASS or FAIL
- Chrome DevTools MCP inspection result with explicit verdict
- Lint, typecheck, and build result
- Deployment readiness confirmation
- Known gaps, if any
- A reproduced section titled exactly `ASSETS REEMPLAZO IA`

## Required Final Verdict Language

When MCP inspection was performed and fidelity is strong, say explicitly whether:
- the target looks spectacular
- the target is faithful to the source
- the target preserves target content and business logic

If the result is not visually spectacular and faithful, do not declare success.

## What Never To Do

Never do any of the following:
- never merge old target design language with source design language
- never leave old target visual tokens active
- never keep old target styling because it is convenient
- never preserve old target decorative assets when the source defines the visual equivalent
- never change text copy to fit the source layout
- never change route structure or route contracts
- never replace backend or business logic with source code
- never skip the legacy visual purge
- never skip the asset manifest
- never skip `ASSETS REEMPLAZO IA`
- never claim Chrome DevTools MCP inspection happened if it did not
- never declare success if the target is still a visual hybrid

## Completion Standard

Before finishing, state the rule one last time:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

If the target still contains the legacy visual system, lacks the `ASSETS REEMPLAZO IA` appendix, or was not visually verified against the source, the migration is incomplete.
