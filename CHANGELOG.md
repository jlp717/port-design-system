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

## [1.2.0] - 2025-07-19

### Added
- **v3.2 upgrade** — empirical browser comparison (source vs target) revealed 6 major gaps
- **§3.0.10 Paridad estructural 1:1** — section inventory extraction script, 5 parity rules (count, unique type, layout, bg color, height ratio), STOP condition for generic component reuse
- **§3.0.11 Subpaginas sin equivalente source** — NEVER create placeholder/coming-soon pages when source has full design
- **§3.0.12 Deteccion de texto en media assets** — extraction script for SVG text swap, video brand text flags, source brand detection in HTML/SVG
- **§4.4.3 Inventario de secciones — BLOQUEANTE** — `compareSectionInventory()` function comparing section count, bg colors, layout types, height ratios
- **§4.4.4 Validacion de footer complejo** — checklist for complex footer replication (illustrations, art, multi-layer)
- **§4.4.5 Validacion de texto en media — source brand leak** — brand text detection script with extraction and elimination protocol
- **8 new stop conditions** — section inventory mismatch, bg color mismatch, generic component reuse, footer complexity mismatch, placeholder pages, source brand text in target, layout type mismatch, font naming from source
- **9 new completion criteria** — section inventory parity, bg color per section, footer structure parity, zero generic component reuse, zero placeholder pages, source brand text elimination, layout type per section, height proportionality, font renaming

### Changed
- AGENTS.md updated to v3.2 with structural parity rules, media text detection, and expanded stop conditions
- INSPECTION_GUIDE.md updated to v3.2 with paridad estructural and brand leak checklists
- SKILL.md version bumped from v3.1 to v3.2
- All agent rule files synced (copilot-instructions, clinerules, continue, amazonq)
- All 9 skill platform files synced via sync-skills.mjs

## [1.3.0] - 2025-07-20

### Added
- **v3.3 fundamental overhaul** — programmatic verification replaces screenshot-based comparison
- **§1.15 recordScrollBehavior()** — programmatic scroll 0-100% capturing state of 200+ elements at 21 positions (transforms, opacity, rect, videoCurrentTime, visibility, pinned state). BLOQUEANTE for verification.
- **§1.16 detectAnimationImplementation()** — auto-detects WHAT animation system the source uses (GSAP vs native RAF vs CSS-only vs Framer Motion). Returns `targetShouldUse` object that DICTATES dependency installation. BLOQUEANTE for FASE 3.
- **§1.17 extractElementStyleMap()** — per-element computed styles + hover CSS rules from stylesheets + ::before/::after pseudo-elements (300 elements max)
- **§2.4 Target architecture detection** — auto-detects monorepo layout, i18n library, Tailwind version (v3/v4), UI library. All FASE 3 paths adapt to detected structure.
- **§2.5 Font name brand detection** — grep for source brand font names in target code, STOP if found, rename to neutral names
- **§3.2.1 Native reconstruction patterns** — 5 new patterns for when source uses NO external libs:
  - VIDEO_SCRUB_NATIVE: RAF + scroll listener (replaces GSAP ScrollTrigger)
  - CSS_IO_REVEAL: IntersectionObserver + CSS class toggle
  - CSS_MODULE_ANIMATION: CSS Modules with per-component keyframes
  - NATIVE_SMOOTH_SCROLL: CSS scroll-behavior or no smooth scroll
  - NATIVE_RAF_PARALLAX: RAF parallax without GSAP
- **§3.3 Tailwind v3 adaptation** — conditional path: if target uses Tailwind v3, use tailwind.config.ts extend; if v4, use @theme
- **§4.4.2 compareScrollBehavior()** — automated dual-site comparison function. Runs recordScrollBehavior() on BOTH sites, compares element states numerically at 21 scroll positions. PASS only if all data matches within thresholds.
- **Regla de verificacion PROGRAMATICA** — screenshots are supplementary only; all dynamic verification must be programmatic (data capture + numeric comparison)
- **Regla de dependencias** — NEVER assume GSAP/Lenis/ScrollTrigger. Execute detectAnimationImplementation() first. If source uses native RAF/IO/CSS, target MUST use native.
- **Updated ANIMATION_MANIFEST types** — categorized into Library, Native JS, CSS-only, and Pattern groups. New types: NATIVE_RAF_VIDEO_SCRUB, NATIVE_RAF_PARALLAX, CSS_MODULE_ANIMATION, CSS_IO_REVEAL
- **13 new stop conditions** — detectAnimationImplementation not executed, recordScrollBehavior not executed, compareScrollBehavior fails, target installs GSAP when source doesn't use it, target installs Lenis when source doesn't, architecture not detected, Tailwind version mismatch, font brand names, extractElementStyleMap not executed
- **Verificacion programatica criteria** — recordScrollBehavior/compareScrollBehavior/detectAnimationImplementation all mandatory, target-architecture.json generated, font brand names eliminated

### Changed
- AGENTS.md updated to v3.3 with programmatic verification rules, native pattern detection, architecture adaptation, 20 extraction scripts
- INSPECTION_GUIDE.md updated to v3.3 with 15 new programmatic verification checklist items, 21 scripts
- SKILL.md version bumped from v3.2 to v3.3
- FASE 1 expanded from 17 to 20 extraction scripts
- FASE 2 now includes architecture detection, brand font detection, dependency-only-if-source-uses rule
- FASE 3 reconstruction order updated: "scroll/animation libs (solo si source las usa)" instead of "Lenis/GSAP"
- FASE 4 now leads with compareScrollBehavior() — programmatic, not visual
- Animation type naming clarified: types must reflect HOW source implements (not how target reimplements)

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
