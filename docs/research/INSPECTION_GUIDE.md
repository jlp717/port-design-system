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
