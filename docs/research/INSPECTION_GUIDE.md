# Inspection Guide

## Dual MCP setup (primera acción, antes de cualquier archivo)
MCP-REF:    <reference-url>        (web pública de referencia)
MCP-TARGET: http://localhost:3001  (target en desarrollo)

Ambas abiertas hasta que MIGRATION_COMPLETE.md esté escrito.
Source local (localhost:3000): solo para leer código, no para QA visual.

## Pre-flight validation

Para cada página del source:
  - Capturar screenshot en MCP-REF de la página equivalente
  - Calcular pixel delta
  - Delta > 10%: HARD STOP. Reportar al usuario página y porcentaje exacto.
  - Delta <= 10%: continuar

## Phase 0 extraction checklist

Design tokens:
  [ ] Cada CSS custom property en :root, .dark, bloques con scope
  [ ] Sistema de color completo (hex, oklch, hsl — todos los formatos)
  [ ] Tipografía: font-family, size, line-height, letter-spacing, weights
  [ ] Spacing, radius, shadow, blur, z-index
  [ ] Breakpoints y container widths

Animation system (con valores numéricos exactos):
  [ ] Lenis: duration, easing function code, orientation, smoothTouch
  [ ] GSAP: plugins registrados, config global
  [ ] ScrollTrigger por instancia: trigger, start, end, scrub, pin
  [ ] IntersectionObserver: threshold array exacto, rootMargin exacto, callback
  [ ] RAF loops: qué leen y qué actualizan por frame
  [ ] Scroll listeners: qué leen y qué setean
  [ ] Fórmula video.currentTime (scroll-to-video scrub)

Page mapping:
  [ ] Listar todas las rutas del source
  [ ] Listar todas las rutas del target
  [ ] Crear PAGE_MAPPING.md con cada ruta target mapeada a una source

Asset inventory:
  [ ] Hero videos (rutas absolutas)
  [ ] Fondos de sección
  [ ] SVGs (animados o estáticos)
  [ ] Archivos de fuentes
  [ ] Lottie JSONs
  [ ] Texturas y overlays

## Verification per component

Después de cada copy+swap:
  TIER 2: 5 posiciones de scroll a 1440px en MCP-TARGET vs MCP-REF
  Delta <= 1.5%: pass
  Delta > 1.5%: identificar elemento exacto, fix, reverificar
  No marcar ✅ sin screenshot passing de ambos MCPs
