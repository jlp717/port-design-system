# /port-design-system-from-local-clone — Usage Guide

## Comandos

FORMA A (source repo local con componentes React reales):
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<reference-url>"

FORMA B (source es URL pública — sin repo local con componentes propios):
/port-design-system-from-local-clone --url "<source-url>" "<target-path>"

## Cuándo usar cada forma

FORMA A: el repo source tiene componentes .tsx propios, globals.css real,
         tailwind.config con customización real, assets en public/.

FORMA B: el repo source es un proxy inverso (middleware NextResponse.rewrite),
         o directamente no existe un repo y se quiere replicar desde la web.

## Ejemplo real — Granja Mari Pepa desde jobyaviation.com (FORMA B)
/port-design-system-from-local-clone --url "https://jobyaviation.com" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa\frontend"

Contexto adicional al invocar:
CONTEXT:

Source URL: https://jobyaviation.com
Target: granja_mari_pepa/frontend (distribuidora HORECA, Lorca, Murcia, España)
Backend del target (auth, API, DB, next-intl): INTOCABLE
Efectos obligatorios a replicar: scroll-driven video scrub, parallax
cinematográfico, GSAP ScrollTrigger con pin, Lenis smooth scroll,
IntersectionObserver reveals, logo/nav animado, partner tab switching,
news card grid con hover, tipografía dark/light dramática


## Entregables en el target

PAGE_MAPPING.md · ANIMATION_MANIFEST.md ·
docs/pds/source-design-tokens.json · docs/pds/source-animations.json ·
docs/pds/source-structure.json · docs/pds/build-baseline.txt ·
docs/pds/qa-evidence/ · docs/pds/assets-reemplazo-ia.md · MIGRATION_COMPLETE.md
