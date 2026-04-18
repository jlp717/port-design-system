# Port Design System — CLON LITERAL PIXEL-PERFECT v6.0 FINAL

> Skill completa en SKILL.md. Este archivo es el resumen de reglas para agentes sin acceso a SKILL.md.

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

## Invocacion — scope flexible (NUEVO v6.0)

```txt
# Sitio completo (descubrimiento automatico MAX_PAGES=50)
/port-design-system-from-local-clone "<target-path>" "<source-url>"

# Pagina unica (sin crawler)
/port-design-system-from-local-clone "<target-path>" "<source-url>" --page "/"

# Lista de paginas especificas
/port-design-system-from-local-clone "<target-path>" "<source-url>" --pages "/,/about,/contact"
```

Ejemplos:
```txt
/port-design-system-from-local-clone "/Users/javi/granja" "https://jobyaviation.com"
/port-design-system-from-local-clone "C:\repos\target" "https://jobyaviation.com" --page "/"
/port-design-system-from-local-clone "C:\repos\target" "https://jobyaviation.com" --pages "/,/aircraft"
```

## Protocolo anti-atajos — LEER ANTES DE CADA ACCION

- ❌ NUNCA usar screenshot como fuente de verdad de layout, animaciones o scroll
- ❌ NUNCA inventar el output de un script — ejecutarlo en MCP y esperar el JSON real
- ❌ NUNCA avanzar de fase sin completar la fase actual
- ❌ NUNCA escribir codigo antes de completar FASE 0.5 + FASE 0.6 + FASE 1
- ✅ SIEMPRE ejecutar scripts via `mcp__chrome-devtools__evaluate_script`
- ✅ SIEMPRE esperar el JSON real de cada script antes de continuar
- ✅ SIEMPRE declarar fidelidad estimada (numero) antes de FASE 3

Si te encuentras a punto de escribir codigo sin JSON de extraccion real → STOP → ejecutar script primero.

## MCP tool mapping — NUNCA IMPROVISAR

| Accion | Tool MCP |
|---|---|
| Ejecutar script en browser | `mcp__chrome-devtools__evaluate_script` |
| Navegar a URL | `mcp__chrome-devtools__navigate_page` |
| Nueva pestana | `mcp__chrome-devtools__new_page` |
| Cambiar viewport | `mcp__chrome-devtools__emulate` |
| Screenshot (solo evidencia humana) | `mcp__chrome-devtools__take_screenshot` |
| Ver consola JS | `mcp__chrome-devtools__list_console_messages` |
| Ver requests | `mcp__chrome-devtools__list_network_requests` |

Si el output de evaluate_script es undefined o error → reportar al usuario, NO inventar resultado.

## Regla DS-FIRST — CRITICA (v6.0)

Antes de generar UNA SOLA LINEA de codigo, DEBES:
1. Leer exhaustivamente el repo del DS: `src/components/**`, `globals.css`, `package.json`, `src/hooks`.
2. Crear `docs/pds/extraction/ds-component-map.json` (inventario completo del DS).
3. Extraer RAW el source via MCP (23 scripts — codigo embebido en SKILL.md §12).
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
- ❌ Inventar valores CSS no extraidos de los JSONs de extraccion

## KEY-MAPPINGS — obligatorio en cada respuesta con codigo

En TODA respuesta que genere o modifique codigo, incluir esta tabla:

```
| Seccion Source | Componente DS | Tokens DS (source → pds-) | Animacion | Gap / Solucion |
|---|---|---|---|---|
| SectionHero | src/components/sections/HeroSection.tsx (nuevo CVA) | --color-dark-blue → --color-pds-dark-blue | GSAP ScrollTrigger | Instalar gsap? |
| Button CTA | <Button> extendido + variante pds-cta | --color-orange → --color-pds-orange | CSS transition 200ms | ✅ nativo |
```

## Reglas base v6.0 (resumen)

- Screenshots estaticos NUNCA son fuente de verdad. Todo es RAW + numerico via MCP.
- Viewports obligatorios: 1920x1080 (desktop full), 768x1024 (tablet), 375x812 (mobile iPhone).
- 21 posiciones de scroll (0-100% cada 5%) por pagina por viewport.
- `getBoundingClientRect()` + `getComputedStyle()` de TODOS los elementos visibles (sin limite).
- Diferencia visual < 0.5% en los 3 viewports, medida numericamente.
- Assets visuales: hotlink directo del source por defecto. Cero assets decorativos del target.
- Prompts IA solo para assets con branding source incrustado; la migracion inicial mantiene el asset source.
- `detectAnimationImplementation()` manda: target usa lo MISMO que el source. No substituir librerias.
- Cero valores hardcodeados. Todo viene de la extraccion RAW via MCP.
- Fidelidad estimada declarada antes de FASE 3. Si < 95% visual → STOP + usuario decide.
- NUEVO v6.0: Los 7 scripts criticos estan embebidos en SKILL.md §12 — nunca inventar su codigo.

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

## Checklist bloqueante v6.0 (debe aparecer en cada respuesta)

```
CHECKLIST DS-FIRST PIXEL-PERFECT v6.0

FASE 0.5 — ANALISIS DS LOCAL:
[ ] src/components/** leido con Glob + Read (herramientas de archivo, NO browser)
[ ] globals.css leido — tokens @theme inline inventariados
[ ] package.json leido — animation libs detectadas
[ ] ds-component-map.json generado y guardado

FASE 0.6 — RAW SOURCE (via MCP evaluate_script):
[ ] preExpandContent() ejecutado en MCP — JSON real recibido
[ ] Script RAW maestro ejecutado — raw-extraction-<page>.json guardado
[ ] allCSS capturado (CORS_BLOCKED documentado si aplica)

FASE 1 — 23 SCRIPTS (todos via MCP evaluate_script):
[ ] extractFullDesignSystem() — JSON real recibido (SCRIPT 1 en SKILL.md §12)
[ ] detectAnimationImplementation() — JSON real recibido — BLOQUEANTE FASE 3
[ ] extractAnimationSystem() — JSON real recibido
[ ] recordScrollBehavior() source — JSON real recibido — BLOQUEANTE
[ ] extractSectionInventory() — JSON real recibido — BLOQUEANTE
[ ] extractDeepVisualFingerprint() — JSON real recibido
[ ] 17 scripts restantes ejecutados

POST FASE 1:
[ ] ds-section-mapping.json generado (cruza DS map + extraccion source)
[ ] ANIMATION_MANIFEST.md generado
[ ] Fidelidad estimada declarada: visual XX%, behavioral XX%

VIEWPORTS (Fase 4 — via MCP):
[ ] 1920x1080 — 21 scroll positions — getComputedStyle todos los visibles
[ ] 768x1024  — 21 scroll positions
[ ] 375x812   — 21 scroll positions

DS-FIRST:
[ ] Tokens source en @theme inline con prefijo pds-
[ ] Cero class names del source en JSX
[ ] Cero .css/.module.css externos
[ ] KEY-MAPPINGS table en esta respuesta

QA:
[ ] compareScrollBehavior() passRate >= 95%
[ ] Build PASS (exit 0, cero errores TS)
[ ] Consola JS: cero errores (mcp__chrome-devtools__list_console_messages)
[ ] Diferencia visual < 0.5% en 3 viewports
```

Si cualquier item esta en ❌ o ⚠️, declarar `STATUS: NO APROBADO — razon: <descripcion numerica>`.

## Deteccion de texto en media

- Texto source en video/imagen → documentar en `docs/pds/assets-reemplazo-ia.md`.
- SVGs con `<text>` elements → swap textual aplica.
- Source brand en HTML/SVG del target → STOP + eliminar.
- Videos → flagear para review manual de brand text en frames.

## Flujo (fases v6.0 FINAL)

### FASE 0 — Setup
- Dual MCP (MCP-REF en source-url, MCP-TARGET en `localhost:3001`).
- Scope: `all` (default) | `--page <path>` | `--pages <csv>`.
- Anti-bot protocol + MCP crash recovery via `_checkpoint.json`.
- Device emulation: 1920x1080, 768x1024, 375x812.
- Si `all`: descubrimiento automatico nav + sitemap.xml. MAX_PAGES=50, MAX_DEPTH=3.
- `PAGE_MAPPING.md` generado — BLOQUEANTE (o entry unica si --page).
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
Ejecutar en MCP-REF via `mcp__chrome-devtools__evaluate_script`. Scripts en SKILL.md §11.
Capturar: `url`, `fullHTML`, `allCSS`, `assets`, `scrollData` (21 posiciones).
Guardar en `docs/pds/extraction/raw-extraction-<page>.json`.
Sin este JSON completo no se avanza.

### FASE 1 — Extraccion profunda (23 scripts RAW)
Los 7 scripts criticos tienen codigo embebido en SKILL.md §12. Ejecutar TODOS via MCP:
1. `extractFullDesignSystem()` — design-tokens.json
2. `fetchCrossOriginCSS()` — cross-origin-css.json
3. `extractShadowStyles()` — shadow-styles.json
4. `extractAnimationSystem()` — animations.json
5. `captureIntersectionObserverConfigs()` — dentro de animations.json
6. `extractLottieRiveSpline()` — lottie-rive-spline.json
7. `extractScrollScrubTrace()` — scroll-scrub-trace-<page>.json
8. `extractDOMStructure()` — structure.json
9. `extractInteractions()` — interactions.json
10. `extractAssets()` — assets.json
11. `extractThreeJSScene()` — three-scene.json
12. `extractDarkMode()` — dark-mode.json
13. `extractDeepVisualFingerprint()` — visual-fingerprint-<page>.json
14. `extractAdvancedPatterns()` — advanced-patterns.json
15. `extractFullCSSRules()` — css-rules.json
16. `extractScrollSnapshot()` — scroll-snapshots-<page>.json
17. `extractAccessibility()` — accessibility.json
18. Scroll narrative — scroll-narrative-<page>.md
19. `recordScrollBehavior()` — scroll-behavior-<page>.json — BLOQUEANTE
20. `detectAnimationImplementation()` — animation-implementation.json — BLOQUEANTE FASE 3
21. `extractElementStyleMap()` — element-style-map-<page>.json
22. `extractNetworkProfile()` — network-profile.json
23. `extractSectionInventory()` — section-inventory-<page>.json — BLOQUEANTE

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
- Script output inventado sin ejecutar en MCP → STOP (protocolo anti-atajos v6.0).
- `mcp__chrome-devtools__evaluate_script` no usado para extraccion → STOP (v6.0).
- Scope param `--page`/`--pages` ignorado cuando se especifico → STOP (v6.0).

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

### Verificacion programatica v6.0
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
- NUEVO v6.0: Todos los scripts ejecutados via `mcp__chrome-devtools__evaluate_script` — JSONs reales.
- NUEVO v6.0: Scope `--page`/`--pages` respetado si fue especificado.
- NUEVO v6.0: Los 7 scripts criticos usados desde SKILL.md §12 — codigo verbatim, no inventado.

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
