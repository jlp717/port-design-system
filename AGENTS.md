# Port Design System From Local Clone

## Regla absoluta (leer antes de cada acción)

El source es la unica fuente de verdad visual.
El target debe convertirse visualmente en una copia exacta del source.
Lo unico que se conserva del target es el texto visible al usuario.

## Comando

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<reference-url>"
```

- source-path: repo local clonado con el diseño a trasplantar
- target-path: repo de producción que recibirá el diseño
- reference-url: URL pública del sitio original de referencia
  (ej: "https://jobyaviation.com")
  Reemplaza al commit-hash de versiones anteriores.
  Se usa para validación pre-flight y QA dual-MCP durante toda la migración.

## Qué hace esta skill

Realiza un TRASPLANTE VISUAL LITERAL. No un port. No una adaptación.
Cada archivo puramente visual se COPIA del source al target.
Después, y solo después, se hace swap de strings de texto.
No se reescribe. No se refactoriza. No se aplica juicio personal.

## DISEÑO vs TEXTO — regla inmutable

DISEÑO = 100% del source. Copiado verbatim. Cero adaptación.
TEXTO  = 100% del target. Cada string visible. Cero texto del source sobrevive.

"Texto" significa exactamente:
  ✅ Strings literales visibles al usuario (h1, p, span, button, label, alt)
  ✅ Rutas de href que apuntan a páginas del negocio target
  ✅ Nombres de productos, servicios, personas, lugares del negocio target

"Texto" NO significa:
  ❌ Clases CSS o Tailwind (son diseño)
  ❌ Valores de animación (son diseño)
  ❌ Estructura HTML/JSX (es diseño)
  ❌ Atributos data-* de animación (son diseño)
  ❌ Rutas de assets decorativos del source como videos y texturas (son diseño)

Cuando una página del source no tiene equivalente en el target:
  - Usar el DISEÑO completo de la página source más similar en estructura
  - Usar el TEXTO completo de esa página del target
  - Nunca mezclar diseño del target con diseño del source
  - Nunca inventar un diseño nuevo

## Qué se reemplaza (todo lo visual)

- globals.css, design tokens, Tailwind config, CSS custom properties
- Cada componente shell (nav, hero, secciones, footer, cards, forms, dialogs)
- Todos los estados (hover, focus, sticky, scrolled, open, loading)
- GSAP, ScrollTrigger, Lenis, IntersectionObserver, RAF loops, scroll listeners
- Parallax, video scrub, reveal animations, comportamiento responsive
- Todos los assets visuales del source (videos, imágenes, SVGs, fuentes, texturas)

## Qué nunca se toca

- Texto de contenido visible al usuario
- Rutas href que apuntan a páginas del negocio target
- API routes, server actions, auth, middleware, database, business logic
- Configuración de entorno y deployment

## Flujo obligatorio (orden estricto, cada paso bloquea al siguiente)

### Paso 0: Abrir DUAL MCP antes de tocar cualquier archivo

Abrir DOS instancias de Chrome DevTools MCP simultáneamente:
  MCP-REF:    <reference-url>           (sitio público de referencia)
  MCP-TARGET: http://localhost:3001     (target en desarrollo)

Ambas permanecen abiertas hasta que MIGRATION_COMPLETE.md esté escrito.
El source local (localhost:3000) se usa solo para leer código, no para QA visual.

### Paso 1: Validación pre-flight source vs referencia

Para cada página del source, capturar screenshot en MCP-REF de la página equivalente.
Calcular pixel delta.

Si delta > 10% en cualquier página: STOPPER OBLIGATORIO.
  Reportar al usuario qué páginas difieren y en qué porcentaje exacto.
  No continuar hasta confirmación explícita del usuario.

Si delta <= 10% en todas: continuar al Paso 2.

### Paso 2: PAGE_MAPPING.md — BLOQUEANTE ABSOLUTO

Crear PAGE_MAPPING.md en la raíz del target ANTES de escribir ningún código.

Protocolo:
  1. Listar todas las rutas del source
  2. Listar todas las rutas del target
  3. Asignar a cada ruta del target exactamente una ruta del source

Regla: si no existe equivalente directo, usar la página source con estructura
de secciones más similar (mismo número y tipo aproximado de secciones).
Nunca dejar una ruta sin asignar. Nunca inventar diseño.

Formato:

| Target route | Source route asignada | Razón | Estado |
|---|---|---|---|
| / | / | Equivalente directo | ☐ |
| /productos | /technology | Estructura de features similar | ☐ |

Estado: ☐ → 🔧 → ✅ (solo cuando ambos MCPs verifican paridad)

GATE: cero archivos de código antes de que PAGE_MAPPING.md exista y tenga
una fila por cada ruta del target.

### Paso 3: Baseline pre-migración

```bash
npm run build 2>&1 | tee docs/pds/build-baseline.txt
echo "Exit: $?" >> docs/pds/build-baseline.txt

grep -rhoE '"[A-Za-záéíóúÁÉÍÓÚñÑ][^"]{4,}"' "$TARGET/src" | \
  sort -u > docs/pds/original-target-strings.txt
```

original-target-strings.txt es inmutable después de esta captura.

### Paso 4: ANIMATION_MANIFEST.md — BLOQUEANTE

Escanear source exhaustivamente. Una fila por cada efecto de animación encontrado.

| ☐ | ID | Archivo | Tipo | Valor exacto del source | Trigger | Comportamiento |
|---|---|---|---|---|---|---|

Tipos: CSS_KEYFRAME, CSS_TRANSITION, CSS_SCROLL_DRIVEN, CSS_WILL_CHANGE,
CSS_CLIP_PATH, GSAP_TWEEN, GSAP_TIMELINE, GSAP_SCROLLTRIGGER, GSAP_SPLITTEXT,
LENIS_INIT, LENIS_CB, INTERSECTION_OBS, RAF_LOOP, SCROLL_LISTENER,
VIDEO_SCRUB, CANVAS_SCROLL, LOTTIE, DATA_ATTR

Registrar MANIFEST_TOTAL = N.
La migración termina solo cuando grep -c "✅" ANIMATION_MANIFEST.md == N.
Cero entradas pueden omitirse o marcarse N/A.

### Paso 5: STACK_MANIFEST.md — BLOQUEANTE

Leer source/package.json. Instalar cada dependencia frontend a la versión exacta
del source. Verificar con npm ls. Mismatch = reinstalar antes de continuar.

### Paso 6: Bucle de trasplante por archivo

Para cada archivo visual, secuencia exacta:
ACCIÓN 1 — COPY:
cp source/src/components/X.tsx target/src/components/X.tsx
(copia literal, sin modificar nada)
ACCIÓN 2 — SWAP (solo texto):
Buscar y reemplazar ÚNICAMENTE:
- Strings de texto visible al usuario
- Rutas href a páginas del negocio target
- Rutas src de imágenes de contenido (no decorativas)
PROHIBIDO en SWAP:
- Modificar cualquier clase Tailwind
- Modificar cualquier valor CSS
- Modificar cualquier config GSAP/ScrollTrigger/Lenis
- Modificar cualquier threshold de IntersectionObserver
- Modificar cualquier duration, easing o delay
- Refactorizar estructura JSX aunque parezca equivalente
ACCIÓN 3 — BUILD:
npm run build
Si falla: corregir solo el error de build, no reescribir el componente.
Tres fallos consecutivos en el mismo archivo: STOP + reporte al usuario.
ACCIÓN 4 — VERIFICACIÓN DUAL MCP:
En MCP-REF: navegar a la sección de referencia.
En MCP-TARGET: navegar a la misma sección en target.
Capturar screenshots simultáneamente.
Calcular pixel delta.
Si delta > 1.5%: identificar elemento específico que difiere.
Corregir solo ese elemento. Repetir desde ACCIÓN 2.
Si delta <= 1.5%: continuar.
ACCIÓN 5 — LOG:
Marcar ✅ en PAGE_MAPPING.md con timestamp.
Añadir fila a docs/pds/modified-files.md.

### Paso 7: Orden de trasplante (estricto)

1. globals.css + CSS tokens
2. tailwind.config
3. Archivos de fuentes → target/public/fonts/
4. Inicialización Lenis + GSAP (layout o _app)
5. Navbar → verificación MCP-REF vs MCP-TARGET antes de continuar
6. Footer → verificación MCP-REF vs MCP-TARGET antes de continuar
7. Cada página en el orden de PAGE_MAPPING.md (home primero)
8. Componentes compartidos restantes

Después de pasos 1-4 (globals): verificación TIER 1 completa antes de tocar componentes.
Después de cada componente: verificación TIER 2.

### Paso 8: Purga de residuos legacy

```bash
# CSS custom properties del target que sobreviven
comm -23 \
  <(grep -rhoE '\-\-[a-zA-Z][a-zA-Z0-9-]*' docs/pds/target-fingerprint.txt | sort -u) \
  <(grep -rhoE '\-\-[a-zA-Z][a-zA-Z0-9-]*' "$SOURCE/src" | sort -u) \
  > /tmp/legacy_vars.txt
while read v; do
  grep -qr "$v" "$TARGET/src" && echo "LEGACY RESIDUE: $v"
done < /tmp/legacy_vars.txt

# Colores hex del target que sobreviven
comm -23 \
  <(grep -rhoE '#[0-9a-fA-F]{3,8}\b' docs/pds/target-fingerprint.txt | \
    tr '[:upper:]' '[:lower:]' | sort -u) \
  <(grep -rhoE '#[0-9a-fA-F]{3,8}\b' "$SOURCE/src" | \
    tr '[:upper:]' '[:lower:]' | sort -u) \
  > /tmp/legacy_colors.txt
while read c; do
  grep -qri "$c" "$TARGET/src" && echo "LEGACY COLOR: $c"
done < /tmp/legacy_colors.txt

# Cualquier output = BLOCKING FAILURE
```

### Paso 9: File coverage audit

```bash
find "$SOURCE/src" -type f ! -path "*/.next/*" | sort > /tmp/src_files.txt
find "$TARGET/src" -type f ! -path "*/.next/*" | sort > /tmp/tgt_files.txt
comm -23 /tmp/src_files.txt /tmp/tgt_files.txt
# Cualquier archivo VISUAL en "source only" = BLOCKING FAILURE

grep -rhoE '#[0-9a-fA-F]{3,8}\b' "$SOURCE/src" | sort -u | while read c; do
  grep -qri "$c" "$TARGET/src" || echo "MISSING COLOR: $c"
done

grep -rhoE '\-\-[a-zA-Z][a-zA-Z0-9-]*' "$SOURCE/src" | sort -u | while read v; do
  grep -qr "$v" "$TARGET/src" || echo "MISSING VAR: $v"
done
```

### Paso 10: ASSETS REEMPLAZO IA

Generar docs/pds/assets-reemplazo-ia.md con encabezado exacto: # ASSETS REEMPLAZO IA

Para cada asset visual copiado del source (hero video, fondos de sección, SVGs,
texturas, Lottie, fuentes), incluir:
  - Ruta absoluta en source
  - Ruta de destino en target
  - Rol visual en la página
  - Adaptación para Granja Mari Pepa (distribuidora HORECA, Murcia, España)
  - Prompt de generación con: sujeto, contexto, iluminación, cámara, paleta de
    color, atmósfera, movimiento (si video), duración, aspect ratio, exclusiones
  - Herramienta: Kling (video), Flux (imagen), Runway (motion)

## Protocolo dual MCP de verificación

### Scripts de verificación

Scroll crawler (inyectar en MCP-REF Y MCP-TARGET por separado):

```javascript
(async function audit() {
  const maxY = document.body.scrollHeight - window.innerHeight;
  const snaps = [];
  for (let i = 0; i <= 20; i++) {
    window.scrollTo({ top: maxY * i / 20, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 700));
    // Screenshot via MCP aquí — nombre: <ref|target>_<page>_<viewport>_<pct>pct.png
    snaps.push({
      pct: i * 5,
      computed: ['nav','video','.hero','section'].reduce((a,s) => {
        const el = document.querySelector(s);
        if (!el) return a;
        const cs = getComputedStyle(el);
        a[s] = { opacity: cs.opacity, transform: cs.transform,
                  clipPath: cs.clipPath, visibility: cs.visibility };
        return a;
      }, {})
    });
  }
  return snaps;
})();
```

Auto-scroll para grabación de video (inyectar en ambos MCPs, grabar pantalla):

```javascript
(function rec() {
  const total = document.body.scrollHeight - window.innerHeight;
  const dur = 10000, t0 = performance.now();
  const f = t => {
    const p = Math.min((t-t0)/dur, 1), e = p<.5?2*p*p:-1+(4-2*p)*p;
    window.scrollTo(0, total*e); if(p<1) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
})();
```

GSAP runtime dump (en consola de ambos MCPs):

```javascript
ScrollTrigger.getAll().forEach(st => console.log({
  trigger: st.trigger?.className || st.trigger?.tagName,
  start: st.start, end: st.end,
  scrub: st.vars?.scrub, pin: st.vars?.pin
}));
```

### TIER 1 — Verificación completa de página

Ejecutar en: después de globals, en cada gate de fase, en auditoría final.
  - 21 posiciones de scroll (0% a 100% de 5 en 5) × 4 viewports (390, 768, 1024, 1440)
  - Grabación de video completo en los 4 viewports
  - Computed style extraction en todos los elementos animados
  - GSAP runtime dump comparado source vs target

### TIER 2 — Regresión por componente

Ejecutar después de cada componente individual:
  - 5 posiciones (0%, 25%, 50%, 75%, 100%) a 1440px
  - Computed style del componente recién modificado
  - GSAP dump solo para animaciones de ese componente
  - Build pass

Ambos tiers usan los mismos umbrales de paridad.

### Umbrales de paridad visual (no negociables)

| Métrica | Umbral |
|---|---|
| Pixel delta por screenshot | <= 1.5% |
| Transform matrix element | ±1 unit |
| opacity | ±0.02 |
| Valores px | ±1px |
| Timing (duration/delay) | ±16ms |
| video.currentTime | ±0.1s |
| ScrollTrigger scrub | coincidencia exacta |
| Lenis easing output | ±0.005 en t=0.25/0.5/0.75 |
| IntersectionObserver threshold array | coincidencia exacta |

## Reglas de build

BUILD-1: Después de cada archivo creado o modificado → build inmediato
BUILD-2: Build fallido = corregir ese archivo ANTES de tocar cualquier otro
BUILD-3: Tres fallos consecutivos en el mismo archivo = STOP + reporte al usuario
BUILD-4: Cero imports de chunks (.next/server/, dist/server/, ./161.js, hashes)
BUILD-5: BUILD PASS = exit 0, cero errores TypeScript, cero warnings nuevos

## Condiciones de parada inmediata

- Pixel delta > 10% en validación source vs referencia pre-flight
- PAGE_MAPPING.md no existe cuando se intenta escribir código
- Build fallido sin resolver antes del siguiente archivo
- Import no resuelve a src/ o node_modules/
- String de texto del source encontrado en target después del SWAP
- Evidencia MCP ausente para componente marcado ✅

## Entregables requeridos en el target

Antes de escribir componentes:
  PAGE_MAPPING.md              ← PRIMERO, bloqueante
  ANIMATION_MANIFEST.md        ← bloqueante
  STACK_MANIFEST.md            ← bloqueante
  docs/pds/build-baseline.txt
  docs/pds/original-target-strings.txt
  docs/pds/target-fingerprint.txt

Durante la migración (actualizar continuamente):
  docs/pds/modified-files.md
  docs/pds/qa-evidence/        ← screenshots, JSONs, videos

Al final:
  docs/pds/assets-reemplazo-ia.md
  MIGRATION_COMPLETE.md        ← solo cuando todo está ✅

## Criterios de completitud

Completo SOLO cuando todo es verdad simultáneamente:
  - PAGE_MAPPING.md: todas las filas ✅
  - ANIMATION_MANIFEST.md: grep -c "✅" == MANIFEST_TOTAL
  - Pixel delta <= 1.5% en todos los pares de screenshots de todas las páginas
  - Build: exit 0, cero errores, cero warnings nuevos
  - Cero residuos visuales legacy en target
  - Texto original del target 100% preservado
  - ASSETS REEMPLAZO IA completo

No existe éxito parcial. O todo pasa o el estado es FAIL.

## Lo que nunca ocurre

- Abrir solo un MCP cuando se necesitan dos
- Escribir código antes de que PAGE_MAPPING.md exista
- Reescribir un componente en lugar de copiarlo
- Modificar cualquier valor visual durante el swap de texto
- Declarar verificado sin screenshots de ambos MCPs
- Continuar si pre-flight delta > 10%
- Marcar ✅ sin evidencia física en docs/pds/qa-evidence/

## Formato de output por componente
COMPONENTE: [nombre]
BUILD: [PASS|FAIL] — [error si aplica]
DELTA MCP-REF vs MCP-TARGET: [X.X%] — [PASS|FAIL]
TEXTO PRESERVADO: [PASS|FAIL]
ANIMACIONES: [N de M del manifest]
EVIDENCIA: [rutas de screenshots y JSONs]
ESTADO: [✅ VERIFIED | ❌ FAILING]

## Notas de mantenimiento

Fuente de verdad: .claude/skills/port-design-system-from-local-clone/SKILL.md

Archivos generados (ejecutar node scripts/sync-skills.mjs para regenerar):
  .codex/skills/port-design-system-from-local-clone/SKILL.md
  .github/skills/port-design-system-from-local-clone/SKILL.md
  .cursor/commands/port-design-system-from-local-clone.md
  .windsurf/workflows/port-design-system-from-local-clone.md
  .gemini/commands/port-design-system-from-local-clone.toml
  .opencode/commands/port-design-system-from-local-clone.md
  .augment/commands/port-design-system-from-local-clone.md
  .continue/commands/port-design-system-from-local-clone.md
  .amazonq/cli-agents/port-design-system-from-local-clone.json

Después de editar AGENTS.md: bash scripts/sync-agent-rules.sh
Después de editar SKILL.md:  node scripts/sync-skills.mjs

@docs/research/INSPECTION_GUIDE.md
