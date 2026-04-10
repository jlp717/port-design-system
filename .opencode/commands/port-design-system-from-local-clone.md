---
description: "Literal visual transplant of a Next.js source clone into a target repo. DESIGN 100% from source (copied verbatim). TEXT 100% from target (all user strings preserved). Dual Chrome DevTools MCP (reference-url + target dev server) open from first command to last. Third arg is public reference URL for pre-flight source validation. PAGE_MAPPING.md required before any code. Every visual file is COPIED then text-swapped, never rewritten. Build after every file. Complete when pixel delta <= 1.5% at all scroll positions."
---
<!-- AUTO-GENERATED from .claude/skills/port-design-system-from-local-clone/SKILL.md - do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# /port-design-system-from-local-clone

## Regla absoluta

El source es la unica fuente de verdad visual.
El target debe convertirse visualmente en una copia exacta del source.
Lo unico que se conserva del target es el texto visible al usuario.

## Comando

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<reference-url>"
```

## DISENO vs TEXTO - inmutable

DISENO = 100% del source. Copiado verbatim. Cero adaptacion.
TEXTO = 100% del target. Cada string visible. Cero texto source sobrevive.

Texto = strings visibles al usuario, hrefs a paginas del negocio target.
Texto NO = clases Tailwind, valores CSS, configs GSAP/Lenis, estructura JSX.

## Paso 0: Dual MCP - primero que se hace, ultimo que se cierra

MCP-REF: <reference-url> (web publica de referencia)
MCP-TARGET: http://localhost:3001 (target en desarrollo)

Ambas instancias permanecen abiertas durante toda la migracion.

## Paso 1: Pre-flight - validar source vs referencia

REGLA: DETECCION DE VIDEO ANTES DE PIXEL DELTA
Antes de calcular pixel delta en cualquier pagina, ejecutar en el MCP:

```javascript
const hasVideo = document.querySelector('video') !== null;
const videoCoversBg = (() => {
  const v = document.querySelector('video');
  if (!v) return false;
  const cs = getComputedStyle(v.parentElement || v);
  return v.offsetWidth >= window.innerWidth * 0.8;
})();
```

Si hasVideo === true Y videoCoversBg === true:
- NO usar pixel delta para esa pagina completa ni para la seccion hero.
- En su lugar, usar COMPUTED STYLE COMPARISON (ver abajo).
- Marcar esa pagina como "video-page: usar CSS diff, no pixel diff".

Si hasVideo === false:
- Usar pixel delta normalmente (umbral <= 10% pre-flight).

PROTOCOLO DE ESPERA ANTES DE CAPTURA
Antes de capturar cualquier screenshot, inyectar en el MCP:

```javascript
await new Promise(resolve => {
  if (document.readyState === 'complete') {
    setTimeout(resolve, 2500); // esperar fuentes y lazy images
  } else {
    window.addEventListener('load', () => setTimeout(resolve, 2500));
  }
});
// Forzar carga de imagenes lazy
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.loading = 'eager';
  if (img.dataset.src) img.src = img.dataset.src;
});
// Esperar un frame mas para que el layout se estabilice
await new Promise(r => requestAnimationFrame(() => setTimeout(r, 500)));
```

PROTOCOLO DE CAPTURA CON SCROLL
Para cada pagina, capturar en estas 5 posiciones exactas:
- 0% -> screenshot
- 25% -> screenshot
- 50% -> screenshot (posicion principal de comparacion)
- 75% -> screenshot
- 100% -> screenshot

Para cada posicion:

```javascript
window.scrollTo({ top: maxY * pct / 100, behavior: 'instant' });
await new Promise(r => setTimeout(r, 800));
// Screenshot via MCP
```

NUNCA comparar solo en scroll 0%.
El delta se calcula como el PROMEDIO de las 5 posiciones, excluyendo regiones donde hay elementos `<video>` detectados.
Para paginas con video: usar computed style comparison en posicion 0% y pixel delta en posiciones 25%, 50%, 75%, 100%.

COMPUTED STYLE COMPARISON PROTOCOL (para paginas con video de fondo)
Inyectar en MCP-REF y en MCP-SOURCE por separado:

```javascript
(function extractStyles() {
  const selectors = [
    'nav', 'header', 'footer',
    'h1', 'h2', 'h3',
    '[class*="hero"]', '[class*="section"]',
    '[class*="btn"]', 'button', 'a[class]',
    '[class*="card"]', '[class*="feature"]',
    '[class*="parallax"]', '[class*="reveal"]'
  ];
  const result = {};
  selectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    const cs = getComputedStyle(el);
    result[sel] = {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing,
      lineHeight: cs.lineHeight,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      padding: cs.padding,
      margin: cs.margin,
      borderRadius: cs.borderRadius,
      transform: cs.transform,
      opacity: cs.opacity,
      display: cs.display,
      position: cs.position,
      zIndex: cs.zIndex
    };
  });
  return JSON.stringify(result, null, 2);
})();
```

Comparar los JSON resultantes entre MCP-REF y MCP-SOURCE.
CRITERIO DE PASO para computed style comparison:
- PASS: fontFamily coincide, fontSize +-2px, color coincide, backgroundColor coincide, borderRadius +-2px, fontWeight coincide, letterSpacing +-0.5px.
- FAIL: cualquier diferencia en fontFamily, color, o backgroundColor que no sea explicada por diferencia de contenido de texto.

Delta > 10% en pre-flight bajo esta metodologia: STOPPER. Reportar al usuario. No continuar sin confirmacion.
Delta <= 10%: continuar.

## Paso 2: PAGE_MAPPING.md - GATE BLOQUEANTE

Crear antes de cualquier codigo. Una fila por ruta del target.

| Target route | Source route | Razon | Estado |
|---|---|---|---|
| / | / | Equivalente directo | ☐ |

Sin PAGE_MAPPING.md completo = migracion bloqueada.

## Paso 3: Baseline

```bash
npm run build 2>&1 | tee docs/pds/build-baseline.txt
grep -rhoE '"[A-Za-záéíóúÁÉÍÓÚñÑ][^"]{4,}"' "$TARGET/src" | \
  sort -u > docs/pds/original-target-strings.txt
```

## Paso 4: ANIMATION_MANIFEST.md - BLOQUEANTE

| ☐ | ID | Archivo | Tipo | Valor exacto | Trigger | Comportamiento |

Tipos: CSS_KEYFRAME CSS_TRANSITION CSS_SCROLL_DRIVEN CSS_WILL_CHANGE
CSS_CLIP_PATH GSAP_TWEEN GSAP_TIMELINE GSAP_SCROLLTRIGGER GSAP_SPLITTEXT
LENIS_INIT LENIS_CB INTERSECTION_OBS RAF_LOOP SCROLL_LISTENER
VIDEO_SCRUB CANVAS_SCROLL LOTTIE DATA_ATTR

MANIFEST_TOTAL = N. Completo cuando grep -c "✅" == N. Cero entradas omisibles.

## Paso 5: STACK_MANIFEST.md - BLOQUEANTE

Leer source/package.json. Instalar cada dependencia frontend a version exacta.
Verificar con npm ls. Mismatch = reinstalar antes de continuar.

## Paso 6: Bucle de trasplante

COPY: cp source/src/components/X.tsx target/src/components/X.tsx
SWAP: Reemplazar SOLO strings visibles, hrefs de negocio, srcs de contenido
PROHIBIDO: clases, valores CSS, GSAP config, thresholds, estructura JSX
BUILD: npm run build -> fix solo el error -> 3 fallos = STOP
MCP QA: Delta <= 1.5% MCP-REF vs MCP-TARGET -> si no, fix del elemento especifico
LOG: ✅ en PAGE_MAPPING.md + fila en docs/pds/modified-files.md

## Paso 7: Orden de trasplante

1. globals.css + tokens
2. tailwind.config
3. Fuentes -> public/fonts/
4. Lenis + GSAP init
5. Navbar
6. Footer
7. Paginas (orden PAGE_MAPPING.md, home primero)
8. Componentes compartidos restantes

Despues de pasos 1-4: TIER 1 completo antes de componentes.
Despues de cada componente: TIER 2.

## Paso 8: Purga legacy

```bash
comm -23 \
  <(grep -rhoE '\-\-[a-zA-Z][a-zA-Z0-9-]*' docs/pds/target-fingerprint.txt | sort -u) \
  <(grep -rhoE '\-\-[a-zA-Z][a-zA-Z0-9-]*' "$SOURCE/src" | sort -u) \
  > /tmp/legacy_vars.txt
while read v; do grep -qr "$v" "$TARGET/src" && echo "LEGACY: $v"; done < /tmp/legacy_vars.txt
# Cualquier output = FAIL
```

## Paso 9: File coverage audit

```bash
find "$SOURCE/src" -type f ! -path "*/.next/*" | sort > /tmp/src.txt
find "$TARGET/src" -type f ! -path "*/.next/*" | sort > /tmp/tgt.txt
comm -23 /tmp/src.txt /tmp/tgt.txt
grep -rhoE '#[0-9a-fA-F]{3,8}\b' "$SOURCE/src" | sort -u | \
  while read c; do grep -qri "$c" "$TARGET/src" || echo "MISSING COLOR: $c"; done
grep -rhoE '\-\-[a-zA-Z][a-zA-Z0-9-]*' "$SOURCE/src" | sort -u | \
  while read v; do grep -qr "$v" "$TARGET/src" || echo "MISSING VAR: $v"; done
```

NOTA CRITICA PARA QA FINAL:
La misma logica de pre-flight aplica en la verificacion final, con una diferencia clave: en QA final, el target NO tiene el mismo texto que la referencia.
Por tanto, en QA final:
- Comparar DISENO (layout, colores, tipografia, animaciones, spacing).
- NO comparar texto de contenido visible.
- Para secciones sin equivalente en referencia: verificar sistema de diseno (fuentes, colores, spacing, componentes).
- El pixel delta en secciones con texto diferente puede ser alto y es ESPERADO.
- En esas secciones, usar computed style comparison exclusivamente.
- Una seccion del target sin equivalente en referencia pasa QA si:
  - fontFamily == referencia
  - color tokens == referencia
  - spacing/padding dentro de +-4px de la seccion mas similar en referencia
  - animaciones del mismo sistema (GSAP/Lenis) con valores similares

## Paso 10: ASSETS REEMPLAZO IA

docs/pds/assets-reemplazo-ia.md con encabezado: # ASSETS REEMPLAZO IA

Por cada asset copiado del source: ruta source, ruta target, rol visual,
adaptacion para Granja Mari Pepa (HORECA, Murcia), prompt de generacion
(sujeto, contexto, iluminacion, camara, paleta, atmosfera, movimiento,
duracion, aspect ratio, exclusiones), herramienta (Kling/Flux/Runway).

## Verificacion dual MCP

REGLA: DETECCION DE VIDEO ANTES DE PIXEL DELTA
Antes de calcular pixel delta en cualquier pagina, ejecutar en el MCP:

```javascript
const hasVideo = document.querySelector('video') !== null;
const videoCoversBg = (() => {
  const v = document.querySelector('video');
  if (!v) return false;
  const cs = getComputedStyle(v.parentElement || v);
  return v.offsetWidth >= window.innerWidth * 0.8;
})();
```

Si hasVideo === true Y videoCoversBg === true:
- NO usar pixel delta para esa pagina completa ni para la seccion hero.
- En su lugar, usar COMPUTED STYLE COMPARISON.
- Marcar esa pagina como "video-page: usar CSS diff, no pixel diff".

Si hasVideo === false:
- Usar pixel delta normalmente (umbral <= 1.5% QA final).

PROTOCOLO DE ESPERA ANTES DE CAPTURA
Antes de capturar cualquier screenshot, inyectar en el MCP:

```javascript
await new Promise(resolve => {
  if (document.readyState === 'complete') {
    setTimeout(resolve, 2500); // esperar fuentes y lazy images
  } else {
    window.addEventListener('load', () => setTimeout(resolve, 2500));
  }
});
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.loading = 'eager';
  if (img.dataset.src) img.src = img.dataset.src;
});
await new Promise(r => requestAnimationFrame(() => setTimeout(r, 500)));
```

PROTOCOLO DE CAPTURA CON SCROLL
Para cada pagina, capturar en estas 5 posiciones exactas:
- 0% -> screenshot
- 25% -> screenshot
- 50% -> screenshot
- 75% -> screenshot
- 100% -> screenshot

Para cada posicion:

```javascript
window.scrollTo({ top: maxY * pct / 100, behavior: 'instant' });
await new Promise(r => setTimeout(r, 800));
// Screenshot via MCP
```

NUNCA comparar solo en scroll 0%.
El delta se calcula como el PROMEDIO de las 5 posiciones, excluyendo regiones donde hay elementos `<video>` detectados.
Para paginas con video: usar computed style comparison en posicion 0% y pixel delta en posiciones 25%, 50%, 75%, 100%.

COMPUTED STYLE COMPARISON PROTOCOL (para paginas con video de fondo)
Inyectar en MCP-REF y en MCP-TARGET por separado:

```javascript
(function extractStyles() {
  const selectors = [
    'nav', 'header', 'footer',
    'h1', 'h2', 'h3',
    '[class*="hero"]', '[class*="section"]',
    '[class*="btn"]', 'button', 'a[class]',
    '[class*="card"]', '[class*="feature"]',
    '[class*="parallax"]', '[class*="reveal"]'
  ];
  const result = {};
  selectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    const cs = getComputedStyle(el);
    result[sel] = {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing,
      lineHeight: cs.lineHeight,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      padding: cs.padding,
      margin: cs.margin,
      borderRadius: cs.borderRadius,
      transform: cs.transform,
      opacity: cs.opacity,
      display: cs.display,
      position: cs.position,
      zIndex: cs.zIndex
    };
  });
  return JSON.stringify(result, null, 2);
})();
```

Comparar los JSON resultantes entre MCP-REF y MCP-TARGET.
CRITERIO DE PASO para computed style comparison:
- PASS: fontFamily coincide, fontSize +-2px, color coincide, backgroundColor coincide, borderRadius +-2px, fontWeight coincide, letterSpacing +-0.5px.
- FAIL: cualquier diferencia en fontFamily, color, o backgroundColor que no sea explicada por diferencia de contenido de texto.

NOTA CRITICA PARA QA FINAL:
La misma logica de pre-flight aplica en la verificacion final, con una diferencia importante: el target no tiene el mismo texto que la referencia.
Comparar DISENO (layout, colores, tipografia, animaciones, spacing), no contenido textual.
Para secciones sin equivalente en la referencia, validar sistema de diseno y animaciones, no igualdad literal de texto.
En secciones con texto diferente, usar computed style comparison exclusivamente.

Auto-scroll para grabacion (inyectar en ambos, grabar pantalla):

```javascript
(function rec(){
  const total=document.body.scrollHeight-window.innerHeight;
  const dur=10000,t0=performance.now();
  const f=t=>{const p=Math.min((t-t0)/dur,1),e=p<.5?2*p*p:-1+(4-2*p)*p;
    window.scrollTo(0,total*e);if(p<1)requestAnimationFrame(f);};
  requestAnimationFrame(f);
})();
```

GSAP dump:
`ScrollTrigger.getAll().forEach(st=>console.log({trigger:st.trigger?.className,start:st.start,end:st.end,scrub:st.vars?.scrub,pin:st.vars?.pin}))`

TIER 1 (gates de fase): 21 posiciones x 4 viewports + video + computed styles + GSAP dump
TIER 2 (por componente): 5 posiciones a 1440px + computed style + GSAP del componente

Umbrales: pixel delta <=1.5% | transform +-1 | opacity +-0.02 | px +-1 |
timing +-16ms | video.currentTime +-0.1s | scrub exacto | threshold exacto |
Lenis easing +-0.005

## Build rules

BUILD-1: archivo escrito -> build inmediato
BUILD-2: build falla -> fix ese archivo -> no tocar ningun otro
BUILD-3: 3 fallos en mismo archivo -> STOP + reporte
BUILD-4: cero imports de chunks/hashes/.next/server/
BUILD-5: PASS = exit 0, cero errores TS, cero warnings nuevos

## Stop conditions

- Pre-flight delta > 10% bajo metodologia corregida
- PAGE_MAPPING.md inexistente cuando se intenta codigo
- Build sin resolver antes del siguiente archivo
- Import no resuelve a src/ o node_modules/
- Texto source en target despues del SWAP
- ✅ sin evidencia en docs/pds/qa-evidence/

## Entregables

Antes: PAGE_MAPPING.md · ANIMATION_MANIFEST.md · STACK_MANIFEST.md ·
       docs/pds/build-baseline.txt · docs/pds/original-target-strings.txt
Durante: docs/pds/modified-files.md · docs/pds/qa-evidence/
Final: docs/pds/assets-reemplazo-ia.md · MIGRATION_COMPLETE.md

## Criterios de completitud

PAGE_MAPPING todas ✅ · ANIMATION_MANIFEST grep==TOTAL · delta<=1.5% todo ·
build exit 0 · cero residuos legacy · texto target preservado · assets-ia completo

Output por componente:
COMPONENTE: [x] | BUILD: PASS/FAIL | DELTA: X.X% PASS/FAIL |
TEXTO: PASS/FAIL | ANIMACIONES: N/M | EVIDENCIA: [rutas] | ESTADO: ✅/❌
