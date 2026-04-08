# Port Design System From Local Clone

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Production template for one high-reliability AI skill:

- `/port-design-system-from-local-clone`

This skill ports a full visual design system from a local clone project into an existing Next.js app while preserving target content and business logic.

## What This Skill Does

Given:
- `source-path` (local clone design system)
- `target-path` (existing Next.js app)
- `commit-hash` (baseline commit in target)

It ports:
- CSS tokens and global styles
- typography and font setup
- navbar/footer visual shell
- page-level layout styles
- GSAP/ScrollTrigger/Lenis behavior
- responsive breakpoints
- decorative assets from source

## What This Skill Does Not Do

It never changes:
- API routes
- server actions
- auth logic
- database code
- business logic
- route contracts
- target copy/content

## Installation

```bash
git clone https://github.com/jlp717/port-design-system.git
cd port-design-system
npm install
```

Optional maintenance commands:

```bash
node scripts/sync-skills.mjs
bash scripts/sync-agent-rules.sh
```

## Usage

Command format:

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

Real example:

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa" "dc376a2cd4a33b9485f550fc8ae7a287f0041c96"
```

## Expected Workflow

1. Phase 0: checkout target baseline + deep extraction report
2. Phase 1: global tokens/fonts/lenis/gsap + navbar/footer
3. Phase 2: home page visual port
4. Phase 3: remaining pages visual port
5. Phase 4: asset copy and reference verification
6. Phase 5: visual QA + final report

Each phase must output:
- files modified
- assets used (absolute source path)
- PASS/FAIL checklist

## Reports Generated In Target

- `docs/port-design-system/extraction-report.md`
- `docs/port-design-system/changelog.md`
- `docs/port-design-system/asset-manifest.md`

## Supported Agents

Source-of-truth skill file:
- `.claude/skills/port-design-system-from-local-clone/SKILL.md`

Generated equivalents:
- `.codex/skills/port-design-system-from-local-clone/SKILL.md`
- `.github/skills/port-design-system-from-local-clone/SKILL.md`
- `.cursor/commands/port-design-system-from-local-clone.md`
- `.windsurf/workflows/port-design-system-from-local-clone.md`
- `.gemini/commands/port-design-system-from-local-clone.toml`
- `.opencode/commands/port-design-system-from-local-clone.md`
- `.augment/commands/port-design-system-from-local-clone.md`
- `.continue/commands/port-design-system-from-local-clone.md`
- `.amazonq/cli-agents/port-design-system-from-local-clone.json`

## Troubleshooting

### Error: source path not found
- Confirm absolute path exists.
- Confirm source has web project structure and visual assets.

### Error: target is not a Next.js project
- Confirm `next` exists in target `package.json`.
- Confirm target has `app/` or `pages/` routes.

### Error: commit hash not found
- Run `git fetch --all` in target.
- Confirm hash exists with `git show <commit-hash>`.

### Build fails after migration
- Check broken imports and missing assets first.
- Verify fonts and media files were copied from source.
- Keep backend/auth/server-action files untouched.

### Visual mismatch vs source
- Re-check extracted token values and animation constants.
- Validate responsive behavior at 390/768/1024/1440 widths.
- Use Chrome DevTools MCP for computed-style and animation QA.

## Development

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run check
```

## License

MIT