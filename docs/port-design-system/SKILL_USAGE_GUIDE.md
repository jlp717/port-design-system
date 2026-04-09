# /port-design-system-from-local-clone - Usage Guide

## Command

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>"
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<commit-hash>"
```

## Examples

Without commit:

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa"
```

With commit:

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa" "dc376a2cd4a33b9485f550fc8ae7a287f0041c96"
```

## Inputs

- `<source-path>`: local clone folder that owns the visual design system
- `<target-path>`: existing Next.js project that will receive the design
- `<commit-hash>`: optional target baseline commit

## Guarantee

The source is the only visual truth. The target becomes an exact visual copy of the source. Preserve only target text, content data, routes, and business logic.

## Output Artifacts In Target

- `docs/port-design-system/extraction-report.md`
- `docs/port-design-system/protected-surface-map.md`
- `docs/port-design-system/asset-manifest.md`
- `docs/port-design-system/modified-files.md`

## Validation

Run in the target project when available:

```bash
npm run lint
npm run typecheck
npm run build
```