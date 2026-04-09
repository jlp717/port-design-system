<!-- AUTO-GENERATED from .claude/skills/port-design-system-from-local-clone/SKILL.md — do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# Port Design System From Local Clone

You are about to port the complete visual design system from a **source project** to a **target project** using the paths provided in `the source path and target path provided by the user`.

Parse `the source path and target path provided by the user` as:
1. `<source-path>` (required — absolute path to local clone with the design)
2. `<target-path>` (required — absolute path to existing Next.js project)
3. `<commit-hash>` (optional — baseline commit in target to restore before porting)

If `<commit-hash>` is provided, run `git stash push -m "pre-port-design-system stash"` then `git checkout <commit-hash>` in target before starting.
If not provided, work with the target's current state.
If `<source-path>` or `<target-path>` is missing, stop and ask for it.
If either path contains spaces, the user should wrap it in quotes.

This is a surgical operation. You are a **design system transplant surgeon** — you extract every visual element from the source (colors, fonts, animations, component shells, decorative assets) and graft them onto the target project, while the target's vital organs (API routes, database schemas, auth, business logic, text content) remain completely untouched.

## CRITICAL: What This Actually Means

This is a **COMPLETE FRONTEND VISUAL REPLACEMENT**. The target project's entire visual appearance gets replaced with the source clone's visual system.

Think of it like this:
- The source clone is the **blueprint for how everything looks**
- The target project is the **house that keeps its rooms and plumbing** (content, routes, backend)
- Your job: rebuild the target's **entire exterior and interior design** to match the source blueprint exactly

### The ENTIRE frontend visual layer gets replaced:

**Structure & Layout:**
- ALL section ordering and page structure from source
- ALL grid systems, flex layouts, and positioning
- ALL spacing scales (margins, paddings, gaps)
- ALL container widths and responsive breakpoints

**Visual Assets:**
- ALL CSS/SCSS files with complete token systems
- ALL font files, font families, font configurations
- ALL images, SVGs, videos, 3D models used in the UI
- ALL decorative elements, gradients, shadows, borders, backgrounds

**Animations & Interactions:**
- ALL GSAP timelines, ScrollTrigger configs, Lenis setup
- ALL parallax effects, scroll-triggered animations
- ALL 3D scenes and depth effects
- ALL hover/focus/active/click states and transitions
- ALL text reveal animations, stagger effects, entrance animations

**Components:**
- ALL Navbar variants (desktop, mobile, scrolled, transparent, solid, etc.)
- ALL Footer layouts and states
- ALL card designs, button styles, modal/dialog shells
- ALL form visual styling (inputs, selects, textareas - validation visuals only)
- ALL hero sections, section dividers, CTA blocks

### What stays from target (ONLY these - NOTHING ELSE):

**Content (words only):**
- All text content and copy stays from target
- All headings, paragraphs, labels, descriptions use target's text
- BUT they get wrapped in source's visual structure with source's fonts, colors, sizes, animations

**Routes & URLs:**
- Route structure and URL contracts stay from target
- Navigation links point to target's routes
- BUT the navbar/footer that contains those links looks like source's

**Backend & Logic (zero changes):**
- API routes, server actions, database queries
- Auth flows, session management, redirects
- Form validation logic, submission handlers
- Data fetching, state management, mutations
- Business rules, calculations, API integrations

### Concrete example:

Source has a hero section with:
- Full-screen background image with parallax
- Heading that splits and reveals with GSAP
- Subtitle that fades up with stagger
- CTA button with hover scale + glow effect

Target has different content but needs the SAME hero treatment:
- Target's text/heading goes inside source's parallax background
- Target's CTA text goes inside source's animated button shell
- All animations, timings, easings, effects come from source

### Simple test:
If you open source and target in browsers side by side → they should look **VISUALLY IDENTICAL** (same layout, same animations, same fonts, same colors, same spacing).
The only difference: target displays target's own text content and targets its own API routes.

## Scope Defaults

### Visual Layer — PORTED (everything the user sees)

Every item in this list is extracted from the source and applied to the target:

- **CSS custom properties** — every `--token-name: value` in `:root`, `.dark`, and any scope
- **Color palette** — oklch/hex/hsl values for background, foreground, primary, secondary, accent, muted, destructive, border, ring, chart colors, sidebar colors, and any custom tokens
- **Typography** — font-family declarations, font-weight scale, font-size scale, line-height scale, letter-spacing scale, text-transform patterns
- **Font files** — `.woff2`, `.woff`, `.ttf` files and their `@font-face` declarations or `next/font` configuration
- **Tailwind theme** — colors, spacing, borderRadius, boxShadow, animation, keyframes, screens, fontFamily — everything in `tailwind.config.*` or `@theme` CSS blocks
- **`globals.css`** — all visual tokens, keyframe animations, utility classes, base layer styles
- **GSAP animations** — every `gsap.to()`, `gsap.from()`, `gsap.fromTo()`, `gsap.timeline()` with exact duration, ease, stagger, delay, repeat, yoyo, and animated CSS properties
- **ScrollTrigger configs** — trigger element, start, end, scrub, pin, anticipatePin, toggleActions, and which GSAP animation it controls
- **Lenis smooth scroll** — duration, easing function, smoothWheel, orientation, gestureOrientation, normalizeWheel, wrapper/content selectors
- **Parallax effects** — which elements, speed multiplier, direction, axis, implementation method
- **Hover/focus/active states** — exact transition timing and easing, transform values, color changes, opacity changes, box-shadow changes, border changes
- **Responsive breakpoints** — exact pixel values and every CSS property that changes at each breakpoint
- **3D effects** — perspective, rotateX/Y/Z, translateZ, backface-visibility, transform-style
- **Layout patterns** — grid-template-columns/rows, flex configs, gap values, container max-widths, section padding/margin rhythms, aspect ratios
- **Component visual shells** — Navbar (desktop + mobile + hamburger + scroll behavior), Footer, Hero (all variants), feature cards, testimonial cards, CTA sections, button variants (all states), modal/drawer visual shells, form visual shells, badge/tag styles, dividers, decorative elements
- **Decorative assets** — background images, hero videos, SVG illustrations, blob shapes, noise textures, gradient meshes — physically copied from source to target's `public/`
- **Box shadows, border radii, opacity patterns, backdrop filters, mix-blend-modes, gradient definitions**
- **Scroll-snap configurations, scroll-driven animations, intersection observer visual triggers**

### Protected Layer — NEVER TOUCHED

If removing or changing any of these would break the site's functionality, change what a user reads, or alter business logic — it is absolutely off-limits:

- **API routes** — any file under `app/api/` or `pages/api/`
- **Server actions** — any `'use server'` function or file
- **Database** — schemas, ORM models, Prisma schema, Drizzle schema, migration files
- **Authentication** — NextAuth/Auth.js config, Clerk config, session handling, access guards, middleware that checks auth
- **Environment** — `.env`, `.env.local`, `.env.production`, `.env.development`, `.env.test`
- **Text content** — headings, paragraphs, labels, button text, link text, alt text, aria labels, placeholder text, error messages, toast messages, meta titles, meta descriptions
- **URL routing** — page file paths, dynamic `[slug]` and `[[...rest]]` segments, route groups `(group)`, layout nesting hierarchy, `generateStaticParams`, rewrites, redirects
- **Data fetching** — `fetch()` calls, `useQuery()`, React Query, SWR, tRPC, server component async functions, `getServerSideProps`, `getStaticProps`
- **Form handlers** — `action` props, `onSubmit` handlers, validation schemas (Zod, Yup), FormData processing
- **Third-party integrations** — Google Analytics, GTM, Stripe, HubSpot, Intercom, Sentry, PostHog, any script tag for tracking/payment/CRM
- **Business logic** — utility functions that process data, calculate prices, format dates, transform API responses
- **Test files** — any `*.test.*`, `*.spec.*`, `__tests__/` directory
- **CI/CD** — `.github/workflows/`, `vercel.json`, deployment configs
- **Package lock** — `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` (only modify `package.json` dependencies to ADD visual packages)

**The governing rule:** If it affects how the site *works* or what a user *reads* → off-limits. If it affects how the site *looks, moves, or feels* → your responsibility.

## Pre-Flight

1. **Parse arguments.** Split `the source path and target path provided by the user` into `<source-path>`, `<target-path>`, and optionally `<commit-hash>`. If fewer than 2 paths are provided, ask the user for the missing path. Resolve relative paths to absolute.

2. **Handle optional commit hash.** If `<commit-hash>` is provided:
   - Stash any dirty changes: `git stash push -m "pre-port-design-system stash"`
   - `cd <target-path>` and `git checkout <commit-hash>`
   - Verify clean working tree
   - If commit hash not found: output `❌ Commit hash not found: <commit-hash>`. Explain. Stop.

3. **Validate source.** Confirm `<source-path>` exists and contains a recognizable web project:
   - Has `package.json` — OR —
   - Has CSS files (`.css`) — OR —
   - Has HTML files with `<style>` or `<link>` tags
   - If validation fails: output `❌ Source path not found or not a web project: <source-path>`. Explain what was expected. Stop.

4. **Validate target.** Confirm `<target-path>` exists and contains a Next.js project:
   - Has `package.json` with `next` as a dependency or devDependency
   - Has `app/` directory (App Router) or `pages/` directory (Pages Router)
   - If validation fails: output `❌ Target path is not a Next.js project: <target-path>`. Explain what was expected. Stop.

5. **Report findings.** Before proceeding, display to the user:
```
Source: <source-path>
  Framework: <detected>
  Styling: <detected>
  Animation libs: <detected: gsap, lenis, framer-motion, etc.>
  Pages: <list>

Target: <target-path>
  Framework: Next.js (<App Router | Pages Router>)
  Styling: <detected>
  Pages: <list>
  Protected files: <count of API routes, server actions, env files>
  Baseline commit: <commit-hash or "current HEAD">

Proceeding with design system port...
```

6. **Create working directories.** Create `docs/port-design-system/` in the target project if it doesn't exist. This is where extraction reports and changelogs will be written.

7. **Verify target builds.** Run the target's build command (`npm run build` or equivalent from its `package.json` scripts). If it fails, tell the user to fix their build first. A broken target before porting begins means any post-port failures will be impossible to attribute.

## Guiding Principles

These truths separate a successful port from a disaster. Internalize them.

### 1. The Target's Soul is Sacred

You are changing how it looks, not what it does or says. Every text string, every API call, every database query, every auth check, every form handler in the target must be byte-identical before and after. If you find yourself editing a `<p>` tag's text content, an API route handler, a server action, or an auth guard — **STOP**. You have crossed the line.

### 2. Audit Before You Touch

Read every single file in both projects before writing anything. You need a complete mental model of what the source provides and what the target contains. Surprises during porting mean you audited too fast. The 30 minutes you spend reading saves 3 hours of rework.

### 3. Source Tokens Win, Target Structure Stays

If source defines `--primary: oklch(0.7 0.15 250)` and target has `--primary: #3b82f6`, replace the value. But if target has a `components/ui/` directory structure and source has `components/sections/`, keep the target's structure and port the styles into it. You are transplanting the design system, not the file organization.

### 4. Install Dependencies, Never Remove Them

If porting requires GSAP, Lenis, or new font packages, add them to the target's `package.json`. Never remove a target dependency, even if the source doesn't use it. The target's dependencies exist for functional reasons you may not see.

### 5. Merge, Don't Replace

The target's `globals.css` may have custom properties the source doesn't define. Merge the source's tokens INTO the target's file, preserving target-specific values. Same for Tailwind config. Same for `layout.tsx`. Every file modification is a surgical merge, not a wholesale replacement.

### 6. Component Shells, Not Component Replacements

When porting a Navbar's visual design, you modify the target's existing Navbar component to *look* like the source. You do NOT delete the target's Navbar and paste in the source's. The target's Navbar has auth state, dropdown logic, mobile menu handlers, navigation links to real routes — all of which must survive. Apply the source's Tailwind classes, colors, layout structure, and animations. Preserve the target's content, links, event handlers, and state management.

### 7. One Phase, One Verified Build

After completing each phase, run the target's build command. A broken build between phases is unacceptable. If a phase breaks the build, fix it completely before moving to the next phase. This is your circuit breaker.

### 8. Decorative Assets Only

Copy images, videos, and SVGs from source to target ONLY if they are decorative — backgrounds, patterns, hero visuals, texture overlays, gradient images. Never copy content images (product photos, user avatars, blog thumbnails, logos that belong to the source's brand). The target's content images are its own.

### 9. Document Every Change

Write `docs/port-design-system/changelog.md` in the target project. For every file you modify, log: the file path, what changed (before → after summary), and why. This is the audit trail the developer uses to understand and verify your work.

## Phase 0: Full Source Audit

Read every file in `<source-path>`. Do not skim — read actual file contents. Extract and document everything below into `docs/port-design-system/extraction-report.md` in the target project.

### CSS Custom Properties

Find every CSS file in the source. For each custom property declaration:
- Variable name (e.g., `--background`)
- Value (e.g., `oklch(1 0 0)`)
- Scope (`:root`, `.dark`, media query, component-scoped)
- Which file it's declared in

### Typography

- Every `font-family` declaration (in CSS and in `next/font` config)
- Font weight scale (which weights are actually used)
- Font size scale (every distinct `font-size` value used)
- Line height scale
- Letter spacing values
- Font file paths (`.woff2`, `.woff`, `.ttf` in `public/fonts/` or similar)
- `next/font/google` or `next/font/local` imports in `layout.tsx`

### Tailwind Configuration

- Read `tailwind.config.ts`/`tailwind.config.js` if it exists
- Read `@theme` blocks in CSS files (Tailwind v4)
- Document every custom theme value: colors, spacing, borderRadius, boxShadow, animation, keyframes, screens, fontFamily, fontSize

### Animation Libraries

Search for imports of: `gsap`, `@gsap/react`, `lenis`, `@studio-freight/lenis`, `framer-motion`, `motion`. For each:

**GSAP animations:**
- Every file that imports `gsap`
- Each animation call: `gsap.to()`, `gsap.from()`, `gsap.fromTo()`, `gsap.timeline()`
- For each: target selector/ref, animated properties and their values, duration, ease (exact string), delay, stagger, repeat, yoyo
- Plugin registrations: `gsap.registerPlugin(ScrollTrigger, ...)` — which plugins are used

**ScrollTrigger configs:**
- Every `ScrollTrigger.create()` or `scrollTrigger` property in a GSAP animation
- For each: trigger element, start value, end value, scrub (boolean or number), pin, anticipatePin, toggleActions, toggleClass, onEnter/onLeave callbacks (existence only, not logic)

**Lenis:**
- Configuration object: duration, easing function (exact function body), smoothWheel, orientation, gestureOrientation, normalizeWheel, infinite
- Where it's instantiated (provider component, layout hook, etc.)
- RAF integration (how it connects to the animation frame loop)

### Parallax Effects

- Which elements have parallax behavior
- Speed values (exact numbers)
- Direction and axis
- Implementation: GSAP scroll-driven, CSS transform + scroll listener, data attributes, custom hook

### Hover/Focus/Active States

For each interactive component (buttons, cards, links, nav items):
- Which CSS properties change
- Before and after values
- Transition property, duration, timing function
- Transform values if any

### Responsive Breakpoints

- Breakpoint pixel values (from Tailwind config or media queries)
- For each major component: what changes at each breakpoint
- Mobile-first or desktop-first approach

### Component Inventory

Map every component in the source. For each:
- File path
- Is it purely visual (styling + layout) or does it contain business logic?
- Visual properties: Tailwind classes, inline styles, CSS module classes
- Animation code attached to it
- Assets it references

### Decorative Assets

List every file in source's `public/` that is decorative:
- Background images and their usage locations
- Hero videos
- SVG illustrations and patterns
- Texture/noise images
- Gradient mesh images

### Target Project Mapping

Now read every file in `<target-path>`:
- Map all routes: pages, layouts, route groups, dynamic segments
- Map all components: identify each, note which have visual styling vs. business logic
- Map all API routes and server actions (these are the untouchable files)
- Map the auth system (middleware, providers, config files)
- Identify the target's current styling approach (Tailwind, CSS Modules, styled-components, etc.)
- Identify the target's current animation approach (if any)
- Note the target's existing `globals.css` custom properties
- Note the target's existing Tailwind config
- Note the target's existing font setup

Write all findings to `docs/port-design-system/extraction-report.md`. This file must be complete before any porting begins.

## Phase 0b: Optional Live Source Extraction

If the source project can be run locally or is deployed somewhere, the developer may optionally provide a URL. If a URL is available and browser MCP tools are detected:

1. Navigate to the URL with browser MCP
2. Run `getComputedStyle()` on 20+ key elements (body, headings, nav, buttons, cards, footer, inputs) to get computed values
3. Check for `window.__lenis` or `window.lenis` — extract runtime Lenis config
4. Check for `window.gsap` — if present, run `gsap.globalTimeline.getChildren()` to enumerate all active animations
5. Check for `ScrollTrigger.getAll()` — enumerate all ScrollTrigger instances with their configs
6. Perform interaction sweep: hover buttons, scroll full page, resize viewport to 375px/768px/1440px
7. Merge computed values into the extraction report — computed values override authored values where they differ (the browser's computed output is the ground truth)

This phase is OPTIONAL. If the source code is well-structured and readable, Phase 0 alone is sufficient. Skip this phase if no URL is available or no browser MCP tools are detected.

## Phase 1: Global Visual Foundation

This phase applies the source's global design tokens to the target. Every step is sequential. Do this yourself — do not delegate to sub-agents.

### Step 1: Install Missing Visual Dependencies

Compare the source's `package.json` dependencies against the target's. For each visual library the source uses that the target lacks:

```bash
cd <target-path>
npm install <package1> <package2> ...
```

Common visual packages to check for:

- `gsap` and `@gsap/react`
- `lenis` or `@studio-freight/lenis`
- `framer-motion` or `motion`
- Font packages (if self-hosted, copy files instead)
- `tailwind-merge`, `clsx`, `class-variance-authority` (if not already present)
- `tw-animate-css` or similar animation utilities

Never remove any of the target's existing dependencies.

Verify: `npm run build` passes in the target.

### Step 2: Merge globals.css

Read the source's `globals.css` (or equivalent main CSS file). Read the target's `globals.css`.

For the target's `globals.css`:

- Replace `:root` CSS custom property values with source values. If the source defines `--background: oklch(0.98 0.01 250)`, update the target's `--background` to that value. If the source defines a property the target doesn't have, add it. If the target defines a property the source doesn't have, keep it.
- Same for `.dark` scope.
- Port all `@keyframes` definitions from source that don't exist in target.
- Port any `@theme` blocks (Tailwind v4 inline theme) — merge source theme values into target's theme block.
- Port any global base styles (`@layer base`) that are purely visual.

Do NOT remove any existing target CSS that is not overridden by the source.

Verify: `npm run build` passes in the target.

### Step 3: Merge Tailwind Configuration

If source has a `tailwind.config.ts`/`.js`:

- Read source config's `theme.extend` (or `theme`)
- Merge each section (colors, spacing, borderRadius, boxShadow, animation, keyframes, screens, fontFamily) into the target's Tailwind config
- Source values override target values for the same key names
- Target values for keys the source doesn't define are preserved

If source uses Tailwind v4 CSS-only config (`@theme` blocks), the merge happened in Step 2.

Verify: `npm run build` passes in the target.

### Step 4: Port Fonts

Read the source's font setup:

- If source uses `next/font/google`: add/replace the font imports in target's `layout.tsx`. Apply the font CSS variables to the `<html>` or `<body>` className.
- If source uses `next/font/local`: copy font files from source to target's `public/fonts/` (or equivalent). Add the `next/font/local` imports to target's `layout.tsx`.
- Update the target's `--font-sans`, `--font-mono`, `--font-heading` CSS custom properties to match source.
- Preserve any font-related logic in the target's `layout.tsx` (metadata, viewport config, etc.).

Verify: `npm run build` passes in the target.

### Step 5: Set Up Lenis (if source uses it)

If the extraction report shows the source uses Lenis:

- Find the source's Lenis setup (usually a provider component or a hook in the layout)
- Create the same structure in the target — a Lenis provider component with the exact configuration values from the extraction report
- Wire the Lenis provider into the target's root layout, wrapping `{children}`
- If the source integrates Lenis with GSAP's ticker, replicate that integration

If the source does NOT use Lenis, skip this step entirely. Do not add Lenis just because it's nice to have.

Verify: `npm run build` passes in the target.

### Step 6: Set Up GSAP (if source uses it)

If the extraction report shows the source uses GSAP:

- Find the source's GSAP setup (plugin registration, global defaults)
- Create a GSAP registration module in the target (e.g., `src/lib/gsap.ts` or equivalent)
- Register the same plugins the source uses (ScrollTrigger, etc.)
- If the source has a GSAP provider or context hook, create the same in the target
- Set the same global defaults (e.g., `gsap.defaults({ ease: "power2.out", duration: 0.8 })`)

If the source does NOT use GSAP, skip this step entirely.

Verify: `npm run build` passes in the target.

### Step 7: Port Navbar Visual Shell

Read the source's Navbar component(s) — extract: Tailwind classes, layout structure (flex, grid), colors, typography, spacing, hover states, scroll-triggered state changes (background change on scroll, shrink effect, shadow), mobile hamburger menu animation, logo/brand sizing

Read the target's Navbar component(s) — identify: navigation links (these are SACRED — keep every `<a>` href, every `<Link>` to, every route), auth state display (login/logout buttons, user avatar), mobile menu toggle logic, dropdown handlers, any data fetching

Apply the source's visual properties to the target's Navbar:
- Replace Tailwind utility classes for colors, spacing, typography, layout
- Port scroll-triggered behavior (if source Navbar changes on scroll, add that behavior)
- Port hover states and transitions
- Port mobile menu visual design (animation style, backdrop, slide direction)
- Preserve: every link destination, every auth-related UI element's logic, every click handler's functionality, every aria attribute, the mobile menu open/close state management

If the target has no Navbar but the source does: create a minimal visual Navbar shell with placeholder navigation items (clearly marked as needing the developer's real links)

Verify: `npm run build` passes in the target.

### Step 8: Port Footer Visual Shell

Same approach as Navbar:

- Extract source Footer visual properties
- Read target Footer, identify protected content (links, legal text, contact info)
- Apply visual shell while preserving content
- Port any footer-specific animations or hover states

Verify: `npm run build` passes in the target.

## Phase 2: Home Page Porting

Work through the target's home page (`app/page.tsx` or `pages/index.tsx`) section by section, from top to bottom.

For EACH section:

### Step 1: Read Both Versions

- Read the source's corresponding section (match by visual purpose: hero, features, testimonials, CTA, etc.)
- Read the target's section in full — understand every prop, every data fetch, every piece of content

### Step 2: Identify What to Port vs. Protect

Create a mental (or written) split:

**Port:** Tailwind classes, CSS custom property references, layout structure (flex/grid config), animation code (GSAP timelines, scroll triggers, hover handlers that are purely visual), responsive classes
**Protect:** Text content in JSX (`<h1>`, `<p>`, `<span>`, `<a>` text), `href` values, `src` attributes pointing to content images, data fetching functions, event handlers that trigger business logic, children props, conditional rendering based on data/auth state

### Step 3: Write the Merged Section

Rewrite the target's section component:

- Keep the target's imports (data, hooks, business logic utilities)
- Replace/add the source's visual imports (animation hooks, icons if decorative)
- Apply the source's Tailwind classes to the target's JSX elements
- Apply the source's layout structure (change a 2-column grid to a 3-column grid if that's what the source uses)
- Wire up the source's animation code (GSAP timelines, ScrollTrigger, parallax) to the target's DOM elements
- Keep every piece of the target's text content, data binding, and logic exactly as-is

If the source has more visual sections than the target: only port sections that have a logical counterpart. Don't add sections that would contain no target content.
If the target has more sections than the source: sections without a source counterpart keep their existing styling (they benefit from the global token changes from Phase 1).

### Step 4: Verify

After completing the entire home page: run `npm run build` in the target. Fix all errors before proceeding.

## Phase 3: All Remaining Pages

Apply the Phase 2 approach to every route in the target project, in this order:

1. **Visually complex pages** — about, services, products, portfolio, contact. These are most likely to have counterparts in the source.
2. **Simple content pages** — legal, privacy, terms, cookies, FAQ. Apply global token changes; if the source has a matching page, port its layout.
3. **Auth pages** — login, register, password reset, verify email. Port visual styling shell ONLY: form container layout, input styling, button styling, page background. Absolute zero changes to form action handlers, validation logic, redirect URLs, auth provider config.
4. **Dashboard/protected pages** — if the source has no equivalent (common — the source is usually a marketing site), these pages inherit the global visual refresh from Phase 1 (new colors, fonts, tokens) but receive no section-level porting. That's correct — don't force a marketing design onto a dashboard.
5. **Dynamic route templates** — `[slug]` pages. Port the layout template's visual shell. Do not touch `generateStaticParams`, data fetching, or dynamic content rendering.

For each page:

- Read both source and target versions
- Apply visual shell from source
- Preserve all target content and logic
- Run `npm run build` after each page (or after each group of simple pages)

## Phase 4: Asset Integration & Verification

### Step 1: Copy Decorative Assets

From the extraction report's decorative asset list, copy each file from source to target:

```bash
# Example — adapt paths based on actual asset locations
cp <source-path>/public/images/hero-bg.webp <target-path>/public/images/hero-bg.webp
cp <source-path>/public/images/noise-texture.png <target-path>/public/images/noise-texture.png
cp <source-path>/public/videos/hero-loop.mp4 <target-path>/public/videos/hero-loop.mp4
```

Create target directories as needed (`public/images/`, `public/videos/`, `public/fonts/`)
Never overwrite target assets that have the same filename — rename the source asset
Only copy DECORATIVE assets. Content images (product photos, user avatars, blog images) belong to the target and should NOT be overwritten

### Step 2: Update Asset References

Scan every `.tsx`, `.ts`, `.css` file in the target for references to copied assets. Ensure every reference resolves to an existing file. Fix any broken paths.

### Step 3: Write Asset Manifest

Create `docs/port-design-system/asset-manifest.md` in the target project listing every copied asset: source path, target path, purpose (background, texture, hero video, etc.).

### Step 4: Final Build Verification

```bash
cd <target-path>
npm run build
```

Fix any remaining errors. Zero TypeScript errors, zero ESLint errors, successful build.

## Phase 5: QA, Cleanup, Commit

### Visual Comparison

Use MCP Chrome DevTools if available (start the target's dev server first):

- Navigate to each route in the target
- Take a full-page screenshot at 1440px and 390px viewports
- Compare visually against the source — the target should have the source's visual identity
- Check specifically:
  - Colors match (run `getComputedStyle(document.documentElement)` and verify CSS custom property values)
  - Fonts match (check computed `font-family` on body, headings, buttons)
  - Navbar visual design matches (scroll to trigger scroll state, verify)
  - Footer visual design matches
  - Animations fire correctly (scroll through page, verify GSAP/ScrollTrigger/Lenis)
  - Hover states work on buttons, cards, links
  - Mobile layout is correct at 375px

If any check FAILS: fix the issue completely, then re-verify
If MCP Chrome DevTools are not available: instruct the developer to manually verify by running both projects side by side.

### Content Integrity Check

This is the most critical QA step. Verify that ZERO text content changed:

- For each page in the target, compare the text content before and after porting
- Run a targeted check: search the git diff for changes inside text-bearing JSX elements (`<h1>` through `<h6>`, `<p>`, `<span>`, `<a>`, `<button>`, `<label>`, `<li>`)
- If ANY text content changed: revert that specific change immediately

### Functional Check

- Click every navigation link — all routes still resolve
- Submit any visible forms — they still work (send data, validate, redirect)
- If the target has auth: log in, verify protected routes still work
- Check browser console: zero JavaScript errors
- Check network tab: zero 404s for assets

### Cleanup

- Remove any temporary files created during porting
- Ensure `docs/port-design-system/changelog.md` is complete with every file modified
- Ensure `docs/port-design-system/extraction-report.md` is present
- Ensure `docs/port-design-system/asset-manifest.md` is present
- Verify `.gitignore` covers `.env*` files — never commit secrets
- Scan for any accidentally committed sensitive data

### Commit and Push

If the developer requests it:

```bash
cd <target-path>
git add -A
git commit -m "feat: port visual design system from <source-name>

- Ported CSS custom properties, typography, and color palette
- Added GSAP animations and ScrollTrigger configurations
- Set up Lenis smooth scroll
- Ported component visual shells (Navbar, Footer, sections)
- Copied decorative assets
- All business logic, content, and routing preserved"
git push
```

## Technology Reconciliation — Edge Cases

### Source uses GSAP, target does not

Install GSAP in the target. Create the registration module. Port all animation code. The target gains animation capabilities it didn't have before — this is expected and correct.

### Source uses Lenis, target does not

Install Lenis in the target. Create the provider. Wire into layout. The target gains smooth scrolling.

### Source uses CSS Modules, target uses Tailwind

Do NOT switch the target to CSS Modules. Instead: read every CSS Module value from the source, translate into Tailwind utility classes or custom `@theme` tokens, apply those to the target's JSX. The target keeps its Tailwind approach.

### Source uses styled-components/Emotion, target uses Tailwind

Same approach: extract the computed style values and express them as Tailwind classes or CSS custom properties.

### Target uses CSS Modules, source uses Tailwind

Apply the source's design tokens as CSS custom properties in `globals.css`. Port Tailwind-specific values (spacing, colors) into the target's CSS Module files as custom property references. Do NOT switch the target to Tailwind.

### Source uses React 18, target uses React 19 (or vice versa)

Adapt API differences. If source uses `useEffect` for animations and target uses React 19, the animation code still works. Watch for deprecated patterns and update to the target's React version conventions.

### Source and target use different component libraries

Port the visual tokens (colors, fonts, spacing, animations) globally. For component-level porting: apply the source's visual properties to the target's component library equivalents. Do NOT replace the target's component library.

### Source has more pages than target

Only port the global visual system and sections that have logical counterparts. Do NOT create phantom routes.

### Target has more pages than source

Pages without a source counterpart get the global visual refresh from Phase 1 but no section-level changes.

### Target uses Pages Router instead of App Router

All porting logic works the same — adjust file paths. `pages/_app.tsx` instead of `app/layout.tsx`. `pages/index.tsx` instead of `app/page.tsx`. The visual layer is framework-agnostic at the CSS/component level.

### Source has Three.js / 3D scenes

Port the Three.js setup: camera config, geometry, materials, lighting, animation loop, renderer settings. Install `three` and `@react-three/fiber` / `@react-three/drei` in the target if not present. The 3D scene is purely visual — it belongs in the port.

### A source component is too tangled with logic for full visual porting

If a source component's visual layer is inseparable from its business logic (rare but possible), port only what you can cleanly extract: Tailwind classes, CSS custom property references, animation timings. Document the limitation in the changelog. Don't force a partial port that breaks the target's logic.

## What NOT to Do

These are the hard rules. Violating any one of them means the port has failed:

1. **Don't edit text content.** Not a single heading, paragraph, button label, link text, alt attribute, or placeholder. If you see yourself typing new text into a target JSX element, STOP.
2. **Don't touch `app/api/` or `pages/api/`.** These directories are forbidden. Read-only if needed for understanding; never write.
3. **Don't modify server actions.** Any file or function with `'use server'` is off-limits.
4. **Don't change database schemas, ORM models, or migrations.**
5. **Don't alter `.env` files or any environment variable configuration.**
6. **Don't modify auth configuration.** NextAuth, Clerk, Supabase Auth, custom auth — all untouchable.
7. **Don't change form action handlers or validation logic.**
8. **Don't alter URL routing.** Don't rename pages, don't change dynamic segments, don't add or remove routes.
9. **Don't remove target dependencies.** Only add.
10. **Don't replace target components wholesale.** Modify their visual properties. The target's component files contain business logic that must survive.
11. **Don't copy source components verbatim.** They contain source-specific text content, mock data, and different routes.
12. **Don't modify test files.**
13. **Don't change CI/CD configs** (unless strictly necessary for a new visual dependency's build step).
14. **Don't skip the build check.** After every phase, `npm run build` must pass. No exceptions.
15. **Don't port content images.** Only decorative assets. Product photos, user avatars, blog images belong to the target.
16. **Don't assume the source's routing structure.** The target may have completely different pages. Port the design system, not the information architecture.

## Completion

When done, report to the developer:

```
PORT COMPLETE

Source: <source-path>
Target: <target-path>

Files modified: <count>
Files created: <count>
Dependencies added: <list with versions>
Decorative assets copied: <count>
Build status: ✅ PASS
TypeScript check: ✅ PASS
ESLint check: ✅ PASS

Content integrity: ✅ All text content verified unchanged
Functional integrity: ✅ All routes, forms, and auth verified working

Reports written:
  - docs/port-design-system/extraction-report.md
  - docs/port-design-system/changelog.md
  - docs/port-design-system/asset-manifest.md

Manual follow-ups needed:
  - <any sections that could not be fully ported, with reason>
  - <any visual effects that need the developer's browser to verify>
```
