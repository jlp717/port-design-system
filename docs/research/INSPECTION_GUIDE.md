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