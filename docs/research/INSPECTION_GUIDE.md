# Inspection Guide v3.1

## Setup inicial

MCP-REF:    <source-url>           (fuente visual absoluta)
MCP-TARGET: http://localhost:3001  (target en desarrollo)
Ambas abiertas hasta MIGRATION_COMPLETE.md.

## Scripts de extraccion (ejecutar en MCP-REF por pagina)

IMPORTANTE: Ejecutar preExpandContent() ANTES de cualquier script de extraccion.

17 scripts definidos en SKILL.md:
1. extractFullDesignSystem() → design-tokens.json
2. fetchCrossOriginCSS() → cross-origin-css.json
3. extractShadowStyles() → shadow-styles.json
4. extractAnimationSystem() → animations.json
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
