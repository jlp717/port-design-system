# Port Design System From Local Clone

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Production template for one high-reliability AI skill:

- `/port-design`

This skill ports the **COMPLETE visual design system** from a local clone project into an existing Next.js app. This is a **full frontend visual replacement** — the target project's entire visual appearance gets replaced with the source's visual system.

**The target should look VISUALLY IDENTICAL to the source** when opened side-by-side in a browser: same layout, same animations, same fonts, same colors, same spacing, same hover effects, same scroll behavior, same parallax, same 3D effects.

The only things that stay from target:
- **Text content** (target's words in source's visual structure)
- **Routes** (target's URL contracts)
- **Backend** (API routes, server actions, database, auth, business logic — ZERO changes)

## What This Skill Does

Given:
- `source-path` (local clone with the design you want to copy)
- `target-path` (existing Next.js app that receives the design)
- `commit-hash` (optional — baseline commit in target to restore)

It ports **EVERYTHING VISUAL**:
- ALL CSS/SCSS files and design tokens
- ALL font files and typography configs
- ALL images, SVGs, videos, 3D models used in UI
- ALL animation configs (GSAP, ScrollTrigger, Lenis, etc.)
- ALL component visual shells (Navbar, Footer, Cards, Buttons, etc.)
- ALL layout structures, spacing scales, grid systems
- ALL hover/focus/active states and transitions
- ALL scroll-triggered animations and parallax effects
- ALL decorative elements, gradients, shadows, borders

## What This Skill Does Not Do

It NEVER changes:
- API routes
- Server actions
- Auth logic
- Database code
- Business logic
- Route contracts
- Target copy/content (keeps target's text)

## Installation

```bash
git clone https://github.com/jlp717/port-design-system.git
cd port-design-system
npm install
```

Optional maintenance commands:

```bash
node scripts/sync-skills.mjs        # Regenerate skill files for all platforms
bash scripts/sync-agent-rules.sh    # Regenerate agent instruction files
```

## Usage

Command format:

```txt
/port-design "<source-path>" "<target-path>" "<commit-hash>"
```

Real example:

```txt
/port-design "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa"
```

With optional commit hash:

```txt
/port-design "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa" "dc376a2cd4a33b9485f550fc8ae7a287f0041c96"
```

## Expected Workflow

1. **Phase 0:** checkout target baseline (optional) + deep extraction report
2. **Phase 1:** global tokens/fonts/lenis/gsap + navbar/footer
3. **Phase 2:** home page visual port
4. **Phase 3:** remaining pages visual port
5. **Phase 4:** asset copy and reference verification
6. **Phase 5:** visual QA + final report

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
- `.claude/skills/port-design/SKILL.md`

Generated equivalents:
- `.codex/skills/port-design/SKILL.md`
- `.github/skills/port-design/SKILL.md`
- `.cursor/commands/port-design.md`
- `.windsurf/workflows/port-design.md`
- `.gemini/commands/port-design.toml`
- `.opencode/commands/port-design.md`
- `.augment/commands/port-design.md`
- `.continue/commands/port-design.md`
- `.amazonq/cli-agents/port-design.json`

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
