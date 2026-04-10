<!-- AUTO-GENERATED from AGENTS.md - do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

---
description: Project conventions for Port Design System From Local Clone
alwaysApply: true
---
# Port Design System From Local Clone

## Regla absoluta

El source es la unica fuente de verdad visual.
El target debe convertirse visualmente en una copia exacta del source.
Lo unico que se conserva del target es el texto visible al usuario.

## Modos de invocación

FORMA A — source es un repo local con componentes React reales:
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<reference-url>"

FORMA B — source es una URL pública (no existe repo con componentes propios):
/port-design-system-from-local-clone --url "<source-url>" "<target-path>"

Usar FORMA B cuando:
- El repo "source" es un proxy inverso (middleware que reescribe a otra URL)
- No existen componentes React propios en el source repo
- Se quiere replicar el diseño directamente desde una web pública

En FORMA B: MCP-REF apunta a <source-url>. No hay pre-flight source vs
referencia porque source-url ya ES la referencia.

## DISEÑO vs TEXTO — inmutable

DISEÑO = 100% del source/referencia. Sin adaptar. Sin reescribir.
TEXTO  = 100% del target. Cada string visible. Cero texto source sobrevive.

Texto SÍ: strings visibles en UI, hrefs del negocio target, nombres del negocio.
Texto NO: clases CSS, valores de animación, estructura JSX, configs GSAP/Lenis,
          atributos data-*, assets decorativos.

Cuando target tiene páginas sin equivalente en source:
  - Usar diseño de la página source estructuralmente más similar
  - Preservar todo el texto del target
  - Nunca inventar diseño nuevo

## Flujo FORMA B (para el caso jobyaviation → granja_mari_pepa)

### Paso 0: Dual MCP — primera acción, nunca cerrar hasta terminar
MCP-REF:    <source-url>           (jobyaviation.com — fuente visual absoluta)
MCP-TARGET: http://localhost:3001  (granja_mari_pepa en desarrollo)

### Paso 1: Extracción completa desde MCP-REF

No existe source repo que leer. Todo se extrae de <source-url> via MCP.
Ejecutar estos scripts en MCP-REF para cada página:

TOKENS CSS:
```javascript
(function extractDesignTokens() {
  const vars = {};
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        const text = rule.cssText || '';
        if (rule.selectorText === ':root' || rule.selectorText === 'html') {
          const matches = text.matchAll(/--([^:]+):\s*([^;]+)/g);
          for (const m of matches) vars[`--${m[1].trim()}`] = m[2].trim();
        }
      }
    } catch(e) {}
  }
  const typography = {};
  ['h1','h2','h3','p','nav a','button','a'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    const s = getComputedStyle(el);
    typography[sel] = {
      fontFamily: s.fontFamily, fontSize: s.fontSize,
      fontWeight: s.fontWeight, lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing, color: s.color,
      textTransform: s.textTransform
    };
  });
  const colors = new Set();
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(s.backgroundColor);
    colors.add(s.color);
  });
  return { vars, typography, colors: [...colors].slice(0, 60) };
})();
```

ANIMACIONES GSAP Y LENIS:
```javascript
(function extractAnimations() {
  const result = { lenis: null, scrollTriggers: [], observers: [] };
  if (window.__lenis || window.lenis) {
    const l = window.__lenis || window.lenis;
    result.lenis = {
      duration: l.options?.duration,
      easing: l.options?.easing?.toString(),
      smoothTouch: l.options?.smoothTouch,
      orientation: l.options?.orientation,
      lerp: l.options?.lerp
    };
  }
  if (window.ScrollTrigger) {
    result.scrollTriggers = ScrollTrigger.getAll().map(st => ({
      id: st.vars?.id,
      trigger: st.trigger?.className || st.trigger?.id || st.trigger?.tagName,
      start: st.start, end: st.end,
      scrub: st.vars?.scrub, pin: st.vars?.pin,
      markers: st.vars?.markers,
      animation: st.animation?._targets?.[0]?.className
    }));
  }
  document.querySelectorAll('[class*="reveal"],[class*="fade"],[class*="animate"],[data-scroll]').forEach(el => {
    result.observers.push({ element: el.className.slice(0,80), tag: el.tagName });
  });
  const videoScrub = document.querySelector('video');
  if (videoScrub) {
    result.videoScrub = {
      src: videoScrub.src || videoScrub.currentSrc,
      width: videoScrub.offsetWidth,
      height: videoScrub.offsetHeight,
      coversViewport: videoScrub.offsetWidth >= window.innerWidth * 0.8
    };
  }
  return result;
})();
```

ESTRUCTURA DOM:
```javascript
(function extractStructure() {
  const sections = [];
  document.querySelectorAll(
    'section, [class*="section"], [class*="hero"], [class*="feature"], main > div, [class*="block"]'
  ).forEach((el, i) => {
    const cs = getComputedStyle(el);
    sections.push({
      index: i, tag: el.tagName,
      classes: el.className.slice(0, 120),
      height: el.offsetHeight,
      background: cs.background.slice(0,80),
      backgroundColor: cs.backgroundColor,
      position: cs.position,
      hasVideo: !!el.querySelector('video'),
      hasCanvas: !!el.querySelector('canvas'),
      childTags: [...el.children].map(c => c.tagName).join(','),
      textSnippet: el.textContent?.trim().slice(0, 80)
    });
  });
  return sections;
})();
```

Guardar en:
  docs/pds/source-design-tokens.json
  docs/pds/source-animations.json
  docs/pds/source-structure.json

Si ScrollTrigger.getAll() devuelve array vacío pero la web tiene animaciones
visibles al hacer scroll: hacer scroll manual a 50% y re-ejecutar el script.

### Paso 2: PAGE_MAPPING.md — BLOQUEANTE

Crear en raíz del target ANTES de cualquier componente.
Mapear cada ruta del target a la página de <source-url> más similar.

| Target route | Source route | Razón | Estado |
|---|---|---|---|
| / | / | Home equivalente | ☐ |
| /es/productos | /technology | Estructura de features similar | ☐ |

Sin PAGE_MAPPING.md completo: migración bloqueada.

### Paso 3: ANIMATION_MANIFEST.md — BLOQUEANTE

Poblar desde source-animations.json + inspección adicional vía MCP-REF.
Una fila por efecto detectado. MANIFEST_TOTAL = N.

| ☐ | ID | Página | Tipo | Valor exacto extraído | Trigger | Comportamiento |
|---|---|---|---|---|---|---|

Tipos: CSS_KEYFRAME CSS_TRANSITION GSAP_TWEEN GSAP_SCROLLTRIGGER
GSAP_TIMELINE GSAP_SPLITTEXT LENIS_INIT LENIS_CB INTERSECTION_OBS
RAF_LOOP SCROLL_LISTENER VIDEO_SCRUB CANVAS_SCROLL LOTTIE DATA_ATTR

Completitud: grep -c "✅" ANIMATION_MANIFEST.md debe igualar MANIFEST_TOTAL.

### Paso 4: Baseline del target

```bash
npm run build 2>&1 | tee docs/pds/build-baseline.txt
grep -rhoE '"[A-Za-záéíóúÁÉÍÓÚñÑ][^"]{4,}"' "$TARGET/src" | \
  sort -u > docs/pds/original-target-strings.txt
```

### Paso 5: Reconstrucción por secciones (protocolo específico FORMA B)

En FORMA B no hay archivos que copiar. Para cada sección de <source-url>:

INSPECT en MCP-REF:
  - Ejecutar extractStyles() en la sección
  - Capturar className exacto de cada elemento clave
  - Extraer valores GSAP del source-animations.json para esa sección
  - Screenshot en 0%, 50%, 100% de scroll de esa sección

BUILD en target:
  - Crear componente React .tsx con estructura que reproduce lo inspeccionado
  - Aplicar Tailwind classes equivalentes a los computed styles extraídos
  - Implementar GSAP/Lenis con los valores exactos del source-animations.json
  - Para VIDEO_SCRUB: implementar con este patrón base (ajustar a valores reales):
```javascript
    useEffect(() => {
      const video = videoRef.current;
      const onScroll = () => {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1,
          -rect.top / (rect.height - window.innerHeight)
        ));
        if (video.duration) video.currentTime = progress * video.duration;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
```
  - Para LENIS: instanciar con valores exactos de source-animations.json
  - Para GSAP ScrollTrigger: usar trigger/start/end/scrub del manifest

SWAP solo texto:
  - Reemplazar texto visible de jobyaviation con texto del target
  - No tocar ninguna clase, valor CSS, o config de animación

BUILD: npm run build → fix si falla → no avanzar hasta PASS

### Paso 6: Verificación dual MCP por sección

PROTOCOLO DE ESPERA antes de cada captura:
```javascript
await new Promise(r => setTimeout(r, 2500));
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.loading = 'eager';
  if (img.dataset.src) img.src = img.dataset.src;
});
await new Promise(r => requestAnimationFrame(() => setTimeout(r, 500)));
```

DETECCIÓN DE VÍDEO antes de pixel delta:
```javascript
const hasFullscreenVideo = (() => {
  const v = document.querySelector('video');
  return v ? v.offsetWidth >= window.innerWidth * 0.8 : false;
})();
```

Si hasFullscreenVideo === true:
  → Usar computed style comparison para esa sección (no pixel delta)
  → Pixel delta solo desde scroll 25% en adelante

Posiciones de captura: 0%, 25%, 50%, 75%, 100% (nunca solo 0%).
Delta threshold: <= 1.5% donde aplica pixel delta.

COMPUTED STYLE COMPARISON para secciones con vídeo:
```javascript
(function extractStyles() {
  const selectors = [
    'nav','header','footer','h1','h2','h3',
    '[class*="hero"]','[class*="section"]',
    'button','a[class]','[class*="card"]'
  ];
  const result = {};
  selectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    const cs = getComputedStyle(el);
    result[sel] = {
      fontFamily: cs.fontFamily, fontSize: cs.fontSize,
      fontWeight: cs.fontWeight, letterSpacing: cs.letterSpacing,
      color: cs.color, backgroundColor: cs.backgroundColor,
      padding: cs.padding, borderRadius: cs.borderRadius
    };
  });
  return JSON.stringify(result, null, 2);
})();
```

PASS computed style: fontFamily igual, fontSize ±2px, color igual,
backgroundColor igual, borderRadius ±2px, fontWeight igual.

### Paso 7: QA final — criterios con contenido diferente

Target tiene páginas sin equivalente en <source-url>
(área de cliente, productos HORECA, etc.).
Para esas páginas, pasar QA si:
  ✅ fontFamily idéntico al sistema de referencia
  ✅ Color tokens idénticos (background, text, accent)
  ✅ Mismo sistema de animación (GSAP/Lenis con valores en rango equivalente)
  ✅ Spacing dentro de ±4px de la sección más similar en referencia
NO comparar texto de contenido — será diferente y es correcto.

### Paso 8: ASSETS REEMPLAZO IA

docs/pds/assets-reemplazo-ia.md con encabezado: # ASSETS REEMPLAZO IA

Para cada asset visual usado en la reconstrucción (hero video, fondos,
SVGs, texturas, fuentes), incluir prompt de generación para Granja Mari Pepa:
  - Sujeto, contexto/setting, iluminación, cámara, paleta (#hex), atmósfera
  - Movimiento y duración (si vídeo), aspect ratio, exclusiones
  - Herramienta: Kling (vídeo cinématico), Flux (imagen), Runway (motion)

## Reglas de build

BUILD-1: archivo modificado → build inmediato
BUILD-2: build falla → corregir antes de tocar otro
BUILD-3: 3 fallos en mismo archivo → STOP + reporte
BUILD-4: cero imports de chunks/hashes/.next/server/
BUILD-5: PASS = exit 0, cero errores TS, cero warnings nuevos

## Stop conditions

- PAGE_MAPPING.md inexistente cuando se intenta código
- Build sin resolver antes del siguiente archivo
- source-design-tokens.json vacío → re-extraer
- ScrollTrigger.getAll() vacío con animaciones visibles → scroll + re-extraer
- Evidencia MCP ausente para ítem marcado ✅
- Texto de jobyaviation.com encontrado en target después de SWAP

## Entregables

Antes: PAGE_MAPPING.md · ANIMATION_MANIFEST.md ·
       docs/pds/build-baseline.txt · docs/pds/original-target-strings.txt ·
       docs/pds/source-design-tokens.json · docs/pds/source-animations.json ·
       docs/pds/source-structure.json

Durante: docs/pds/modified-files.md · docs/pds/qa-evidence/

Final: docs/pds/assets-reemplazo-ia.md · MIGRATION_COMPLETE.md

## Criterios de completitud

PAGE_MAPPING todas ✅ · ANIMATION_MANIFEST grep==TOTAL ·
delta <=1.5% donde aplica · computed style PASS donde hay vídeo ·
build exit 0 · texto target preservado · assets-ia completo

## Output por sección
SECCIÓN: [nombre]
BUILD: [PASS|FAIL]
MÉTODO QA: [pixel-delta | computed-style]
DELTA/MATCH: [X.X% | PASS/FAIL]
TEXTO PRESERVADO: [PASS|FAIL]
ANIMACIONES: [N/M manifest]
EVIDENCIA: [rutas]
ESTADO: [✅ | ❌]

## Mantenimiento

Fuente de verdad: .claude/skills/port-design-system-from-local-clone/SKILL.md
Sync: node scripts/sync-skills.mjs && bash scripts/sync-agent-rules.sh

# Inspection Guide — FORMA B (source URL pública)

## Setup inicial

MCP-REF:    <source-url>           (fuente visual absoluta)
MCP-TARGET: http://localhost:3001  (target en desarrollo)
Ambas abiertas hasta MIGRATION_COMPLETE.md.

## Protocolo de captura — siempre aplicar antes de screenshot

```javascript
// 1. Esperar carga completa
await new Promise(r => setTimeout(r, 2500));
// 2. Forzar lazy images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.loading = 'eager';
  if (img.dataset.src) img.src = img.dataset.src;
});
// 3. Estabilizar layout
await new Promise(r => requestAnimationFrame(() => setTimeout(r, 500)));
```

## Detección de vídeo antes de pixel delta

```javascript
const hasFullscreenVideo = (() => {
  const v = document.querySelector('video');
  return v ? v.offsetWidth >= window.innerWidth * 0.8 : false;
})();
// Si true: usar computed style comparison, no pixel delta en hero/0%
// Pixel delta solo desde scroll 25% en adelante
```

## Posiciones de captura obligatorias

0%, 25%, 50%, 75%, 100% — nunca solo 0%.

## Checklist de extracción por página

Design tokens (ejecutar extractDesignTokens() en MCP-REF):
  [ ] CSS custom properties en :root y html
  [ ] Sistema de color completo
  [ ] Tipografía: fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
  [ ] Spacing, radius, shadow, z-index
  [ ] Breakpoints

Animation system (ejecutar extractAnimations() en MCP-REF):
  [ ] Lenis: duration, easing, smoothTouch, orientation, lerp
  [ ] GSAP plugins registrados
  [ ] ScrollTrigger: trigger, start, end, scrub, pin por instancia
  [ ] VIDEO_SCRUB: src, fórmula progress → currentTime
  [ ] IntersectionObserver: clases que lo usan, comportamiento
  [ ] RAF loops activos

Estructura DOM (ejecutar extractStructure() en MCP-REF):
  [ ] Secciones ordenadas con index, clases, height, background
  [ ] Secciones con vídeo identificadas
  [ ] Secciones con canvas identificadas

Page mapping:
  [ ] Rutas de <source-url> listadas
  [ ] Rutas del target listadas
  [ ] PAGE_MAPPING.md creado con mapeo completo

## Verificación por sección

Después de cada reconstrucción:
  TIER 2: 5 posiciones a 1440px, MCP-TARGET vs MCP-REF
  Vídeo detectado: computed style comparison
  Sin vídeo: pixel delta <= 1.5%
  No marcar ✅ sin evidencia en ambos MCPs
