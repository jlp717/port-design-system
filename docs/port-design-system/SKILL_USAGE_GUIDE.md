# /port-design-system-from-local-clone v3.0 — Usage Guide

## Comando

```txt
/port-design-system-from-local-clone "<target-path>" "<source-url>"
```

- `<target-path>`: ruta local del proyecto Next.js a modificar
- `<source-url>`: URL publica de la web cuyo diseno se clona

## Ejemplo real — Granja Mari Pepa desde jobyaviation.com

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa\frontend" "https://jobyaviation.com"
```

Contexto adicional al invocar:

```
CONTEXT:
Source URL: https://jobyaviation.com
Target: granja_mari_pepa/frontend (distribuidora HORECA, Lorca, Murcia)
Backend del target (auth, API, DB, next-intl): INTOCABLE
Efectos a replicar: scroll-driven video scrub, parallax cinematografico,
GSAP ScrollTrigger con pin, Lenis smooth scroll, IntersectionObserver
reveals, logo/nav animado, partner tabs, news cards hover, tipografia
dark/light dramatica
```

## Que hace automaticamente la IA

1. Abre dos MCP browsers (source + target dev server)
2. Crawlea todas las paginas del source automaticamente
3. Ejecuta 7 scripts de extraccion profunda por pagina
4. Genera PAGE_MAPPING.md y ANIMATION_MANIFEST.md
5. Reconstruye seccion por seccion con valores exactos
6. Verifica en 3 viewports (375px, 768px, 1440px)
7. Genera prompts IA para assets adaptados al negocio target

## Entregables en el target

PAGE_MAPPING.md · ANIMATION_MANIFEST.md ·
docs/pds/extraction/*.json · docs/pds/extraction/scroll-narrative-*.md ·
docs/pds/build-baseline.txt · docs/pds/original-target-strings.txt ·
docs/pds/modified-files.md · docs/pds/qa-evidence/ ·
docs/pds/assets-reemplazo-ia.md · MIGRATION_COMPLETE.md

## Que extrae (7 scripts)

1. **Design tokens**: CSS vars, tipografia completa, 100+ colores, spacing, sombras, gradientes, z-index, breakpoints, @font-face, Google Fonts
2. **Animaciones**: GSAP, Lenis, Framer Motion, CSS keyframes, CSS transitions, IntersectionObserver, RAF, video scrub, scroll listeners, canvas/WebGL
3. **Estructura DOM**: secciones con computed styles, grid/flexbox configs, jerarquia de componentes, nav behavior
4. **Interacciones**: hover effects (simulados via JS), focus/active states, mobile menu, hover CSS rules
5. **Assets**: todas las imagenes, videos, SVGs inline, background-images, fonts, iconos, preloads
6. **Three.js**: escena 3D completa (camara, luces, meshes, materiales, animaciones) — solo si detectado
7. **Dark mode**: mecanismo de toggle, tokens light/dark, prefers-color-scheme

## Requisitos

- Node.js >= 22
- MCP browser server configurado (para navegacion y ejecucion de JS)
- Target corriendo en localhost (npm run dev)
