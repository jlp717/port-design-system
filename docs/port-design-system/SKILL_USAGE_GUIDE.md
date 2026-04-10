# /port-design-system-from-local-clone — Usage Guide

## Comando

```txt
/port-design-system-from-local-clone "<source-path>" "<target-path>" "<reference-url>"
```

## Ejemplo (Granja Mari Pepa)

```txt
/port-design-system-from-local-clone "C:\Users\Javier\Desktop\Repositorios\mari-pepa-redesign" "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa\frontend" "https://jobyaviation.com"
```

## Cómo funciona

1. Abre DOS instancias Chrome DevTools MCP (reference-url + target dev server)
2. Valida que el source coincide con reference-url (delta <= 10% requerido)
3. Crea PAGE_MAPPING.md mapeando cada página target a un diseño source
4. Crea ANIMATION_MANIFEST.md con cada efecto de animación y valores exactos
5. Copia cada archivo visual del source al target, hace swap solo del texto
6. Verifica cada componente con scroll dual-MCP (0% a 100% de 5 en 5)
7. Purga todos los residuos visuales legacy del target
8. Genera ASSETS REEMPLAZO IA con prompts específicos para Granja Mari Pepa

## Qué se preserva del target

SOLO: texto de contenido visible al usuario y rutas href a páginas del negocio.
NADA MÁS del target sobrevive. Cero diseño legacy.

## Entregables en el target

PAGE_MAPPING.md · ANIMATION_MANIFEST.md · STACK_MANIFEST.md ·
docs/pds/build-baseline.txt · docs/pds/qa-evidence/ (168 screenshots mínimo/página) ·
docs/pds/assets-reemplazo-ia.md · MIGRATION_COMPLETE.md
