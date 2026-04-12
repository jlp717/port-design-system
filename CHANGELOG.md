# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-12

### Added
- **v3.0 complete rewrite** of SKILL.md — autonomous visual porting from any public URL
- Simplified invocation: `"<target-path>" "<source-url>"` (eliminates FORMA A/B confusion)
- **7 extraction scripts** (up from 3): design tokens, animations, DOM structure, interactions, assets, Three.js/WebGL scenes, dark mode
- **Automatic page discovery** via nav link crawling and sitemap.xml
- **Scroll narrative generation** — textual pseudo-video descriptions per page
- **Multi-viewport QA** — verification at 375px, 768px, 1440px (previously only 1440px)
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
- 30+ typography selectors (up from 7)
- 100+ color palette extraction (up from 50)

### Changed
- AGENTS.md rewritten for v3.0 flow (5 phases)
- README.md rewritten with full feature description
- SKILL_USAGE_GUIDE.md updated for new invocation
- INSPECTION_GUIDE.md updated with 7-script checklist
- sync-skills.mjs updated with new description and argument hint
- Package version bumped to 1.0.0

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
