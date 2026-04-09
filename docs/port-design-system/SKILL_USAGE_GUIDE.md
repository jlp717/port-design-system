# /port-design-system-from-local-clone - Usage Guide

## Command

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>"
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

## Example

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa"
```

## What It Does

- replaces the full target visual system with the source visual system
- removes the target's legacy visual styles, tokens, and decorative assets
- preserves text, content, routes, and business logic
- copies source visual assets
- generates `# ASSETS REEMPLAZO IA`
- inspects the local target with Chrome DevTools MCP when available

## Required Target Docs

- `docs/port-design-system/extraction-report.md`
- `docs/port-design-system/protected-surface-map.md`
- `docs/port-design-system/source-asset-inventory.md`
- `docs/port-design-system/legacy-visual-purge.md`
- `docs/port-design-system/asset-manifest.md`
- `docs/port-design-system/modified-files.md`
- `docs/port-design-system/assets-reemplazo-ia.md`

## Validation

Run in the target project when available:

```bash
npm run lint
npm run typecheck
npm run build
```
