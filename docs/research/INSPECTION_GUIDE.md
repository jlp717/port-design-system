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
