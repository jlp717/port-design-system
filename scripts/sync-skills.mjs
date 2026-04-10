#!/usr/bin/env node

/**
 * Generate the single supported skill/command for every platform.
 * Source of truth: .claude/skills/port-design-system-from-local-clone/SKILL.md
 *
 * Usage: node scripts/sync-skills.mjs
 */

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_NAME = 'port-design-system-from-local-clone';
const STALE_NAMES = ['port-design'];
const SHORT_DESC =
  'Literal visual transplant of a Next.js source clone into a target repo. DESIGN 100% from source (copied verbatim). TEXT 100% from target (all user strings preserved). Dual Chrome DevTools MCP (reference-url + target dev server) open from first command to last. Third arg is public reference URL for pre-flight source validation. PAGE_MAPPING.md required before any code. Every visual file is COPIED then text-swapped, never rewritten. Build after every file. Complete when pixel delta <= 1.5% at all scroll positions.';
const ARGUMENT_HINT = '--url "<source-url>" "<target-path>" | "<source-path>" "<target-path>" "<reference-url>"';
const NO_ARGS_TEXT =
  'the source path, target path, and reference URL provided by the user';

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  OK ${relPath}`);
}

function remove(relPath) {
  rmSync(join(ROOT, relPath), { force: true, recursive: true });
}

function generatedPaths(name) {
  return [
    `.codex/skills/${name}`,
    `.github/skills/${name}`,
    `.cursor/commands/${name}.md`,
    `.windsurf/workflows/${name}.md`,
    `.gemini/commands/${name}.toml`,
    `.opencode/commands/${name}.md`,
    `.augment/commands/${name}.md`,
    `.continue/commands/${name}.md`,
    `.amazonq/cli-agents/${name}.json`,
  ];
}

const source = join(ROOT, '.claude', 'skills', SKILL_NAME, 'SKILL.md');
let raw;
try {
  raw = readFileSync(source, 'utf8').replace(/\r\n/g, '\n');
} catch {
  console.error(`Error: source skill not found at .claude/skills/${SKILL_NAME}/SKILL.md`);
  process.exit(1);
}

const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!match) {
  console.error('Error: could not parse frontmatter');
  process.exit(1);
}

const body = match[2];
const header =
  `<!-- AUTO-GENERATED from .claude/skills/${SKILL_NAME}/SKILL.md - do not edit directly.\n` +
  `     Run \`node scripts/sync-skills.mjs\` to regenerate. -->\n\n`;
const noArgs = (text) => text.replace(/\$ARGUMENTS/g, NO_ARGS_TEXT);

console.log(`\nSyncing ${SKILL_NAME} to all platforms...`);
console.log(`  Source: .claude/skills/${SKILL_NAME}/SKILL.md\n`);

for (const name of STALE_NAMES) {
  for (const relPath of generatedPaths(name)) {
    remove(relPath);
  }
}

write(`.codex/skills/${SKILL_NAME}/SKILL.md`, raw);
write(`.github/skills/${SKILL_NAME}/SKILL.md`, raw);
write(`.cursor/commands/${SKILL_NAME}.md`, header + noArgs(body));
write(`.windsurf/workflows/${SKILL_NAME}.md`, header + noArgs(body));
write(
  `.gemini/commands/${SKILL_NAME}.toml`,
  `# AUTO-GENERATED from .claude/skills/${SKILL_NAME}/SKILL.md\n` +
    `# Run \`node scripts/sync-skills.mjs\` to regenerate.\n\n` +
    `description = "${SHORT_DESC}"\n\n` +
    `[prompt]\ntext = '''\n${body.replace(/\$ARGUMENTS/g, '{{args}}')}\n'''\n`
);
write(
  `.opencode/commands/${SKILL_NAME}.md`,
  `---\ndescription: "${SHORT_DESC}"\n---\n${header}${body}`
);
write(
  `.augment/commands/${SKILL_NAME}.md`,
  `---\ndescription: "${SHORT_DESC}"\nargument-hint: "${ARGUMENT_HINT}"\n---\n${header}${body}`
);
write(
  `.continue/commands/${SKILL_NAME}.md`,
  `---\nname: ${SKILL_NAME}\ndescription: "${SHORT_DESC}"\ninvokable: true\n---\n${header}${body}`
);
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

console.log(`\nDone. Generated 9 platform files for ${SKILL_NAME}.`);
