<!-- AUTO-GENERATED from .claude/skills/port-design-system-from-local-clone/SKILL.md - do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# /port-design-system-from-local-clone v3.0

## Invocacion

```txt
/port-design-system-from-local-clone "<target-path>" "<source-url>"
```

Ejemplo:
```txt
/port-design-system-from-local-clone "/Users/usuario/proyectos/mari-pepa" "https://jobyaviation.com"
```

- `<target-path>`: ruta local del proyecto Next.js a modificar.
- `<source-url>`: URL publica de la web cuyo diseno se clona.

## Regla absoluta

La source-url es la UNICA fuente de verdad visual.
El target debe convertirse visualmente en una copia EXACTA de la source-url.
Lo unico que se conserva del target es el texto visible al usuario y la logica de negocio.

## DISENO vs TEXTO — inmutable

DISENO (100% del source):
  CSS tokens, custom properties, tipografia, colores, espaciado, sombras,
  gradientes, border-radius, z-index, breakpoints, grid/flexbox layout,
  animaciones (GSAP, Lenis, CSS, Framer Motion, Three.js), assets
  decorativos, hover/focus/active states, dark mode tokens, @font-face,
  estructura JSX/HTML, clases CSS/Tailwind, configs de animacion,
  atributos data-*, responsive behavior.

TEXTO (100% del target):
  Strings visibles en UI (h1, p, span, button, label, alt, title, meta),
  hrefs de negocio del target, nombres del negocio, contenido CMS,
  rutas/redirects/rewrites, API routes, server actions, auth, middleware,
  analytics, integraciones, logica de negocio, handlers de formularios,
  validacion, data fetching, mutations.

## FASE 0: Setup y descubrimiento automatico

### 0.1 Dual MCP — primera accion, nunca cerrar

Abrir DOS instancias de MCP browser:
- MCP-REF: navegar a `<source-url>`
- MCP-TARGET: navegar a `http://localhost:3001` (o el puerto del dev server)

Si MCP-REF no puede cargar source-url: STOP + reportar error.
Ambas instancias permanecen abiertas hasta MIGRATION_COMPLETE.md.

### 0.2 Descubrimiento automatico de paginas

Ejecutar en MCP-REF:

```javascript
(function discoverPages() {
  const base = new URL(window.location.origin);
  const links = new Set();
  // Internal links
  document.querySelectorAll('a[href]').forEach(a => {
    try {
      const u = new URL(a.href, base);
      if (u.origin === base.origin && !u.hash && !u.href.match(/\.(pdf|zip|png|jpg|svg|mp4)$/i)) {
        links.add(u.pathname.replace(/\/$/, '') || '/');
      }
    } catch(e) {}
  });
  // Navigation links (higher priority)
  const navLinks = [];
  document.querySelectorAll('nav a[href], header a[href], [role="navigation"] a[href]').forEach(a => {
    try {
      const u = new URL(a.href, base);
      if (u.origin === base.origin) {
        navLinks.push({ path: u.pathname.replace(/\/$/, '') || '/', text: a.textContent.trim().slice(0, 60) });
      }
    } catch(e) {}
  });
  // Footer links
  const footerLinks = [];
  document.querySelectorAll('footer a[href]').forEach(a => {
    try {
      const u = new URL(a.href, base);
      if (u.origin === base.origin) {
        footerLinks.push({ path: u.pathname.replace(/\/$/, '') || '/', text: a.textContent.trim().slice(0, 60) });
      }
    } catch(e) {}
  });
  return {
    allPaths: [...links].sort(),
    navLinks,
    footerLinks,
    totalFound: links.size
  };
})();
```

Intentar tambien: `fetch('/sitemap.xml').then(r => r.text())` para extraer rutas adicionales.

Navegar a CADA subpagina descubierta y ejecutar el mismo script para encontrar enlaces profundos.

### 0.3 Analisis de rutas del target

```bash
find "$TARGET_PATH/src/app" -name "page.tsx" -o -name "page.jsx" -o -name "page.js" | \
  sed "s|$TARGET_PATH/src/app||" | sed 's|/page\.[tj]sx\?||' | sed 's|^$|/|' | sort
```

### 0.4 PAGE_MAPPING.md — BLOQUEANTE

Crear PAGE_MAPPING.md en raiz del target ANTES de cualquier componente.
Mapear automaticamente cada ruta del target a la pagina source mas similar.
Si una ruta target no tiene equivalente, asignar la pagina source estructuralmente mas parecida.

```markdown
| Target route | Source page | Razon | Estado |
|---|---|---|---|
| / | / | Home equivalente | ☐ |
| /productos | /technology | Features similar | ☐ |
| /contacto | /contact | Contacto equivalente | ☐ |
```

Sin PAGE_MAPPING.md completo: migracion BLOQUEADA.

## FASE 1: Extraccion profunda del design system

Ejecutar los siguientes scripts en MCP-REF para CADA pagina listada en PAGE_MAPPING.
Guardar resultados en `docs/pds/extraction/`.

### 1.1 extractFullDesignSystem()

```javascript
(function extractFullDesignSystem() {
  const result = { cssVars: {}, typography: {}, colors: [], spacing: [], shadows: [], gradients: [], radii: [], zIndices: [], fontFaces: [], googleFonts: [], breakpoints: [], filters: [] };

  // CSS Custom Properties
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        const text = rule.cssText || '';
        if (rule.selectorText === ':root' || rule.selectorText === 'html' || rule.selectorText === ':root, :host') {
          const matches = text.matchAll(/--([^:]+):\s*([^;]+)/g);
          for (const m of matches) result.cssVars[`--${m[1].trim()}`] = m[2].trim();
        }
        // @font-face
        if (rule instanceof CSSFontFaceRule) {
          result.fontFaces.push({
            family: rule.style.getPropertyValue('font-family').replace(/['"]/g, ''),
            src: rule.style.getPropertyValue('src').slice(0, 200),
            weight: rule.style.getPropertyValue('font-weight'),
            style: rule.style.getPropertyValue('font-style'),
            display: rule.style.getPropertyValue('font-display')
          });
        }
        // @media breakpoints
        if (rule instanceof CSSMediaRule) {
          const mq = rule.conditionText || rule.media?.mediaText;
          if (mq) {
            const bpMatch = mq.match(/(min|max)-width:\s*(\d+)/);
            if (bpMatch) result.breakpoints.push({ type: bpMatch[1], value: parseInt(bpMatch[2]), unit: 'px', query: mq });
          }
        }
      }
    } catch(e) {}
  }

  // Google Fonts from <link>
  document.querySelectorAll('link[href*="fonts.googleapis"], link[href*="fonts.gstatic"]').forEach(l => {
    result.googleFonts.push(l.href);
  });
  // Preconnect font hints
  document.querySelectorAll('link[rel="preconnect"][href*="font"], link[rel="preload"][as="font"]').forEach(l => {
    result.googleFonts.push(l.href);
  });

  // Computed typography for ALL relevant selectors
  const typoSelectors = ['h1','h2','h3','h4','h5','h6','p','span','a','button','input','textarea','select','label','nav','nav a','li','blockquote','figcaption','small','strong','em','code','pre','th','td','dt','dd','.btn','[class*="title"]','[class*="heading"]','[class*="subtitle"]','[class*="caption"]','[class*="label"]'];
  typoSelectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    const s = getComputedStyle(el);
    result.typography[sel] = {
      fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight,
      lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, color: s.color,
      textTransform: s.textTransform, textDecoration: s.textDecoration,
      fontStyle: s.fontStyle, wordSpacing: s.wordSpacing,
      fontFeatureSettings: s.fontFeatureSettings,
      fontVariationSettings: s.fontVariationSettings
    };
  });

  // Full color palette + shadows + gradients + radii + z-index + spacing + filters
  const colorSet = new Set(), shadowSet = new Set(), gradientSet = new Set();
  const radiiSet = new Set(), zSet = new Set(), spacingSet = new Set(), filterSet = new Set();
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') colorSet.add(s.backgroundColor);
    if (s.color) colorSet.add(s.color);
    if (s.borderColor && s.borderColor !== 'rgba(0, 0, 0, 0)') colorSet.add(s.borderColor);
    if (s.outlineColor && s.outlineColor !== 'rgba(0, 0, 0, 0)') colorSet.add(s.outlineColor);
    if (s.boxShadow && s.boxShadow !== 'none') shadowSet.add(s.boxShadow);
    if (s.backgroundImage && s.backgroundImage !== 'none' && s.backgroundImage.includes('gradient')) gradientSet.add(s.backgroundImage.slice(0, 200));
    if (s.borderRadius && s.borderRadius !== '0px') radiiSet.add(s.borderRadius);
    if (s.zIndex && s.zIndex !== 'auto') zSet.add(parseInt(s.zIndex));
    if (s.filter && s.filter !== 'none') filterSet.add(s.filter);
    ['padding','margin'].forEach(prop => {
      const v = s.getPropertyValue(prop);
      if (v && v !== '0px') spacingSet.add(v);
    });
  });
  result.colors = [...colorSet].slice(0, 100);
  result.shadows = [...shadowSet].slice(0, 30);
  result.gradients = [...gradientSet].slice(0, 20);
  result.radii = [...radiiSet].slice(0, 20);
  result.zIndices = [...zSet].sort((a,b) => a-b);
  result.spacing = [...spacingSet].slice(0, 40);
  result.filters = [...filterSet].slice(0, 10);

  // Unique breakpoints
  result.breakpoints = [...new Map(result.breakpoints.map(b => [b.value, b])).values()].sort((a,b) => a.value - b.value);

  return result;
})();
```

Guardar en: `docs/pds/extraction/design-tokens.json`

### 1.2 extractAnimationSystem()

```javascript
(function extractAnimationSystem() {
  const result = {
    lenis: null, gsap: { registered: [], scrollTriggers: [], tweens: [] },
    cssKeyframes: [], cssTransitions: [], framerMotion: false,
    intersectionObservers: [], rafLoops: false, videoScrub: [],
    scrollListeners: false, webAnimations: [], mutationObservers: false
  };

  // Lenis
  const lenisRef = window.__lenis || window.lenis || window.Lenis;
  if (lenisRef) {
    const l = typeof lenisRef === 'function' ? null : lenisRef;
    result.lenis = l ? {
      duration: l.options?.duration, easing: l.options?.easing?.toString(),
      smoothTouch: l.options?.smoothTouch, orientation: l.options?.orientation,
      lerp: l.options?.lerp, wheelMultiplier: l.options?.wheelMultiplier,
      touchMultiplier: l.options?.touchMultiplier
    } : { detected: true, isConstructor: typeof lenisRef === 'function' };
  }

  // GSAP
  if (window.gsap) {
    result.gsap.version = window.gsap.version;
    // Registered plugins
    ['ScrollTrigger','ScrollSmoother','SplitText','DrawSVG','MorphSVG','MotionPath','Flip','Observer'].forEach(p => {
      if (window[p]) result.gsap.registered.push(p);
    });
  }

  // ScrollTrigger instances
  if (window.ScrollTrigger) {
    result.gsap.scrollTriggers = ScrollTrigger.getAll().map(st => ({
      id: st.vars?.id, trigger: st.trigger?.className?.slice(0,80) || st.trigger?.id || st.trigger?.tagName,
      start: st.vars?.start, end: st.vars?.end,
      scrub: st.vars?.scrub, pin: st.vars?.pin,
      snap: st.vars?.snap, markers: st.vars?.markers,
      toggleActions: st.vars?.toggleActions,
      animation: st.animation ? {
        targets: st.animation._targets?.map(t => t.className?.slice(0,60) || t.tagName).slice(0,3),
        duration: st.animation._dur, ease: st.animation._ease?.toString()
      } : null
    }));
  }

  // CSS @keyframes
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSKeyframesRule) {
          const frames = [];
          for (const kf of rule.cssRules) {
            frames.push({ offset: kf.keyText, style: kf.cssText.slice(0, 200) });
          }
          result.cssKeyframes.push({ name: rule.name, frames });
        }
      }
    } catch(e) {}
  }

  // CSS transitions on interactive elements
  document.querySelectorAll('a, button, [role="button"], input, [class*="card"], [class*="btn"], nav a, [class*="link"]').forEach(el => {
    const s = getComputedStyle(el);
    if (s.transition && s.transition !== 'all 0s ease 0s' && s.transition !== 'none') {
      result.cssTransitions.push({
        selector: el.tagName + (el.className ? '.' + el.className.split(' ')[0].slice(0,40) : ''),
        transition: s.transition, transform: s.transform, willChange: s.willChange
      });
    }
  });

  // Framer Motion detection
  if (document.querySelector('[data-framer-appear-id]') || document.querySelector('[style*="--framer"]') || window.__framer_importers) {
    result.framerMotion = true;
  }

  // IntersectionObserver targets (detected by common classes)
  document.querySelectorAll('[class*="reveal"],[class*="fade"],[class*="animate"],[class*="appear"],[class*="slide"],[data-scroll],[data-aos],[data-sal],[class*="inview"],[class*="visible"]').forEach(el => {
    result.intersectionObservers.push({
      element: el.tagName + '.' + (el.className || '').split(' ').slice(0,2).join('.').slice(0,80),
      dataset: Object.keys(el.dataset).slice(0,5)
    });
  });

  // Video scrub candidates
  document.querySelectorAll('video').forEach((v, i) => {
    result.videoScrub.push({
      index: i, src: (v.src || v.currentSrc || '').slice(0, 200),
      width: v.offsetWidth, height: v.offsetHeight,
      coversViewport: v.offsetWidth >= window.innerWidth * 0.8,
      muted: v.muted, autoplay: v.autoplay, loop: v.loop,
      playsInline: v.playsInline,
      parentSection: v.closest('section')?.className?.slice(0,80) || v.parentElement?.className?.slice(0,80)
    });
  });

  // Canvas/WebGL
  document.querySelectorAll('canvas').forEach((c, i) => {
    const ctx = c.getContext('webgl2') || c.getContext('webgl') || c.getContext('2d');
    result.canvasElements = result.canvasElements || [];
    result.canvasElements.push({
      index: i, width: c.width, height: c.height,
      contextType: ctx ? (ctx instanceof WebGL2RenderingContext ? 'webgl2' : ctx instanceof WebGLRenderingContext ? 'webgl' : '2d') : 'unknown',
      coversViewport: c.offsetWidth >= window.innerWidth * 0.8
    });
  });

  return result;
})();
```

Guardar en: `docs/pds/extraction/animations.json`

IMPORTANTE: Si `scrollTriggers` array vacio pero la web tiene animaciones scroll visibles:
hacer scroll manual a 25%, 50%, 75% y re-ejecutar el script.

### 1.3 extractDOMStructure()

```javascript
(function extractDOMStructure() {
  const sections = [];
  document.querySelectorAll(
    'section, [class*="section"], [class*="hero"], [class*="feature"], [class*="block"], main > div, [class*="banner"], [class*="cta"], [class*="testimonial"], [class*="partner"], [class*="news"], [class*="footer"], header, footer, nav'
  ).forEach((el, i) => {
    const cs = getComputedStyle(el);
    const children = [...el.children].map(c => {
      const ccs = getComputedStyle(c);
      return {
        tag: c.tagName, classes: (c.className || '').slice(0,80),
        display: ccs.display, position: ccs.position,
        gridTemplate: ccs.gridTemplateColumns !== 'none' ? ccs.gridTemplateColumns : null,
        flexDirection: ccs.display.includes('flex') ? ccs.flexDirection : null
      };
    }).slice(0, 15);

    sections.push({
      index: i, tag: el.tagName, id: el.id,
      classes: (el.className || '').slice(0, 120),
      rect: { width: el.offsetWidth, height: el.offsetHeight, top: el.getBoundingClientRect().top + window.scrollY },
      styles: {
        display: cs.display, position: cs.position, overflow: cs.overflow,
        background: cs.background.slice(0,120), backgroundColor: cs.backgroundColor,
        gridTemplateColumns: cs.gridTemplateColumns !== 'none' ? cs.gridTemplateColumns : null,
        gridTemplateRows: cs.gridTemplateRows !== 'none' ? cs.gridTemplateRows : null,
        flexDirection: cs.display.includes('flex') ? cs.flexDirection : null,
        gap: cs.gap, padding: cs.padding, margin: cs.margin,
        maxWidth: cs.maxWidth, minHeight: cs.minHeight
      },
      hasVideo: !!el.querySelector('video'),
      hasCanvas: !!el.querySelector('canvas'),
      hasSVG: !!el.querySelector('svg'),
      children,
      textSnippet: el.textContent?.trim().slice(0, 100)
    });
  });

  // Nav behavior
  const nav = document.querySelector('nav') || document.querySelector('header');
  const navInfo = nav ? (() => {
    const cs = getComputedStyle(nav);
    return {
      position: cs.position, top: cs.top, zIndex: cs.zIndex,
      backgroundColor: cs.backgroundColor, backdropFilter: cs.backdropFilter,
      transition: cs.transition, height: nav.offsetHeight,
      isTransparent: cs.backgroundColor === 'rgba(0, 0, 0, 0)' || cs.backgroundColor === 'transparent',
      isFixed: cs.position === 'fixed' || cs.position === 'sticky'
    };
  })() : null;

  return { sections, navInfo, totalSections: sections.length, pageHeight: document.documentElement.scrollHeight, viewportHeight: window.innerHeight };
})();
```

Guardar en: `docs/pds/extraction/structure.json`

### 1.4 extractInteractions()

Ejecutar en MCP-REF. Este script necesita simular hover via JS:

```javascript
(function extractInteractions() {
  const result = { hoverEffects: [], focusEffects: [], navBehavior: null, mobileMenu: null };

  // Capturar hover effects disparando mouseenter
  const interactiveEls = document.querySelectorAll('a, button, [role="button"], [class*="card"], [class*="btn"], [class*="link"], nav a, input, textarea');
  interactiveEls.forEach((el, i) => {
    if (i > 40) return;
    const before = getComputedStyle(el);
    const beforeState = {
      color: before.color, backgroundColor: before.backgroundColor,
      transform: before.transform, opacity: before.opacity,
      boxShadow: before.boxShadow, borderColor: before.borderColor,
      textDecoration: before.textDecoration, scale: before.scale
    };

    el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

    requestAnimationFrame(() => {
      const after = getComputedStyle(el);
      const changes = {};
      let hasChange = false;
      Object.keys(beforeState).forEach(k => {
        const afterVal = after[k];
        if (beforeState[k] !== afterVal) { changes[k] = { from: beforeState[k], to: afterVal }; hasChange = true; }
      });

      if (hasChange) {
        result.hoverEffects.push({
          selector: el.tagName + (el.className ? '.' + (el.className.split(' ')[0] || '').slice(0,40) : ''),
          transition: before.transition,
          changes
        });
      }

      el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    });
  });

  // Mobile menu detection
  const menuBtn = document.querySelector('[class*="menu"], [class*="hamburger"], [class*="burger"], [aria-label*="menu"], [class*="toggle-nav"]');
  result.mobileMenu = menuBtn ? {
    found: true,
    selector: menuBtn.tagName + '.' + (menuBtn.className || '').split(' ')[0]?.slice(0,40),
    ariaLabel: menuBtn.getAttribute('aria-label'),
    ariaExpanded: menuBtn.getAttribute('aria-expanded')
  } : { found: false };

  return result;
})();
```

Guardar en: `docs/pds/extraction/interactions.json`

NOTA: Este script captura un snapshot parcial de hover. Para hover effects CSS-only
(:hover pseudo-class), inspeccionar las stylesheet rules directamente tambien:

```javascript
(function extractHoverRules() {
  const hoverRules = [];
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes(':hover')) {
          hoverRules.push({ selector: rule.selectorText, css: rule.cssText.slice(0, 300) });
        }
        if (rule.selectorText && (rule.selectorText.includes(':focus') || rule.selectorText.includes(':active'))) {
          hoverRules.push({ selector: rule.selectorText, css: rule.cssText.slice(0, 300) });
        }
      }
    } catch(e) {}
  }
  return hoverRules.slice(0, 50);
})();
```

### 1.5 extractAssets()

```javascript
(function extractAssets() {
  const base = window.location.origin;
  const result = { images: [], videos: [], svgInline: [], svgExternal: [], fonts: [], backgroundImages: [], icons: [], preloads: [] };

  // Images
  document.querySelectorAll('img').forEach(img => {
    result.images.push({
      src: img.src?.slice(0, 300), srcset: img.srcset?.slice(0, 300),
      alt: img.alt?.slice(0, 100), width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height, loading: img.loading,
      classes: (img.className || '').slice(0, 80),
      parentSection: img.closest('section')?.className?.slice(0, 60) || img.closest('[class*="section"]')?.className?.slice(0, 60)
    });
  });

  // <picture> sources
  document.querySelectorAll('picture source').forEach(src => {
    result.images.push({ src: src.srcset?.slice(0, 300), media: src.media, type: src.type, isPicture: true });
  });

  // Videos
  document.querySelectorAll('video').forEach(v => {
    const sources = [...v.querySelectorAll('source')].map(s => ({ src: s.src?.slice(0, 300), type: s.type }));
    result.videos.push({
      src: (v.src || v.currentSrc || '').slice(0, 300), sources,
      poster: v.poster?.slice(0, 300), width: v.offsetWidth, height: v.offsetHeight,
      muted: v.muted, autoplay: v.autoplay, loop: v.loop, playsInline: v.playsInline,
      controls: v.controls
    });
  });

  // Inline SVGs
  document.querySelectorAll('svg').forEach((svg, i) => {
    if (i > 30) return;
    result.svgInline.push({
      viewBox: svg.getAttribute('viewBox'), width: svg.getAttribute('width'),
      height: svg.getAttribute('height'), classes: (svg.className?.baseVal || '').slice(0, 80),
      pathCount: svg.querySelectorAll('path').length, outerHTML: svg.outerHTML.slice(0, 500),
      role: svg.closest('a,button,nav') ? 'interactive' : svg.closest('h1,h2,h3,[class*="logo"]') ? 'logo' : 'decorative'
    });
  });

  // Background images from CSS
  document.querySelectorAll('*').forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none' && bg.includes('url(')) {
      const urls = bg.match(/url\(["']?([^"')]+)["']?\)/g);
      if (urls) urls.forEach(u => {
        const clean = u.replace(/url\(["']?|["']?\)/g, '');
        result.backgroundImages.push({ url: clean.slice(0, 300), element: el.tagName + '.' + (el.className || '').split(' ')[0]?.slice(0, 40) });
      });
    }
  });

  // External fonts and preloads
  document.querySelectorAll('link[rel="preload"], link[rel="prefetch"], link[as="font"], link[as="image"], link[as="video"]').forEach(l => {
    result.preloads.push({ href: l.href?.slice(0, 300), as: l.getAttribute('as'), type: l.type, crossorigin: l.crossOrigin });
  });

  // Favicon and icons
  document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="shortcut icon"]').forEach(l => {
    result.icons.push({ href: l.href, rel: l.rel, sizes: l.sizes?.toString() });
  });

  return result;
})();
```

Guardar en: `docs/pds/extraction/assets.json`

### 1.6 extractThreeJSScene() — condicional

Solo ejecutar si hay `<canvas>` con contexto WebGL detectado en extractAnimationSystem().

```javascript
(function extractThreeJSScene() {
  if (!window.THREE && !window.__THREE__) return { detected: false };
  const result = { detected: true, version: window.THREE?.REVISION || 'unknown', scenes: [] };

  // Intentar acceder al renderer y scene
  const canvases = document.querySelectorAll('canvas');
  canvases.forEach((c, i) => {
    const sceneData = { index: i, width: c.width, height: c.height };
    // R3F store
    const fiber = c.__r$;
    if (fiber) {
      const store = fiber?.memoizedState?.memoizedState?.queue?.lastRenderedState;
      if (store) {
        const state = typeof store === 'function' ? null : store;
        if (state?.scene) {
          sceneData.childCount = state.scene.children?.length;
          sceneData.camera = state.camera ? {
            type: state.camera.type, fov: state.camera.fov,
            position: state.camera.position?.toArray(),
            near: state.camera.near, far: state.camera.far
          } : null;
          sceneData.lights = state.scene.children?.filter(c => c.isLight).map(l => ({
            type: l.type, color: l.color?.getHexString(), intensity: l.intensity,
            position: l.position?.toArray()
          }));
          sceneData.meshes = state.scene.children?.filter(c => c.isMesh).map(m => ({
            name: m.name, geometry: m.geometry?.type,
            material: { type: m.material?.type, color: m.material?.color?.getHexString() },
            position: m.position?.toArray(), scale: m.scale?.toArray()
          })).slice(0, 20);
        }
      }
    }
    result.scenes.push(sceneData);
  });

  // Global scene references
  ['scene','camera','renderer','controls'].forEach(name => {
    if (window[name]) {
      result[name + 'Global'] = {
        type: window[name].constructor?.name,
        exists: true
      };
    }
  });

  return result;
})();
```

Guardar en: `docs/pds/extraction/three-scene.json`

### 1.7 extractDarkMode()

```javascript
(function extractDarkMode() {
  const result = { mechanism: 'none', tokens: { light: {}, dark: {} }, prefersColorScheme: false };

  // Detect class-based dark mode
  const hasDarkClass = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  const hasDataTheme = document.documentElement.dataset.theme || document.body.dataset.theme;

  // Check for prefers-color-scheme media rules
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSMediaRule) {
          const mq = rule.conditionText || rule.media?.mediaText;
          if (mq && mq.includes('prefers-color-scheme')) {
            result.prefersColorScheme = true;
            // Extract dark mode tokens
            for (const inner of rule.cssRules) {
              if (inner.selectorText === ':root' || inner.selectorText === 'html') {
                const matches = inner.cssText.matchAll(/--([^:]+):\s*([^;]+)/g);
                for (const m of matches) result.tokens.dark[`--${m[1].trim()}`] = m[2].trim();
              }
            }
          }
        }
        // Class-based .dark tokens
        if (rule.selectorText && (rule.selectorText === '.dark' || rule.selectorText.startsWith('.dark '))) {
          const matches = rule.cssText.matchAll(/--([^:]+):\s*([^;]+)/g);
          for (const m of matches) result.tokens.dark[`--${m[1].trim()}`] = m[2].trim();
          result.mechanism = 'class';
        }
        // data-theme dark
        if (rule.selectorText && rule.selectorText.includes('[data-theme="dark"]')) {
          result.mechanism = 'data-attribute';
        }
      }
    } catch(e) {}
  }

  if (result.mechanism === 'none' && result.prefersColorScheme) result.mechanism = 'media-query';
  if (result.mechanism === 'none' && hasDarkClass) result.mechanism = 'class';
  if (result.mechanism === 'none' && hasDataTheme) result.mechanism = 'data-attribute';

  return result;
})();
```

Guardar en: `docs/pds/extraction/dark-mode.json`

### 1.8 Narrativa de scroll (pseudo-video textual)

Para CADA pagina en PAGE_MAPPING, generar una narrativa textual detallada:

1. Tomar screenshot MCP-REF a 0% scroll
2. Scroll a 10%, screenshot, describir que cambio respecto al 0%
3. Repetir en 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%

Formato de narrativa (`docs/pds/extraction/scroll-narrative-[pagina].md`):

```markdown
# Scroll Narrative: [pagina]

## 0% (top)
- Nav: transparente, logo blanco, posicion fixed
- Hero: video fullscreen pausado en frame 0, h1 visible centrado
- Elementos visibles: hero text, scroll indicator arrow

## 10%
- Nav: transicion a background solido blanco, logo cambia a oscuro
- Hero: video avanza a 1.2s, texto empieza opacity fade
- Parallax: layer de fondo se mueve 5px arriba

## 20%
[...]
```

Esta narrativa permite reconstruir el comportamiento sin necesidad de video real.

### 1.9 ANIMATION_MANIFEST.md — BLOQUEANTE

Crear en raiz del target. Una fila por efecto de animacion detectado.
MANIFEST_TOTAL = numero total de efectos.

```markdown
| ☐ | ID | Pagina | Tipo | Valor exacto | Trigger | Comportamiento |
|---|---|---|---|---|---|---|
| ☐ | A001 | / | LENIS_INIT | duration:1.2, lerp:0.1 | page-load | smooth scroll global |
| ☐ | A002 | / | VIDEO_SCRUB | hero video 0-100% | scroll 0-100% section | video progresses with scroll |
| ☐ | A003 | / | GSAP_SCROLLTRIGGER | scrub:1, pin:true | scroll enter section | parallax pin effect |
```

Tipos validos: CSS_KEYFRAME, CSS_TRANSITION, GSAP_TWEEN, GSAP_SCROLLTRIGGER,
GSAP_TIMELINE, GSAP_SPLITTEXT, LENIS_INIT, LENIS_CB, INTERSECTION_OBS,
RAF_LOOP, SCROLL_LISTENER, VIDEO_SCRUB, CANVAS_SCROLL, LOTTIE,
DATA_ATTR, FRAMER_MOTION, THREE_ANIMATION, WEB_ANIMATION_API

## FASE 2: Analisis del target

### 2.1 Baseline del target

```bash
cd "$TARGET_PATH"
npm run build 2>&1 | tee docs/pds/build-baseline.txt
```

### 2.2 Extraccion de texto

```bash
grep -rhoE '"[A-Za-záéíóúÁÉÍÓÚñÑüÜ¿¡][^"]{4,}"' "$TARGET_PATH/src" | sort -u > docs/pds/original-target-strings.txt
grep -rhoE "'[A-Za-záéíóúÁÉÍÓÚñÑüÜ¿¡][^']{4,}'" "$TARGET_PATH/src" | sort -u >> docs/pds/original-target-strings.txt
```

### 2.3 Deteccion de dependencias del source

Ejecutar en MCP-REF:

```javascript
(function detectDependencies() {
  const deps = { detected: [], confidence: {} };
  // GSAP
  if (window.gsap) { deps.detected.push('gsap'); deps.confidence.gsap = 'high'; }
  if (window.ScrollTrigger) deps.detected.push('@gsap/scroll-trigger');
  if (window.SplitText) deps.detected.push('@gsap/split-text');
  // Lenis
  if (window.__lenis || window.lenis) { deps.detected.push('@studio-freight/lenis'); deps.confidence.lenis = 'high'; }
  // Three.js
  if (window.THREE) { deps.detected.push('three'); deps.confidence.three = 'high'; }
  // React Three Fiber
  if (document.querySelector('canvas')?.__r$) deps.detected.push('@react-three/fiber');
  // Framer Motion
  if (document.querySelector('[data-framer-appear-id]')) deps.detected.push('framer-motion');
  // Swiper
  if (document.querySelector('.swiper')) deps.detected.push('swiper');
  // AOS
  if (document.querySelector('[data-aos]')) deps.detected.push('aos');
  // Locomotive
  if (document.querySelector('[data-scroll]')) deps.detected.push('locomotive-scroll');
  // Barba.js
  if (window.barba) deps.detected.push('@barba/core');
  return deps;
})();
```

Instalar dependencias detectadas en el target:
```bash
cd "$TARGET_PATH"
npm install gsap @studio-freight/lenis  # segun lo detectado
```

## FASE 3: Reconstruccion

### 3.0 Orden de reconstruccion obligatorio

1. `globals.css` / design tokens / CSS custom properties
2. `tailwind.config` (si aplica — Tailwind v4 usa CSS)
3. Fuentes (@font-face / next/font)
4. Inicializacion Lenis + GSAP (layout o provider global)
5. Navbar
6. Footer
7. Paginas segun PAGE_MAPPING (home primero, luego el resto)
8. Componentes compartidos (cards, buttons, forms)

### 3.1 Protocolo por seccion

Para CADA seccion de cada pagina:

**INSPECT** en MCP-REF:
1. Ejecutar extractStyles() en la seccion especifica
2. Capturar className exacto de cada elemento clave
3. Cross-reference con animations.json para animaciones de esa seccion
4. Screenshot a 0%, 50%, 100% de la seccion

**BUILD** en target:
1. Crear componente React .tsx reproduciendo estructura extraida
2. Aplicar Tailwind classes equivalentes a computed styles
3. Implementar animaciones con valores exactos del manifest

**SWAP** solo texto:
1. Reemplazar texto visible del source con texto del target
2. No tocar ninguna clase, valor CSS, o config de animacion

**BUILD**: `npm run build` — fix si falla — no avanzar hasta PASS

**VERIFY**: dual MCP, screenshot REF vs TARGET

### 3.2 Patrones de implementacion

VIDEO_SCRUB:
```javascript
useEffect(() => {
  const video = videoRef.current;
  const section = sectionRef.current;
  if (!video || !section) return;
  const onScroll = () => {
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

LENIS_INIT (usar valores exactos de extraction):
```javascript
useEffect(() => {
  const lenis = new Lenis({
    duration: /* valor de animations.json */,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    lerp: /* valor de animations.json */,
    wheelMultiplier: /* valor de animations.json */,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  return () => lenis.destroy();
}, []);
```

GSAP_SCROLLTRIGGER (usar valores exactos del manifest):
```javascript
useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: /* valor del manifest */,
      end: /* valor del manifest */,
      scrub: /* valor del manifest */,
      pin: /* valor del manifest */,
    }
  });
  tl.fromTo(targetRef.current, { /* from values */ }, { /* to values */ });
  return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
}, []);
```

THREE.JS_SCENE (si aplica):
```javascript
// Usar datos de three-scene.json para replicar:
// - Camera: type, fov, position, near, far
// - Lights: type, color, intensity, position
// - Meshes: geometry, material, position, scale
// - Animation loop con valores extraidos
```

### 3.3 Computed style a Tailwind mapping

Referencia rapida para traducir computed styles a Tailwind:

| Computed | Tailwind |
|---|---|
| font-size: 48px | text-5xl o text-[48px] |
| font-weight: 600 | font-semibold |
| letter-spacing: -0.05em | tracking-tight o tracking-[-0.05em] |
| line-height: 1.2 | leading-tight o leading-[1.2] |
| padding: 24px | p-6 o p-[24px] |
| border-radius: 16px | rounded-2xl o rounded-[16px] |
| gap: 32px | gap-8 o gap-[32px] |
| max-width: 1280px | max-w-7xl o max-w-[1280px] |
| background-color: rgb(0,0,0) | bg-black o bg-[rgb(0,0,0)] |

Regla: si el valor coincide exactamente con un preset de Tailwind, usar el preset.
Si no, usar valor arbitrario con `[valor]`.

## FASE 4: Verificacion QA

### 4.1 Protocolo de espera antes de captura

Ejecutar SIEMPRE antes de screenshot:

```javascript
await new Promise(r => setTimeout(r, 2500));
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.loading = 'eager';
  if (img.dataset.src) img.src = img.dataset.src;
});
document.querySelectorAll('video').forEach(v => { if (v.paused && v.readyState >= 2) v.play().catch(() => {}); });
await new Promise(r => requestAnimationFrame(() => setTimeout(r, 500)));
```

### 4.2 Deteccion de video

```javascript
const hasFullscreenVideo = (() => {
  const v = document.querySelector('video');
  return v ? v.offsetWidth >= window.innerWidth * 0.8 : false;
})();
```

Si `hasFullscreenVideo === true`:
- Usar computed style comparison en 0% (no pixel delta en hero)
- Pixel delta solo desde 25% en adelante

### 4.3 Multi-viewport verificacion

Verificar en TRES viewports:
- **Mobile**: 375px width
- **Tablet**: 768px width
- **Desktop**: 1440px width

Para cada viewport, capturas en: 0%, 25%, 50%, 75%, 100% scroll.

### 4.4 Computed style comparison

Ejecutar en MCP-REF y MCP-TARGET, comparar resultados:

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
- gap: +-4px

Criterio FAIL: diferencia no justificada en fontFamily, color, o backgroundColor.

### 4.5 Pixel delta

Para secciones SIN video fullscreen:
- Delta threshold: <= 1.5%
- Capturas en 0%, 25%, 50%, 75%, 100% scroll
- Nunca comparar SOLO en 0%

### 4.6 Verificacion de animaciones

Para cada entrada en ANIMATION_MANIFEST:
1. Provocar el trigger en MCP-REF
2. Provocar el trigger en MCP-TARGET
3. Verificar que el comportamiento es equivalente
4. Marcar ✅ en el manifest

### 4.7 Verificacion de interacciones

Para elementos clave (nav links, botones, cards):
1. Simular hover en MCP-REF, capturar estado
2. Simular hover en MCP-TARGET, capturar estado
3. Comparar: transition timing, color change, transform, opacity

## FASE 5: Entregables

### Antes de componentes (BLOQUEANTES):
- `PAGE_MAPPING.md`
- `ANIMATION_MANIFEST.md`
- `docs/pds/build-baseline.txt`
- `docs/pds/original-target-strings.txt`
- `docs/pds/extraction/design-tokens.json`
- `docs/pds/extraction/animations.json`
- `docs/pds/extraction/structure.json`
- `docs/pds/extraction/interactions.json`
- `docs/pds/extraction/assets.json`
- `docs/pds/extraction/three-scene.json` (si aplica)
- `docs/pds/extraction/dark-mode.json`
- `docs/pds/extraction/scroll-narrative-[pagina].md` (por pagina)

### Durante migracion:
- `docs/pds/modified-files.md`
- `docs/pds/qa-evidence/` (screenshots)

### Final:
- `docs/pds/assets-reemplazo-ia.md`
- `MIGRATION_COMPLETE.md`

### assets-reemplazo-ia.md

Encabezado obligatorio: `# ASSETS REEMPLAZO IA`

Para CADA asset visual usado en la reconstruccion (hero video, fondos, SVGs,
texturas, fuentes), incluir prompt de generacion adaptado al negocio target:

```markdown
## [nombre-del-asset]
- **Archivo**: hero-video.mp4
- **Uso**: video de hero con scroll scrub
- **Herramienta**: Kling (video cinematico)
- **Prompt**: "Aerial cinematic shot of [negocio target], golden hour lighting,
  drone moving slowly forward, shallow depth of field, color palette #hex1 #hex2,
  aspect ratio 16:9, 6 seconds, 24fps, no text overlays"
- **Exclusiones**: no logos, no texto, no personas identificables
- **Duracion**: 6s
- **Aspect ratio**: 16:9
```

## Reglas de build

BUILD-1: archivo modificado -> build inmediato (`npm run build`).
BUILD-2: build falla -> corregir ANTES de tocar otro archivo.
BUILD-3: 3 fallos consecutivos en mismo archivo -> STOP + reporte al usuario.
BUILD-4: cero imports de chunks/hashes/.next/server/.
BUILD-5: PASS = exit 0, cero errores TypeScript, cero warnings nuevos.

## Sistema de checkpoints

Despues de cada seccion reconstruida y verificada con PASS:
1. Actualizar `docs/pds/modified-files.md` con archivos tocados
2. Marcar seccion como ✅ en PAGE_MAPPING.md
3. Actualizar conteo en ANIMATION_MANIFEST.md

Si la migracion se interrumpe, se puede retomar desde el ultimo checkpoint.

## Stop conditions

- PAGE_MAPPING.md inexistente cuando se intenta escribir codigo
- Build sin resolver antes del siguiente archivo
- Import fuera de `src/` o `node_modules/`
- MCP-REF no puede cargar source-url
- `design-tokens.json` vacio -> STOP + re-extraer
- `ScrollTrigger.getAll()` vacio con animaciones visibles -> scroll + re-extraer
- Texto del source encontrado en target despues de SWAP
- Evidencia MCP ausente para item marcado ✅
- 3 builds fallidos consecutivos en mismo archivo

## Criterios de completitud

Completo SOLO si simultaneamente:
- PAGE_MAPPING: todas las rutas ✅
- ANIMATION_MANIFEST: grep -c "✅" == MANIFEST_TOTAL
- Delta <= 1.5% donde aplica pixel delta
- Computed style PASS donde aplica modo video
- Build final PASS (exit 0)
- Cero residuos visuales legacy del target
- Texto target preservado (cero texto source sobrevive)
- Assets IA documentados
- Verificacion multi-viewport (375px, 768px, 1440px) PASS

## Output por seccion

```
SECCION: [nombre]
BUILD: [PASS|FAIL]
METODO QA: [pixel-delta | computed-style | ambos]
VIEWPORTS: [375px PASS | 768px PASS | 1440px PASS]
DELTA/MATCH: [X.X% | PASS/FAIL]
TEXTO PRESERVADO: [PASS|FAIL]
ANIMACIONES: [N/M manifest items]
CHECKPOINT: [docs/pds/qa-evidence/seccion-nombre/]
ESTADO: [✅ | ❌]
```
