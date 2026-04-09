---
name: port-design-system-from-local-clone
description: Execute a full visual replacement of an existing Next.js target project using a local source clone as the only visual source of truth. Use when invoked as /port-design-system-from-local-clone "<source-path>" "<target-path>" or /port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>" in Codex or Cursor, when the job is to make the target visually identical to the source, remove the target's legacy visual system entirely, copy all source visual assets, preserve only target text, content, routes, and business logic, generate an ASSETS REEMPLAZO IA appendix with production-ready prompts, and finish with Chrome DevTools MCP inspection of the local target.
---

# /port-design-system-from-local-clone

## THE ONLY RULE THAT MATTERS

```text
THE ONLY RULE THAT MATTERS
══════════════════════════
This skill does NOT produce a redesign. It does NOT produce an adaptation.
It produces an EXACT CLONE of the source visual system transplanted into
the target codebase.

"Exact clone" means:

Every CSS value in source exists verbatim in target
Every GSAP timeline property (duration, ease, scrub, trigger) matches source
Every Lenis config option matches source
Every IntersectionObserver threshold and rootMargin matches source
Every animation keyframe, every transition duration, every transform value matches source
git diff between a source component and its target counterpart must show
ZERO differences in any line that is not text content, image path, or route

The test is simple: open source and target side by side in a browser.
Scroll both simultaneously. They must be indistinguishable.
If a human can tell them apart, the migration has failed.
This is not a style guide port. This is a surgical transplant.
The source frontend is the donor. The target frontend is the recipient.
Every cell of the donor's visual system must live in the recipient.
```

Non-negotiable consequences:
- For every file that is purely visual, the default action is COPY, not REWRITE.
- Copy the file from source to target, then do a single pass replacing only text strings, image paths, and route refs.
- Do NOT rewrite CSS, do NOT rewrite GSAP configs, do NOT refactor purely visual files.
- Refactoring is explicitly forbidden for purely visual files because it introduces visual drift.
- The target keeps only text, content, routes, and business logic.
- The target must finish with zero residual target visual identity.

Mandatory per-component verification rule:
- After writing each component, run the visual-property diff gate below.
- If the diff shows anything not explained by text content or asset paths, the component is not done.
- Never advance until the diff is clean.

```bash
# Extract all visual properties from source component
grep -nE "(animation|transition|transform|@keyframes|gsap|ScrollTrigger|lenis|parallax|scrub|duration|ease|delay|opacity|scale|translate|rotate|clip-path|will-change|backdrop-filter|background|gradient|border-radius|box-shadow|font-|letter-spacing|line-height|color:|gap:|padding:|margin:)" \
  source/src/components/ComponentName.tsx > /tmp/source_visual.txt

# Same for target
grep -nE "(animation|transition|transform|@keyframes|gsap|ScrollTrigger|lenis|parallax|scrub|duration|ease|delay|opacity|scale|translate|rotate|clip-path|will-change|backdrop-filter|background|gradient|border-radius|box-shadow|font-|letter-spacing|line-height|color:|gap:|padding:|margin:)" \
  target/src/components/ComponentName.tsx > /tmp/target_visual.txt

diff /tmp/source_visual.txt /tmp/target_visual.txt
```

## Exact Command Forms

Accept exactly these command forms:

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>"
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

Parse `$ARGUMENTS` as:
1. `<source-path>`: absolute path to the local source clone that owns the visual system.
2. `<target-path>`: absolute path to the existing Next.js target project that receives the design.
3. `<commit-hash>`: optional target baseline commit.

Argument rules:
- Preserve quoted Windows paths exactly.
- Do not split inside quoted strings.
- If `$ARGUMENTS` is missing, recover the same values from the user request.
- If fewer than two absolute paths are available, stop and ask for the missing path.
- If a commit hash is present, use it as an optional baseline state only. Never rewrite history.

## Mission Boundaries

Repeat this rule before every meaningful decision:

```text
El source es la unica fuente de verdad visual. El target debe convertirse visualmente en una copia exacta del source. Lo unico que se conserva del target es el texto, el contenido, las rutas y la logica de negocio.
```

Preserve only:
- Text and content.
- Routes, route params, redirects, and rewrites.
- API routes, server actions, auth logic, middleware, analytics, integrations, and business logic.
- Target content assets when those assets are business content rather than visual-system assets.

Replace completely:
- Global styles, tokens, themes, and every presentational wrapper.
- Typography, spacing, radius, shadow, gradient, border, surface, and breakpoint systems.
- Navbar, footer, hero, sections, cards, forms, dialogs, drawers, tables, shells, and every interactive state.
- GSAP, ScrollTrigger, Lenis, IntersectionObserver, requestAnimationFrame loops, parallax, scrubbed media, 3D, canvas, and every visual motion primitive.
- Decorative source assets including images, videos, SVGs, masks, textures, fonts, models, and shaders.

Never change:
- Backend behavior.
- Data models and calculations.
- Validation and submission logic.
- Environment configuration.

## Package Manager Detection

Detect the package manager from the target lockfiles before any install command:
- `pnpm-lock.yaml` means `pnpm`.
- `yarn.lock` means `yarn`.
- `bun.lock` or `bun.lockb` means `bun`.
- Otherwise use `npm`.

When this skill says "install", use the detected package manager with exact version strings and never use `latest`, `^`, or `~`.

## Mandatory Deliverables In The Target

Always create and maintain these docs or manifests:
- `docs/port-design-system/extraction-report.md`
- `docs/port-design-system/protected-surface-map.md`
- `docs/port-design-system/source-asset-inventory.md`
- `docs/port-design-system/legacy-visual-purge.md`
- `docs/port-design-system/asset-manifest.md`
- `docs/port-design-system/modified-files.md`
- `docs/port-design-system/assets-reemplazo-ia.md`
- `STACK_MANIFEST.md`
- `ANIMATION_MANIFEST.md`
- `PORT_PLAN.md`

`assets-reemplazo-ia.md` must contain a top-level heading exactly equal to:

```md
# ASSETS REEMPLAZO IA
```

## Required Workflow Order

Nothing may skip ahead. Every phase below is blocking until its checklist passes.

### Phase 0a - Setup, Baseline, And Deep Audit

1. Resolve `<source-path>` and `<target-path>`.
2. Validate that both paths exist and are the intended repos.
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
6. Create the required docs and manifests.
7. Build the extraction report, protected-surface map, asset inventory, modified-files map, and initial legacy purge plan.
8. Inventory every route, layout, component shell, style entrypoint, animation hook, asset import, and responsive breakpoint in source.
9. Map protected backend surfaces in target so visual edits never cross into business logic.

Audit requirements:
- Extract every CSS custom property, typography value, spacing token, radius, border, shadow, gradient, and transform from source.
- Extract every hover, focus, active, open, sticky, loading, and scrolled state from source.
- Extract every source asset path that participates in the visual system.
- Mark every target visual file as one of `copy`, `rewrite-in-place-with-logic-preserved`, `delete`, or `keep-non-visual`.

## PHASE 0b - STACK LOCK (IMMUTABLE)
══════════════════════════════════

Read `source/package.json`.

Generate `STACK_MANIFEST.md` in the target root with this exact structure:

```md
# STACK MANIFEST

## Frontend Dependencies (LOCKED)

| Package | Source version | Installed in target | Status |
| --- | --- | --- | --- |
| gsap | 3.11.4 | 3.11.4 | ✅ |
| lenis | 1.0.28 | 1.0.28 | ✅ |
```

Install every frontend package at the EXACT source version.
Use exact version strings only. No `^`, no `~`, no `latest`.

Hard rule: `stack_lock = true`
- No frontend package may differ from its source version.
- No package may be added that was not in source, except target backend dependencies that are unrelated to the visual layer.
- No package may be removed that was in source.
- If a version conflict arises with a target backend dependency, report it and ask the user explicitly. Never resolve it silently.

Installation rule:
- Use the detected target package manager for install commands.
- The equivalent of `npm install gsap@3.11.4 lenis@1.0.28 framer-motion@10.x ...` must preserve the exact source version strings.

After install, run:

```bash
npm ls gsap lenis framer-motion [all animation libs]
```

Confirm installed versions match source versions exactly.
If any mismatch exists, uninstall and reinstall at the exact version before continuing.

## PHASE 0c - ANIMATION INVENTORY (BLOCKING - NOTHING PROCEEDS UNTIL COMPLETE)
════════════════════════════════════════════════════════════════════════════

Generate `ANIMATION_MANIFEST.md` in the target root.

Use this exact structure for every discovered entry:

```md
# ANIMATION MANIFEST

| Status | ID | File | Type | Properties | Trigger | Expected behavior |
| --- | --- | --- | --- | --- | --- | --- |
| ☐ | A001 | Hero.tsx | gsap ScrollTrigger | scrub: 1.5, start: "top top", end: "+=3000" | scroll | video.currentTime mapped to scroll position |
| ☐ | A002 | Nav.tsx | CSS transition | opacity 0.3s ease, transform 0.3s ease | scroll past 100px | nav background fades in |
```

Each row is a required deliverable, not optional.
Each row starts as `☐`.
Each row becomes `✅` only after active scroll verification passes.
If the manifest has 50 rows, all 50 must be `✅` before the migration is complete.
Zero tolerance for skipped entries.

Scan exhaustively for the following.

CSS layer:
- Every `@keyframes` block, including name, duration, timing-function, and keyframe values.
- Every `animation:` property, including name, duration, delay, fill-mode, and iteration.
- Every `transition:` property, including property, duration, delay, and easing.
- Every `will-change:` declaration.
- Every animated `clip-path`.
- Every `scroll-timeline` or `animation-timeline`.
- Every transform inside a `@keyframes` block or transition.

JS and TS layer:
- Every `gsap.to()`, `gsap.from()`, `gsap.fromTo()`, and `gsap.timeline()`.
- Every `ScrollTrigger.create()` with `trigger`, `start`, `end`, `scrub`, `pin`, and `markers`.
- Every Lenis constructor with `duration`, `easing`, `orientation`, and `smoothTouch`.
- Every `new Lenis()` scroll event listener.
- Every `IntersectionObserver` with threshold array, rootMargin, and callback logic.
- Every `requestAnimationFrame` loop and what it updates per frame.
- Every scroll event listener and what it reads and modifies.
- Every `video.currentTime` assignment driven by scroll.
- Every canvas or WebGL element updated on scroll.
- Every import from `gsap`, `@gsap/react`, `framer-motion`, `motion`, `lenis`, `@studio-freight/lenis`, `locomotive-scroll`, `scrollmagic`, `aos`, `anime`, `three`, `@react-three/fiber`, `@react-three/drei`, and `popmotion`.

HTML and JSX layer:
- Every `<video>` element, including `autoplay`, `loop`, `muted`, `playsInline`, and ref usage.
- Every `<canvas>` element.
- Every element with `data-scroll`, `data-speed`, or `data-lag`.
- Every element with a ref later passed to GSAP or `IntersectionObserver`.

Nothing in Phase 1 or later may begin until `ANIMATION_MANIFEST.md` is exhaustive.

### Phase 0d - Chrome DevTools MCP Extraction

Use Chrome DevTools MCP during audit whenever it is available.

Extract, compare, and document:
- Desktop runtime at 1440 width.
- Mobile runtime at 390 width.
- Computed styles for body, headings, nav, buttons, cards, forms, footer, and hero media.
- Runtime GSAP, ScrollTrigger, Lenis, and scroll state when accessible.
- Scroll behavior, sticky states, and responsive transitions.

If MCP is unavailable, report that block explicitly in the docs and final report.

### Phase 1 - Global Replacement

1. Port source globals, tokens, fonts, motion bootstrapping, navbar shell, and footer shell first.
2. Remove target legacy theme values, visual globals, decorative utilities, and dead visual wrappers.
3. Preserve logic-only wrappers, auth gates, data flows, and route wiring.
4. Copy purely visual source files directly whenever possible.
5. When a file mixes logic and visuals, transplant the source visual layer around the target logic with the smallest possible delta.

Global replacement rules:
- No legacy target design token may remain active.
- No target-only color, font stack, shadow, radius, or spacing scale may remain unless it also exists verbatim in source.
- Visual wrappers that do not come from source must be deleted or replaced.

### Phase 2 - Full Page Port

1. Port the home page visually end to end.
2. Port every remaining route, including auth and dashboard shells.
3. Pages missing from source still receive the full source design language, using direct source shell patterns rather than improvisation.
4. After each component or section, update `PORT_PLAN.md`.

Per-component regression gate in `PORT_PLAN.md`:

```md
# PORT PLAN

## ComponentName
- ☐ code diff clean (no visual property differences from source)
- ☐ static screenshot matches at scrollY=0
- ☐ scroll crawler screenshots match at all 21 positions
- ☐ computed styles match within tolerance
- ☐ video recording indistinguishable
- Status: ✅ VERIFIED / ☐ IN PROGRESS / ❌ FAILING
```

Component rules:
- A component is `VERIFIED` only when all five checks are `✅`.
- After writing ComponentN, rerun the scroll crawler on all previously verified pages.
- If any previously `✅` component fails after ComponentN lands, that is a regression.
- Fix regressions before proceeding to ComponentN+1.

### Phase 3 - Assets And Purge

1. Copy source visual assets needed for fidelity.
2. Wire all target references to the copied assets.
3. Log every copied asset with its absolute source path in `docs/port-design-system/asset-manifest.md`.
4. Remove obsolete target visual assets and styles.
5. Update `docs/port-design-system/legacy-visual-purge.md` with every deleted or replaced legacy surface.

Asset rules:
- Preserve target content-bearing assets only when they are business content.
- Copy the full source visual asset set needed to reproduce the source faithfully.
- Do not keep decorative target assets just because they are already present.

### Phase 4 - ASSETS REEMPLAZO IA

Generate `docs/port-design-system/assets-reemplazo-ia.md`.

It must include:
- Every copied key asset.
- Recommended target path.
- Usage explanation.
- Production-ready prompts for tools such as Flux, Kling, or Runway.
- Business-adapted replacements, including Granja Mari Pepa-specific prompts when applicable.

### Phase 5 - ACTIVE SCROLL VERIFICATION PROTOCOL

Replace all static-only QA with the protocol below.

```text
ACTIVE SCROLL VERIFICATION PROTOCOL (MANDATORY FOR EVERY SECTION)
═══════════════════════════════════════════════════════════════════
A section is NOT verified by a static screenshot.
A section is verified by the FULL SCROLL THROUGH PROTOCOL below.
```

STEP 1 - Run both dev servers
- source: `http://localhost:3000`
- target: `http://localhost:3001`

STEP 2 - For each page, inject this scroll crawler via Chrome DevTools MCP in both source and target:

```javascript
// FULL PAGE SCROLL CRAWLER - inject in both source and target
(async function crawlPage(label) {
  const steps = 20; // captures at 0%, 5%, 10%, ... 100%
  const totalHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
  const results = [];

  // Reset to top
  window.scrollTo({ top: 0, behavior: 'instant' });
  await new Promise((r) => setTimeout(r, 1000));

  for (let i = 0; i <= steps; i++) {
    const pct = (i / steps) * 100;
    const targetY = (totalHeight - window.innerHeight) * (i / steps);

    window.scrollTo({ top: targetY, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 800)); // wait for animations to settle

    // Capture computed styles of key elements at this scroll position
    const keyElements = [
      'nav', '[data-section]', '.hero', '.hero-video', 'video',
      '[class*="parallax"]', '[class*="reveal"]', '[class*="fade"]',
      'section:nth-child(1)', 'section:nth-child(2)', 'section:nth-child(3)'
    ];

    const styles = {};
    keyElements.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        const cs = getComputedStyle(el);
        styles[selector] = {
          opacity: cs.opacity,
          transform: cs.transform,
          visibility: cs.visibility,
          display: cs.display,
          clipPath: cs.clipPath,
          backgroundColor: cs.backgroundColor,
        };
      }
    });

    results.push({ pct: Math.round(pct), scrollY: Math.round(targetY), styles });
    // Screenshot captured via MCP at each step
  }

  return results;
})('page-audit');
```

STEP 3 - Screenshot at EVERY step from 0% through 100% in 5% increments
- Naming: `source_home_scroll_00pct.png`, `target_home_scroll_00pct.png`
- Store all screenshots in `docs/port-design-system/scroll-audit/`

STEP 4 - For EACH scroll position, compare source vs target screenshot
- Same elements visible.
- Same opacity and transform state.
- Same video frame for scroll-scrubbed video.
- Same parallax layer position.
- Same text reveal state.
- If any delta exists, fix target, rerun crawler, and recompare before advancing.

STEP 5 - VIDEO RECORDING of full scroll is mandatory for every page
- Inject this automated scroll in both servers and record the screen:

```javascript
// Smooth automated scroll for screen recording
(async function recordScroll() {
  const total = document.body.scrollHeight - window.innerHeight;
  const duration = 8000; // 8 seconds to scroll full page
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease in-out for natural feel
    const eased = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, total * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();
```

- Save recordings as `source_home_scroll.webm` and `target_home_scroll.webm`.
- Watch both recordings. They must be indistinguishable.
- If any animation, timing, or visual effect differs, that is a blocking failure.

STEP 6 - COMPUTED STYLE DIFF for key animated elements
- For every element that has animation per `ANIMATION_MANIFEST.md`, compare computed styles at the scroll position where the animation is active.

```javascript
// Run at the scroll position where the element is mid-animation
const el = document.querySelector('.hero-title'); // change selector
const cs = getComputedStyle(el);
console.table({
  opacity: cs.opacity,
  transform: cs.transform,
  clipPath: cs.clipPath,
  animationPlayState: cs.animationPlayState,
  willChange: cs.willChange
});
```

- Values from source and target must match within plus or minus 2% tolerance.
- If they do not, the animation is not correctly ported. Fix it before advancing.

STEP 6b - GSAP and Lenis runtime state inspection
- After loading target in browser, run the following in both source and target:

```javascript
// Verify GSAP ScrollTrigger instances match source
ScrollTrigger.getAll().forEach((st) => {
  console.log({
    trigger: st.trigger?.className,
    start: st.start,
    end: st.end,
    scrub: st.vars.scrub,
    pin: st.vars.pin
  });
});
```

- Every ScrollTrigger instance in source must have a matching instance in target with identical `start`, `end`, `scrub`, and `pin` values.
- Lenis runtime options and event behavior must also match source exactly.

STEP 7 - Mark `ANIMATION_MANIFEST.md` entries as `✅` ONLY when all three conditions below pass
- Step 3 screenshots match at all scroll positions.
- Step 5 video recordings are indistinguishable.
- Step 6 computed styles match within tolerance.

If any one fails, the entry stays `☐`.

## PHASE FINAL - FILE COVERAGE AUDIT (BLOCKING)
══════════════════════════════════════════════

Run:

```bash
find source/src -type f \
  ! -path "/node_modules/" \
  ! -path "/.next/" \
  | sort > /tmp/source_files.txt

find target/src -type f \
  ! -path "/node_modules/" \
  ! -path "/.next/" \
  | sort > /tmp/target_files.txt
```

For EVERY file in `source_files.txt`:
- If it is a visual or frontend file, a ported equivalent must exist in target.
- Map the source path to its target equivalent and document the mapping in `docs/port-design-system/modified-files.md`.

Visual and frontend files include:
- `*.css`, `*.scss`, `*.sass`, `*.module.css`, `*.module.scss`
- Any `*.tsx` or `*.ts` that imports from GSAP, Lenis, Framer Motion, or uses `IntersectionObserver`, `requestAnimationFrame`, or scroll listeners
- Any `*.tsx` or `*.ts` in `/components/`, `/layouts/`, `/sections/`, or `/ui/`
- Any `*.tsx` or `*.ts` in `/animations/`, `/motion/`, `/scroll/`, or `/effects/`
- Any `*.tsx` or `*.ts` in `/hooks/` that reads `scrollY` or window dimensions
- Any `*.tsx` or `*.ts` in `/context/` that provides scroll or animation state
- Any `*.tsx` or `*.ts` in `/store/` that holds scroll or animation state
- Any file in `/public/fonts/`, `/public/videos/`, or `/public/images/`
- `tailwind.config.*`, `postcss.config.*`, and `next.config.*`

Run this grep across the target to catch missing design tokens:

```bash
# Find every hex color used in source
grep -rhoE '#[0-9a-fA-F]{3,8}' source/src | sort -u > /tmp/source_colors.txt

# Check each one exists in target
while read color; do
  if ! grep -qr "$color" target/src; then
    echo "MISSING COLOR: $color"
  fi
done < /tmp/source_colors.txt

# Find every font-family used in source
grep -rhoE "font-family:[^;']+" source/src | sort -u > /tmp/source_fonts.txt

while read font; do
  if ! grep -qr "${font//font-family:/}" target/src; then
    echo "MISSING FONT: $font"
  fi
done < /tmp/source_fonts.txt
```

Every `MISSING COLOR` and every `MISSING FONT` is a blocking failure.
Fix all of them before generating the completion report.

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

The final completion report must include:
- Source path.
- Target path.
- Baseline commit hash used.
- Stash reference created, if any.
- Package manager used.
- Dependency additions.
- Files modified with one-line reasons.
- Assets copied with absolute source paths.
- Legacy visual purge result.
- Page QA matrix.
- Animation QA matrix.
- Chrome DevTools MCP inspection result and verdict.
- Lint, typecheck, and build result.
- Deployment readiness confirmation.
- Known gaps, if any.
- A reproduced section titled exactly `ASSETS REEMPLAZO IA`.

## Completion Standard

The migration is complete only when all of the following are true:
- The target is visually indistinguishable from source during active scrolling.
- `STACK_MANIFEST.md` shows exact version parity for locked frontend packages.
- `ANIMATION_MANIFEST.md` has no remaining `☐` entries.
- `PORT_PLAN.md` shows every component as `✅ VERIFIED`.
- `docs/port-design-system/legacy-visual-purge.md` confirms the old target visual system is gone.
- `docs/port-design-system/modified-files.md` covers every visual frontend file from source.
- Chrome DevTools MCP inspection declares the result faithful and spectacular, or the report explicitly states that MCP was unavailable.
- Lint, typecheck, and build all pass.

If any one of those conditions fails, the skill must report failure instead of pretending the migration is done.
