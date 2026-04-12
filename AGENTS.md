# Port Design System From Local Clone v3.0

## Regla absoluta

La source-url es la UNICA fuente de verdad visual.
El target debe convertirse visualmente en una copia exacta de la source-url.
Lo unico que se conserva del target es el texto visible al usuario y la logica de negocio.

## Invocacion

```txt
/port-design-system-from-local-clone "<target-path>" "<source-url>"
```

Ejemplo:
```txt
/port-design-system-from-local-clone "/Users/usuario/proyectos/mari-pepa" "https://jobyaviation.com"
```

- `<target-path>`: ruta local del proyecto Next.js a modificar.
- `<source-url>`: URL publica de la web cuyo diseno se clona.

## DISENO vs TEXTO — inmutable

DISENO = 100% del source. Sin adaptar. Sin reescribir.
TEXTO  = 100% del target. Cada string visible. Cero texto source sobrevive.

Texto SI: strings visibles en UI, hrefs del negocio target, nombres del negocio.
Texto NO: clases CSS, valores de animacion, estructura JSX, configs GSAP/Lenis,
          atributos data-*, assets decorativos.

Cuando target tiene paginas sin equivalente en source:
  - Usar diseno de la pagina source estructuralmente mas similar
  - Preservar todo el texto del target
  - Nunca inventar diseno nuevo

## Flujo completo (5 fases)

### FASE 0: Setup y descubrimiento automatico
- Dual MCP: MCP-REF en source-url, MCP-TARGET en localhost:3001
- Descubrimiento automatico de paginas via crawling de links y sitemap.xml
- PAGE_MAPPING.md generado automaticamente — BLOQUEANTE

### FASE 1: Extraccion profunda (7 scripts via MCP-REF)
1. extractFullDesignSystem() — tokens, tipografia, colores, spacing, sombras, gradientes, z-index, breakpoints, @font-face
2. extractAnimationSystem() — GSAP, Lenis, Framer Motion, CSS keyframes, CSS transitions, IntersectionObserver, RAF, video scrub, canvas/WebGL
3. extractDOMStructure() — secciones, layout grid/flexbox, jerarquia, nav behavior, responsive
4. extractInteractions() — hover, focus, active, nav behavior, mobile menu
5. extractAssets() — imagenes, videos, SVGs, fonts, background-images, iconos, preloads
6. extractThreeJSScene() — condicional, solo si Three.js/R3F/WebGL detectado
7. extractDarkMode() — temas, color-scheme tokens, toggle mechanism

Adicional: narrativa textual de scroll (pseudo-video) por pagina.
ANIMATION_MANIFEST.md — BLOQUEANTE.

Tipos de animacion: CSS_KEYFRAME, CSS_TRANSITION, GSAP_TWEEN, GSAP_SCROLLTRIGGER,
GSAP_TIMELINE, GSAP_SPLITTEXT, LENIS_INIT, LENIS_CB, INTERSECTION_OBS,
RAF_LOOP, SCROLL_LISTENER, VIDEO_SCRUB, CANVAS_SCROLL, LOTTIE, DATA_ATTR,
FRAMER_MOTION, THREE_ANIMATION, WEB_ANIMATION_API

### FASE 2: Analisis del target
- Build baseline
- Extraccion de strings de texto
- Deteccion e instalacion de dependencias del source

### FASE 3: Reconstruccion por secciones
Orden: tokens → tailwind → fonts → Lenis/GSAP → navbar → footer → paginas → compartidos

Por seccion: INSPECT → BUILD → SWAP texto → BUILD verify → VERIFY dual MCP

Patrones incluidos en SKILL.md: VIDEO_SCRUB, LENIS_INIT, GSAP_SCROLLTRIGGER,
THREE.JS_SCENE, computed-style-to-Tailwind mapping table.

### FASE 4: Verificacion QA
- Multi-viewport: 375px, 768px, 1440px
- Computed style comparison con criterios PASS/FAIL definidos
- Pixel delta <= 1.5% donde aplica
- Video fullscreen: computed style en 0%, pixel delta desde 25%
- Verificacion de animaciones e interacciones
- Sistema de checkpoints por seccion

### FASE 5: Entregables finales
PAGE_MAPPING.md · ANIMATION_MANIFEST.md · docs/pds/extraction/*.json ·
docs/pds/extraction/scroll-narrative-*.md · docs/pds/modified-files.md ·
docs/pds/qa-evidence/ · docs/pds/assets-reemplazo-ia.md · MIGRATION_COMPLETE.md

## Reglas de build

BUILD-1: archivo modificado → build inmediato
BUILD-2: build falla → corregir antes de tocar otro
BUILD-3: 3 fallos en mismo archivo → STOP + reporte
BUILD-4: cero imports de chunks/hashes/.next/server/
BUILD-5: PASS = exit 0, cero errores TS, cero warnings nuevos

## Stop conditions

- PAGE_MAPPING.md inexistente cuando se intenta codigo
- Build sin resolver antes del siguiente archivo
- design-tokens.json vacio → re-extraer
- ScrollTrigger.getAll() vacio con animaciones visibles → scroll + re-extraer
- Evidencia MCP ausente para item marcado ✅
- Texto de source encontrado en target despues de SWAP
- 3 builds fallidos consecutivos en mismo archivo

## Criterios de completitud

PAGE_MAPPING todas ✅ · ANIMATION_MANIFEST grep==TOTAL ·
delta <=1.5% donde aplica · computed style PASS donde hay video ·
build exit 0 · texto target preservado · assets-ia completo ·
multi-viewport (375/768/1440) PASS

## Mantenimiento

Fuente de verdad: .claude/skills/port-design-system-from-local-clone/SKILL.md
Sync: node scripts/sync-skills.mjs && bash scripts/sync-agent-rules.sh

@docs/research/INSPECTION_GUIDE.md
