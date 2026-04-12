<!-- AUTO-GENERATED from AGENTS.md - do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

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

# Inspection Guide v3.0

## Setup inicial

MCP-REF:    <source-url>           (fuente visual absoluta)
MCP-TARGET: http://localhost:3001  (target en desarrollo)
Ambas abiertas hasta MIGRATION_COMPLETE.md.

## Scripts de extraccion (ejecutar en MCP-REF por pagina)

7 scripts definidos en SKILL.md:
1. extractFullDesignSystem() → design-tokens.json
2. extractAnimationSystem() → animations.json
3. extractDOMStructure() → structure.json
4. extractInteractions() → interactions.json
5. extractAssets() → assets.json
6. extractThreeJSScene() → three-scene.json (condicional)
7. extractDarkMode() → dark-mode.json

Guardar outputs en: docs/pds/extraction/

## Protocolo de captura — siempre aplicar antes de screenshot

```javascript
// 1. Esperar carga completa
await new Promise(r => setTimeout(r, 2500));
// 2. Forzar lazy images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.loading = 'eager';
  if (img.dataset.src) img.src = img.dataset.src;
});
// 3. Forzar videos
document.querySelectorAll('video').forEach(v => {
  if (v.paused && v.readyState >= 2) v.play().catch(() => {});
});
// 4. Estabilizar layout
await new Promise(r => requestAnimationFrame(() => setTimeout(r, 500)));
```

## Deteccion de video antes de pixel delta

```javascript
const hasFullscreenVideo = (() => {
  const v = document.querySelector('video');
  return v ? v.offsetWidth >= window.innerWidth * 0.8 : false;
})();
// Si true: usar computed style comparison, no pixel delta en hero/0%
// Pixel delta solo desde scroll 25% en adelante
```

## Multi-viewport obligatorio

Verificar en TRES viewports:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

## Posiciones de captura obligatorias

0%, 25%, 50%, 75%, 100% — nunca solo 0%.

## Computed style comparison

Ejecutar en ambos MCPs y comparar:

```javascript
(function extractComputedStyles() {
  const selectors = [
    'nav','header','footer','h1','h2','h3','h4','p',
    '[class*="hero"]','[class*="section"]',
    'button','a[class]','[class*="card"]','[class*="feature"]',
    '[class*="btn"]','[class*="cta"]','input','textarea',
    '[class*="grid"]','[class*="container"]'
  ];
  const result = {};
  selectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    const cs = getComputedStyle(el);
    result[sel] = {
      fontFamily: cs.fontFamily, fontSize: cs.fontSize,
      fontWeight: cs.fontWeight, letterSpacing: cs.letterSpacing,
      lineHeight: cs.lineHeight, color: cs.color,
      backgroundColor: cs.backgroundColor, padding: cs.padding,
      margin: cs.margin, borderRadius: cs.borderRadius,
      transform: cs.transform, opacity: cs.opacity,
      display: cs.display, position: cs.position, zIndex: cs.zIndex,
      gap: cs.gap, maxWidth: cs.maxWidth, boxShadow: cs.boxShadow
    };
  });
  return JSON.stringify(result, null, 2);
})();
```

Criterios PASS:
- fontFamily: IGUAL
- fontSize: +-2px
- fontWeight: IGUAL
- color: IGUAL
- backgroundColor: IGUAL
- borderRadius: +-2px
- letterSpacing: +-0.5px
- padding: +-4px

## Checklist de extraccion por pagina

Design tokens:
  [ ] CSS custom properties en :root y html
  [ ] Sistema de color completo (100+ colores)
  [ ] Tipografia: 30+ selectores con fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
  [ ] Spacing, radius, shadow, z-index, gradientes, filtros
  [ ] @font-face declarations y Google Fonts URLs
  [ ] Breakpoints de media queries

Animation system:
  [ ] Lenis: duration, easing, smoothTouch, orientation, lerp, wheelMultiplier
  [ ] GSAP version y plugins registrados
  [ ] ScrollTrigger: trigger, start, end, scrub, pin, snap, toggleActions por instancia
  [ ] CSS @keyframes: nombre, frames con estilos
  [ ] CSS transitions: selectores con transition property
  [ ] VIDEO_SCRUB: src, dimensions, coversViewport, parentSection
  [ ] Canvas/WebGL: dimensions, contextType, coversViewport
  [ ] IntersectionObserver: clases y datasets
  [ ] Framer Motion: data-framer-appear-id

Structure:
  [ ] Secciones con index, clases, dimensions, styles completos
  [ ] Grid/flexbox configurations por seccion
  [ ] Nav behavior: position, backgroundColor, backdropFilter, isTransparent, isFixed

Interactions:
  [ ] Hover effects: cambios en color, backgroundColor, transform, opacity, boxShadow
  [ ] CSS :hover/:focus/:active rules de stylesheets
  [ ] Mobile menu: selector, aria attributes

Assets:
  [ ] Imagenes: src, srcset, alt, dimensions, loading
  [ ] Videos: src, sources, poster, dimensions, autoplay/muted/loop
  [ ] SVGs inline: viewBox, pathCount, role
  [ ] Background images: URLs y selectores
  [ ] Preloads: fonts, images, videos

Dark mode:
  [ ] Mecanismo: class, data-attribute, media-query, o none
  [ ] Tokens dark vs light

Scroll narrative:
  [ ] Descripcion textual a 0%, 10%, 20% ... 100% scroll
  [ ] Cambios en nav, visibilidad, animaciones activas
