# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-12

### Added
- **v3.0 complete rewrite** of SKILL.md — autonomous visual porting from any public URL
- Simplified invocation: `"<target-path>" "<source-url>"` (eliminates FORMA A/B confusion)
- **13 extraction scripts** (up from 3): design tokens, animations, scroll scrub trace, DOM structure, interactions, assets, Three.js/WebGL scenes, dark mode, deep visual fingerprint, advanced patterns, full CSS rules, scroll snapshots, scroll narrative
- **Automatic page discovery** via nav link crawling and sitemap.xml
- **Scroll narrative generation** — textual pseudo-video at 5% increments (21 positions per page)
- **Multi-viewport QA** — verification at 375px, 768px, 1440px at 21 scroll positions each
- **ZERO tolerance** computed style comparison (IDENTICO, not approximate)
- **15+ reconstruction patterns**: VIDEO_SCRUB, MARQUEE, TABS, ACCORDION, CAROUSEL, COUNTER, TEXT_SPLIT, MAGNETIC_HOVER, CUSTOM_CURSOR, PRELOADER, SCROLL_SNAP, PARALLAX, STAGGER, PAGE_TRANSITION, CLIP_PATH_ANIM, BACKDROP_BLUR
- **Deep visual fingerprint** — 50+ CSS properties per visible element (up to 500 elements)
- **Advanced pattern detection** — preloader, marquee, tabs, accordions, carousels, counters, text split, custom cursors, scroll snap, parallax layers, stagger groups
- **Full CSS rule extraction** — all :hover, :focus, :active, @media rules from stylesheets
- **Scroll snapshots** — automated data capture at each 5% scroll position for source vs target comparison
- **Scroll scrub trace** — video/canvas currentTime tracking across scroll positions (BLOQUEANTE)
- **Console JS verification** — zero errors in target
- **Network/asset verification** — all fonts, images, videos must load correctly
- **Performance check** — LCP, CLS monitoring (informativo)
- **FASE 5 mandatory visual walkthrough** — side-by-side comparison at every scroll position before completion
- **Three.js/React Three Fiber** scene extraction (camera, lights, meshes, materials)
- **CSS @keyframes and transitions** extraction (previously only GSAP)
- **Framer Motion** detection
- **@font-face** and Google Fonts URL discovery
- **Interactive state** extraction (hover, focus, active via JS simulation + CSS rule parsing)
- **Asset inventory** — all images, videos, SVGs, background-images, fonts, preloads
- **Dark mode** mechanism detection and token extraction
- **Media query breakpoint** extraction
- **Gradient, shadow, filter** systematic extraction
- **Grid/flexbox layout** detection per section
- **Nav behavior** detection (sticky, transparent, backdrop-filter)
- **Dependency detection** script for source NPM packages
- **Checkpoint/recovery system** — resume from last verified section
- **Computed style → Tailwind** mapping reference table
- **35+ animation types** in ANIMATION_MANIFEST (up from 18)
- 30+ typography selectors (up from 7)
- 100+ color palette extraction (up from 50)

### Changed
- AGENTS.md rewritten for v3.0 flow (6 phases, 13 scripts)
- README.md rewritten with full feature description
- SKILL_USAGE_GUIDE.md updated for 13 scripts and new patterns
- INSPECTION_GUIDE.md updated with 13-script checklist and new QA checks
- sync-skills.mjs updated with new description and argument hint
- Package version bumped to 1.0.0

## [1.1.0] - 2025-07-18

### Added
- **v3.1 upgrade** — 40 fixes across 12 épicas applied to SKILL.md
- **17 extraction scripts** (up from 13): fetchCrossOriginCSS, extractShadowStyles, captureIntersectionObserverConfigs, extractLottieRiveSpline, extractAccessibility
- **Anti-bot protocol** — user-agent override, cookie accept, Cloudflare wait
- **MCP crash recovery** via `_checkpoint.json` (resume from last completed step)
- **preExpandContent()** — mandatory pre-extraction lazy load/SPA expansion
- **Mandatory _metadata** field in ALL extraction JSONs (version, url, timestamp, viewport, userAgent)
- **Cross-origin CSS** fetch for CORS-blocked stylesheets
- **Shadow DOM** traversal for encapsulated styles
- **CSS-in-JS** detection (inline style tags, adoptedStyleSheets)
- **Extended media queries** — hover, pointer, prefers-reduced-motion, prefers-color-scheme
- **@container queries** and **@layer** detection and extraction
- **CSS nesting** rule extraction
- **GSAP plugin coverage** expanded from 8 to 22 plugins
- **CSS scroll-driven animations** — scroll-timeline, view-timeline, animation-timeline
- **View Transitions API** detection and implementation pattern
- **Web Animations API** capture via element.getAnimations()
- **IntersectionObserver monkey-patch** — captures real threshold/rootMargin configs
- **Lottie/dotLottie extraction** — JSON URLs, containers, configs, download protocol
- **Rive extraction** — .riv files, canvas elements, state machines
- **Spline 3D extraction** — spline-viewer elements, scene URLs
- **SVG sprites** detection (`<symbol>` + `<use>` refs) and external SVGs
- **Asset download protocol** — bash script for bulk download with renaming
- **Native `<dialog>`** and **Popover API** detection and implementation patterns
- **Grid subgrid/masonry** layout detection
- **Anchor scroll** behavior detection
- **Cookie banner/consent modal** detection
- **Stacking context analysis** — opacity, transform, filter, isolation
- **Form controls** styling extraction
- **extractAccessibility()** — ARIA roles/labels, landmarks, skip links, tabindex, focus traps, prefers-reduced-motion
- **47+ animation types** in ANIMATION_MANIFEST (up from 35)
- **Complete Next.js App Router section** (§3.0): 'use client' rules, dynamic imports (3 patterns), next/font mapping, next/image protocol, hydration prevention (useIsClient), code splitting
- **Tailwind v4 @theme directive** support with expanded mapping table
- **7 new reconstruction patterns**: LOTTIE/DOTLOTTIE, RIVE, SPLINE 3D, SCROLL-TIMELINE CSS, VIEW TRANSITIONS API, NATIVE DIALOG/MODAL, PREFERS-REDUCED-MOTION
- **compareScrollSnapshots()** — automated diff script source vs target at 21 positions
- **Stacking context verification** script
- **9 new stop conditions** — preExpandContent, _metadata, cross-origin, Shadow DOM, Lottie/Rive/Spline, scroll-timeline, hydration mismatch, 'use client', automated diff
- **Expanded completion criteria** — stacking contexts, Lottie/Rive/Spline, scroll-timeline, IO configs, View Transitions, prefers-reduced-motion, dynamic imports, accessibility

### Changed
- AGENTS.md updated to v3.1 (17 scripts, 47+ animation types, new phases, expanded criteria)
- INSPECTION_GUIDE.md updated with v3.1 checklists and new script references
- SKILL.md version bumped from v3.0 to v3.1

## [Unreleased]

## [0.3.1] - 2026-03-29

### Fixed
- `sync-agent-rules.sh` failing to resolve `@file` imports on Windows due to CRLF line endings

## [0.3.0] - 2026-03-29

### Added
- CI quality gates via GitHub Actions
- `npm run typecheck` and `npm run check` scripts
- `.gitattributes` for cross-platform line ending normalization
- `.nvmrc` to pin Node.js 20

## [0.2.0] - 2026-03-28

### Added
- Multi-platform AI agent support (13 platforms)
- `scripts/sync-agent-rules.sh` and `scripts/sync-skills.mjs`

## [0.1.0] - 2026-03-28

### Added
- Initial template scaffold
- Next.js 16 + shadcn/ui + Tailwind CSS v4 base scaffold
- MIT license

[1.0.0]: https://github.com/jlp717/port-design-system/compare/v0.3.1...v1.0.0
[Unreleased]: https://github.com/jlp717/port-design-system/compare/v1.0.0...HEAD
[0.3.1]: https://github.com/jlp717/port-design-system/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/jlp717/port-design-system/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jlp717/port-design-system/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jlp717/port-design-system/releases/tag/v0.1.0
