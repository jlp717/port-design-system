# Port Design System — CLON LITERAL PIXEL-PERFECT v4.0

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

## Reglas base v4.0 (resumen)

- Screenshots estaticos NUNCA son fuente de verdad. Todo es RAW + numerico.
- Viewports obligatorios: 1920x1080 (desktop full), 768x1024 (tablet), 375x812 (mobile iPhone).
- 21 posiciones de scroll (0-100% cada 5%) por pagina por viewport.
- `getBoundingClientRect()` + `getComputedStyle()` de TODOS los elementos visibles (sin limite).
- Diferencia visual < 0.5% en los 3 viewports, medida numericamente.
- Assets visuales: hotlink directo del source por defecto. Cero assets decorativos del target.
- Prompts IA solo para assets con branding source incrustado; la migracion inicial mantiene el asset source.
- `detectAnimationImplementation()` manda: target usa lo MISMO que el source. No substituir librerias.
- Cero valores hardcodeados. Todo viene de la extraccion RAW.

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
[ ] FASE 0.5 RAW HTML + allCSS + keyframes + scrollData + assets capturados
[ ] Analisis 1920x1080 completado — 21 scroll positions
[ ] Analisis 768x1024  completado — 21 scroll positions
[ ] Analisis 375x812   completado — 21 scroll positions
[ ] getBoundingClientRect + getComputedStyle de TODOS los visibles (sin limite)
[ ] Todos los assets source usados (hotlink o descargados)
[ ] Todas las animaciones/transiciones recreadas con valores numericos exactos
[ ] Libreria de animacion detectada y usada (no substituida)
[ ] Diferencia visual < 0.5% en los 3 viewports (medida numericamente)
[ ] Hover/focus/active testeados programaticamente
[ ] Motion trace DOWN + UP registrada para cada video/canvas/pin/parallax
[ ] Prompts IA generados para cualquier asset con branding incrustado
[ ] Codigo entregado listo para copiar-pegar en el design system
[ ] Build PASS (exit 0) + consola JS cero errores
```

Si cualquier item esta en ❌ o ⚠️, declarar `STATUS: NO APROBADO` con razon numerica.

## Deteccion de texto en media

- Texto source en video/imagen → documentar en `docs/pds/assets-reemplazo-ia.md`.
- SVGs con `<text>` elements → swap textual aplica.
- Source brand en HTML/SVG del target → STOP + eliminar.
- Videos → flagear para review manual de brand text en frames.

## Flujo (6 fases)

### FASE 0 — Setup
- Dual MCP (MCP-REF en source-url, MCP-TARGET en `localhost:3001`).
- Anti-bot protocol + MCP crash recovery via `_checkpoint.json`.
- Device emulation por viewport: 1920x1080, 768x1024, 375x812.
- Descubrimiento automatico de paginas (crawler + sitemap.xml). MAX_PAGES=50, MAX_DEPTH=3.
- `PAGE_MAPPING.md` generado automaticamente — BLOQUEANTE.
- `preExpandContent()` obligatorio antes de cualquier extraccion.

### FASE 0.5 — Inspeccion RAW (BLOQUEANTE)
Ejecutar en MCP-REF el script del PROMPT MAESTRO (ver SKILL.md §0 y §9). Capturar:
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
- Solo instalar dependencias que el source REALMENTE usa.
- Rename de font names del source brand.
- `target-architecture.json` obligatorio antes de FASE 3.

### FASE 3 — Reconstruccion exacta
Orden: tokens → tailwind (v3 config o v4 @theme) → fonts (next/font) → animation libs (solo si source las usa) → navbar → footer → paginas → compartidos.

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
Ver SKILL.md §15. Incluye `raw-extraction-*.json`, todos los JSONs, `ANIMATION_MANIFEST.md`, `PAGE_MAPPING.md`, `diff-report.md`, evidencia QA, `assets-reemplazo-ia.md` (solo branding), `MIGRATION_COMPLETE.md` solo si TODO PASS.

## Reglas de build

- BUILD-1: archivo modificado → build inmediato.
- BUILD-2: build falla → corregir antes de tocar otro.
- BUILD-3: 3 fallos en mismo archivo → STOP + reporte.
- BUILD-4: cero imports de chunks/hashes/`.next/server/`.
- BUILD-5: PASS = exit 0, cero errores TS, cero warnings nuevos.

## Stop conditions (completa en SKILL.md §17)

- `raw-extraction-<page>.json` ausente o incompleto → STOP.
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
- Target instala GSAP pero source NO usa GSAP → STOP + desinstalar + usar nativos.
- Target instala Lenis pero source NO usa smooth scroll → STOP.
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

### Verificacion programatica v4.0
- `raw-extraction-<page>.json` completo por pagina.
- `recordScrollBehavior()` + `compareScrollBehavior()` `passRate >= 95%`.
- `detectAnimationImplementation()` ejecutado y respetado.
- Target NO instala dependencias que source no usa.
- `target-architecture.json` generado y respetado.
- Font names del source brand NO en codigo target.
- `extractNetworkProfile()`, `extractSectionInventory()`, `extractElementStyleMap()` ejecutados.
- `gsap.matchMedia` breakpoints respetados si aplica.

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

@docs/research/INSPECTION_GUIDE.md
