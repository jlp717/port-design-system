# /port-design-system — Usage Guide

## What It Does

Transfers the complete visual design system from a source website project to your production Next.js project.

**What gets ported:** Colors, typography, fonts, CSS tokens, GSAP animations, ScrollTrigger configs, Lenis smooth scroll, parallax effects, hover/focus states, responsive breakpoints, component visual shells (Navbar, Footer, sections), and decorative assets.

**What stays untouched:** All text content, headings, paragraphs, button labels, API routes, server actions, database logic, authentication, environment variables, form handlers, third-party integrations, URL routing, and business logic.

## The Two-Step Workflow

1. **Clone first** — Run `/clone-website <url>` to create a pixel-perfect visual clone of a reference site
2. **Customize** (optional) — Modify the clone's design to match your brand
3. **Port** — Run `/port-design-system <source> <target>` to apply the design to your production project

## Prerequisites

- **Node.js 24+**
- **Claude Code** (recommended) with `--chrome` flag for visual QA
- Both projects must exist on your local filesystem
- Both projects should have a working `npm run build`
- Target must be a Next.js project (`next` in its `package.json`)

## Usage

### Claude Code (Recommended)

```bash
claude --chrome
```

Then in the Claude Code session:

```
/port-design-system "<source-path>" "<target-path>"
```

### Other Agents

Check your agent's command directory for the generated `port-design-system` command file.

## Example: Porting mari-pepa-redesign to granja_mari_pepa

This example shows the complete workflow for Javier's project:

**Source:** `C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign`
The redesigned visual clone — contains the design system you want to apply.

**Target:** `C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa`
Your production Next.js project — keeps all its business logic, gets the new visual identity.

### Exact Command

```
/port-design-system "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa"
```

## What Happens Phase by Phase

**Phase 0: Source Audit** — The agent reads every file in mari-pepa-redesign, extracting CSS tokens, font configs, GSAP animations, ScrollTrigger setups, Lenis config, and responsive breakpoints. Writes an extraction report.

**Phase 1: Global Foundation** — Installs GSAP/Lenis in granja_mari_pepa if needed. Merges color tokens, typography, and Tailwind config. Copies font files. Sets up animation providers. Ports Navbar and Footer visual design while preserving your navigation links and auth state.

**Phase 2: Home Page** — Each section of your home page gets the new visual treatment: updated layout structure, Tailwind classes, animations, hover states. Your headings, paragraphs, product data, and CTAs stay exactly as they are.

**Phase 3: Remaining Pages** — About, services, contact, auth pages — all receive the visual refresh. Dashboard pages that have no source counterpart get the global token changes only.

**Phase 4: Assets** — Decorative images, background patterns, and hero visuals are copied. References are updated. Full build verification.

**Phase 5: QA** — Visual comparison against the source. Content integrity check (zero text changes). Functional check (all routes, forms, and auth still work).

## What to Check When Done

- Run `npm run build` in granja_mari_pepa — should pass clean
- Open both projects side by side in the browser — visual identity should match
- Navigate every route in granja_mari_pepa — all routes still work
- Check text content — all headings, paragraphs, and labels are unchanged
- Submit a form — still works correctly
- Log in if auth exists — still works correctly
- Scroll through pages — animations fire, smooth scroll works, hover states match

## Running a Live QA Pass After Deploy

If the target is deployed (e.g., to Vercel):

```bash
claude --chrome
```

Then:

```
Inspect <your-deployed-url> — compare it visually against the source design. Check:
- CSS custom properties match the extraction report
- Fonts are loading correctly
- Animations fire at the right scroll positions
- Mobile layout at 375px is correct
- Zero console errors, zero 404s
```

## Using the Skill on Any Future Project

The skill is fully general-purpose. Replace the paths with your own:

```
/port-design-system "<path-to-any-design>" "<path-to-any-nextjs-project>"
```

The source doesn't have to be a `/clone-website` output — it can be any local Next.js project or web project with a coherent visual layer.

## Where to Find Logs and Reports

After the skill runs, these files are created in your target project:

| File | What It Contains |
|------|-----------------|
| `docs/port-design-system/extraction-report.md` | Every token, animation, font, and asset extracted from the source |
| `docs/port-design-system/changelog.md` | Every file modified, what changed, and why |
| `docs/port-design-system/asset-manifest.md` | Every decorative asset copied, with source and target paths |

## Troubleshooting

### 1. Build fails after porting

The skill verifies the build after each phase. If it failed, check the last phase's output for the specific error. Most common cause: a missing dependency (check `package.json`) or a Tailwind class that doesn't exist in the target's config.

### 2. Animations not working

Ensure GSAP and ScrollTrigger are registered in the target's layout or a provider component. Check that the GSAP registration module is imported in the root layout. Verify `gsap` and `@gsap/react` are in `package.json` dependencies.

### 3. Fonts not loading

Check that font files were copied to `public/fonts/` (or equivalent). Verify `next/font` imports in `layout.tsx` point to the correct files or Google Font names. Check browser DevTools Network tab for 404s on font requests.

### 4. Colors look wrong

Check `globals.css` — the CSS custom properties should match the extraction report values. If using Tailwind v4, check the `@theme` block. If using a Tailwind config file, check `theme.extend.colors`. Browser DevTools: inspect an element and check computed `color` and `background-color`.

### 5. Lenis smooth scroll not active

Check that the Lenis provider wraps `{children}` in the root layout. Check that `lenis` is in `package.json` dependencies. Check browser console for Lenis initialization errors. Verify the `html` element has the expected class (often `.lenis`).

### 6. Text content was accidentally changed

Run `git diff` and search for changes inside text-bearing elements. Revert any text changes. The skill's changelog (`docs/port-design-system/changelog.md`) should help identify which files were modified.

### 7. API routes or auth broken

This should never happen — the skill doesn't touch these files. If it does happen, check the `git diff` for any changes in `app/api/`, server action files, or auth config files. Revert those changes. File a bug.

### 8. Target has CSS Modules, not Tailwind

The skill translates source visual tokens into the target's styling approach. If the target uses CSS Modules, the source's Tailwind values are converted to CSS custom property references in the module files. Global tokens still go into `globals.css`.

### 9. Some pages look unchanged

Pages without a counterpart in the source only receive the global token changes (colors, fonts, spacing) from Phase 1. This is correct — the skill doesn't force a marketing design onto pages that have no visual reference in the source.

### 10. Decorative assets missing or broken

Check `docs/port-design-system/asset-manifest.md` for the full list of copied assets. Verify each file exists at the listed target path. Check component files for hardcoded paths that may not match the copied location.
