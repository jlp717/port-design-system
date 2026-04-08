# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning.

## [Unreleased]

### Added
- New source-of-truth skill: `/port-design-system-from-local-clone`.
- New skill file: `.claude/skills/port-design-system-from-local-clone/SKILL.md`.
- Legacy generated file pruning in `scripts/sync-skills.mjs`.

### Changed
- `AGENTS.md` rewritten for local-clone porting workflow and strict phase outputs.
- `README.md` fully rewritten for the new skill contract and 3-argument invocation.
- `scripts/sync-skills.mjs` now generates only `port-design-system-from-local-clone` artifacts.
- `scripts/sync-agent-rules.sh` updated for new project conventions text.
- `docs/research/INSPECTION_GUIDE.md` updated to local clone extraction process.
- `src/app/page.tsx` updated to display new invocation command.

### Removed
- Legacy skill source folders for `/clone-website` and `/port-design-system`.

## [0.3.1] - 2026-03-29

### Fixed
- `sync-agent-rules.sh` import resolution on Windows with CRLF content.

## [0.3.0] - 2026-03-29

### Added
- Multi-URL support for `/clone-website`.
- CI quality gates via GitHub Actions.
- `npm run typecheck` and `npm run check` scripts.
- `.gitattributes` and `.nvmrc` baseline updates.

### Changed
- Documentation and sync scripts improved for multi-platform generation.

## [0.2.0] - 2026-03-28

### Added
- Multi-platform AI agent support.
- Platform-specific instruction files.
- Initial sync scripts for rules and skills.

## [0.1.1] - 2026-03-28

### Added
- Issue templates and PR template.
- Keep-a-changelog setup and package metadata.

### Fixed
- MIT license attribution.

## [0.1.0] - 2026-03-28

### Added
- Initial template scaffold and first-generation cloning workflow.

[Unreleased]: https://github.com/jlp717/port-design-system/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/jlp717/port-design-system/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/jlp717/port-design-system/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jlp717/port-design-system/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/jlp717/port-design-system/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/jlp717/port-design-system/releases/tag/v0.1.0