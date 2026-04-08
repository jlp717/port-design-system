# Port Design System

<a href="https://github.com/jlp717/port-design-system/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" /></a>

A production-grade AI skill for transplanting the complete visual design system from one Next.js project to another — colors, typography, animations, scroll behavior, component shells, and decorative assets — while keeping the target's business logic, content, API routes, and auth completely untouched.

**Two skills. Two steps. Zero compromise.**

1. **`/clone-website`** — Reverse-engineer any website into a pixel-perfect Next.js codebase
2. **`/port-design-system`** — Apply that design to your production app without touching a single line of business logic

**Recommended: [Claude Code](https://docs.anthropic.com/en/docs/claude-code) with Opus 4.6 for best results** — works with 13+ AI coding agents.

## Quick Start

```bash
git clone https://github.com/jlp717/port-design-system.git
cd port-design-system
npm install
```

Then in your AI agent:

```
/port-design-system "<source-path>" "<target-path>"
```

Both projects must exist locally. The source is the design you want to copy. The target is your production Next.js app.

## What Gets Ported

| Visual Layer (everything the user sees) | Protected Layer (never touched) |
|----------------------------------------|--------------------------------|
| CSS custom properties & color palette  | API routes & server actions    |
| Typography & font files              | Database schemas & ORM models  |
| Tailwind theme tokens                | Authentication config          |
| GSAP animations & ScrollTrigger      | Environment variables          |
| Lenis smooth scroll                  | Text content & headings        |
| Parallax effects                     | Form handlers & validation     |
| Hover/focus/active states            | URL routing & dynamic segments |
| Responsive breakpoints               | Third-party integrations       |
| Component visual shells              | Business logic & data fetching |
| Decorative assets (images, videos)   | Test files & CI/CD configs     |

**The rule:** If it affects how the site *works* or what a user *reads* → off-limits. If it affects how it *looks, moves, or feels* → ported.

## The Workflow

```
/clone-website <url>          →  Create a visual clone of any site
       ↓
(port-design-system already exists in this repo — no extra setup needed)
       ↓
/port-design-system <source> <target>  →  Apply the design to your app
```

### Phase Breakdown

**Phase 0 — Source Audit:** Reads every file in the source project, extracts all visual tokens, animations, font configs, and decorative assets into an auditable report.

**Phase 1 — Global Foundation:** Installs missing visual dependencies, merges `globals.css`, Tailwind config, fonts, and sets up animation providers (GSAP, Lenis) in the target.

**Phase 2 — Home Page:** Applies the source's visual shell section by section — layout structure, Tailwind classes, animations, hover states. Every heading, paragraph, and data binding stays exactly as-is.

**Phase 3 — Remaining Pages:** About, services, contact, auth, dashboards — all receive the visual refresh. Pages without a source counterpart get the global token changes only.

**Phase 4 — Assets & Build:** Copies decorative assets, updates references, runs full build verification. Zero TypeScript errors, zero ESLint errors.

**Phase 5 — QA & Cleanup:** Visual comparison, content integrity check (zero text changes), functional verification (routes, forms, auth), generates changelog and asset manifest.

## Supported Agents

| Agent | Status |
|-------|--------|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | **Recommended** — Opus 4.6 |
| [Codex CLI](https://github.com/openai/codex) | Supported |
| [OpenCode](https://opencode.ai/) | Supported |
| [GitHub Copilot](https://github.com/features/copilot) | Supported |
| [Cursor](https://cursor.com/) | Supported |
| [Windsurf](https://codeium.com/windsurf) | Supported |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Supported |
| [Cline](https://github.com/cline/cline) | Supported |
| [Roo Code](https://github.com/RooCodeInc/Roo-Code) | Supported |
| [Continue](https://continue.dev/) | Supported |
| [Amazon Q](https://aws.amazon.com/q/developer/) | Supported |
| [Augment Code](https://www.augmentcode.com/) | Supported |
| [Aider](https://aider.chat/) | Supported |

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript strict
- **shadcn/ui** — Radix primitives + Tailwind CSS v4
- **Tailwind CSS v4** — oklch design tokens
- **Lucide React** — default icons

## Project Structure

```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Extracted SVG icons
  lib/utils.ts      # cn() utility
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  images/           # Downloaded images
  videos/           # Downloaded videos
  seo/              # Favicons, OG images
docs/
  research/         # Extraction output & component specs
  design-references/ # Screenshots
  port-design-system/ # Port reports (auto-generated at runtime)
scripts/
  sync-agent-rules.sh  # Regenerate agent instruction files
  sync-skills.mjs      # Regenerate skills for all platforms
AGENTS.md           # Agent instructions (single source of truth)
CLAUDE.md           # Claude Code config (imports AGENTS.md)
GEMINI.md           # Gemini CLI config (imports AGENTS.md)
```

## Commands

```bash
npm run dev         # Start dev server
npm run build       # Production build
npm run lint        # ESLint check
npm run typecheck   # TypeScript check
npm run check       # Run lint + typecheck + build
```

## Skills Architecture

This repo contains **two source-of-truth skill definitions** that power all 13 supported agents:

| Skill | Source File | What It Does |
|-------|-------------|-------------|
| `/clone-website` | `.claude/skills/clone-website/SKILL.md` | Reverse-engineer any URL into Next.js |
| `/port-design-system` | `.claude/skills/port-design-system/SKILL.md` | Port a design between projects |

Each skill auto-generates platform-specific files for all 13 agents. Edit the source, then run:

```bash
node scripts/sync-skills.mjs        # Regenerate skill files
bash scripts/sync-agent-rules.sh    # Regenerate agent instructions
```

## License

MIT
