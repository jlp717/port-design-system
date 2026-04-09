#!/usr/bin/env node

/**
 * Generates command/skill files for all supported AI coding platforms.
 * Source of truth: .claude/skills/port-design-system-from-local-clone/SKILL.md
 *
 * Usage: node scripts/sync-skills.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_NAME = 'port-design';
const SHORT_DESC =
  'Port a complete visual design system from a local clone into an existing Next.js project. Target keeps content, routes, and backend but looks visually identical to source.';
const ARGUMENT_HINT = '<source-path> <target-path> [<commit-hash>]';
const NO_ARGS_TEXT = 'the source path and target path provided by the user';

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  \u2713 ${relPath}`);
}

// Read source skill
const source = join(ROOT, '.claude', 'skills', SKILL_NAME, 'SKILL.md');
let raw;
try {
  raw = readFileSync(source, 'utf8').replace(/\r\n/g, '\n');
} catch {
  console.error(`Error: Source skill not found at .claude/skills/${SKILL_NAME}/SKILL.md`);
  process.exit(1);
}

const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!match) {
  console.error('Error: Could not parse frontmatter');
  process.exit(1);
}

const body = match[2];
const header =
  `<!-- AUTO-GENERATED from .claude/skills/${SKILL_NAME}/SKILL.md \u2014 do not edit directly.\n` +
  `     Run \`node scripts/sync-skills.mjs\` to regenerate. -->\n\n`;

const noArgs = (text) => text.replace(/\$ARGUMENTS/g, NO_ARGS_TEXT);

console.log(`\nSyncing ${SKILL_NAME} skill to all platforms...`);
console.log(`  Source: .claude/skills/${SKILL_NAME}/SKILL.md\n`);

// 1. Codex CLI
write(`.codex/skills/${SKILL_NAME}/SKILL.md`, raw);

// 2. GitHub Copilot
write(`.github/skills/${SKILL_NAME}/SKILL.md`, raw);

// 3. Cursor
write(`.cursor/commands/${SKILL_NAME}.md`, header + noArgs(body));

// 4. Windsurf
write(`.windsurf/workflows/${SKILL_NAME}.md`, header + noArgs(body));

// 5. Gemini CLI
const geminiBody = body.replace(/\$ARGUMENTS/g, '{{args}}');
write(
  `.gemini/commands/${SKILL_NAME}.toml`,
  `# AUTO-GENERATED from .claude/skills/${SKILL_NAME}/SKILL.md\n` +
    `# Run \`node scripts/sync-skills.mjs\` to regenerate.\n\n` +
    `description = "${SHORT_DESC}"\n\n` +
    `[prompt]\ntext = '''\n${geminiBody}\n'''\n`
);

// 6. OpenCode
write(
  `.opencode/commands/${SKILL_NAME}.md`,
  `---\ndescription: "${SHORT_DESC}"\n---\n${header}${body}`
);

// 7. Augment Code
write(
  `.augment/commands/${SKILL_NAME}.md`,
  `---\ndescription: "${SHORT_DESC}"\nargument-hint: "${ARGUMENT_HINT}"\n---\n${header}${body}`
);

// 8. Continue
write(
  `.continue/commands/${SKILL_NAME}.md`,
  `---\nname: ${SKILL_NAME}\ndescription: "${SHORT_DESC}"\ninvokable: true\n---\n${header}${body}`
);

// 9. Amazon Q
write(
  `.amazonq/cli-agents/${SKILL_NAME}.json`,
  JSON.stringify(
    {
      name: SKILL_NAME,
      description: SHORT_DESC,
      prompt: noArgs(body),
      fileContext: ['AGENTS.md', 'docs/research/**'],
    },
    null,
    2
  ) + '\n'
);

console.log(`\nDone! 9 platform command files generated for ${SKILL_NAME}.`);
