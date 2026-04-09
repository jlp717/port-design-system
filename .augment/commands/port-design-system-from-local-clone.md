---
description: "Full visual replacement of a Next.js target using a local source clone while preserving target text, content data, routes, and business logic."
argument-hint: "<source-path> <target-path> [<commit-hash>]"
---
<!-- AUTO-GENERATED from .claude/skills/port-design-system-from-local-clone/SKILL.md - do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# /port-design-system-from-local-clone

## Mission

Execute a full visual replacement of an existing Next.js target project using a local source clone as the only visual source of truth.

Repeat this until it governs every decision:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

Repeat it again before every major edit:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

Use that rule as the final QA gate too:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

Success means the target looks like a side-by-side visual twin of the source at desktop and mobile breakpoints. The only intended differences are:
- target text and content data
- target routes and route params
- target backend, auth, forms, data fetching, and business logic

## Command Contract

Accept exactly one of these forms:

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>"
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

Parse `$ARGUMENTS` as:
1. `<source-path>`: absolute path to the local source clone that owns the visual design system
2. `<target-path>`: absolute path to the existing Next.js target project that will receive the design
3. `<commit-hash>`: optional target baseline commit to check out before migration

Argument handling rules:
- Preserve quoted Windows paths exactly. Do not split inside quoted strings.
- If the platform did not pass `$ARGUMENTS`, recover the same values from the user request.
- If fewer than two absolute paths are available, stop and ask for the missing path.
- If a commit hash is present, treat it as optional baseline state only. Never rewrite history.

## Golden Rule

The source is the only visual truth. The target must become an exact visual copy of the source. Preserve only target text, content data, routes, and business logic.

That means:
- copy the source visual language literally
- port the source component shells, layout rhythms, motion, and responsive behavior literally
- keep target copy, CMS data, route contracts, and functional behavior intact
- treat every target page as in scope, including pages that do not exist in the source

## What Must Be Replaced

Replace the complete target visual layer with the source visual system, including every source-owned visual decision:
- CSS custom properties in every scope
- global CSS, CSS Modules, styled-components, emotion styles, utility classes, and inline style values that affect presentation
- font families, font files, font weights, font sizes, line heights, letter spacing, text transforms, font smoothing, variable font axes
- Tailwind v3 config, Tailwind v4 `@theme` blocks, design token files, theme providers
- spacing scale, radius scale, border widths, opacity scale, shadows, blurs, z-index, container widths, breakpoints
- navbar, footer, hero, section wrappers, cards, buttons, badges, tables, tabs, drawers, modals, forms, pagination, empty states, toasts, skeletons
- hover, focus, active, disabled, pressed, selected, visited, scrolled, sticky, loading, and open states
- GSAP timelines, ScrollTrigger configs, Lenis setup, parallax math, scrub video behavior, split-text reveals, pinned sections, depth effects
- Three.js or React Three Fiber scenes that exist purely for presentation
- images, SVGs, videos, textures, icons, masks, gradients, Lottie files, shaders, fonts, and 3D models that belong to the visual system
- page structure, section order, container nesting, responsive shifts, and motion choreography

## What Must Be Preserved

Preserve the target exactly in every non-visual area:
- all text content and copy
- all content data coming from CMS, database, local content files, or API payloads
- all routes, route groups, dynamic segments, redirects, rewrites, and URL contracts
- all backend code, API routes, server actions, auth logic, middleware, permissions, and business rules
- all form handlers, validation logic, mutation flows, and data fetching
- all analytics, payments, third-party integrations, and environment configuration

Asset preservation rule:
- Replace source-owned decorative or UI-owned assets.
- Preserve target content-bearing media and user data assets when they are part of the target's actual content or business data.
- If an asset is ambiguous, preserve the target content asset and port the source shell around it.

## Supported Inputs And Automatic Detection

Support these combinations without requiring a custom rewrite of the skill:
- source Next.js projects using App Router or Pages Router
- target Next.js projects using App Router or Pages Router
- Tailwind v3, Tailwind v4, CSS Modules, Sass, styled-components, emotion, vanilla CSS, or mixed styling
- next/font google and next/font local
- GSAP, ScrollTrigger, SplitText or custom split utilities, Lenis, Framer Motion, Motion One, Three.js, React Three Fiber, Drei
- shadcn/ui, Radix, custom component systems, auth areas, dashboards, admin panels, client areas

Detection checklist:
- inspect `package.json`, lockfiles, and `next.config.*`
- inspect `app/`, `pages/`, `src/app/`, `src/pages/`, `public/`, and style directories
- search imports for `gsap`, `@gsap/react`, `lenis`, `@studio-freight/lenis`, `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `motion`, `styled-components`, `@emotion`, `next/font`
- inspect `tailwind.config.*`, `postcss.config.*`, `globals.css`, `app/layout.*`, `pages/_app.*`, `pages/_document.*`
- inspect component libraries and theme providers already present in the target

Dependency installation rule:
- Detect the target package manager from lockfiles.
- Use `pnpm` when `pnpm-lock.yaml` exists.
- Use `yarn` when `yarn.lock` exists.
- Use `bun` when `bun.lockb` or `bun.lock` exists.
- Otherwise use `npm`.
- Install missing visual dependencies automatically. Never remove target dependencies.

## Non-Negotiable Operating Rules

1. Audit before editing. Read the source and target fully enough to map visual surfaces and protected surfaces.
2. The source owns the visual answer. Do not improvise a different visual system.
3. Do not change target text. Do not rewrite copy to better fit the source.
4. Do not change target route structure. Navigation visuals may change; route destinations may not.
5. Do not modify backend logic. Wrap it, style it, or rearrange its presentational shell only.
6. Do not replace interactive target components wholesale if that would drop handlers, data flow, or auth behavior. Port the shell around the existing logic.
7. Do not reference source visuals from a CDN. Copy local assets from the source tree into the target tree.
8. Keep absolute source paths for every copied asset in the migration docs.
9. Verify after every phase. Broken imports, missing assets, or failing builds are not acceptable end states.
10. Treat pages missing from the source as full design-system ports, not token-only leftovers.

## Phase 0: Setup And Deep Audit

### 0.1 Resolve Baseline State

If `<commit-hash>` is provided:
- enter `<target-path>`
- verify the repo exists and the commit resolves with `git rev-parse --verify <commit-hash>`
- inspect `git status --short`
- if the working tree is dirty, stash safely with untracked files included using a message such as `port-design-system-from-local-clone pre-checkout <timestamp>`
- record the stash reference in the report
- `git checkout <commit-hash>`
- verify the new HEAD matches the requested commit
- do not drop or pop the stash automatically

If `<commit-hash>` is not provided:
- work from the current target state
- if the working tree is dirty, preserve it and call out the dirty baseline in the report
- never reset or discard user changes

### 0.2 Validate Source And Target

Validate source:
- path exists
- contains a web frontend, ideally Next.js
- includes `package.json`
- includes pages, app routes, or clear component/style assets to extract

Validate target:
- path exists
- contains a Next.js project
- includes `next` in dependencies or devDependencies
- exposes App Router or Pages Router entry points

### 0.3 Build The Audit Map Before Editing

Create `docs/port-design-system/` inside the target and produce at least:
- `docs/port-design-system/extraction-report.md`
- `docs/port-design-system/protected-surface-map.md`
- `docs/port-design-system/asset-manifest.md`
- `docs/port-design-system/modified-files.md`

Read the source tree and extract literally:
- every token declaration in CSS, Sass, theme files, and JS config
- every typography decision and font source
- every breakpoint and responsive override
- every animation library, plugin registration, timeline, and timing value
- every ScrollTrigger config, scrub value, pin behavior, start and end expression
- every Lenis option and RAF wiring detail
- every parallax mapping, layer speed, and direction
- every 3D scene parameter that affects presentation
- every navbar, footer, hero, and section shell
- every button, input, card, modal, table, drawer, and list shell
- every source-owned visual asset and its absolute path

Read the target tree and map protected surfaces:
- routes and route groups
- layouts, templates, and page shells
- API routes and server actions
- auth files, middleware, providers, and permission boundaries
- business logic modules and data-fetching entry points
- content-bearing assets and content collections

### 0.4 Use Chrome DevTools MCP When Available

If Chrome DevTools MCP is available and the source can run locally or already exists at a URL:
- inspect the source in a browser during Phase 0
- inspect computed styles for body, headings, navigation, buttons, cards, forms, and footer
- inspect runtime GSAP timelines and ScrollTrigger registrations when accessible
- inspect desktop and mobile layouts at 390, 768, 1024, and 1440 widths
- treat runtime computed values as tie-breakers when authored code is ambiguous

## Phase 1: Global Base Port

Apply the global visual foundation before page-by-page work.

### 1.1 Install Missing Visual Dependencies

Compare source and target dependencies and install the source visual stack when missing, including variants such as:
- `gsap`
- `@gsap/react`
- `lenis` or `@studio-freight/lenis`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `framer-motion` or `motion`
- any font helper or style runtime required by the source

### 1.2 Port Global Styles And Tokens

Apply the source token system literally:
- merge source token values into target global styles
- port source `@font-face`, `@theme`, `@keyframes`, utility classes, resets, and theme scopes
- keep target-only non-visual or content-driven CSS hooks only when required for behavior
- do not leave target default tokens in place when the source defines replacements

### 1.3 Port Font Bootstrapping

Replicate the source font setup using:
- `next/font/google`
- `next/font/local`
- copied local font files
- CSS variables attached to `html` or `body`

Preserve target metadata, structured data, and other non-visual layout logic.

### 1.4 Port Global Motion Bootstrapping

If the source uses smooth scrolling or animation frameworks:
- replicate Lenis instantiation and RAF integration exactly
- replicate GSAP plugin registration and defaults exactly
- replicate global observers or providers that exist only for presentation
- do not drop target layout logic or providers that are required for functionality

### 1.5 Port Navbar And Footer Shells

Port the full navbar and footer shell from the source:
- desktop and mobile variants
- transparent and scrolled states
- menu drawer or hamburger visuals
- hover, focus, and active states
- section spacing and logo treatment

Preserve:
- target route destinations
- auth state logic
- dropdown and menu handlers
- aria attributes and accessibility hooks

## Phase 2: Home Page Port

Port the source home-page visual system end to end:
- hero composition
- section order
- container widths and rhythm
- reveal animations
- parallax media behavior
- pinned or scrubbed sections
- CTA styling and interaction

For each target section:
- identify the closest source visual equivalent by purpose, not by text
- preserve target text, content bindings, and handlers
- rebuild the visual shell so the target section reads like source design with target content inside it

If the source has a section that the target does not have, do not invent a new route or data model.
If the target has a section that the source does not have, style it using the extracted source primitives so it still feels native to the source design system.

## Phase 3: Remaining Pages

Apply the same standard to every remaining target route.

### 3.1 Directly Mappable Marketing Pages

Port about, services, products, contact, and similar pages by matching source sections and visual shells as closely as possible.

### 3.2 Pages Without A Direct Source Counterpart

Apply the full source design system using extracted primitives:
- page background treatments
- container systems
- cards and surfaces
- forms and field chrome
- table/list shells
- buttons, badges, filters, tabs, pagination, dialogs
- reveal and hover behaviors that fit the source system

Never leave these pages at "global tokens only" fidelity.

### 3.3 Auth, Client Area, Dashboard, Admin

These pages are still full visual-replacement territory.
- Keep every auth flow, session guard, redirect, and form action intact.
- Rebuild the shell with source typography, spacing, surfaces, cards, buttons, inputs, modals, tables, and motion patterns.
- Use source sidebars, top bars, panel treatments, and empty states where relevant.
- Preserve every data query, mutation, and permission boundary.

### 3.4 Legal And Utility Pages

Even simple pages must inherit the source visual system:
- article width and typography
- headings and lists
- link styles
- spacing rhythm
- callout shells
- footer and navigation behavior

### 3.5 Dynamic Routes

For `[slug]`, `[id]`, or similar routes:
- preserve the route contract and loader logic
- port the template shell, typography, and component styling
- preserve all dynamic content output

## Phase 4: Asset Integration And Verification

Copy source-owned visual assets into the target and fix references.

Copy categories such as:
- fonts
- SVG icons and masks
- hero images and videos
- decorative illustrations and textures
- Lottie or JSON animation assets
- 3D models and shader assets
- background gradients or image overlays stored as files

Rules:
- record the absolute source path for every copied asset
- store the target destination path in `docs/port-design-system/asset-manifest.md`
- do not leave broken references
- do not keep stale target design assets when the source provides the visual equivalent
- do not overwrite target content assets that belong to product, CMS, or user data

## Phase 5: QA, Reporting, And Release Readiness

### 5.1 Visual QA

Use Chrome DevTools MCP when available for desktop and mobile verification.
Check at minimum:
- home page
- each major route group
- auth area
- dashboard or client area
- legal or utility pages

Validate visually:
- typography
- colors and tokens
- spacing rhythm
- navbar and footer behavior
- hover and focus states
- animations, scroll triggers, and parallax
- media aspect ratios and responsive breakpoints

### 5.2 Build And Static Validation

Run target validation commands when available:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- or the target's equivalent package-manager command

If the target had pre-existing failures, distinguish baseline failures from migration failures explicitly.
Do not claim final readiness while new failures remain unresolved.

### 5.3 Final Integrity Checks

Confirm all of the following:
- no backend files changed
- no API route or server action behavior changed
- no auth or business logic behavior changed
- no unintended text or content edits occurred
- no missing imports or asset references remain
- docs exist under `docs/port-design-system/`
- the target is ready for Git push and deploy once checks pass

## Required Phase Output Format

After every phase, output exactly this structure:

```txt
1. Files modified
- <path>: one-line change summary

2. Assets used
- <absolute source path>

3. Phase checklist
- [PASS|FAIL] <item>
```

Use absolute source paths in the assets list. If no new assets were used in a phase, write `- none`.

## Final Completion Report Format

At completion, report:
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

## Recommended Mapping Heuristics

Use these heuristics when the source and target do not line up one to one:
- source hero -> target hero or first-fold shell
- source feature grid -> target services, products, or dashboard cards
- source testimonials or quotes shell -> target reviews, trust section, or announcement cards
- source CTA strip -> target contact or signup callout
- source article shell -> target legal and content pages
- source floating nav and footer shell -> all route groups
- source card and form primitives -> dashboards, auth flows, admin tables, and client-area widgets

## What Never To Do

Never do any of the following:
- never change target copy to fit the source layout
- never change route paths or API endpoints
- never replace server actions or form logic with source implementations
- never drop auth, permissions, redirects, or middleware
- never ignore a page because it was not present in the source
- never leave old target design tokens active when the source supplies the replacement
- never keep stale target visual assets when the source owns the visual equivalent
- never pull source visuals from a CDN instead of the local source path
- never ship without documenting copied assets and modified files
- never claim success if the target cannot build or if imported assets are broken

## Completion Standard

Before finishing, say the rule one last time and ensure the work obeys it:

"El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio."

If the target is not visually a source twin while still preserving target content and logic, the migration is incomplete.