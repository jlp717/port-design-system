#!/usr/bin/env node

/**
 * Generate skill command files for all supported AI coding platforms.
 * Source of truth per skill: .claude/skills/<name>/SKILL.md
 *
 * Usage: node scripts/sync-skills.mjs
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const SKILLS = [
  {
    name: 'port-design-system-from-local-clone',
    shortDesc:
      'Port a complete visual design system from a local clone into an existing Next.js project. Target keeps content, routes, and backend but looks visually identical to source.',
    argumentHint: '<source-path> <target-path> [commit-hash]',
    noArgsText: 'the source path and target path provided by the user',
  },
];

const SKILL_NAMES = new Set(SKILLS.map((skill) => skill.name));

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  ok ${relPath}`);
}

function readSkillSource(name) {
  const source = join(ROOT, '.claude', 'skills', name, 'SKILL.md');

  if (!existsSync(source)) {
    console.error(`Error: source skill not found: .claude/skills/${name}/SKILL.md`);
    process.exit(1);
  }

  return readFileSync(source, 'utf8').replace(/\r\n/g, '\n');
}

function parseSkill(raw, name) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    console.error(`Error: could not parse frontmatter for skill "${name}"`);
    process.exit(1);
  }

  return {
    frontmatter: match[1],
    body: match[2],
  };
}

function syncSkill({ name, shortDesc, argumentHint, noArgsText }) {
  const raw = readSkillSource(name);
  const { body } = parseSkill(raw, name);

  const header =
    `<!-- AUTO-GENERATED from .claude/skills/${name}/SKILL.md - do not edit directly.\n` +
    `     Run \`node scripts/sync-skills.mjs\` to regenerate. -->\n\n`;

  const noArgs = (text) => text.replace(/\$ARGUMENTS/g, noArgsText);

  console.log(`\nSyncing ${name}...`);

  // 1. Codex CLI
  write(`.codex/skills/${name}/SKILL.md`, raw);

  // 2. GitHub Copilot
  write(`.github/skills/${name}/SKILL.md`, raw);

  // 3. Cursor
  write(`.cursor/commands/${name}.md`, header + noArgs(body));

  // 4. Windsurf
  write(`.windsurf/workflows/${name}.md`, header + noArgs(body));

  // 5. Gemini CLI
  const geminiBody = body.replace(/\$ARGUMENTS/g, '{{args}}');
  write(
    `.gemini/commands/${name}.toml`,
    `# AUTO-GENERATED from .claude/skills/${name}/SKILL.md\n` +
      `# Run \`node scripts/sync-skills.mjs\` to regenerate.\n\n` +
      `description = "${shortDesc}"\n\n` +
      `[prompt]\ntext = '''\n${geminiBody}\n'''\n`
  );

  // 6. OpenCode
  write(
    `.opencode/commands/${name}.md`,
    `---\ndescription: "${shortDesc}"\n---\n${header}${body}`
  );

  // 7. Augment Code
  write(
    `.augment/commands/${name}.md`,
    `---\ndescription: "${shortDesc}"\nargument-hint: "${argumentHint}"\n---\n${header}${body}`
  );

  // 8. Continue
  write(
    `.continue/commands/${name}.md`,
    `---\nname: ${name}\ndescription: "${shortDesc}"\ninvokable: true\n---\n${header}${body}`
  );

  // 9. Amazon Q
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
}

function pruneSkillDirectories(relDir) {
  const fullDir = join(ROOT, relDir);
  if (!existsSync(fullDir)) {
    return 0;
  }

  let removed = 0;
  for (const entry of readdirSync(fullDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (SKILL_NAMES.has(entry.name)) {
      continue;
    }

    rmSync(join(fullDir, entry.name), { recursive: true, force: true });
    console.log(`  removed ${relDir}/${entry.name}`);
    removed += 1;
  }

  return removed;
}

function pruneCommandFiles(relDir, extension) {
  const fullDir = join(ROOT, relDir);
  if (!existsSync(fullDir)) {
    return 0;
  }

  let removed = 0;
  for (const entry of readdirSync(fullDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(extension)) {
      continue;
    }

    const skillName = entry.name.slice(0, -extension.length);
    if (SKILL_NAMES.has(skillName)) {
      continue;
    }

    rmSync(join(fullDir, entry.name), { force: true });
    console.log(`  removed ${relDir}/${entry.name}`);
    removed += 1;
  }

  return removed;
}

function pruneLegacyGeneratedFiles() {
  console.log('\nPruning legacy generated files...');

  let removed = 0;
  removed += pruneSkillDirectories('.codex/skills');
  removed += pruneSkillDirectories('.github/skills');

  removed += pruneCommandFiles('.cursor/commands', '.md');
  removed += pruneCommandFiles('.windsurf/workflows', '.md');
  removed += pruneCommandFiles('.gemini/commands', '.toml');
  removed += pruneCommandFiles('.opencode/commands', '.md');
  removed += pruneCommandFiles('.augment/commands', '.md');
  removed += pruneCommandFiles('.continue/commands', '.md');
  removed += pruneCommandFiles('.amazonq/cli-agents', '.json');

  if (removed === 0) {
    console.log('  no legacy generated files found.');
  } else {
    console.log(`  pruned ${removed} legacy generated entries.`);
  }
}

let totalFiles = 0;
for (const skill of SKILLS) {
  syncSkill(skill);
  totalFiles += 9;
}

pruneLegacyGeneratedFiles();

console.log(`\n${'='.repeat(50)}`);
console.log(`Total generated files: ${totalFiles} across ${SKILLS.length} skill.`);