<!-- AUTO-GENERATED from AGENTS.md - do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

---
description: Project conventions for Port Design System From Local Clone
alwaysApply: true
---
# Port Design System From Local Clone v3.4

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
Texto NO: clases CSS, valores de animacion, estructura JSX, configs de animacion,
          atributos data-*, assets decorativos.

Regla de verificacion — DUAL-MCP VISUAL + PROGRAMATICA:
La verdad visual es lo que un usuario real ve al abrir ambas webs lado a lado.
Las metricas programaticas son soporte, NUNCA pueden sustituir la verificacion visual.
Protocolo obligatorio:
- Abrir MCP-REF y MCP-TARGET SIMULTANEAMENTE para cada pagina
- Scroll sincronizado 0-100% en 11 posiciones, screenshot de AMBOS en cada posicion
- Comparar side-by-side: si hay diferencia visible --> STOP y corregir
- recordScrollBehavior(): captura estado POR CLAVE ESTRUCTURAL (section[0], video[0], header[0]) en 21 posiciones. NO por CSS class name (CSS modules generan hashes que rompen la comparacion)
- compareScrollBehavior(): compara source vs target por clave estructural. Reporta BG_MISMATCH, VIDEO_TIME, HEIGHT_RATIO, ELEMENT_MISSING
- Solo PASS si passRate >= 90% Y dual-MCP visual sin diferencias Y usuario ha aprobado

Regla de dependencias — SOLO LO QUE USA EL SOURCE:
NO asumir GSAP, Lenis, ScrollTrigger. Ejecutar detectAnimationImplementation()
primero. Si source usa native RAF/IO/CSS, target DEBE usar lo mismo.

Regla anti-hardcoding: CERO valores de diseno inventados o copiados de ejemplos.
TODOS los colores, fuentes, spacing, animaciones vienen de la extraccion (FASE 1).

Cuando target tiene paginas sin equivalente en source:
  - Usar diseno de la pagina source estructuralmente mas similar
  - Preservar todo el texto del target
  - Nunca inventar diseno nuevo
  - NUNCA crear paginas placeholder/coming-soon si source tiene diseno completo

## Paridad estructural 1:1 — CRITICA

Cada seccion del source DEBE mapearse a un componente UNICO en el target.
NUNCA crear componentes genericos que se reutilizan para secciones source
que tienen estructura visual DIFERENTE.

- Conteo de secciones source == conteo de secciones target
- Background color por seccion: IDENTICO
- Layout type (grid/flex/block): IDENTICO por seccion
- Altura proporcional de cada seccion: ratio dentro del 20%
- Footer: si source tiene arte/ilustracion, target tambien

## Deteccion de texto en media

- Texto source en video/imagen → documentar en assets-reemplazo-ia.md
- SVGs con <text> elements → swap textual aplica
- Source brand en HTML/SVG del target → STOP + eliminar
- Videos → flagear para review manual de brand text en frames

## Flujo completo (5 fases)

### FASE 0: Setup y descubrimiento automatico
- MCP tool detection: identificar Playwright/Puppeteer/Browser-tools MCP disponible
- Modo degradado sin MCP: usuario pega scripts en DevTools Console
- Dual MCP: MCP-REF en source-url, MCP-TARGET en localhost:3001
- Anti-bot protocol: user-agent override, cookie accept, Cloudflare wait
- MCP crash recovery via _checkpoint.json (resume from last completed step)
- preExpandContent() obligatorio antes de TODA extraccion (lazy load, SPA, accordions, tabs, infinite scroll)
- Descubrimiento automatico de paginas via crawling de links y sitemap.xml
- Page discovery con cycle detection: MAX_PAGES=50, MAX_DEPTH=3, visited set
- PAGE_MAPPING.md generado automaticamente — BLOQUEANTE
- Section inventory extraction (§1.19) — BLOQUEANTE

### FASE 1: Extraccion profunda (23 scripts via MCP-REF)
1. extractFullDesignSystem() — tokens, tipografia, colores, spacing, sombras, gradientes, z-index, breakpoints, @font-face, @container, @layer, media queries extendidas (hover, pointer, prefers-*), CSS-in-JS, Shadow DOM, pseudo-elements (::before/::after/::selection/::placeholder), @property, @supports, Adobe Fonts, custom scrollbar, CSS Motion Path, scroll-margin, content-visibility, color-scheme, container-type/container-name, env(safe-area-inset-*), dvh/svh/lvh units, color-mix(), @starting-style, -webkit-text-stroke, oklch
2. fetchCrossOriginCSS() — fetch manual de hojas de estilo cross-origin bloqueadas por CORS
3. extractShadowStyles() — traversal de Shadow DOM roots para estilos encapsulados
4. extractAnimationSystem() — GSAP (22 plugins + matchMedia + ScrollSmoother instance), Lenis, Framer Motion, CSS keyframes, CSS transitions, IntersectionObserver, RAF, video scrub, canvas/WebGL, CSS scroll-driven animations (scroll-timeline, view-timeline), View Transitions API, Web Animations API, Lottie, Rive, Spline
5. captureIntersectionObserverConfigs() — monkey-patch IO para capturar threshold/rootMargin reales
6. extractLottieRiveSpline() — extraccion completa de animaciones Lottie/dotLottie, Rive, Spline
7. extractScrollScrubTrace() — video/canvas scrub trace a 0/10/25/50/75/100% scroll (BLOQUEANTE si hay media fullscreen)
8. extractDOMStructure() — secciones, layout grid/flexbox, jerarquia, nav behavior, responsive
9. extractInteractions() — hover, focus, active, nav behavior, mobile menu
10. extractAssets() — imagenes, videos, SVGs (incluido sprites symbol/use), fonts, background-images, iconos, preloads, iframes/embeds (YouTube, Vimeo, Maps) + protocolo de descarga
11. extractThreeJSScene() — condicional, solo si Three.js/R3F/WebGL detectado
12. extractDarkMode() — temas, color-scheme tokens, toggle mechanism
13. extractDeepVisualFingerprint() — 60+ CSS properties de TODOS los elementos visibles (incluye touch-action, user-select, writing-mode, image-rendering, text-wrap, fontVariationSettings, grid-auto-flow, container-type/name, contain-intrinsic-size)
14. extractAdvancedPatterns() — preloader, marquee, tabs, accordions, carousels, counters, text split, custom cursors, scroll snap, parallax, stagger, native dialog, Popover API, grid subgrid/masonry, anchor scroll, cookie banners, stacking contexts, form controls, details/summary
15. extractFullCSSRules() — TODAS las CSS rules: hover, focus, active, media queries, transforms, animations, CSS nesting, scroll-timeline, view-transition-name, @container, @layer, @supports, @property, pseudo-elements, scrollbar, motion path, scroll-margin
16. extractScrollSnapshot() — datos automatizados en cada 5% de scroll (21 posiciones)
17. extractAccessibility() — ARIA roles/labels, landmarks, skip links, tabindex, focus traps, prefers-reduced-motion
18. Scroll narrative textual (pseudo-video) a 5% increments por pagina
19. recordScrollBehavior() — scroll programatico 0-100% capturando estado de 200+ elementos en 21 posiciones (transforms, opacity, rect, videoCurrentTime, visibility, pinned state). BLOQUEANTE para verificacion.
20. detectAnimationImplementation() — detecta QUE usa el source (GSAP vs native RAF vs CSS). BLOQUEANTE para FASE 3.
21. extractElementStyleMap() — per-element computed styles + hover CSS rules + pseudo-elements
22. extractNetworkProfile() — performance.getEntriesByType resource analysis, CDN library detection, network summary
23. extractSectionInventory() — section count, bg colors, layout types, height ratios — BLOQUEANTE para paridad

TODOS los JSONs de extraccion DEBEN incluir campo _metadata (version, url, timestamp, viewport, userAgent).

ANIMATION_MANIFEST.md — BLOQUEANTE.

Tipos de animacion (usar el que refleja COMO el source lo implementa):
Library: GSAP_TWEEN, GSAP_SCROLLTRIGGER, GSAP_TIMELINE, GSAP_SPLITTEXT,
  LENIS_INIT, LENIS_CB, FRAMER_MOTION, THREE_ANIMATION, LOTTIE, LOTTIE_DOTLOTTIE,
  RIVE_ANIMATION, SPLINE_SCENE
Native JS: NATIVE_RAF_VIDEO_SCRUB, NATIVE_RAF_PARALLAX, INTERSECTION_OBS,
  RAF_LOOP, SCROLL_LISTENER, WEB_ANIMATION_API
CSS-only: CSS_KEYFRAME, CSS_TRANSITION, CSS_MODULE_ANIMATION, CSS_IO_REVEAL,
  CSS_SCROLL_TIMELINE, CSS_VIEW_TIMELINE, CSS_MOTION_PATH, CSS_PROPERTY_ANIM,
  PSEUDO_ELEMENT_ANIM, SCROLL_DRIVEN_ANIMATION
Pattern: VIDEO_SCRUB, CANVAS_SCROLL, MARQUEE, TAB_SWITCH, ACCORDION, CAROUSEL,
  COUNTER_ANIM, TEXT_SPLIT, MAGNETIC_HOVER, CUSTOM_CURSOR, SCROLL_SNAP,
  PARALLAX_LAYER, STAGGER_GROUP, PRELOADER, PAGE_TRANSITION, SCROLL_INDICATOR,
  STICKY_ELEMENT, CLIP_PATH_ANIM, BACKDROP_BLUR, VIEW_TRANSITION,
  NATIVE_DIALOG, POPOVER_API, ANCHOR_POSITIONING, GRID_SUBGRID,
  CONTAINER_QUERY_ANIM, DETAILS_SUMMARY, CUSTOM_SCROLLBAR, DATA_ATTR

### FASE 2: Analisis del target
- Build baseline
- Extraccion de strings de texto
- Deteccion de arquitectura target (monorepo, i18n, Tailwind version, UI library)
- Solo instalar dependencias que el source REALMENTE usa (detectado en §1.16)
- Deteccion y renombramiento de font names del source brand

### FASE 3: Reconstruccion por secciones
Orden: tokens → tailwind (v3 config o v4 @theme segun target) → fonts (next/font) → scroll/animation libs (solo si source las usa) → navbar → footer → paginas → compartidos

Reglas Next.js App Router:
- 'use client' obligatorio si: useState/useEffect/useRef, event handlers, animation libs, browser APIs
- Dynamic imports para libs pesadas (ssr: false)
- next/font para TODAS las fuentes (Google + local + variable)
- next/image para imagenes con sizes y priority
- useIsClient() hook para prevenir hydration mismatch
- Si target usa Tailwind v3 → tailwind.config.ts extend (NO @theme)
- Si target usa Tailwind v4 → @theme directive en globals.css
- Adaptar a estructura del target (monorepo paths, i18n routing)

Por seccion: INSPECT → BUILD → SWAP texto → BUILD verify → VERIFY dual MCP

Patrones incluidos en SKILL.md:
Library: VIDEO_SCRUB, LENIS_INIT, GSAP_SCROLLTRIGGER, THREE.JS_SCENE
Nativos (v3.3): VIDEO_SCRUB_NATIVE, CSS_IO_REVEAL, CSS_MODULE_ANIMATION,
  NATIVE_SMOOTH_SCROLL, NATIVE_RAF_PARALLAX
UI: MARQUEE, TABS, ACCORDION, CAROUSEL, COUNTER, TEXT_SPLIT, MAGNETIC_HOVER,
  CUSTOM_CURSOR, PRELOADER, SCROLL_SNAP, PARALLAX_LAYERS, STAGGER_GROUPS,
  PAGE_TRANSITION, CLIP_PATH_ANIM, BACKDROP_BLUR
Extras: LOTTIE/DOTLOTTIE, RIVE, SPLINE 3D, SCROLL-TIMELINE CSS,
  VIEW TRANSITIONS API, NATIVE DIALOG/MODAL, PREFERS-REDUCED-MOTION.
Modern CSS (v3.4): DVH/SVH/LVH, @STARTING-STYLE, WEBKIT-TEXT-STROKE,
  COLOR-MIX(), GSAP SCROLLSMOOTHER, GSAP FLIP, GSAP MATCHMEDIA.

### FASE 4: Verificacion QA (PAGINA POR PAGINA con aprobacion humana entre cada una)
- DUAL-MCP SYNC SCROLL (obligatorio, ver seccion 4.5 de SKILL.md):
  * Abrir source y target en dos MCPs simultaneamente
  * Scroll a 0%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%
  * Screenshot de source Y target en cada posicion
  * Comparar side-by-side: si hay diferencia visible --> STOP, corregir antes de continuar
- GATE DE APROBACION HUMANA: despues de completar UNA pagina, mostrar screenshots
  al usuario y esperar aprobacion explicita antes de pasar a la siguiente
- PROGRAMATICA: compareScrollBehavior() por CLAVE ESTRUCTURAL (section[0], video[0])
  NO por CSS class name. Ver SKILL.md seccion 4.4.2 para la version correcta
- Multi-viewport: 375px, 768px, 1440px
- Computed style comparison con criterios IDENTICO (tolerancia cero)
- Video fullscreen: computed style en 0%, pixel delta desde 25%
- Verificacion EXHAUSTIVA de animaciones e interacciones
- Verificacion responsive en 3 viewports
- Consola JS: CERO errores en target
- Red/assets: TODAS las fuentes, imagenes y videos cargan correctamente
- Performance basica: LCP, CLS (informativo)
- Sistema de checkpoints por seccion
- compareScrollBehavior() automatizado: element state diff por clave estructural en 21 posiciones
- Verificacion de stacking contexts (z-index, opacity, transform, filter)
- Verificacion de accesibilidad (landmarks, ARIA, focus order)

### FASE 5: RECORRIDO VISUAL FINAL — OBLIGATORIO
- Scroll completo 0-100% en tramos de 5% (21 posiciones por pagina)
- En 3 viewports (1440, 768, 375)
- Comparacion visual lado a lado en CADA posicion con screenshot de source Y target
- Bucle de correccion inmediata si se detecta diferencia
- CERO diferencias pendientes para aprobacion
- Gate de aprobacion humana: usuario aprueba explicitamente antes de MIGRATION_COMPLETE

### FASE 6: Entregables finales
PAGE_MAPPING.md · ANIMATION_MANIFEST.md · docs/pds/extraction/*.json ·
docs/pds/extraction/scroll-narrative-*.md · docs/pds/extraction/visual-fingerprint-*.json ·
docs/pds/extraction/scroll-snapshots-*.json · docs/pds/extraction/advanced-patterns.json ·
docs/pds/extraction/css-rules.json · docs/pds/extraction/cross-origin-css.json ·
docs/pds/extraction/shadow-styles.json · docs/pds/extraction/lottie-rive-spline.json ·
docs/pds/extraction/accessibility.json · docs/pds/extraction/scroll-diff-*.json ·
docs/pds/modified-files.md · docs/pds/qa-evidence/ · docs/pds/qa-evidence/recorrido-final/ ·
docs/pds/assets-reemplazo-ia.md · docs/pds/assets-manual-download.md · MIGRATION_COMPLETE.md

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
- VIDEO_SCRUB detectado en source y target usa autoplay/loop sin currentTime → STOP + rehacer
- scroll-scrub-trace ausente para paginas con video/canvas fullscreen → STOP
- Evidencia MCP ausente para item marcado ✅
- Texto de source encontrado en target despues de SWAP
- 3 builds fallidos consecutivos en mismo archivo
- Diferencia visual durante recorrido final → STOP + corregir antes de avanzar
- Se intenta MIGRATION_COMPLETE sin FASE 5 → STOP
- Se modifica archivo de backend (API, auth, middleware, server actions) → STOP INMEDIATO
- preExpandContent() no ejecutado antes de extraccion → STOP + ejecutar primero
- JSON de extraccion sin campo _metadata → STOP + re-extraer con metadata
- Cross-origin stylesheets detectadas y no extraidas via fetchCrossOriginCSS() → STOP
- Shadow DOM detectado y no extraido via extractShadowStyles() → STOP
- Lottie/Rive/Spline detectado en source y no incluido en extraction → STOP
- CSS scroll-timeline/view-timeline en source y target usa JS scroll listener → STOP + usar CSS nativo
- Hydration mismatch en consola target → STOP + aplicar useIsClient o suppressHydrationWarning
- Componente con hooks/event handlers sin 'use client' → STOP + agregar directiva
- compareScrollSnapshots() muestra >5% diferencia en cualquier posicion → STOP + corregir
- container-type en source y no replicado en target → STOP + @container queries no funcionaran
- env(safe-area-inset-*) usado en source y no replicado → STOP (verificar que se usa clave estructural section[N]/video[N], NO CSS class name)
- Dual-MCP sync scroll no ejecutado para una pagina → STOP
- Aprobacion humana no obtenida antes de pasar a siguiente pagina → STOP + mobile notch roto
- Iframes/embeds (YouTube, Vimeo, Maps) en source y ausentes en target → STOP + replicar
- Section inventory mismatch: source N secciones ≠ target M secciones → STOP + paridad
- Background color de seccion target difiere de source → STOP + corregir
- Componente generico reutilizado para 2+ secciones source diferentes → STOP + descomponer
- Footer target solo texto cuando source footer tiene ilustracion → STOP + replicar
- Pagina target usa placeholder/coming-soon cuando source tiene diseno completo → STOP
- Texto source brand en HTML/SVG target → STOP + eliminar
- Layout type mismatch (grid vs flex) en seccion → STOP + corregir
- detectAnimationImplementation() NO ejecutado antes de FASE 3 → STOP
- recordScrollBehavior() NO ejecutado para una pagina → STOP
- compareScrollBehavior() retorna pass:false → STOP + corregir (verificar que se usa clave estructural section[N]/video[N], NO CSS class name)
- Dual-MCP sync scroll no ejecutado para una pagina → STOP
- Aprobacion humana no obtenida antes de pasar a siguiente pagina → STOP
- Target instala GSAP pero source NO usa GSAP → STOP + desinstalar + usar nativos
- Target instala Lenis pero source NO usa smooth scroll lib → STOP
- Target architecture NO detectada antes de FASE 3 → STOP
- Font name de source brand en codigo target → STOP + renombrar
- extractNetworkProfile() NO ejecutado → STOP + librerias CDN pueden no detectarse
- extractSectionInventory() NO ejecutado → STOP + paridad no verificable
- Source usa 100dvh y target usa 100vh → STOP + diferente en iOS
- Source usa @starting-style y target usa JS → STOP + copiar CSS nativo
- Source usa -webkit-text-stroke y target no lo replica → STOP
- ScrollSmoother Y Lenis instalados simultaneamente → STOP + incompatibles

## Criterios de completitud

### Visual (tolerancia cero)
- RECORRIDO VISUAL FINAL completado (FASE 5) con CERO diferencias
- TODAS las paginas en 3 viewports (1440, 768, 375)
- 21 posiciones de scroll verificadas por pagina
- Computed styles IDENTICOS (exactos, no aproximados)

### Efectos y animaciones
- ANIMATION_MANIFEST: 100% verificados (grep -c "✅" == TOTAL)
- VIDEO_SCRUB: currentTime ligado a scroll, NO autoplay
- Hover/focus/active states IDENTICOS al source
- Stacking contexts verificados (z-index, opacity, transform, filter)
- Lottie/Rive/Spline: reproduccion identica al source
- CSS scroll-timeline/view-timeline: si source usa CSS nativo, target tambien
- IntersectionObserver configs: threshold y rootMargin identicos
- View Transitions: si source usa, target implementa con fallback
- prefers-reduced-motion: respetado en CSS y animaciones

### Verificacion programatica (v3.4)
- recordScrollBehavior() ejecutado en source Y target para CADA pagina
- compareScrollBehavior() retorna pass:true para TODAS las paginas
- detectAnimationImplementation() ejecutado Y respetado en FASE 3
- Target NO instala dependencias que source no usa
- target-architecture.json generado y respetado
- Font names del source brand NO en codigo target
- extractNetworkProfile() ejecutado, librerias CDN detectadas
- extractSectionInventory() ejecutado, paridad estructural verificada
- gsap.matchMedia breakpoints respetados si source los usa

### Tecnico
- Build PASS (exit 0, cero errores TS)
- Consola JS: cero errores (incluye cero hydration mismatch)
- Assets: todas las fuentes, imagenes y videos cargan
- Texto target preservado, backend INTOCABLE
- Dynamic imports para libs pesadas (GSAP, Lenis, Three.js)
- 'use client' en todo componente con hooks/event handlers
- next/font para todas las fuentes
- Asset download protocol completado
- Accesibilidad: landmarks, ARIA roles, focus order preservados
- container-type/container-name replicados si source usa @container
- env(safe-area-inset-*) replicado si source lo usa
- color-scheme replicado si source lo define
- Iframes/embeds replicados con mismos src y dimensiones
- touch-action, user-select, writing-mode replicados donde aplique
- Section inventory: conteo secciones source == target
- Background color por seccion: IDENTICO al source
- Footer structure parity: si source tiene ilustracion, target tambien
- Cero componentes genericos reutilizados para secciones source distintas
- Cero paginas placeholder/coming-soon cuando source tiene diseno completo
- Source brand text: cero en HTML/SVG target (video flagged para manual)
- Layout type por seccion (grid/flex/block): IDENTICO
- Altura proporcional de cada seccion: ratio dentro del 20%

## Mantenimiento

Fuente de verdad: .claude/skills/port-design-system-from-local-clone/SKILL.md
Sync: node scripts/sync-skills.mjs && bash scripts/sync-agent-rules.sh

# Inspection Guide v3.4

## Setup inicial

MCP-REF:    <source-url>           (fuente visual absoluta)
MCP-TARGET: http://localhost:3001  (target en desarrollo)
Ambas abiertas hasta MIGRATION_COMPLETE.md.

## Scripts de extraccion (ejecutar en MCP-REF por pagina)

IMPORTANTE: Ejecutar preExpandContent() ANTES de cualquier script de extraccion.

23 scripts definidos en SKILL.md:
1. extractFullDesignSystem() → design-tokens.json (incluye dvh/svh/lvh, color-mix, @starting-style, -webkit-text-stroke, oklch)
2. fetchCrossOriginCSS() → cross-origin-css.json
3. extractShadowStyles() → shadow-styles.json
4. extractAnimationSystem() → animations.json (incluye gsap.matchMedia, ScrollSmoother)
5. captureIntersectionObserverConfigs() → (incluido en animations.json)
6. extractLottieRiveSpline() → lottie-rive-spline.json
7. extractScrollScrubTrace() → scroll-scrub-trace-[pagina].json (BLOQUEANTE si media fullscreen)
8. extractDOMStructure() → structure.json
9. extractInteractions() → interactions.json
10. extractAssets() → assets.json + protocolo de descarga
11. extractThreeJSScene() → three-scene.json (condicional)
12. extractDarkMode() → dark-mode.json
13. extractDeepVisualFingerprint() → visual-fingerprint-[pagina].json
14. extractAdvancedPatterns() → advanced-patterns.json
15. extractFullCSSRules() → css-rules.json
16. extractScrollSnapshot() → scroll-snapshots-[pagina].json
17. extractAccessibility() → accessibility.json
18. Scroll narrative textual → scroll-narrative-[pagina].md
19. recordScrollBehavior() → scroll-behavior-[pagina].json (BLOQUEANTE para verificacion)
20. detectAnimationImplementation() → animation-implementation.json (BLOQUEANTE para FASE 3)
21. extractElementStyleMap() → element-style-map-[pagina].json
22. extractNetworkProfile() → network-profile.json (CDN library detection)
23. extractSectionInventory() → section-inventory-[pagina].json (BLOQUEANTE para paridad)

TODOS los JSONs DEBEN incluir campo _metadata (version, url, timestamp, viewport, userAgent).

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

## Umbral minimo obligatorio

Ninguna pagina puede aprobar con menos de 90% de similitud:

- `avgSimilarity >= 0.90` por pagina y viewport.
- `worstSimilarity >= 0.90` por pagina, viewport y scroll.
- Si hay video/canvas, ejecutar traza down y up; no basta screenshot.
- Todo FAIL debe guardar side-by-side y lista de diferencias accionables.

El texto visible puede diferir porque lo conserva el target, pero el layout,
media, colores, tipografia, motion, wrapping, jerarquia y responsive deben seguir
al source.

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
  [ ] @container queries
  [ ] @layer declarations
  [ ] Extended media queries (hover, pointer, prefers-*)
  [ ] CSS-in-JS (inline style tags, adoptedStyleSheets)
  [ ] Shadow DOM elements detectados
  [ ] Cross-origin stylesheets fetched
  [ ] Adobe Fonts (Typekit) detection
  [ ] FontFace API loaded fonts
  [ ] @property CSS at-rules
  [ ] @supports rules
  [ ] CSS reset/normalize detection
  [ ] Pseudo-elements: ::before, ::after, ::selection, ::placeholder, ::marker
  [ ] Custom scrollbar styles (::-webkit-scrollbar, scrollbar-color)
  [ ] CSS Motion Path (offset-path, offset-distance)
  [ ] scroll-margin-top / scroll-padding-top
  [ ] content-visibility detection
  [ ] unicode-range in @font-face
  [ ] size-adjust / ascent-override in @font-face
  [ ] color-scheme on root (affects native form elements)
  [ ] container-type / container-name on elements (required for @container)
  [ ] env(safe-area-inset-*) detection (mobile notch)

Animation system:
  [ ] Lenis: duration, easing, smoothTouch, orientation, lerp, wheelMultiplier
  [ ] GSAP version y 22 plugins registrados
  [ ] ScrollTrigger: trigger, start, end, scrub, pin, snap, toggleActions por instancia
  [ ] CSS @keyframes: nombre, frames con estilos
  [ ] CSS transitions: selectores con transition property
  [ ] CSS scroll-driven animations (scroll-timeline, view-timeline, animation-timeline)
  [ ] VIDEO_SCRUB: src, dimensions, coversViewport, parentSection
  [ ] Canvas/WebGL: dimensions, contextType, coversViewport
  [ ] IntersectionObserver: clases, datasets, threshold/rootMargin reales
  [ ] Framer Motion: data-framer-appear-id
  [ ] Web Animations API: element.getAnimations()
  [ ] View Transitions API: startViewTransition detectado
  [ ] Lottie/dotLottie: JSON URLs, containers, configs
  [ ] Rive: .riv files, canvas elements
  [ ] Spline: spline-viewer elements, scene URLs

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
  [ ] SVG sprites: <symbol> ids y <use> refs
  [ ] External SVGs: xlink:href
  [ ] Background images: URLs y selectores
  [ ] Preloads: fonts, images, videos
  [ ] Iframes/embeds: YouTube, Vimeo, Google Maps, Calendly (src, dimensions)
  [ ] Asset download protocol ejecutado
  [ ] Cero assets visuales del target usados como diseno
  [ ] Todos los assets visuales usados vienen del source o estan marcados FAIL
  [ ] `assets-reemplazo-ia.md` incluye prompt IA por cada asset visual

Dark mode:
  [ ] Mecanismo: class, data-attribute, media-query, o none
  [ ] Tokens dark vs light

Visual fingerprint:
  [ ] 60+ CSS properties por elemento visible
  [ ] Hasta 500 elementos capturados
  [ ] Rect (posicion y dimensiones) de cada elemento
  [ ] touch-action, user-select, writing-mode capturados
  [ ] image-rendering, text-wrap, fontVariationSettings capturados
  [ ] grid-auto-flow, container-type/name capturados
  [ ] contain-intrinsic-size capturado (par con content-visibility)
  [ ] Ejecutar por pagina

Advanced patterns:
  [ ] Preloader/splash screen
  [ ] Marquee/ticker
  [ ] Tabs con indicador activo
  [ ] Accordions/FAQ
  [ ] Carousels/sliders (Swiper, etc.)
  [ ] Counters animados
  [ ] Text split (letra/palabra)
  [ ] Custom cursors y followers
  [ ] Scroll snap containers
  [ ] Parallax layers
  [ ] Stagger groups
  [ ] Page transitions (Barba, Swup, etc.)
  [ ] Native <dialog> elements
  [ ] Popover API usage
  [ ] Grid subgrid/masonry layouts
  [ ] Anchor scroll behavior
  [ ] Cookie banners/consent modals
  [ ] Stacking contexts (opacity, transform, filter, isolation)
  [ ] Form controls styling
  [ ] <details>/<summary> native disclosure elements

Full CSS rules:
  [ ] Todas las :hover rules
  [ ] Todas las :focus rules
  [ ] Todas las :active rules
  [ ] Media queries con sus rules internas
  [ ] Transform and animation rules
  [ ] CSS nesting rules
  [ ] scroll-timeline / view-timeline rules
  [ ] view-transition-name rules
  [ ] @container query rules
  [ ] @layer rules
  [ ] @supports rules
  [ ] @property rules (animated custom properties)
  [ ] ::before/::after/::selection/::placeholder/::marker rules
  [ ] Custom scrollbar rules (::-webkit-scrollbar)
  [ ] offset-path / offset-distance (CSS Motion Path)
  [ ] scroll-margin / scroll-padding rules

Scroll snapshots:
  [ ] 21 posiciones (0% a 100% en tramos de 5%)
  [ ] Nav state en cada posicion
  [ ] Video currentTime en cada posicion
  [ ] Secciones visibles y sus opacity/transform
  [ ] Elementos pinned y su posicion
  [ ] Ejecutar en source Y target para comparacion

Scroll scrub trace:
  [ ] Video currentTime a 0/10/25/50/75/100% scroll
  [ ] Canvas state a cada posicion
  [ ] Wrapper chain con position/overflow/height
  [ ] videoScrubDetected flag
  [ ] fullscreenMediaDetected flag

Scroll narrative:
  [ ] Descripcion textual a 0%, 5%, 10% ... 100% scroll (21 posiciones)
  [ ] Cambios en nav, visibilidad, animaciones activas
  [ ] Video/canvas currentTime en cada posicion
  [ ] Elementos que aparecen/desaparecen
  [ ] Pin states y parallax positions

Verificacion QA adicional:
  [ ] Consola JS: cero errores en target
  [ ] Red/assets: fuentes, imagenes y videos cargan correctamente
  [ ] Performance basica: LCP, CLS (informativo)
  [ ] Stacking contexts verificados (z-index, opacity, transform, filter)
  [ ] Accesibilidad: landmarks, ARIA roles, skip links, focus order
  [ ] Hydration: cero mismatches en consola
  [ ] 'use client' directive en componentes con hooks/event handlers
  [ ] compareScrollSnapshots() automatizado ejecutado
  [ ] Lottie/Rive/Spline reproduccion identica
  [ ] prefers-reduced-motion respetado
  [ ] container-type/container-name replicados
  [ ] env(safe-area-inset-*) replicado si source lo usa
  [ ] color-scheme replicado si source lo define
  [ ] Iframes/embeds replicados con mismos src y dimensiones
  [ ] touch-action, user-select, writing-mode replicados

Verificacion programatica (v3.4):
  [ ] detectAnimationImplementation() ejecutado ANTES de FASE 3
  [ ] recordScrollBehavior() ejecutado en source para CADA pagina
  [ ] recordScrollBehavior() ejecutado en target para CADA pagina
  [ ] compareScrollBehavior() retorna pass:true para TODAS las paginas
  [ ] compareScrollBehavior().passRate >= 95% para TODAS las paginas
  [ ] Target NO instala dependencias que source no usa (GSAP, Lenis, etc.)
  [ ] Target usa MISMO patron de animacion que source (native vs library)
  [ ] extractElementStyleMap() ejecutado — hover/pseudo styles replicados
  [ ] target-architecture.json generado (monorepo, i18n, Tailwind version)
  [ ] Font names del source brand NO en codigo target
  [ ] scroll-behavior-diff-[page].json generado para todas las paginas
  [ ] Si source usa CSS Modules, target replica con CSS Modules o equivalente
  [ ] Si source usa IntersectionObserver nativo, target usa IO nativo (no GSAP)
  [ ] Si source usa RAF para video scrub, target usa RAF (no GSAP ScrollTrigger)
  [ ] extractNetworkProfile() ejecutado — librerias CDN detectadas
  [ ] extractSectionInventory() ejecutado — paridad estructural verificable
  [ ] gsap.matchMedia breakpoints respetados si source los usa
  [ ] dvh/svh/lvh units replicados si source los usa
  [ ] @starting-style replicado si source lo usa (no JS)
  [ ] -webkit-text-stroke replicado si source lo usa
  [ ] color-mix() replicado o valor computado exacto usado
  [ ] ScrollSmoother y Lenis NO instalados simultaneamente

Paridad estructural (v3.2):
  [ ] Section inventory: conteo secciones source == target
  [ ] Background color por seccion: IDENTICO al source
  [ ] Layout type por seccion (grid/flex/block): IDENTICO
  [ ] Altura proporcional de cada seccion: ratio dentro del 20%
  [ ] Cero componentes genericos reutilizados para secciones source distintas
  [ ] Footer: si source tiene ilustracion/arte, target tambien
  [ ] Cero paginas placeholder/coming-soon cuando source tiene diseno completo

Texto en media / brand leaks (v3.2):
  [ ] Texto source en video/imagen documentado en assets-reemplazo-ia.md
  [ ] SVGs con <text> elements → swap textual aplicado
  [ ] Source brand en HTML/SVG target → eliminado
  [ ] Videos → flagged para review manual de brand text en frames
  [ ] Fonts renombradas (no usar nombres de fuente del source)
