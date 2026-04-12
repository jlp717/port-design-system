# Prompt de continuación — Port Design System v3.3

## Instrucciones para el usuario

1. **Abre una nueva conversación** en VS Code Copilot (Agent mode, Claude)
2. **Asegúrate de tener abierto el workspace** de `port-design-system` para que se carguen las skills
3. **Asegúrate de tener el MCP de Playwright** configurado y funcionando (es OBLIGATORIO)
4. **Arranca el dev server del target** antes de empezar:
   ```bash
   cd C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa\frontend
   npm run dev
   ```
   Debe estar corriendo en http://localhost:3001/es
5. **Pega el prompt de abajo** tal cual en la nueva conversación

---

## PROMPT (copiar desde aquí)

```
Port Design System From Local Clone "C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa\frontend" "https://jobyaviation.com"

CONTEXTO CRÍTICO — Lee y sigue TODO esto antes de escribir una sola línea:

1. SKILL OBLIGATORIA: Lee COMPLETA la skill en `.github/skills/port-design-system-from-local-clone/SKILL.md` del workspace port-design-system. Son ~4800 líneas. Es tu guía ABSOLUTA. No empieces nada sin haberla leído entera.

2. EL TARGET ES UN MONOREPO:
   - Ruta del frontend: `C:\Users\Javier\Desktop\Repositorios\granja_mari_pepa\frontend`
   - Backend en `backend/` — NO TOCAR NADA del backend. JAMÁS.
   - Next.js 14.2.15 con app router en `frontend/app/[locale]/`
   - i18n con next-intl v4.7 — locales: es, en, de, it, zh — default: es
   - Tailwind v3.3.3 — usar `tailwind.config.ts` extend, NO @theme directive
   - Dev server en puerto 3001: http://localhost:3001/es
   - Los textos del target están en `frontend/messages/*.json` (i18n) y directamente en los page.tsx

3. HUBO INTENTOS PREVIOS (commit WIP guardado). El código actual tiene componentes parcialmente portados pero NINGUNO cumple el estándar. Puedes reutilizar lo que sirva, pero VERIFICA TODO contra el source vía MCP. No confíes en nada de lo que ya está hecho.

4. OBLIGACIONES MCP — NO NEGOCIABLES:
   a) Abrir DOS pestañas de browser MCP simultáneas:
      - MCP-REF: https://jobyaviation.com (y sus subpáginas)
      - MCP-TARGET: http://localhost:3001/es (y sus subpáginas)
   b) ANTES de escribir código para cualquier sección, INSPECCIONAR esa sección en MCP-REF
   c) DESPUÉS de escribir código, VERIFICAR en MCP-TARGET que coincide con MCP-REF
   d) Ejecutar TODOS los scripts de extracción de la FASE 1 de la skill (20 scripts)
   e) Ejecutar detectAnimationImplementation() ANTES de la FASE 3 — es BLOQUEANTE
   f) Ejecutar recordScrollBehavior() en source Y target para CADA página
   g) Ejecutar compareScrollBehavior() — debe dar pass:true en TODAS las páginas
   h) En CADA verificación, hacer scroll 0-100% en MCP en AMBAS webs y comparar programáticamente

5. JOBYAVIATION.COM USA:
   - NO GSAP (window.gsap === null)
   - NO Lenis (window.lenis === null)
   - NO ScrollTrigger
   - NO Framer Motion
   - CSS Modules (SCSS) con 100+ keyframes per-component
   - IntersectionObserver nativo para reveals
   - RAF nativo para video scroll-scrub (video de 20.087s)
   - Si esto cambia al re-extraer, usar lo que detectes. Pero NO instales GSAP/Lenis salvo que el source REALMENTE las use.

6. ORDEN DE TRABAJO (seguir sí o sí):
   FASE 0: Setup MCP dual + descubrimiento de páginas → PAGE_MAPPING.md
   FASE 1: Extracción de los 20 scripts en MCP-REF (design tokens, animations, structure, etc.)
   FASE 2: Análisis del target (arquitectura, strings, dependencias)
   FASE 3: Reconstrucción sección por sección (tokens → tailwind config → fonts → nav → footer → páginas)
   FASE 4: Verificación QA programática (compareScrollBehavior, computed styles, consola JS, assets)
   FASE 5: Recorrido visual final — 21 posiciones × 3 viewports × cada página
   FASE 6: Entregables finales

7. STANDARD DE CALIDAD — MÍNIMO 90%:
   - avgSimilarity >= 0.90 por página y viewport
   - worstSimilarity >= 0.90 por página, viewport y scroll position
   - compareScrollBehavior().passRate >= 95% para TODAS las páginas
   - Computed styles IDÉNTICOS (tolerancia cero)
   - Consola JS: CERO errores
   - Build: exit 0, cero errores TS
   - CADA sección verificada vía MCP dual antes de avanzar a la siguiente

8. CADA ASSET VISUAL (imágenes, videos, SVGs decorativos) viene del source (jobyaviation.com). El target no usa sus propias imágenes/videos para diseño — solo las del source. Para cada asset, documentar en assets-reemplazo-ia.md un prompt de IA para generar una versión propia representativa del negocio target (Granja Mari Pepa).

9. TEXTO = 100% del target. DISEÑO = 100% del source. CERO texto de Joby sobrevive en el target. CERO diseño del target original sobrevive.

10. BUILD DESPUÉS DE CADA ARCHIVO. Si el build falla, arreglar ANTES de tocar otro archivo. 3 fallos consecutivos en el mismo archivo → STOP y reportar.

EMPIEZA: Lee la skill completa, luego ejecuta FASE 0.
```

---

## Notas adicionales

- Si la IA dice "ya terminé" pero NO ha ejecutado FASE 5 (recorrido visual final), NO está terminado. Exígele que lo haga.
- Si la IA instala GSAP o Lenis, pregúntale: "¿El source las usa de verdad? Ejecutaste detectAnimationImplementation()?" 
- Si la IA usa screenshots como verificación principal de animaciones, recuérdale: "La skill dice PROGRAMÁTICA, NO VISUAL. Usa recordScrollBehavior() y compareScrollBehavior()."
- Si ves que una página no se parece, pídele que abra ambas en MCP y compare sección por sección con computed styles.
- La conversación puede ser larga. Si se corta, puedes volver a pegar el prompt y decir "Continúa desde FASE X" — los entregables parciales (JSONs, PAGE_MAPPING, etc.) le dirán dónde retomar.
