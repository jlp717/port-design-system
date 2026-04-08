# /port-design-system-from-local-clone - Usage Guide

## Command

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

## Example

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa" "dc376a2cd4a33b9485f550fc8ae7a287f0041c96"
```

## Inputs
- `<source-path>`: local clone folder that contains the desired visual design system
- `<target-path>`: existing Next.js project to receive the new visual layer
- `<commit-hash>`: exact target commit used as clean baseline

## Output Artifacts In Target
- `docs/port-design-system/extraction-report.md`
- `docs/port-design-system/changelog.md`
- `docs/port-design-system/asset-manifest.md`

## Non-Negotiable Rules
- Do not touch backend, API routes, server actions, auth, or business logic.
- Keep target content text unchanged.
- Copy visual assets only from source path.
- Apply source animation/token values literally.

## Validation
Run in target frontend:

```bash
npm run build
npm run typecheck
npm run lint
```
