<!-- AUTO-GENERATED from AGENTS.md - do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

# Port Design System — CLON LITERAL PIXEL-PERFECT v5.0

## Regla absoluta — TOLERANCIA CERO

La source-url es la UNICA fuente de verdad visual.
El target debe ser INDISTINGUIBLE del source en los 3 viewports obligatorios,
en las 21 posiciones de scroll y en todas las interacciones.
Tolerancia cero. No hay "parecido", no hay "aproximado", no hay "inspirado".
Es clon literal o FAIL.

Lo unico que se conserva del target es:
- el TEXTO visible al usuario y los hrefs del negocio,
- la LOGICA de negocio (rutas, API, auth, middleware, server actions, DB).

El BACKEND es INTOCABLE.

## Invocacion

```txt
/port-design-system-from-local-clone "<target-path>" "<source-url>"
```

Ejemplo:
```txt
/port-design-system-from-local-clone "/Users/javi/port-design-system" "https://jobyaviation.com"
```

## Regla DS-FIRST — CRITICA (nueva en v5.0)

Antes de generar UNA SOLA LINEA de codigo, DEBES:
1. Leer exhaustivamente el repo del DS: `src/components/**`, `globals.css`, `package.json`, `src/hooks`.
2. Crear `docs/pds/extraction/ds-component-map.json` (inventario completo del DS).
3. Extraer RAW el source (23 scripts).
4. Crear `docs/pds/extraction/ds-section-mapping.json` (mapeo seccion→componente-DS + gap report).
5. Declarar fidelidad estimada (% numerico; si < 95% visual o < 90% behavioral → STOP + esperar usuario).
6. Solo entonces generar codigo.

El codigo generado usa EXCLUSIVAMENTE el sistema del design system del repo:
- ✅ Extender `globals.css` → `@theme inline` con tokens del source (prefijo `pds-`)
- ✅ Usar `cn()` de `src/lib/utils.ts` para composicion de clases
- ✅ Usar CVA para variantes de nuevos componentes
- ✅ Reutilizar / extender componentes DS existentes
- ✅ Keyframes del source en `globals.css` con prefijo `pds-` (valores EXACTOS)
- ❌ Copiar class names del source como strings en JSX
- ❌ Crear archivos `.css` / `.module.css` externos al DS
- ❌ Instalar librerias sin aprobacion explicita del usuario

## KEY-MAPPINGS — obligatorio en cada respuesta con codigo

En TODA respuesta que genere o modifique codigo, incluir esta tabla:

```
| Seccion Source | Componente DS | Tokens DS (source → pds-) | Animacion | Gap / Solucion |
|---|---|---|---|---|
| SectionHero | src/components/sections/HeroSection.tsx (nuevo CVA) | --color-dark-blue → --color-pds-dark-blue | GSAP ScrollTrigger | Instalar gsap? |
| Button CTA | <Button> extendido + variante pds-cta | --color-orange → --color-pds-orange | CSS transition 200ms | ✅ nativo |
```

## Reglas base v5.0 (resumen)

- Screenshots estaticos NUNCA son fuente de verdad. Todo es RAW + numerico.
- Viewports obligatorios: 1920x1080 (desktop full), 768x1024 (tablet), 375x812 (mobile iPhone).
- 21 posiciones de scroll (0-100% cada 5%) por pagina por viewport.
- `getBoundingClientRect()` + `getComputedStyle()` de TODOS los elementos visibles (sin limite).
- Diferencia visual < 0.5% en los 3 viewports, medida numericamente.
- Assets visuales: hotlink directo del source por defecto. Cero assets decorativos del target.
- Prompts IA solo para assets con branding source incrustado; la migracion inicial mantiene el asset source.
- `detectAnimationImplementation()` manda: target usa lo MISMO que el source. No substituir librerias.
- Cero valores hardcodeados. Todo viene de la extraccion RAW.
- Fidelidad estimada declarada antes de FASE 3. Si < 95% visual → STOP + usuario decide.

## DISENO vs TEXTO — inmutable

DISENO = 100% del source. Sin adaptar. Sin reescribir.
TEXTO  = 100% del target. Cada string visible.

Texto SI: strings visibles en UI, hrefs del negocio target, nombres del negocio,
          metadata, og:*, alt, title, labels, placeholders.
Texto NO: clases CSS, valores de animacion, estructura JSX, configs de animacion,
          atributos `data-*`, assets decorativos, keyframes, CSS variables.

## Paridad estructural 1:1 (bloqueante)

- Conteo de secciones source == conteo de secciones target.
- Background color por seccion: IDENTICO.
- Layout type (grid/flex/block): IDENTICO por seccion.
- Altura proporcional de cada seccion: ratio dentro del 20%.
- Footer: si el source tiene ilustracion, el target tambien.
- Cero componentes genericos reutilizados para secciones source diferentes.
- Cero paginas placeholder/coming-soon cuando el source tiene diseno completo.

## Checklist bloqueante (debe aparecer en cada respuesta)

```
ANALISIS DS (FASE 0.5):
[ ] ds-component-map.json generado (src/components/**, globals.css, package.json)
[ ] ds-section-mapping.json generado post extraccion source
[ ] Fidelidad estimada declarada (% numerico; razon si < 95%)

EXTRACCION SOURCE:
[ ] FASE 0.6 RAW HTML + allCSS + keyframes + scrollData + assets capturados
[ ] 23 scripts FASE 1 ejecutados — todos los JSONs con _metadata
[ ] detectAnimationImplementation() ejecutado
[ ] extractSectionInventory() ejecutado
[ ] recordScrollBehavior() ejecutado en source

VIEWPORTS:
[ ] Analisis 1920x1080 completado — 21 scroll positions
[ ] Analisis 768x1024  completado — 21 scroll positions
[ ] Analisis 375x812   completado — 21 scroll positions
[ ] getBoundingClientRect + getComputedStyle de TODOS los visibles (sin limite)

ASSETS Y ANIMACIONES:
[ ] Todos los assets source usados (hotlink o descargados)
[ ] Todas las animaciones/transiciones recreadas con valores numericos exactos
[ ] Libreria de animacion detectada y usada (no substituida)
[ ] Diferencia visual < 0.5% en los 3 viewports (medida numericamente)
[ ] Hover/focus/active testeados programaticamente
[ ] Motion trace DOWN + UP registrada para cada video/canvas/pin/parallax
[ ] Prompts IA generados para cualquier asset con branding incrustado

DS-FIRST:
[ ] Tokens source en @theme inline con prefijo pds-
[ ] Cero class names del source copiados como strings en JSX
[ ] Cero archivos .css/.module.css externos al DS
[ ] Todos los componentes nuevos usan cn() + CVA + Tailwind
[ ] KEY-MAPPINGS table incluida en esta respuesta

BUILD Y QA:
[ ] Build PASS (exit 0) + consola JS cero errores
[ ] compareScrollBehavior() passRate >= 95%
```

Si cualquier item esta en ❌ o ⚠️, declarar `STATUS: NO APROBADO` con razon numerica.

## Deteccion de texto en media

- Texto source en video/imagen → documentar en `docs/pds/assets-reemplazo-ia.md`.
- SVGs con `<text>` elements → swap textual aplica.
- Source brand en HTML/SVG del target → STOP + eliminar.
- Videos → flagear para review manual de brand text en frames.

## Flujo (fases v5.0)

### FASE 0 — Setup
- Dual MCP (MCP-REF en source-url, MCP-TARGET en `localhost:3001`).
- Anti-bot protocol + MCP crash recovery via `_checkpoint.json`.
- Device emulation por viewport: 1920x1080, 768x1024, 375x812.
- Descubrimiento automatico de paginas (crawler + sitemap.xml). MAX_PAGES=50, MAX_DEPTH=3.
- `PAGE_MAPPING.md` generado automaticamente — BLOQUEANTE.
- `preExpandContent()` obligatorio antes de cualquier extraccion.

### FASE 0.5 — Analisis profundo del repo DS local (NUEVA — BLOQUEANTE)
Ejecutar con herramientas de lectura de archivos (NO en browser):
- Glob + leer `src/components/**/*.tsx` — inventario de componentes, variantes CVA, exports.
- Leer `globals.css` — extraer bloque `@theme inline`, tokens existentes.
- Leer `package.json` — detectar libs de animacion instaladas (gsap, lenis, framer-motion, etc.).
- Glob + leer `src/hooks/**` y `src/lib/**` — detectar hooks y utilities.
- Guardar en `docs/pds/extraction/ds-component-map.json`.
- Post extraccion FASE 1: crear `docs/pds/extraction/ds-section-mapping.json` con mapeo
  seccion→componente DS, tokens a anadir, estrategia de animacion, riesgo de fidelidad y gap solution.
- Declarar fidelidad estimada (visual %, behavioral %) antes de FASE 3. Si < 95%/90% → STOP.

### FASE 0.6 — Inspeccion RAW source (BLOQUEANTE)
Ejecutar en MCP-REF el script del PROMPT MAESTRO (ver SKILL.md §12). Capturar:
- `url`, `fullHTML`, `allCSS` (con fetch de cross-origin), `jsBehaviors`,
  `assets`, `scrollData` (21 posiciones), `animations`.
Guardar en `docs/pds/extraction/raw-extraction-<page>.json`.
Sin este JSON completo no se avanza.

### FASE 1 — Extraccion profunda (23 scripts RAW)
1. `extractFullDesignSystem()` — tokens, tipografia, colores, spacing, sombras, gradientes, z-index, breakpoints, @font-face, @container, @layer, media queries extendidas (hover, pointer, prefers-*), CSS-in-JS, Shadow DOM, pseudo-elements, @property, @supports, Adobe Fonts, custom scrollbar, CSS Motion Path, scroll-margin, content-visibility, color-scheme, container-type/name, env(safe-area-inset-*), dvh/svh/lvh units, color-mix(), @starting-style, -webkit-text-stroke, oklch.
2. `fetchCrossOriginCSS()` — hojas cross-origin.
3. `extractShadowStyles()` — traversal Shadow DOM.
4. `extractAnimationSystem()` — GSAP (22 plugins + matchMedia + ScrollSmoother), Lenis, Framer Motion, CSS keyframes, CSS transitions, IntersectionObserver, RAF, video scrub, canvas/WebGL, CSS scroll-driven animations, View Transitions API, Web Animations API, Lottie, Rive, Spline.
5. `captureIntersectionObserverConfigs()` — threshold/rootMargin reales via monkey-patch.
6. `extractLottieRiveSpline()` — Lottie/dotLottie, Rive, Spline.
7. `extractScrollScrubTrace()` — video/canvas scrub a 0/10/25/50/75/100% scroll (BLOQUEANTE si hay media fullscreen).
8. `extractDOMStructure()` — secciones, grid/flexbox, jerarquia, nav behavior, responsive.
9. `extractInteractions()` — hover, focus, active, nav behavior, mobile menu.
10. `extractAssets()` — imagenes, videos, SVGs (incluido sprites), fonts, backgrounds, iconos, preloads, iframes/embeds + protocolo de descarga/hotlink.
11. `extractThreeJSScene()` — solo si Three.js / R3F / WebGL detectado.
12. `extractDarkMode()` — temas, color-scheme, toggle mechanism.
13. `extractDeepVisualFingerprint()` — 60+ CSS props de TODOS los elementos visibles (sin limite).
14. `extractAdvancedPatterns()` — preloader, marquee, tabs, accordions, carousels, counters, text split, cursors, scroll snap, parallax, stagger, native dialog, Popover, grid subgrid/masonry, anchor scroll, cookie banners, stacking contexts, form controls, details/summary.
15. `extractFullCSSRules()` — TODAS las CSS rules (hover, focus, active, media queries, transforms, animations, CSS nesting, scroll-timeline, view-transition-name, @container, @layer, @supports, @property, pseudo-elements, scrollbar, motion path, scroll-margin).
16. `extractScrollSnapshot()` — 21 posiciones automatizadas.
17. `extractAccessibility()` — ARIA, landmarks, skip links, tabindex, focus traps, prefers-reduced-motion.
18. Scroll narrative textual (pseudo-video) a 5%.
19. `recordScrollBehavior()` — 21 posiciones, estado de todos los elementos por CLAVE ESTRUCTURAL (section[N], video[N]), NO por CSS class name. BLOQUEANTE.
20. `detectAnimationImplementation()` — detecta QUE usa el source (GSAP vs native RAF vs CSS). BLOQUEANTE para FASE 3.
21. `extractElementStyleMap()` — per-element computed styles + hover CSS rules + pseudo-elements.
22. `extractNetworkProfile()` — `performance.getEntriesByType`, CDN library detection, network summary.
23. `extractSectionInventory()` — section count, bg colors, layout types, height ratios. BLOQUEANTE para paridad.

Todos los JSONs con `_metadata: { version, url, timestamp, viewport, userAgent }`.
Entregable: `ANIMATION_MANIFEST.md` — BLOQUEANTE.

### FASE 2 — Analisis del target
- Build baseline.
- Extraccion de strings de texto.
- Deteccion de arquitectura (monorepo, i18n, Tailwind v3/v4, UI library).
- Verificar libs instaladas en DS vs las que usa el source. Solo instalar nuevas si source las usa Y usuario aprueba.
- Rename de font names del source brand.
- `target-architecture.json` obligatorio antes de FASE 3.

### FASE 3 — Reconstruccion DS-first
Orden: tokens → tailwind (v4 @theme inline) → fonts (next/font) → animation libs (solo si source las usa Y DS no las tiene Y usuario aprueba) → navbar → footer → paginas → compartidos.

Cada token del source que no existe en el DS: anadir en `globals.css` bloque `@theme inline` con prefijo `pds-`.
Cada keyframe del source: anadir en `globals.css` con prefijo `pds-` copiando valores EXACTOS.
Cada nueva seccion: crear componente con CVA + cn() + Tailwind utilities. Nunca class names del source.

Reglas Next.js App Router:
- `'use client'` obligatorio si hay hooks / event handlers / animation libs / browser APIs.
- Dynamic imports (`ssr: false`) para libs pesadas.
- `next/font` para TODAS las fuentes.
- `next/image` con `sizes` y `priority`.
- `useIsClient()` o `suppressHydrationWarning` para evitar hydration mismatch.

Assets: HOTLINK del source por defecto. Si CORS, descargar a `public/pds-source-assets/`.

Por seccion: INSPECT → BUILD → SWAP texto → BUILD verify → VERIFY dual MCP.

### FASE 4 — QA programatica numerica (pagina por pagina, gate humano entre paginas)
- dual-MCP sync scroll (21 posiciones) en los 3 viewports.
- `recordScrollBehavior()` + `compareScrollBehavior()` — `passRate >= 95%`. Clave estructural, NO CSS class name.
- Motion trace DOWN + UP para video scrub, parallax, pin.
- Interactions testing programatico (hover/focus/active) con delta 0 en props discretas.
- Consola JS: cero errores. Red/assets: 200 OK.
- Stacking contexts, accesibilidad.
- Diferencia numerica < 0.5% en todas las props continuas.

### FASE 5 — Recorrido visual final (OBLIGATORIO)
- 21 posiciones por pagina en los 3 viewports.
- Side-by-side source/target con diff numerico.
- Bucle de correccion inmediata.
- `diff-report.md`.
- Gate humano explicito antes de `MIGRATION_COMPLETE.md`.

### FASE 6 — Entregables
Ver SKILL.md §18. Incluye `ds-component-map.json`, `ds-section-mapping.json`, `raw-extraction-*.json`,
todos los JSONs, `ANIMATION_MANIFEST.md`, `PAGE_MAPPING.md`, `diff-report.md`, evidencia QA,
`assets-reemplazo-ia.md` (solo branding), `MIGRATION_COMPLETE.md` solo si TODO PASS.

## Reglas de build

- BUILD-1: archivo modificado → build inmediato.
- BUILD-2: build falla → corregir antes de tocar otro.
- BUILD-3: 3 fallos en mismo archivo → STOP + reporte.
- BUILD-4: cero imports de chunks/hashes/`.next/server/`.
- BUILD-5: PASS = exit 0, cero errores TS, cero warnings nuevos.

## Stop conditions (completa en SKILL.md §20)

- `ds-component-map.json` no generado → STOP (FASE 0.5 incompleta).
- `raw-extraction-<page>.json` ausente o incompleto → STOP.
- Fidelidad estimada < 95% visual o < 90% behavioral sin aprobacion del usuario → STOP.
- Screenshot estatico presentado como unica evidencia de animacion/scroll → STOP.
- Viewport faltante (los tres son obligatorios) → STOP.
- `passRate < 95%` en compareScrollBehavior → STOP.
- Diferencia numerica > 0.5% en cualquier pagina/viewport/scroll → STOP.
- Asset decorativo del target usado en vez del source → STOP.
- Checklist con algun item en ❌ o ⚠️ → STOP + declarar NO APROBADO.
- Se modifica archivo backend (API, auth, middleware, server actions, DB) → STOP INMEDIATO.
- `PAGE_MAPPING.md` inexistente cuando se intenta codigo → STOP.
- `preExpandContent()` no ejecutado antes de extraccion → STOP.
- JSON de extraccion sin `_metadata` → STOP.
- `detectAnimationImplementation()` NO ejecutado antes de FASE 3 → STOP.
- `recordScrollBehavior()` NO ejecutado para una pagina → STOP.
- Target instala lib que source no usa → STOP + desinstalar.
- Libreria de animacion instalada sin aprobacion explicita del usuario → STOP + desinstalar.
- Font name de source brand en codigo target → STOP + renombrar.
- Source usa `100dvh` y target usa `100vh` → STOP.
- Source usa `@starting-style` y target lo sustituye por JS → STOP.
- Source usa `-webkit-text-stroke` y target no lo replica → STOP.
- `ScrollSmoother` + `Lenis` simultaneamente → STOP (incompatibles).
- Iframes/embeds en source y ausentes en target → STOP.
- Section inventory mismatch → STOP.
- Componente generico reutilizado para 2+ secciones source distintas → STOP.
- Pagina target con placeholder/coming-soon cuando source tiene diseno → STOP.
- Texto source brand en HTML/SVG target → STOP.
- Layout type mismatch (grid vs flex) → STOP.
- Hydration mismatch en consola → STOP.
- Componente con hooks/event handlers sin `'use client'` → STOP.
- `target-architecture.json` NO generado antes de FASE 3 → STOP.
- Dual-MCP sync scroll no ejecutado para una pagina → STOP.
- Aprobacion humana no obtenida antes de pasar a siguiente pagina → STOP.
- Se intenta `MIGRATION_COMPLETE.md` sin FASE 5 completa → STOP.
- Class name del source copiado literalmente en JSX → STOP + refactorizar a CVA.
- Archivo `.css` o `.module.css` externo creado con clases del source → STOP + migrar.
- Tokens del source fuera del bloque `@theme inline` → STOP + mover.
- Componente nuevo sin cn() + CVA cuando source tiene variantes → STOP + refactorizar.
- KEY-MAPPINGS table ausente en respuesta con codigo → STOP + incluir.
- `ds-section-mapping.json` no generado antes de FASE 3 → STOP.
- Fidelidad estimada no declarada antes de iniciar reconstruccion → STOP.

## Criterios de completitud

### Visual (tolerancia cero)
- FASE 5 con CERO diferencias > 0.5% en los 3 viewports.
- 21 posiciones de scroll verificadas por pagina por viewport.
- Computed styles IDENTICOS (delta 0 en props discretas).

### Efectos y animaciones
- `ANIMATION_MANIFEST.md`: 100% verificadas (grep -c "✅" == TOTAL).
- `VIDEO_SCRUB` con `currentTime` ligado a scroll.
- Hover/focus/active con deltas 0 vs source.
- Stacking contexts verificados.
- Lottie/Rive/Spline reproduccion identica.
- CSS scroll-timeline / view-timeline: source CSS → target CSS.
- IntersectionObserver: threshold y rootMargin identicos.
- View Transitions si source las usa.
- `prefers-reduced-motion` respetado.
- Scroll-driven CSS variables (`--progress`, `--translate-y-*`) actualizadas con la misma logica que el source.

### Verificacion programatica v5.0
- `ds-component-map.json` y `ds-section-mapping.json` presentes y usados.
- `raw-extraction-<page>.json` completo por pagina.
- `recordScrollBehavior()` + `compareScrollBehavior()` `passRate >= 95%`.
- `detectAnimationImplementation()` ejecutado y respetado.
- Target NO instala dependencias que source no usa sin aprobacion.
- `target-architecture.json` generado y respetado.
- Font names del source brand NO en codigo target.
- `extractNetworkProfile()`, `extractSectionInventory()`, `extractElementStyleMap()` ejecutados.
- `gsap.matchMedia` breakpoints respetados si aplica.
- Cero class names del source copiados en JSX.
- Todos los tokens del source en `@theme inline` con prefijo `pds-`.

### Tecnico
- Build PASS (exit 0, cero errores TS).
- Consola JS: cero errores (incluye hydration mismatch).
- Assets: todas las fuentes, imagenes, videos, iframes cargan 200 OK.
- Texto target preservado. Backend INTOCABLE.
- Dynamic imports para libs pesadas.
- `'use client'` en todo componente con hooks/event handlers.
- `next/font` para todas las fuentes.
- Asset download protocol completado.
- Accesibilidad: landmarks, ARIA, focus order.
- `container-type/name`, `env(safe-area-inset-*)`, `color-scheme` replicados si aplican.
- Iframes/embeds replicados con mismos `src` y dimensiones.
- `touch-action`, `user-select`, `writing-mode` replicados.
- Section inventory: paridad exacta.
- Layout type por seccion IDENTICO.
- Altura proporcional ratio dentro del 20%.
- Source brand text: cero en HTML/SVG target.

## Mantenimiento

Fuente de verdad: `.claude/skills/port-design-system-from-local-clone/SKILL.md`.
Sync: `node scripts/sync-skills.mjs && bash scripts/sync-agent-rules.sh`.

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
