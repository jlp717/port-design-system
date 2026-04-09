# Port Design System From Local Clone

## What This Is
This repository is a production-grade template for one skill:

- `/port-design-system-from-local-clone`

The skill ports the **COMPLETE visual layer** from a local source clone into an existing Next.js target project. This means copying **EVERY SINGLE FILE** related to frontend design: CSS tokens, fonts, images, animations, component shells, layouts, etc. The target should look **VISUALLY IDENTICAL** to the source when opened side-by-side in a browser.

## CRITICAL: What This Actually Means

This is a **COMPLETE FRONTEND VISUAL REPLACEMENT**. The target project's entire visual appearance gets replaced with the source clone's visual system.

Think of it like this:
- The source clone is the **blueprint for how everything looks**
- The target project is the **house that keeps its rooms and plumbing** (content, routes, backend)
- Your job: rebuild the target's **entire exterior and interior design** to match the source blueprint exactly

### The ENTIRE frontend visual layer gets replaced:

**Structure & Layout:**
- ALL section ordering and page structure from source
- ALL grid systems, flex layouts, and positioning
- ALL spacing scales (margins, paddings, gaps)
- ALL container widths and responsive breakpoints

**Visual Assets:**
- ALL CSS/SCSS files with complete token systems
- ALL font files, font families, font configurations
- ALL images, SVGs, videos, 3D models used in the UI
- ALL decorative elements, gradients, shadows, borders, backgrounds

**Animations & Interactions:**
- ALL GSAP timelines, ScrollTrigger configs, Lenis setup
- ALL parallax effects, scroll-triggered animations
- ALL 3D scenes and depth effects
- ALL hover/focus/active/click states and transitions
- ALL text reveal animations, stagger effects, entrance animations

**Components:**
- ALL Navbar variants (desktop, mobile, scrolled, transparent, solid, etc.)
- ALL Footer layouts and states
- ALL card designs, button styles, modal/dialog shells
- ALL form visual styling (inputs, selects, textareas - validation visuals only)
- ALL hero sections, section dividers, CTA blocks

### What stays from target (ONLY these - NOTHING ELSE):

**Content (words only):**
- All text content and copy stays from target
- All headings, paragraphs, labels, descriptions use target's text
- BUT they get wrapped in source's visual structure with source's fonts, colors, sizes, animations

**Routes & URLs:**
- Route structure and URL contracts stay from target
- Navigation links point to target's routes
- BUT the navbar/footer that contains those links looks like source's

**Backend & Logic (zero changes):**
- API routes, server actions, database queries
- Auth flows, session management, redirects
- Form validation logic, submission handlers
- Data fetching, state management, mutations
- Business rules, calculations, API integrations

### Concrete example:

Source has a hero section with:
- Full-screen background image with parallax
- Heading that splits and reveals with GSAP
- Subtitle that fades up with stagger
- CTA button with hover scale + glow effect

Target has different content but needs the SAME hero treatment:
- Target's text/heading goes inside source's parallax background
- Target's CTA text goes inside source's animated button shell
- All animations, timings, easings, effects come from source

### Simple test:
If you open source and target in browsers side by side → they should look **VISUALLY IDENTICAL** (same layout, same animations, same fonts, same colors, same spacing).
The only difference: target displays target's own text content and targets its own API routes.

## Mission
Given:
1. `<source-path>` (absolute path to local clone design system)
2. `<target-path>` (absolute path to existing Next.js project)
3. `<commit-hash>` (optional — exact baseline commit in target)

Produce a target frontend that is **VISUALLY IDENTICAL** to the source design system while preserving target routing, copy, backend integrations, server actions, API routes, auth, and business logic.

## Tech Stack
- Framework: Next.js 16 (App Router, React 19, TypeScript strict)
- UI: shadcn/ui + Tailwind CSS v4
- Animation stack: GSAP, ScrollTrigger, Lenis, optional Three.js
- Deployment target: GitHub + server deploy flow

## Commands
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run lint` - eslint
- `npm run typecheck` - typescript check
- `npm run check` - lint + typecheck + build
- `node scripts/sync-skills.mjs` - regenerate all platform skill files
- `bash scripts/sync-agent-rules.sh` - regenerate platform agent rules

## Input Contract
Skill invocation:

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

Example:

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa" "dc376a2cd4a33b9485f550fc8ae7a287f0041c96"
```

## Hard Constraints (Never Violate)

### 1) Asset policy
- All visual assets must come from `<source-path>`.
- Never reference external CDNs for source visuals.
- Never reuse old target design assets if source equivalents exist.

### 2) Pixel fidelity policy
Extract and apply literally:
- CSS variables and token values
- font families, font scales, tracking, line-height
- GSAP timelines: duration, ease, stagger, delay, repeat
- ScrollTrigger config: trigger, start, end, scrub, pin, toggle behavior
- Lenis constructor options and raf integration
- parallax speed multipliers and direction
- hover, focus, active visual states
- breakpoint behavior and responsive shifts
- 3D scene parameters where present

### 3) Backend isolation policy
Never modify:
- backend code
- API routes
- server actions
- database schema and queries
- auth logic
- business logic

Only visual wrappers and css/class changes are allowed around functional areas.

### 4) Content integrity policy
- Keep all target copy and text content.
- Keep route structure and URL contract.
- Keep data loading and mutation flows.

### 5) MCP policy
- Use Chrome DevTools MCP for deep extraction in Phase 0 when available.
- Use Chrome DevTools MCP for visual QA in Phase 5 when available.

### 6) GitHub readiness policy
At completion target must be push-ready:
- no temporary files
- no broken imports
- no unresolved asset refs
- build passes

## Execution Workflow (Strict Order)

### Phase 0 - Setup and Deep Audit
1. `git checkout <commit-hash>` in target project (if provided).
2. Verify clean working tree in target branch before migration edits.
3. Read source and target trees fully.
4. Extract source design system literally:
   - css custom properties
   - typography tokens
   - spacing and radius scales
   - all animation values
   - Lenis/GSAP/ScrollTrigger setup
   - parallax and 3D configs
5. Build extraction report before changing target styles.

Required output for phase:
- token extraction report
- source asset inventory
- target protected-surface map

### Phase 1 - Global Base
Apply globally in target:
- source token system in `globals.css`
- font setup from source
- base utility classes
- Lenis and GSAP global bootstrapping
- Navbar visual shell
- Footer visual shell

Do not alter protected logic.

### Phase 2 - Home Page
Apply source visual system to home page end-to-end:
- hero and media behavior
- section structure order
- text reveal animations
- parallax motion
- 3D/scroll effects
- hover state fidelity

Keep target content and bindings.

### Phase 3 - Remaining Pages
Apply same process to:
1. products/services pages
2. contact/about pages
3. legal pages
4. client area views (style only)

For auth and dashboard pages:
- style shell only
- zero business logic changes

### Phase 4 - Asset Integration and Verification
1. Copy required source assets into target with absolute source paths logged.
2. Fix and verify all asset references.
3. Ensure no broken path at runtime.
4. Produce asset manifest.

### Phase 5 - Internal QA and Final Report
1. Run visual QA page-by-page (desktop + mobile).
2. Validate animation checklist PASS/FAIL.
3. Run build/typecheck/lint where available and report exact status.
4. Produce final modified-file report.
5. Confirm target is ready for git push and server deploy.

## Required Per-Phase Output Format
After every phase output exactly:

1. Files modified
- `<path>`: one-line change summary

2. Assets used
- absolute source path per asset

3. Phase checklist
- `[PASS|FAIL] <item>`

## Final Completion Report Format
Include:
- Source path
- Target path
- Baseline commit hash used
- files modified list with one-line reason
- assets copied with absolute source paths
- page QA matrix (PASS/FAIL)
- animation QA matrix (PASS/FAIL)
- build/typecheck/lint result
- deployment readiness confirmation
- known gaps (if any)

## Safety Checklist Before Finishing
- No backend files changed
- No API/server actions modified
- No target text content changed unintentionally
- No broken imports or missing assets
- Build succeeds in target frontend
- Docs generated in target project under `docs/port-design-system/`

## Repository Structure (this template)
```txt
.claude/skills/port-design-system-from-local-clone/SKILL.md   # source-of-truth skill prompt
.codex/skills/port-design-system-from-local-clone/SKILL.md    # generated skill copy
.github/skills/port-design-system-from-local-clone/SKILL.md   # generated skill copy
scripts/sync-skills.mjs                                        # sync skill to all platforms
scripts/sync-agent-rules.sh                                    # sync AGENTS to platform rule files
```

## Most Important Notes
- When launching multi-agent teams, isolate each teammate in a dedicated worktree branch.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh`.
- After editing `.claude/skills/port-design-system-from-local-clone/SKILL.md`, run `node scripts/sync-skills.mjs`.

@docs/research/INSPECTION_GUIDE.md
