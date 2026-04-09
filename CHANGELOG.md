# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `/port-design-system-from-local-clone` final source-of-truth skill spec for full visual replacement from a local clone into any existing Next.js target

### Changed
- `scripts/sync-skills.mjs` now syncs the single final skill from `.claude/skills/port-design-system-from-local-clone/SKILL.md`
- stale `port-design` platform artifacts are removed during sync so the repo exposes one command only
- `AGENTS.md`, `README.md`, target usage docs, and app copy were aligned to the final command name and full visual replacement philosophy
- all platform skill files are now generated for `/port-design-system-from-local-clone`

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

[Unreleased]: https://github.com/jlp717/port-design-system/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/jlp717/port-design-system/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/jlp717/port-design-system/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jlp717/port-design-system/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jlp717/port-design-system/releases/tag/v0.1.0