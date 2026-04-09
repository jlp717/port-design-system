# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- the source-of-truth skill now enforces hard full-visual-replacement semantics, explicit legacy visual purge, full source visual asset copy, mandatory `ASSETS REEMPLAZO IA` generation, and final local Chrome DevTools MCP inspection
- `scripts/sync-skills.mjs`, `AGENTS.md`, `README.md`, and platform artifacts were aligned to the stronger final contract

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
