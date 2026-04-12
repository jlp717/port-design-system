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
3. Ejecuta 13 scripts de extraccion profunda por pagina
4. Genera PAGE_MAPPING.md y ANIMATION_MANIFEST.md
5. Reconstruye seccion por seccion con valores exactos y patrones avanzados
6. Verifica en 3 viewports (375px, 768px, 1440px) a 21 posiciones de scroll (5%)
7. Verificacion de consola JS (cero errores) y carga de assets
8. RECORRIDO VISUAL FINAL obligatorio: comparacion lado a lado en cada posicion
9. Genera prompts IA para assets adaptados al negocio target

## Entregables en el target

PAGE_MAPPING.md · ANIMATION_MANIFEST.md ·
docs/pds/extraction/*.json · docs/pds/extraction/scroll-narrative-*.md ·
docs/pds/extraction/visual-fingerprint-*.json · docs/pds/extraction/scroll-snapshots-*.json ·
docs/pds/extraction/advanced-patterns.json · docs/pds/extraction/css-rules.json ·
docs/pds/extraction/scroll-scrub-trace-*.json ·
docs/pds/build-baseline.txt · docs/pds/original-target-strings.txt ·
docs/pds/modified-files.md · docs/pds/qa-evidence/ ·
docs/pds/qa-evidence/recorrido-final/ ·
docs/pds/assets-reemplazo-ia.md · MIGRATION_COMPLETE.md

## Que extrae (13 scripts)

1. **Design tokens**: CSS vars, tipografia completa, 100+ colores, spacing, sombras, gradientes, z-index, breakpoints, @font-face, Google Fonts
2. **Animaciones**: GSAP, Lenis, Framer Motion, CSS keyframes, CSS transitions, IntersectionObserver, RAF, video scrub, scroll listeners, canvas/WebGL
3. **Scroll scrub trace**: video/canvas currentTime tracking a 0/10/25/50/75/100% scroll — BLOQUEANTE si hay media fullscreen
4. **Estructura DOM**: secciones con computed styles, grid/flexbox configs, jerarquia de componentes, nav behavior
5. **Interacciones**: hover effects (simulados via JS), focus/active states, mobile menu, hover CSS rules
6. **Assets**: todas las imagenes, videos, SVGs inline, background-images, fonts, iconos, preloads
7. **Three.js**: escena 3D completa (camara, luces, meshes, materiales, animaciones) — solo si detectado
8. **Dark mode**: mecanismo de toggle, tokens light/dark, prefers-color-scheme
9. **Visual fingerprint**: 50+ CSS properties de TODOS los elementos visibles (hasta 500 elementos)
10. **Advanced patterns**: preloader, marquee, tabs, accordions, carousels, counters, text split, custom cursors, scroll snap, parallax, stagger
11. **Full CSS rules**: TODAS las reglas CSS reales (hover, focus, active, media queries, transforms, animations)
12. **Scroll snapshots**: datos automatizados en cada 5% de scroll (21 posiciones) para comparacion source vs target
13. **Scroll narrative**: descripcion textual detallada a cada 5% de scroll por pagina

## Patrones de reconstruccion avanzados

La skill incluye patrones de implementacion listos para usar:
VIDEO_SCRUB, LENIS_INIT, GSAP_SCROLLTRIGGER, THREE.JS_SCENE,
MARQUEE, TABS, ACCORDION, CAROUSEL, COUNTER, TEXT_SPLIT,
MAGNETIC_HOVER, CUSTOM_CURSOR, PRELOADER, SCROLL_SNAP,
PARALLAX_LAYERS, STAGGER_GROUPS, PAGE_TRANSITION,
CLIP_PATH_ANIM, BACKDROP_BLUR

## Verificacion QA

- Computed styles: TOLERANCIA CERO (IDENTICO, no aproximado)
- Consola JS: CERO errores
- Red/assets: TODAS las fuentes, imagenes y videos cargan
- Performance: LCP, CLS (informativo)
- Recorrido visual final: 21 posiciones x 3 viewports x todas las paginas

## Requisitos

- Node.js >= 22
- MCP browser server configurado (para navegacion y ejecucion de JS)
- Target corriendo en localhost (npm run dev)
