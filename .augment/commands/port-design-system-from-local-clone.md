---
description: "Literal visual transplant of a Next.js source clone into a target repo. DESIGN 100% from source (copied verbatim). TEXT 100% from target (all user strings preserved). Dual Chrome DevTools MCP (reference-url + target dev server) open from first command to last. Third arg is public reference URL for pre-flight source validation. PAGE_MAPPING.md required before any code. Every visual file is COPIED then text-swapped, never rewritten. Build after every file. Complete when pixel delta <= 1.5% at all scroll positions."
argument-hint: "--url "<source-url>" "<target-path>" | "<source-path>" "<target-path>" "<reference-url>""
---
<!-- AUTO-GENERATED from .claude/skills/port-design-system-from-local-clone/SKILL.md - do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# /port-design-system-from-local-clone

## Regla absoluta

El source es la unica fuente de verdad visual.
El target debe convertirse visualmente en una copia exacta del source.
Lo unico que se conserva del target es el texto visible al usuario.

## Modos de invocacion

La skill acepta DOS formas:

FORMA A (source local repo):

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<reference-url>"
```

FORMA B (source URL publica):

```txt
/port-design-system-from-local-clone --url "<source-url>" "<target-path>"
```

En FORMA B:
- `<source-url>` es la web publica que define el diseno.
- No existe tercer parametro de referencia: `source-url` ya es la referencia.
- MCP-REF apunta a `<source-url>`.
- MCP-TARGET apunta a `http://localhost:3001` por defecto.

## Cuando usar FORMA B

Usar FORMA B cuando:
- No existe un repo source con componentes React reales.
- El clon disponible es un proxy inverso/middleware que reescribe a otra URL.
- Se quiere migrar el diseno directo desde una web publica.

## DISENO vs TEXTO - inmutable

DISENO = 100% del source/referencia. Copiado o reconstruido sin adaptacion.
TEXTO = 100% del target. Cada string visible al usuario.

Texto SI:
- Strings visibles en UI (`h1`, `p`, `span`, `button`, `label`, `alt`).
- `href` de negocio del target.
- Nombres del negocio target.

Texto NO:
- Clases CSS/Tailwind.
- Valores de animacion.
- Estructura JSX/HTML.
- Config GSAP/ScrollTrigger/Lenis.
- Atributos de animacion (`data-*`).
- Assets decorativos visuales.

## Flujo FORMA A (source repo local)

### Paso 0: Dual MCP (bloqueante)
- MCP-REF: `<reference-url>`
- MCP-TARGET: `http://localhost:3001`

Ambas instancias permanecen abiertas toda la migracion.

### Paso 1: Pre-flight source vs referencia
Validar cada ruta source contra la referencia publica.

Regla de video antes de pixel delta:

```javascript
const hasFullscreenVideo = (() => {
  const v = document.querySelector('video');
  if (!v) return false;
  return v.offsetWidth >= window.innerWidth * 0.8;
})();
```

- Si `hasFullscreenVideo === true`: usar computed style comparison en 0%, no pixel delta en hero.
- Pixel delta solo desde 25% en adelante.
- Umbral pre-flight: `<= 10%` (metodologia corregida).

### Paso 2: PAGE_MAPPING.md (bloqueante)
Crear antes de cualquier codigo.

### Paso 3: Baseline
```bash
npm run build 2>&1 | tee docs/pds/build-baseline.txt
grep -rhoE '"[A-Za-záéíóúÁÉÍÓÚñÑ][^"]{4,}"' "$TARGET/src" | \
  sort -u > docs/pds/original-target-strings.txt
```

### Paso 4: ANIMATION_MANIFEST.md (bloqueante)
Una fila por efecto de animacion detectado.

### Paso 5: STACK_MANIFEST.md (bloqueante)
Instalar dependencias frontend del source con version exacta.

### Paso 6: Bucle de trasplante
COPY -> SWAP (solo texto) -> BUILD -> VERIFY dual MCP -> LOG.

### Paso 7: Orden de trasplante
1. globals/tokens
2. tailwind config
3. fonts
4. init Lenis+GSAP
5. navbar
6. footer
7. paginas (segun PAGE_MAPPING, home primero)
8. compartidos

### Paso 8: Purga legacy
Validar que no sobrevivan vars/colores legacy del target.

### Paso 9: File coverage audit
Sin archivos visuales faltantes ni tokens faltantes.

### Paso 10: ASSETS REEMPLAZO IA
`docs/pds/assets-reemplazo-ia.md` obligatorio.

## Flujo FORMA B (source URL publica)

### Paso 0: Dual MCP
- MCP-REF: `<source-url>` (fuente visual absoluta)
- MCP-TARGET: `http://localhost:3001`

### Paso 1: Extraccion de design system via MCP-REF
No hay source repo que leer. Todo se extrae desde `<source-url>` via MCP.

Ejecutar en MCP-REF para cada pagina:

EXTRACCION DE TOKENS:

```javascript
(function extractDesignTokens() {
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  
  // CSS custom properties
  const vars = {};
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText === ':root' || rule.selectorText === 'html') {
          const text = rule.cssText;
          const matches = text.matchAll(/--([^:]+):\s*([^;]+)/g);
          for (const m of matches) vars[`--${m[1].trim()}`] = m[2].trim();
        }
      }
    } catch(e) {}
  }
  
  // Computed typography
  const typography = {};
  ['h1','h2','h3','h4','p','nav a','button'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    const s = getComputedStyle(el);
    typography[sel] = {
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      color: s.color,
      textTransform: s.textTransform
    };
  });
  
  // Color palette desde elementos
  const colors = new Set();
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(s.backgroundColor);
    if (s.color) colors.add(s.color);
  });
  
  return { vars, typography, colors: [...colors].slice(0, 50) };
})();
```

EXTRACCION DE ANIMACIONES GSAP:

```javascript
(function extractAnimations() {
  const result = {
    lenis: null,
    scrollTriggers: [],
    gsapTweens: [],
    observers: []
  };
  
  // Lenis
  if (window.__lenis || window.lenis) {
    const l = window.__lenis || window.lenis;
    result.lenis = {
      duration: l.options?.duration,
      easing: l.options?.easing?.toString(),
      smoothTouch: l.options?.smoothTouch,
      orientation: l.options?.orientation
    };
  }
  
  // ScrollTrigger
  if (window.ScrollTrigger) {
    result.scrollTriggers = ScrollTrigger.getAll().map(st => ({
      trigger: st.trigger?.className || st.trigger?.tagName,
      start: st.start,
      end: st.end,
      scrub: st.vars?.scrub,
      pin: st.vars?.pin,
      animation: st.animation?._targets?.[0]?.className
    }));
  }
  
  // IntersectionObserver (no hay API publica - detectar por clase)
  document.querySelectorAll('[class*="reveal"],[class*="fade"],[class*="animate"]').forEach(el => {
    result.observers.push({
      element: el.className,
      visible: el.getBoundingClientRect().top < window.innerHeight
    });
  });
  
  return result;
})();
```

EXTRACCION DE ESTRUCTURA DOM por seccion:

```javascript
(function extractStructure() {
  const sections = [];
  const sectionEls = document.querySelectorAll(
    'section, [class*="section"], [class*="hero"], [class*="feature"], main > div'
  );
  sectionEls.forEach((el, i) => {
    const cs = getComputedStyle(el);
    sections.push({
      index: i,
      tag: el.tagName,
      classes: el.className,
      height: el.offsetHeight,
      background: cs.background,
      backgroundColor: cs.backgroundColor,
      position: cs.position,
      display: cs.display,
      hasVideo: !!el.querySelector('video'),
      hasCanvas: !!el.querySelector('canvas'),
      childCount: el.children.length,
      textContent: el.textContent?.trim().slice(0, 100)
    });
  });
  return sections;
})();
```

Guardar outputs en:
- `docs/pds/source-design-tokens.json`
- `docs/pds/source-animations.json`
- `docs/pds/source-structure.json`

### Paso 2: PAGE_MAPPING.md (bloqueante)
Mapear cada ruta target a la pagina equivalente de `<source-url>`.

### Paso 3: ANIMATION_MANIFEST.md (bloqueante)
Poblar desde `source-animations.json`.

### Paso 4: Reconstruccion por secciones (reemplaza COPY-THEN-SWAP)
En FORMA B no hay archivos que copiar.

Por cada seccion de `<source-url>`:
- INSPECT: inspeccionar en MCP-REF y extraer estilos/estructura.
- BUILD: crear componente React en target replicando estructura, CSS y animaciones.
- SWAP: reemplazar texto de referencia con texto target.
- BUILD: `npm run build`.
- VERIFY: dual MCP (`delta <= 1.5%` sin video, computed style match con video).

## Protocolo de captura corregido (aplica en FORMA A y FORMA B)

Deteccion de video antes de pixel delta:

```javascript
const hasFullscreenVideo = (() => {
  const v = document.querySelector('video');
  if (!v) return false;
  return v.offsetWidth >= window.innerWidth * 0.8;
})();
```

Si `hasFullscreenVideo === true`:
- usar computed style comparison en 0%.
- no usar pixel delta para hero.
- usar pixel delta desde 25% en adelante.

Protocolo de espera antes de captura:

```javascript
await new Promise(r => setTimeout(r, 2500));
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.loading = 'eager';
  if (img.dataset.src) img.src = img.dataset.src;
});
await new Promise(r => requestAnimationFrame(() => setTimeout(r, 500)));
```

Posiciones de captura obligatorias: `0%`, `25%`, `50%`, `75%`, `100%`.
Nunca comparar solo en `0%`.

Computed style comparison protocol:

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

Criterio:
- PASS: `fontFamily` igual, `fontSize` +-2px, `color` igual, `backgroundColor` igual, `borderRadius` +-2px, `fontWeight` igual, `letterSpacing` +-0.5px.
- FAIL: diferencia no justificada en `fontFamily`, `color` o `backgroundColor`.

## QA final con contenido diferente (aplica A y B)

No comparar texto de contenido.
Comparar diseno: layout, color, tipografia, animaciones, spacing.

Para paginas/secciones sin equivalente directo en referencia, pasar QA si:
- `fontFamily` identico al sistema de referencia.
- color tokens identicos (background/text/accent).
- spacing/padding dentro de +-4px de la seccion mas similar.
- mismo sistema de animacion (GSAP/Lenis en rango equivalente).
- layout responsive equivalente en breakpoints clave.

## Build rules

BUILD-1: archivo modificado -> build inmediato.
BUILD-2: build fallido -> resolver antes de tocar otro archivo.
BUILD-3: 3 fallos consecutivos en mismo archivo -> STOP + reporte.
BUILD-4: cero imports de chunks/hashes/.next/server.
BUILD-5: PASS = exit 0, sin errores TS, sin warnings nuevos.

## Stop conditions

- Pre-flight delta > 10% bajo metodologia corregida.
- PAGE_MAPPING.md inexistente cuando se intenta codigo.
- Build fallido sin resolver antes del siguiente archivo.
- Import fuera de `src/` o `node_modules/`.
- Texto source sobreviviente en target despues de SWAP.
- Evidencia MCP ausente para cualquier item marcado como verificado.
- En FORMA B: MCP-REF no puede cargar `<source-url>` -> STOP + reportar.
- En FORMA B: `source-design-tokens.json` vacio -> STOP + re-extraer.
- En FORMA B: `ScrollTrigger.getAll()` vacio y la web claramente tiene scroll animations -> re-extraer tras scroll manual.

## Entregables

Antes de componentes:
- `PAGE_MAPPING.md`
- `ANIMATION_MANIFEST.md`
- `STACK_MANIFEST.md` (FORMA A) o manifiesto equivalente de stack reconstruido (FORMA B)
- `docs/pds/build-baseline.txt`
- `docs/pds/original-target-strings.txt`

Adicional obligatorio en FORMA B:
- `docs/pds/source-design-tokens.json`
- `docs/pds/source-animations.json`
- `docs/pds/source-structure.json`

Durante migracion:
- `docs/pds/modified-files.md`
- `docs/pds/qa-evidence/`

Final:
- `docs/pds/assets-reemplazo-ia.md`
- `MIGRATION_COMPLETE.md`

## Criterios de completitud

Completo solo si simultaneamente:
- PAGE_MAPPING: todo verificado.
- ANIMATION_MANIFEST: cobertura total.
- Delta <= 1.5% donde aplica pixel delta.
- Computed style pass donde aplica modo video.
- Build final PASS.
- Cero residuos visuales legacy.
- Texto target preservado.
- Assets IA documentados.

## Prompt de ejecucion (modo URL)

Para migracion directa desde web publica:

```txt
/port-design-system-from-local-clone --url "https://jobyaviation.com" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa\frontend"
```
