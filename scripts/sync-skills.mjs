#!/usr/bin/env node

/**
 * Generates command/skill files for all supported AI coding platforms.
 * Loops over all skills defined in the SKILLS array.
 * Source of truth per skill: .claude/skills/<name>/SKILL.md
 *
 * Usage: node scripts/sync-skills.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const SKILLS = [
  {
    name: 'clone-website',
    shortDesc: 'Reverse-engineer and clone any website as a pixel-perfect replica',
    argumentHint: '<url>',
    noArgsText: 'the target URL provided by the user',
  },
  {
    name: 'port-design-system',
    shortDesc: 'Port a visual design system from one Next.js project to another',
    argumentHint: '<source-path> <target-path>',
    noArgsText: 'the source and target paths provided by the user',
  },
];

// --- Helpers ---

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  \u2713 ${relPath}`);
}

function syncSkill({ name, shortDesc, argumentHint, noArgsText }) {
  const source = join(ROOT, '.claude', 'skills', name, 'SKILL.md');

  let raw;
  try {
    raw = readFileSync(source, 'utf8').replace(/\r\n/g, '\n');
  } catch {
    console.error(`Error: Source skill not found at .claude/skills/${name}/SKILL.md`);
    process.exit(1);
  }

  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    console.error(`Error: Could not parse frontmatter for skill "${name}"`);
    process.exit(1);
  }

  const body = match[2];
  const header =
    `<!-- AUTO-GENERATED from .claude/skills/${name}/SKILL.md \u2014 do not edit directly.\n` +
    `     Run \`node scripts/sync-skills.mjs\` to regenerate. -->\n\n`;

  const noArgs = (text) => text.replace(/\$ARGUMENTS/g, noArgsText);

  console.log(`\nSyncing ${name} skill to all platforms...`);
  console.log(`  Source: .claude/skills/${name}/SKILL.md\n`);

  // 1. Codex CLI — same SKILL.md format, same $ARGUMENTS syntax
  write(`.codex/skills/${name}/SKILL.md`, raw);

  // 2. GitHub Copilot — same SKILL.md format
  write(`.github/skills/${name}/SKILL.md`, raw);

  // 3. Cursor — plain markdown, no argument substitution support
  write(`.cursor/commands/${name}.md`, header + noArgs(body));

  // 4. Windsurf — markdown workflow
  write(`.windsurf/workflows/${name}.md`, header + noArgs(body));

  // 5. Gemini CLI — TOML format, {{args}} for arguments
  const geminiBody = body.replace(/\$ARGUMENTS/g, '{{args}}');
  write(
    `.gemini/commands/${name}.toml`,
    `# AUTO-GENERATED from .claude/skills/${name}/SKILL.md\n` +
      `# Run \`node scripts/sync-skills.mjs\` to regenerate.\n\n` +
      `description = "${shortDesc}"\n\n` +
      `[prompt]\ntext = '''\n${geminiBody}\n'''\n`
  );

  // 6. OpenCode — markdown + YAML frontmatter, $ARGUMENTS works natively
  write(
    `.opencode/commands/${name}.md`,
    `---\ndescription: "${shortDesc}"\n---\n${header}${body}`
  );

  // 7. Augment Code — markdown + YAML frontmatter
  write(
    `.augment/commands/${name}.md`,
    `---\ndescription: "${shortDesc}"\nargument-hint: "${argumentHint}"\n---\n${header}${body}`
  );

  // 8. Continue — prompt file with invokable: true
  write(
    `.continue/commands/${name}.md`,
    `---\nname: ${name}\ndescription: "${shortDesc}"\ninvokable: true\n---\n${header}${body}`
  );

  // 9. Amazon Q — JSON agent definition
  write(
    `.amazonq/cli-agents/${name}.json`,
    JSON.stringify(
      {
        name,
        description: shortDesc,
        prompt: noArgs(body),
        fileContext: ['AGENTS.md', 'docs/research/**'],
      },
      null,
      2
    ) + '\n'
  );

  console.log(`\nDone! 9 platform command files generated for ${name}.`);
}

// --- Generate ---

let totalFiles = 0;

for (const skill of SKILLS) {
  syncSkill(skill);
  totalFiles += 9;
}

console.log(`\n${'='.repeat(50)}`);
console.log(`Total: ${totalFiles} platform files generated across ${SKILLS.length} skills.`);
