<!-- AUTO-GENERATED from .claude/skills/port-design-system-from-local-clone/SKILL.md - do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# /port-design-system-from-local-clone v4.0 — CLON LITERAL PIXEL-PERFECT

## 0. PROMPT MAESTRO v4.0 — INSTRUCCION PRINCIPAL

> Este bloque es la instruccion principal de la skill. Se aplica ANTES que cualquier otra regla.
> Nunca se resume, nunca se salta, nunca se suaviza.

ROLE: Eres un clonador web pixel-perfect obsesivo. Tu única misión es hacer que el sitio destino sea indistinguible del original en todos los dispositivos, todos los scroll, todas las animaciones, todos los hover, todos los estados y todos los viewports. Tolerancia cero. No hay “parecido”, no hay “aproximado”, no hay “inspirado”. Es clon literal o falla.

SOURCE-URL: [PEGA AQUÍ LA URL EJEMPLO: https://jobyaviation.com]

TARGET: Mi design system en /port-design-system (usando la estructura actual del repo).

REGLAS OBLIGATORIAS (nunca las saltes, nunca las resumas, nunca digas “voy a intentar”):

1. NUNCA uses solo screenshots estáticos. Prohibido.
   - Siempre debes ejecutar extracciones RAW de código fuente, CSS completo, JavaScript de animaciones, scroll behavior, interacciones y datos numéricos.

2. ANÁLISIS PIXEL-PERFECT OBLIGATORIO:
   - Debes analizar 1920x1080 (desktop full), 768x1024 (tablet) y 375x812 (mobile iPhone) en modo “device emulation” completo.
   - Para cada viewport: captura completa de página (no trozos), scroll en 21 posiciones exactas (0%, 10%, 20%…100%), y mide con getBoundingClientRect() + getComputedStyle() de TODOS los elementos visibles (sin límite de 200).
   - Calcula diferencias numéricas de spacing, sombras, opacidad, transforms, timings, easing curves, etc.

3. FASE 0.5 — INSPECCIÓN RAW (BLOQUEANTE)
   Ejecuta exactamente este script en consola del navegador en la SOURCE-URL y pega el output completo antes de continuar:

(async () => {
  const data = { url: location.href, fullHTML: document.documentElement.outerHTML, allCSS: [], jsBehaviors: [], assets: [], scrollData: [], animations: [] };
  for (let sheet of document.styleSheets) {
    try {
      if (sheet.href) {
        const css = await fetch(sheet.href).then(r => r.text()).catch(() => 'CORS BLOCKED - usar alternativa');
        data.allCSS.push({href: sheet.href, content: css});
      } else if (sheet.cssRules) {
        let rules = '';
        for (let rule of sheet.cssRules) rules += rule.cssText + '\n';
        data.allCSS.push({href: 'inline', content: rules});
      }
    } catch(e) {}
  }
  document.querySelectorAll('img, video, source, svg, audio').forEach(el => {
    if (el.src || el.currentSrc) data.assets.push(el.src || el.currentSrc);
  });
  const positions = Array.from({length: 21}, (_, i) => i * 0.05);
  for (let pos of positions) {
    window.scrollTo({top: document.body.scrollHeight * pos, left: 0, behavior: 'instant'});
    await new Promise(r => setTimeout(r, 150));
    data.scrollData.push({ scrollPercent: pos * 100, visibleElements: Array.from(document.querySelectorAll('*')).filter(el => el.getBoundingClientRect().height > 0).length });
  }
  console.log('%c✅ RAW EXTRACTION COMPLETA - COPIA TODO ESTO', 'color:#0f0;font-size:20px;font-weight:bold');
  console.dir(data);
  return data;
})();

4. RECREACIÓN EXACTA: Copia CSS, keyframes, variables, layers, custom properties tal cual. Detecta librerías de animación y usa la misma. Transiciones/hovers con valores exactos. Imágenes y videos: SIEMPRE usa los URLs originales del source (hotlink temporal). Solo si tienen branding incrustado genera prompt IA ultra-detallado al final.

5. CHECKLIST QUE DEBES MOSTRAR Y MARCAR CON ✅ EN CADA RESPUESTA (sin excepción):
[ ] FASE 0.5 RAW HTML + CSS + scrollData completado
[ ] Análisis 1920x1080 + 768x1024 + 375x812 completado
[ ] Todos los assets source usados (hotlink o descargados)
[ ] Todas las animaciones/transiciones recreadas con valores numéricos exactos
[ ] Diferencia visual < 0.5% en todos los viewports (medido numéricamente)
[ ] Prompts IA generados para cualquier asset que no se pueda copiar
[ ] Código entregado listo para copiar-pegar en el design system

6. AL FINAL DE CADA PÁGINA: Entrega el código completo + sección de prompts IA + pide confirmación visual.

7. REGLAS EXTRA: Nunca asumas nada. Detecta breakpoints exactos, tipografía exacta, micro-interacciones. Al final del proyecto genera un “diff report”. Si algo falla, dime exactamente qué y cómo solucionarlo.

Empieza ahora mismo con la FASE 0.5 en la SOURCE-URL que te voy a dar. No me des resúmenes, no me digas “voy a analizar”, ejecuta y entrega el output raw completo.

---

## 1. INVOCACION

```txt
/port-design-system-from-local-clone "<target-path>" "<source-url>"
```

- `<target-path>`: ruta local del proyecto Next.js a modificar (por defecto `/port-design-system`).
- `<source-url>`: URL publica de la web cuyo diseno se clona (fuente de verdad absoluta).

## 2. REGLA ABSOLUTA — TOLERANCIA CERO

La source-url es la UNICA fuente de verdad visual.
El target debe ser INDISTINGUIBLE de la source-url en pantalla, frame por frame, pixel por pixel.
Si un usuario abre las dos webs lado a lado en dos pantallas, NO debe poder
diferenciar cual es cual (excepto por el texto de contenido y los hrefs del negocio).

Cualquier diferencia visual detectable NUMERICAMENTE es FAIL:
- Color, backgroundColor, borderColor fuera de match exacto: FAIL
- fontFamily distinto, fontSize con delta > 0 px, fontWeight distinto: FAIL
- padding, margin, gap con delta > 0 px: FAIL
- transform, opacity, filter, boxShadow, borderRadius con delta medible: FAIL
- Animacion ausente o con duration/easing/delay distintos: FAIL
- Hover/focus/active sin producir los mismos valores computados: FAIL
- Scroll sin producir el mismo efecto (parallax, pin, video scrub): FAIL
- Layout grid/flex con columnas, gap, orden o alignment distintos: FAIL
- Responsive que se rompe o cambia de layout en mobile/tablet: FAIL
- Nav que no es sticky/transparente/animado igual: FAIL
- Footer con estructura visual diferente: FAIL
- Diferencia visual > 0.5% en cualquier viewport o scroll: FAIL

NO existen "aproximaciones aceptables". NO existen "parecidos". NO existen "inspirados".
Es clon literal o es FAIL.

## 3. QUE SE CONSERVA DEL TARGET — INMUTABLE

DISENO (100% del source, sin adaptar, sin reescribir):
  CSS tokens, custom properties, tipografia, colores, espaciado, sombras,
  gradientes, border-radius, z-index, breakpoints, grid/flexbox layout,
  animaciones (GSAP, Lenis, CSS keyframes, Framer Motion, Three.js, Lottie, Rive, Spline),
  assets decorativos, hover/focus/active states, dark mode tokens, @font-face,
  estructura JSX/HTML, clases CSS/Tailwind, configs de animacion,
  atributos data-*, responsive behavior, breakpoints, media queries,
  pseudo-elements, keyframes, IntersectionObserver configs, RAF loops.

TEXTO Y NEGOCIO (100% del target):
  Strings visibles en UI (h1, p, span, button, label, alt, title, meta, og:*),
  hrefs de negocio del target, nombres del negocio, contenido CMS,
  rutas/redirects/rewrites, API routes, server actions, auth, middleware,
  analytics, integraciones, handlers de formularios, validacion, data fetching,
  mutations, base de datos, variables de entorno.

BACKEND = INTOCABLE. Se toca archivo `app/api/*`, `middleware.ts`, `server/*`,
`auth/*`, `db/*` → STOP INMEDIATO.

## 4. REGLA DE VERIFICACION — PROGRAMATICA NUMERICA (NO SCREENSHOTS)

Las SCREENSHOTS estaticas NO son un mecanismo valido para verificar nada.
Se usan solo como evidencia complementaria para el humano, nunca como fuente de verdad.

TODA verificacion DEBE ser PROGRAMATICA Y NUMERICA:

1. RAW source code comparison (FASE 0.5): fullHTML, allCSS, keyframes, custom
   properties, CSS variables, @layer, @container, @property — copiados literal,
   no reinterpretados.

2. Element-by-element computed styles: `getBoundingClientRect()` +
   `getComputedStyle()` de TODOS los elementos visibles (sin limite de 200),
   en TODOS los viewports (1920, 768, 375), en TODAS las posiciones de scroll
   (21 posiciones: 0-100% cada 5%).

3. Numeric diff: calcular delta absoluto en px/unidades para cada propiedad.
   Criterio PASS: delta = 0 en propiedades discretas (fontFamily, color,
   backgroundColor, fontWeight) y delta <= 0.5% / 1px en propiedades
   continuas (fontSize, padding, margin, gap, borderRadius, opacity, transform).

4. Motion trace: grabar video scrub / parallax / pin DOWN (0→100%) y UP
   (100→0%) capturando `video.currentTime`, transform matrices, opacity,
   en cada frame. Tolerancia numerica <= 2% en cada punto de la traza.

5. Interaction state testing: disparar hover/focus/active via JS
   (`element.dispatchEvent(new MouseEvent('mouseover'))` + CSS :hover
   simulacion via devtools protocol), capturar computed styles antes y
   despues, comparar con source.

## 5. REGLA ANTI-HARDCODING — CRITICA

CERO valores inventados. TODOS los valores visuales provienen de la extraccion RAW.
Esta skill NO contiene valores de diseno reutilizables.

- Colores (hex, rgb, hsl, oklch, oklab): `design-tokens.json` / `raw-extraction.json`
- Fuentes: `design-tokens.json` fontFaces / googleFonts / adobeFonts
- Spacing, radii, shadows: `design-tokens.json`
- Animaciones (duration, easing, delay, keyframes): `animations.json` / `raw-extraction.allCSS`
- Breakpoints, z-index: `design-tokens.json`
- Hover/focus: `css-rules.json` / `interactions.json`
- Pseudo-elements: `design-tokens.json.pseudoElements`

Si un valor CSS no aparece en ningun JSON de extraccion:
1. Re-ejecutar el script de extraccion relevante.
2. Inspeccionar el elemento especifico en MCP-REF con getComputedStyle().
3. NUNCA "adivinar" ni "aproximar" — STOP y re-extraer.

## 6. CHECKLIST BLOQUEANTE — MOSTRAR EN CADA RESPUESTA

La IA DEBE mostrar este checklist en TODA respuesta que toque codigo, extraccion o QA.
Marcar con `✅` cada item solo si hay evidencia programatica numerica que lo respalde.
`❌` = no completado. `⚠️` = parcial, debe bloquear el avance.

```
CHECKLIST PIXEL-PERFECT v4.0 (bloqueante, obligatorio en cada respuesta)
[ ] FASE 0.5 RAW HTML + allCSS + keyframes + scrollData + assets capturados
[ ] Analisis 1920x1080 (desktop full) completado — 21 scroll positions
[ ] Analisis 768x1024  (tablet)        completado — 21 scroll positions
[ ] Analisis 375x812   (mobile iPhone) completado — 21 scroll positions
[ ] getBoundingClientRect + getComputedStyle de TODOS los visibles (sin limite)
[ ] Todos los assets source usados (hotlink o descargados a /public/pds-source-assets)
[ ] Todas las animaciones/transiciones recreadas con valores numericos exactos
[ ] Libreria de animacion detectada y usada (no substituida)
[ ] Diferencia visual < 0.5% en los 3 viewports (medida numericamente)
[ ] Hover/focus/active testeados programaticamente en todos los elementos interactivos
[ ] Motion trace DOWN + UP registrada para cada video/canvas/pin/parallax
[ ] Prompts IA generados para cualquier asset con branding incrustado
[ ] Codigo entregado listo para copiar-pegar en el design system
[ ] Build PASS (exit 0, cero errores TS, cero warnings nuevos)
[ ] Consola JS: cero errores (incluye hydration mismatch)
```

Si cualquier item esta en `❌` o `⚠️`, la respuesta DEBE incluir:
`STATUS: NO APROBADO — razon: <descripcion numerica del gap>`.

## 7. VIEWPORTS OBLIGATORIOS — BLOQUEANTES

| Viewport | Ancho | Alto  | Contexto               |
|----------|-------|-------|------------------------|
| Desktop  | 1920  | 1080  | Device emulation full  |
| Tablet   | 768   | 1024  | Device emulation iPad  |
| Mobile   | 375   | 812   | Device emulation iPhone|

Reglas:
- Los tres viewports son BLOQUEANTES. Saltarse uno = FAIL.
- Device emulation completo (userAgent, devicePixelRatio, touch, viewport meta).
- Captura de pagina completa (`fullPage: true`), no trozos recortados.
- 21 posiciones de scroll por viewport por pagina.
- `getBoundingClientRect` + `getComputedStyle` en cada posicion.

## 8. FASE 0 — SETUP Y DESCUBRIMIENTO

### 8.1 Dual MCP (primera accion)

Abrir dos browsers MCP en paralelo y mantenerlos abiertos hasta `MIGRATION_COMPLETE.md`:
- MCP-REF: `<source-url>`
- MCP-TARGET: `http://localhost:3001` (o puerto del dev server del target)

Compatibles:
- Playwright MCP (`browser_navigate`, `browser_evaluate`, `browser_resize`, `browser_screenshot`)
- Puppeteer MCP (`puppeteer_evaluate`, `puppeteer_navigate`, `puppeteer_screenshot`)
- Browser-tools MCP (`runJavascript`, `getConsoleLogs`, `getNetworkLogs`)
- Modo degradado: usuario pega scripts en DevTools Console y comparte output RAW.

### 8.2 Anti-bot + recovery

- Cloudflare / hCaptcha: esperar 10s; si persiste, reportar al usuario. NUNCA bypassear.
- MCP crash: volcar `docs/pds/extraction/_checkpoint.json` con `{lastPhase, lastScript, lastPage, completedPages, timestamp}` y reanudar al reconectar.

### 8.3 Device emulation por viewport

Antes de extraer, fijar viewport + userAgent:

```javascript
// pseudo: adaptar al API del MCP
await browser.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await browser.setUserAgent('Mozilla/5.0 ... Desktop');
// repetir con 768x1024 y 375x812 (iPhone 13 Pro)
```

### 8.4 Descubrimiento automatico de paginas

Rutas: ejecutar crawler de `<a href>` + `fetch('/sitemap.xml')` + enlaces de `nav`, `footer`, `[role=navigation]`. Guardar en `PAGE_MAPPING.md` (BLOQUEANTE).

Limites anti-loop: MAX_PAGES=50, MAX_DEPTH=3, visited set, same-origin only.

### 8.5 Pre-extraccion obligatoria (`preExpandContent`)

Ejecutar en CADA pagina ANTES de cualquier script RAW. Hace scroll 0→100% en tramos de 5%, fuerza lazy images (`loading=eager`, `data-src→src`, `data-srcset→srcset`), fuerza videos, espera SPA chunks, re-scroll para capturar contenido reaparecido.

Output esperado: `{ finalHeight, totalElements, images, videos, sections }`. Si `finalHeight` crece despues del primer pase, re-ejecutar.

## 9. FASE 0.5 — INSPECCION RAW (BLOQUEANTE)

Ejecutar el script del PROMPT MAESTRO (§0.3) en MCP-REF en CADA pagina. El output COMPLETO se guarda en:

```
docs/pds/extraction/raw-extraction-<page>.json
```

Campos obligatorios capturados:
- `url`
- `fullHTML` (outerHTML del documento entero)
- `allCSS` (cada stylesheet: href + content; CORS BLOCKED flag para fallback manual)
- `jsBehaviors` (animaciones, listeners detectados — rellenado en FASE 1)
- `assets` (src/currentSrc de img/video/source/svg/audio)
- `scrollData` (21 posiciones con visibleElements count)
- `animations` (rellenado en FASE 1)

**Regla bloqueante**: hasta que `raw-extraction-<page>.json` exista con los 7 campos llenos, NO se avanza. Si CORS bloquea una hoja de estilo, ejecutar §10.2 (`fetchCrossOriginCSS`) desde otro origen o documentar como FAIL con fallback manual.

## 10. FASE 1 — EXTRACCION PROFUNDA (23 SCRIPTS RAW)

Ejecutar EN ORDEN en MCP-REF por pagina. Todos los JSONs de salida DEBEN incluir `_metadata: { version, url, timestamp, viewport, userAgent }`.

| #  | Script                                | Salida                                        | Bloqueante |
|----|---------------------------------------|-----------------------------------------------|------------|
| 1  | `extractFullDesignSystem()`           | `design-tokens.json`                          | si         |
| 2  | `fetchCrossOriginCSS()`               | `cross-origin-css.json`                       | si (si CORS) |
| 3  | `extractShadowStyles()`               | `shadow-styles.json`                          | si (si shadow) |
| 4  | `extractAnimationSystem()`            | `animations.json`                             | si         |
| 5  | `captureIntersectionObserverConfigs()`| dentro de `animations.json`                   | si         |
| 6  | `extractLottieRiveSpline()`           | `lottie-rive-spline.json`                     | si (si detectado) |
| 7  | `extractScrollScrubTrace()`           | `scroll-scrub-trace-<page>.json`              | si (si video/canvas fullscreen) |
| 8  | `extractDOMStructure()`               | `structure.json`                              | si         |
| 9  | `extractInteractions()`               | `interactions.json`                           | si         |
| 10 | `extractAssets()`                     | `assets.json` + protocolo de descarga/hotlink | si         |
| 11 | `extractThreeJSScene()`               | `three-scene.json`                            | si (si Three.js) |
| 12 | `extractDarkMode()`                   | `dark-mode.json`                              | si         |
| 13 | `extractDeepVisualFingerprint()`      | `visual-fingerprint-<page>.json`              | si         |
| 14 | `extractAdvancedPatterns()`           | `advanced-patterns.json`                      | si         |
| 15 | `extractFullCSSRules()`               | `css-rules.json`                              | si         |
| 16 | `extractScrollSnapshot()`             | `scroll-snapshots-<page>.json`                | si         |
| 17 | `extractAccessibility()`              | `accessibility.json`                          | si         |
| 18 | Scroll narrative textual              | `scroll-narrative-<page>.md`                  | si         |
| 19 | `recordScrollBehavior()`              | `scroll-behavior-<page>.json`                 | si         |
| 20 | `detectAnimationImplementation()`     | `animation-implementation.json`               | si         |
| 21 | `extractElementStyleMap()`            | `element-style-map-<page>.json`               | si         |
| 22 | `extractNetworkProfile()`             | `network-profile.json`                        | si         |
| 23 | `extractSectionInventory()`           | `section-inventory-<page>.json`               | si         |

Notas criticas:
- `extractDeepVisualFingerprint()` en v4.0 NO tiene limite de 200 elementos — captura 60+ CSS props de TODOS los elementos visibles.
- `recordScrollBehavior()` captura por CLAVE ESTRUCTURAL (`section[0]`, `video[0]`, `header[0]`), NO por CSS class name (los hashes de CSS modules rompen la comparacion).
- `detectAnimationImplementation()` determina que usa el source (GSAP vs Lenis vs native RAF vs CSS scroll-timeline vs IO). El target DEBE usar lo MISMO. Substituir libreria = FAIL.

Tipos de animacion reconocidos (para el manifest):
- Library: GSAP_TWEEN, GSAP_SCROLLTRIGGER, GSAP_TIMELINE, GSAP_SPLITTEXT,
  GSAP_SCROLLSMOOTHER, GSAP_FLIP, GSAP_MATCHMEDIA, LENIS_INIT, LENIS_CB,
  FRAMER_MOTION, THREE_ANIMATION, LOTTIE, LOTTIE_DOTLOTTIE, RIVE_ANIMATION, SPLINE_SCENE.
- Native JS: NATIVE_RAF_VIDEO_SCRUB, NATIVE_RAF_PARALLAX, INTERSECTION_OBS,
  RAF_LOOP, SCROLL_LISTENER, WEB_ANIMATION_API.
- CSS-only: CSS_KEYFRAME, CSS_TRANSITION, CSS_MODULE_ANIMATION, CSS_IO_REVEAL,
  CSS_SCROLL_TIMELINE, CSS_VIEW_TIMELINE, CSS_MOTION_PATH, CSS_PROPERTY_ANIM,
  PSEUDO_ELEMENT_ANIM, SCROLL_DRIVEN_ANIMATION, STARTING_STYLE.
- Pattern: VIDEO_SCRUB, CANVAS_SCROLL, MARQUEE, TAB_SWITCH, ACCORDION, CAROUSEL,
  COUNTER_ANIM, TEXT_SPLIT, MAGNETIC_HOVER, CUSTOM_CURSOR, SCROLL_SNAP,
  PARALLAX_LAYER, STAGGER_GROUP, PRELOADER, PAGE_TRANSITION, SCROLL_INDICATOR,
  STICKY_ELEMENT, CLIP_PATH_ANIM, BACKDROP_BLUR, VIEW_TRANSITION, NATIVE_DIALOG,
  POPOVER_API, ANCHOR_POSITIONING, GRID_SUBGRID, CONTAINER_QUERY_ANIM,
  DETAILS_SUMMARY, CUSTOM_SCROLLBAR, DATA_ATTR.

Deliverable FASE 1 bloqueante: `ANIMATION_MANIFEST.md` con cada animacion/efecto del source listada, tipo detectado, valores numericos (duration, easing, delay, stagger, scrub, pin start/end), pendiente de validacion en FASE 4.

## 11. FASE 2 — ANALISIS DEL TARGET

- Build baseline (`next build`) antes de tocar nada.
- Extraccion de strings de texto del target (grep de `<h1..h6>`, `<p>`, `<span>`, `<button>`, `<label>`, `alt=`, `title=`, metadata).
- Deteccion de arquitectura: monorepo, i18n routing, Tailwind version (v3 config vs v4 @theme), UI library, Next.js App/Pages Router.
- Solo instalar dependencias que el source REALMENTE usa (segun `detectAnimationImplementation()` + `extractNetworkProfile()`).
- Deteccion y renombramiento de font names del source brand (no dejar el nombre de marca source en el codigo target).
- `target-architecture.json` obligatorio.

## 12. FASE 3 — RECRECION EXACTA POR SECCIONES

Orden: tokens → tailwind (v3 config o v4 @theme) → fonts (`next/font`) → animation libs (solo las que el source usa) → navbar → footer → paginas → compartidos.

### 12.1 Reglas Next.js App Router
- `'use client'` obligatorio si hay: `useState/useEffect/useRef`, event handlers, animation libs, browser APIs.
- Dynamic imports (`ssr: false`) para libs pesadas (GSAP, Lenis, Three.js, Lottie, Rive, Spline).
- `next/font` para TODAS las fuentes (Google + local + variable + Adobe).
- `next/image` con `sizes` y `priority` correctos (igualar attr del source).
- `useIsClient()` o `suppressHydrationWarning` para prevenir mismatch.
- Tailwind v3 → `tailwind.config.ts` extend (NO @theme). v4 → `@theme` directive en `globals.css`.

### 12.2 Assets — HOTLINK OBLIGATORIO POR DEFECTO

Regla v4.0 reforzada:
- Por defecto, TODO asset visual (img, video, svg, poster, bg) se HOTLINKEA con la URL original del source. Cero assets decorativos del target en el diseno.
- Si el asset tiene CORS o dominio bloqueado: descargar a `public/pds-source-assets/<path>` y servir desde ahi.
- Solo se genera prompt IA en `docs/pds/assets-reemplazo-ia.md` si el asset contiene branding incrustado (logo del source en video/imagen, texto SVG con nombre del source). El prompt IA es entregable posterior, la migracion inicial mantiene el asset source.

### 12.3 Loop INSPECT → BUILD → SWAP texto → BUILD verify → VERIFY dual MCP

Por cada seccion:
1. INSPECT: leer `raw-extraction-*.json`, `design-tokens.json`, `css-rules.json`, `animations.json`.
2. BUILD: escribir JSX + CSS copiando literal (keyframes tal cual, custom properties tal cual, clases Tailwind equivalentes cuando aplique).
3. SWAP texto: reemplazar strings visibles por los del target. NO tocar clases, animaciones, estructura.
4. BUILD verify: `next build` → exit 0 antes de seguir.
5. VERIFY dual MCP: seccion a seccion, `recordScrollBehavior()` + `compareScrollBehavior()` en source y target.

### 12.4 Reglas de build (BUILD-1 a BUILD-5)
- BUILD-1: archivo modificado → build inmediato.
- BUILD-2: build falla → corregir antes de tocar otro.
- BUILD-3: 3 fallos en mismo archivo → STOP + reporte.
- BUILD-4: cero imports de chunks/hashes/`.next/server/`.
- BUILD-5: PASS = exit 0, cero errores TS, cero warnings nuevos.

## 13. FASE 4 — VERIFICACION QA (PAGINA POR PAGINA, APROBACION HUMANA ENTRE PAGINAS)

### 13.1 Dual-MCP sync scroll (obligatorio)
- Abrir source y target simultaneamente.
- Scroll sincronizado a 0%, 5%, 10%, 15%... hasta 100% (21 posiciones).
- En cada posicion: capturar `getBoundingClientRect`+`getComputedStyle` de todos los elementos visibles.
- Comparar NUMERICAMENTE — si delta > 0.5% en cualquier propiedad: STOP + corregir antes de avanzar.

### 13.2 `recordScrollBehavior` + `compareScrollBehavior`
- Ejecutar en source Y target por cada pagina.
- Comparar por CLAVE ESTRUCTURAL (`section[N]`, `video[N]`), NO por CSS class name.
- Reportar: `BG_MISMATCH`, `VIDEO_TIME`, `HEIGHT_RATIO`, `ELEMENT_MISSING`, `TRANSFORM_DELTA`, `OPACITY_DELTA`.
- `passRate` se calcula como % de props identicas (delta <= 0.5%). Requisito: `passRate >= 95%` (v4.0 sube el umbral desde 90%).

### 13.3 Multi-viewport obligatorio
- 1920x1080, 768x1024, 375x812 — los tres con dual-MCP + 21 scroll positions + compare.
- Device emulation real (userAgent, DPR, touch).

### 13.4 Interactions testing programatico
- Para cada elemento interactivo (nav, button, link, card, menu, tab, accordion, input):
  - Disparar `mouseover`, `mouseenter`, `focus`, `mousedown`, `click` via JS.
  - Capturar computed styles ANTES / DURANTE / DESPUES.
  - Comparar source vs target — delta 0 en propiedades discretas.

### 13.5 Motion trace
- Para cada `VIDEO_SCRUB`, `CANVAS_SCROLL`, `STICKY_ELEMENT`, `PARALLAX_LAYER`, `PIN`:
  - Grabar DOWN (0→100%) y UP (100→0%).
  - Capturar `video.currentTime`, transform matrix, opacity, filter, blur en cada frame.
  - Comparar por frame — delta <= 2%.

### 13.6 Otras verificaciones obligatorias
- Consola JS: CERO errores en target (incluye hydration mismatch).
- Red/assets: TODAS las fuentes, imagenes, videos, iframes cargan 200 OK.
- Performance basica: LCP, CLS, INP (informativo).
- Stacking contexts (z-index, opacity, transform, filter, isolation) verificados.
- Accesibilidad: landmarks, ARIA roles, skip links, focus order, `prefers-reduced-motion` respetado.

## 14. FASE 5 — RECORRIDO VISUAL FINAL (GATE HUMANO)

Obligatorio antes de `MIGRATION_COMPLETE.md`:
- Scroll completo 0-100% en tramos de 5% (21 posiciones) por pagina.
- En los 3 viewports (1920, 768, 375).
- Side-by-side source/target en CADA posicion, con screenshot de ambos Y diff numerico.
- Bucle de correccion inmediata si hay diferencia numerica > 0.5%.
- `diff-report.md` con toda anomalia detectada y su fix.
- Gate de aprobacion humana explicita antes de `MIGRATION_COMPLETE.md`.

## 15. FASE 6 — ENTREGABLES FINALES

Todos obligatorios:

```
PAGE_MAPPING.md
ANIMATION_MANIFEST.md
docs/pds/extraction/raw-extraction-*.json          (FASE 0.5)
docs/pds/extraction/design-tokens.json
docs/pds/extraction/animations.json
docs/pds/extraction/structure.json
docs/pds/extraction/interactions.json
docs/pds/extraction/assets.json
docs/pds/extraction/dark-mode.json
docs/pds/extraction/visual-fingerprint-*.json
docs/pds/extraction/advanced-patterns.json
docs/pds/extraction/css-rules.json
docs/pds/extraction/cross-origin-css.json
docs/pds/extraction/shadow-styles.json
docs/pds/extraction/lottie-rive-spline.json
docs/pds/extraction/accessibility.json
docs/pds/extraction/scroll-snapshots-*.json
docs/pds/extraction/scroll-scrub-trace-*.json
docs/pds/extraction/scroll-narrative-*.md
docs/pds/extraction/scroll-behavior-*.json
docs/pds/extraction/scroll-diff-*.json
docs/pds/extraction/animation-implementation.json
docs/pds/extraction/element-style-map-*.json
docs/pds/extraction/network-profile.json
docs/pds/extraction/section-inventory-*.json
docs/pds/extraction/target-architecture.json
docs/pds/modified-files.md
docs/pds/assets-reemplazo-ia.md                    (prompts IA SOLO para branding)
docs/pds/assets-manual-download.md
docs/pds/qa-evidence/                              (side-by-side + diff numerico)
docs/pds/qa-evidence/recorrido-final/              (FASE 5)
docs/pds/qa-evidence/pixel-diff-summary.json
docs/pds/qa-evidence/pixel-diff.json
docs/pds/qa-evidence/motion-down-up.json
docs/pds/diff-report.md                            (anomalias + fix)
MIGRATION_COMPLETE.md                              (solo si TODO PASS)
```

## 16. PROMPTS IA PARA ASSETS CON BRANDING

Solo cuando un asset source contiene branding incrustado (logo, nombre, texto SVG con marca del source) que NO se puede usar en el target. La migracion inicial mantiene el asset source (hotlink/local); el prompt IA es entregable posterior.

Estructura en `docs/pds/assets-reemplazo-ia.md` por asset:

```yaml
- sourceUrl: <url original hotlinked>
  usedInRoute: <ruta donde aparece>
  visualRole: <hero bg / decorative / icon / texture / logo>
  sourceDescription: <que muestra literalmente>
  targetBusinessConcept: <equivalente conceptual del target>
  imagePrompt | videoPrompt: <prompt ultra-detallado>
  negativePrompt: <que NO debe aparecer>
  aspectRatio: <w:h>
  duration / fps / cameraMotion: <solo video>
  mustMatchSourceStyle: color, lens, composition, crop, motion, lighting
```

## 17. STOP CONDITIONS (AMPLIADO v4.0)

La skill DETIENE la ejecucion ante cualquiera de estas condiciones:

- `raw-extraction-<page>.json` ausente o incompleto (menos de los 7 campos) → STOP + re-ejecutar FASE 0.5.
- `PAGE_MAPPING.md` inexistente cuando se intenta codigo → STOP.
- Build sin resolver antes del siguiente archivo → STOP.
- `design-tokens.json` vacio → STOP + re-extraer.
- `ScrollTrigger.getAll()` vacio con animaciones visibles → STOP + scroll + re-extraer.
- `VIDEO_SCRUB` detectado en source y target usa `autoplay/loop` sin `currentTime` ligado a scroll → STOP + rehacer.
- `scroll-scrub-trace` ausente para pagina con video/canvas fullscreen → STOP.
- Evidencia MCP programatica ausente para item marcado ✅ → STOP.
- Texto de source encontrado en target despues de SWAP → STOP.
- 3 builds fallidos consecutivos en mismo archivo → STOP.
- Diferencia numerica > 0.5% durante recorrido final → STOP + corregir.
- Se intenta `MIGRATION_COMPLETE.md` sin FASE 5 completa → STOP.
- Se modifica archivo de backend (API, auth, middleware, server actions, db) → STOP INMEDIATO.
- `preExpandContent()` no ejecutado antes de extraccion → STOP.
- JSON de extraccion sin campo `_metadata` → STOP + re-extraer.
- Cross-origin stylesheets detectadas y no extraidas via `fetchCrossOriginCSS()` → STOP.
- Shadow DOM detectado y no extraido → STOP.
- Lottie/Rive/Spline detectado en source y no incluido en extraction → STOP.
- CSS scroll-timeline / view-timeline en source y target usa JS scroll listener → STOP + usar CSS nativo.
- Hydration mismatch en consola target → STOP.
- Componente con hooks/event handlers sin `'use client'` → STOP.
- `compareScrollBehavior()` con passRate < 95% → STOP + corregir (verificar clave estructural, no CSS class name).
- Dual-MCP sync scroll no ejecutado para una pagina → STOP.
- Aprobacion humana no obtenida antes de pasar a siguiente pagina → STOP.
- Viewport faltante (1920, 768, 375 los tres obligatorios) → STOP.
- Checklist §6 con algun item en ❌ o ⚠️ → STOP + declarar NO APROBADO.
- Iframes/embeds en source y ausentes en target → STOP.
- Section inventory mismatch (source N secciones ≠ target M secciones) → STOP.
- Background color de seccion target difiere de source → STOP.
- Componente generico reutilizado para 2+ secciones source diferentes → STOP.
- Footer target solo texto cuando source footer tiene ilustracion → STOP.
- Pagina target con placeholder/coming-soon cuando source tiene diseno completo → STOP.
- Texto source brand en HTML/SVG target → STOP.
- Layout type mismatch (grid vs flex) → STOP.
- `detectAnimationImplementation()` NO ejecutado antes de FASE 3 → STOP.
- `recordScrollBehavior()` NO ejecutado para una pagina → STOP.
- Target instala GSAP pero source NO usa GSAP → STOP + desinstalar + usar nativos.
- Target instala Lenis pero source NO usa smooth scroll lib → STOP.
- `target-architecture.json` NO generado antes de FASE 3 → STOP.
- Font name de source brand en codigo target → STOP + renombrar.
- `extractNetworkProfile()` NO ejecutado → STOP.
- `extractSectionInventory()` NO ejecutado → STOP.
- Source usa `100dvh` y target usa `100vh` → STOP.
- Source usa `@starting-style` y target lo sustituye por JS → STOP + copiar CSS nativo.
- Source usa `-webkit-text-stroke` y target no lo replica → STOP.
- `ScrollSmoother` + `Lenis` instalados simultaneamente → STOP (incompatibles).
- Asset decorativo del target usado en vez del source → STOP + hotlink o descargar del source.
- Screenshot estatico presentado como unica evidencia de animacion/scroll → STOP + ejecutar extraccion RAW.

## 18. CRITERIOS DE COMPLETITUD

### Visual (tolerancia cero)
- FASE 5 completada con CERO diferencias numericas > 0.5% en los 3 viewports.
- 21 posiciones de scroll verificadas por pagina por viewport.
- Computed styles IDENTICOS (delta 0 en propiedades discretas).

### Efectos y animaciones
- `ANIMATION_MANIFEST.md` con 100% de animaciones verificadas (grep -c "✅" == TOTAL).
- `VIDEO_SCRUB` con `currentTime` ligado a scroll, NO autoplay/loop.
- Hover/focus/active con deltas 0 vs source.
- Stacking contexts verificados.
- Lottie/Rive/Spline con reproduccion identica.
- CSS scroll-timeline/view-timeline: source usa CSS → target usa CSS.
- IntersectionObserver: `threshold` y `rootMargin` identicos.
- View Transitions API: si source las usa, target tambien.
- `prefers-reduced-motion` respetado.

### Verificacion programatica (v4.0)
- FASE 0.5 `raw-extraction-<page>.json` presente y completo.
- `recordScrollBehavior()` + `compareScrollBehavior()` con `passRate >= 95%` en TODAS las paginas.
- `detectAnimationImplementation()` ejecutado y respetado.
- Target NO instala dependencias que source no usa.
- `target-architecture.json` generado y respetado.
- Font names del source brand NO presentes en codigo target.
- `extractNetworkProfile()`, `extractSectionInventory()`, `extractElementStyleMap()` ejecutados.
- `gsap.matchMedia` breakpoints respetados si aplica.

### Tecnico
- Build PASS (exit 0, cero errores TS, cero warnings nuevos).
- Consola JS: cero errores (cero hydration mismatch).
- Assets source: 100% hotlinkeados o descargados (cero assets del target como diseno).
- Texto target preservado. Backend INTOCABLE.
- Dynamic imports para libs pesadas.
- `'use client'` en todo componente con hooks/event handlers.
- `next/font` para todas las fuentes.
- Iframes/embeds replicados.
- `container-type/name`, `env(safe-area-inset-*)`, `color-scheme` replicados si aplican.
- Section inventory paridad exacta.
- Cero componentes genericos reutilizados para secciones source distintas.
- Cero paginas placeholder/coming-soon cuando source tiene diseno.
- Source brand text: cero leaks en HTML/SVG target.

## 19. MANTENIMIENTO

Fuente de verdad: `.claude/skills/port-design-system-from-local-clone/SKILL.md`.
Sync a todas las plataformas: `node scripts/sync-skills.mjs && bash scripts/sync-agent-rules.sh`.

---

## 20. COMO USAR LA SKILL v4.0 — PASO A PASO

Esta seccion es la guia operativa. Seguir EXACTAMENTE los pasos en orden.

### Paso 1 — Preparar el entorno

1. Tener el target en local y correr el dev server: `npm run dev` (por defecto `http://localhost:3001`).
2. Tener acceso a un MCP browser (Playwright / Puppeteer / Browser-tools) o, en su defecto, DevTools abierto.
3. Confirmar que existen las carpetas: `docs/pds/extraction/`, `docs/pds/qa-evidence/`, `docs/pds/qa-evidence/recorrido-final/`. Crearlas si faltan.

### Paso 2 — Invocar la skill

```txt
/port-design-system-from-local-clone "<target-path>" "<source-url>"
```

Ejemplo:
```txt
/port-design-system-from-local-clone "/Users/javi/port-design-system" "https://jobyaviation.com"
```

### Paso 3 — PROMPT MAESTRO v4.0 (§0)

La IA DEBE cargar el PROMPT MAESTRO v4.0 como instruccion principal y reproducirlo verbatim al inicio de su primera respuesta, junto con el CHECKLIST (§6).

### Paso 4 — FASE 0: dual MCP + descubrimiento

- Abrir MCP-REF en `<source-url>` y MCP-TARGET en `http://localhost:3001`.
- Ejecutar anti-bot + device emulation para los 3 viewports.
- Crawler de paginas → `PAGE_MAPPING.md`.
- `preExpandContent()` obligatorio antes de cualquier extraccion.

### Paso 5 — FASE 0.5: inspeccion RAW (bloqueante)

Ejecutar el script del PROMPT MAESTRO (§0.3) en CADA pagina en MCP-REF. Guardar output COMPLETO en `docs/pds/extraction/raw-extraction-<page>.json`. Si algun campo falta: STOP y re-ejecutar.

### Paso 6 — FASE 1: 23 scripts de extraccion

Ejecutar en orden (§10). Guardar cada JSON con `_metadata`. Generar `ANIMATION_MANIFEST.md`. No avanzar a FASE 3 sin `detectAnimationImplementation()` y `target-architecture.json`.

### Paso 7 — FASE 2: analizar el target

Build baseline, strings visibles, arquitectura (monorepo, i18n, Tailwind v3/v4), dependencias REALES del source. Renombrar fuentes del source brand.

### Paso 8 — FASE 3: reconstruir exacto

Orden: tokens → tailwind → fonts → animation libs → navbar → footer → paginas → compartidos.
Por seccion: INSPECT → BUILD → SWAP texto → BUILD verify → VERIFY dual MCP. Hotlink de assets.

### Paso 9 — FASE 4: QA programatica numerica

Por cada pagina en los 3 viewports: dual-MCP sync scroll (21 posiciones), `recordScrollBehavior` + `compareScrollBehavior` (passRate >= 95%), motion trace DOWN+UP, interactions testing, consola JS, red/assets, stacking contexts, accesibilidad.

Gate de aprobacion humana entre paginas.

### Paso 10 — FASE 5: recorrido visual final

21 posiciones por pagina en los 3 viewports. Side-by-side con diff numerico. Bucle de correccion. `diff-report.md`. Gate humano antes de cerrar.

### Paso 11 — FASE 6: entregables y MIGRATION_COMPLETE.md

Solo si TODO el checklist (§6) esta ✅ y `passRate >= 95%` en todas las paginas y viewports. En caso contrario: `MIGRATION_STATUS.md` con `NO APROBADO` y lista de gaps numericos.

### Paso 12 — Checklist en cada respuesta

La IA MUESTRA el checklist (§6) en cada respuesta que toque extraccion, codigo o QA. Si algo esta en ❌ o ⚠️, declara `STATUS: NO APROBADO` y sigue trabajando hasta cerrarlo.

### Recordatorios finales (no saltarselos jamas)

- Es clon literal o es FAIL.
- Screenshots estaticos NUNCA son fuente de verdad.
- RAW > screenshots siempre.
- 1920x1080 + 768x1024 + 375x812 son los tres obligatorios.
- 21 posiciones de scroll por pagina por viewport.
- Assets source se hotlinkean o descargan — cero assets del target como diseno.
- Diferencia < 0.5% medida numericamente, no "parecido".
- Backend = INTOCABLE.
- Checklist bloqueante = se muestra SIEMPRE.

Fin de la skill v4.0.
