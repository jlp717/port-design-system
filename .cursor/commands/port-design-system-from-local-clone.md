<!-- AUTO-GENERATED from .claude/skills/port-design-system-from-local-clone/SKILL.md - do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# Port Design System From Local Clone

Parse `the source path, target path, and baseline commit hash provided by the user` as:
1. `<source-path>`
2. `<target-path>`
3. `<commit-hash>`

If any argument is missing, stop and ask for the missing argument.

## Mission
Port 100% of the source visual layer into the target Next.js app:
- design tokens
- typography
- component visual shells
- animations and scroll behavior
- decorative assets

Preserve in target without exception:
- content text
- routes
- backend integrations
- API routes
- server actions
- auth and business logic

## Non-Negotiable Constraints

### Assets
- Use only assets from `<source-path>` for the new visual layer.
- Do not add CDN-hosted source assets.
- Do not re-use old target visual assets when source equivalents exist.

### Pixel fidelity
Apply literal values from source for:
- CSS custom properties
- typography tokens
- spacing/radius/shadows
- Lenis config
- GSAP/ScrollTrigger values
- parallax speed and direction
- 3D config values
- hover/focus/active states
- responsive breakpoint behavior

### Backend isolation
Never edit:
- backend code
- API route handlers
- server actions
- DB models/migrations
- auth logic
- business logic

Only visual wrappers and class/style layers are allowed in functional areas.

### MCP usage
When available:
- use Chrome DevTools MCP in Phase 0 for extraction
- use Chrome DevTools MCP in Phase 5 for visual QA

### Delivery readiness
Leave target in push-ready state with no manual cleanup required.

## Workflow (strict order)

## Phase 0 - Setup + Deep Audit
1. Go to target project and checkout baseline:
   - `git checkout <commit-hash>`
2. If working tree is dirty, stash first and report stash ref.
3. Capture source and target directory trees.
4. Extract source visual system literally:
   - css variables and token maps
   - typography scales and font setup
   - Lenis config and bootstrap
   - GSAP timelines and defaults
   - ScrollTrigger configurations
   - parallax and 3D configs
   - hover/focus/active transitions
5. Build target protected-surface map:
   - api routes
   - server actions
   - auth/business logic files
6. Write extraction report before editing target visuals.

Create in target:
- `docs/port-design-system/extraction-report.md`

## Phase 1 - Global Base
Apply source visual foundation to target:
- global css variables in `globals.css`
- typography and font loading setup
- global utility styles
- Lenis/GSAP global bootstrapping (only if source uses them)
- Navbar visual shell
- Footer visual shell

Preserve target links, handlers, auth state flows, and content.

## Phase 2 - Home Page
Port home page visuals end-to-end:
- hero media behavior
- section sequencing and spacing rhythm
- text reveal/split animations
- scroll-triggered and parallax behavior
- 3D and depth effects if present

Do not rewrite target copy or logic.

## Phase 3 - Remaining Pages
Port by groups:
1. products/services
2. contact/about
3. legal
4. client area and protected views

For client/auth pages:
- style-only edits
- no mutation of validation, submit actions, redirects, auth checks

## Phase 4 - Asset Integration + Verification
1. Copy required source assets to target.
2. Keep an asset manifest with absolute source paths.
3. Verify every referenced asset exists.
4. Resolve broken references before moving on.

Create/update in target:
- `docs/port-design-system/asset-manifest.md`

## Phase 5 - Internal QA + Final Report
1. Run visual QA across key routes and breakpoints.
2. Validate animations route-by-route.
3. Run build/typecheck/lint checks and record actual status.
4. Produce final report with full file and asset lists.

Create/update in target:
- `docs/port-design-system/changelog.md`

## Required output after each phase
Use this exact structure:

1. Files modified
- `<path>`: `<one-line reason>`

2. Assets used
- `<absolute-source-path>` -> `<target-path>`

3. Phase checklist
- `[PASS|FAIL] <item>`

## Final output format
At the end of Phase 5 report:
- source path
- target path
- baseline commit hash
- dependency changes
- modified files list
- copied assets list with absolute source path
- route QA matrix (PASS/FAIL)
- animation QA matrix (PASS/FAIL)
- build/typecheck/lint status
- deploy readiness status
- unresolved gaps if any

## Guardrails for edits

### Allowed
- className and css refactors
- visual wrapper elements around existing logic
- animation hooks/components tied to visual behavior
- adding visual dependencies (GSAP, Lenis, Three)

### Forbidden
- changing text/copy
- changing route contracts
- changing api/server-action behavior
- changing db/auth/business logic
- removing target dependencies used by app logic

## Validation commands
In target frontend run:

```bash
npm run build
npm run typecheck
npm run lint
```

If lint/typecheck pre-exist with unrelated failures, report them explicitly and still ensure modified files are clean.

## Error handling

### Missing source path
Stop with:
`ERROR: source path not found or unreadable: <source-path>`

### Invalid target path
Stop with:
`ERROR: target path is not a Next.js project: <target-path>`

### Invalid commit hash
Stop with:
`ERROR: commit hash not found in target repository: <commit-hash>`

### Build breaks after phase
Stop phase progression, fix build, then continue.

## Example invocation

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa" "dc376a2cd4a33b9485f550fc8ae7a287f0041c96"
```

## Completion criteria
Mark complete only when:
- visual system ported across intended routes
- protected logic untouched
- asset references valid
- reports generated in target docs folder
- project is push-ready for deployment