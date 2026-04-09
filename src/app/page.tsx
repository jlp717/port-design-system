export default function Home() {
  return (
    <main className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(234,88,12,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(15,23,42,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,1),rgba(245,245,244,0.96))]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(251,146,60,0.12)] blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-12">
        <section className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)]">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)] backdrop-blur xl:p-12">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0f172a_0%,#ea580c_55%,#facc15_100%)]" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Senior-grade single skill
              </div>

              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  /port-design-system-from-local-clone
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-balance text-foreground sm:text-5xl lg:text-6xl">
                  Full visual replacement with zero hybrid leftovers.
                </h1>
                <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Use a local source clone as the only visual truth, purge the legacy design from
                  the target, preserve text, routes, and business logic, and finish with asset
                  replacement guidance plus Chrome DevTools MCP QA.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <article className="rounded-[1.5rem] border border-black/10 bg-stone-50/90 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    Replace
                  </p>
                  <p className="mt-3 text-sm leading-7 text-foreground">
                    Globals, tokens, typography, layouts, animations, assets, and responsive
                    behavior.
                  </p>
                </article>
                <article className="rounded-[1.5rem] border border-black/10 bg-stone-50/90 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    Preserve
                  </p>
                  <p className="mt-3 text-sm leading-7 text-foreground">
                    Target copy, content, routes, auth, API routes, server actions, and business
                    logic.
                  </p>
                </article>
                <article className="rounded-[1.5rem] border border-black/10 bg-stone-50/90 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    Deliver
                  </p>
                  <p className="mt-3 text-sm leading-7 text-foreground">
                    Legacy visual purge, asset manifest, `ASSETS REEMPLAZO IA`, and final MCP
                    fidelity inspection.
                  </p>
                </article>
              </div>

              <div className="space-y-3 rounded-[1.75rem] border border-black/10 bg-stone-950 p-5 text-stone-50 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.7)] sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-stone-400">
                  Command contract
                </p>
                <code className="block overflow-x-auto text-sm leading-7 text-stone-100">
                  /port-design-system-from-local-clone &quot;&lt;source-path&gt;&quot; &quot;&lt;target-path&gt;&quot;
                </code>
                <code className="block overflow-x-auto text-sm leading-7 text-stone-100">
                  /port-design-system-from-local-clone &quot;&lt;source-path&gt;&quot; &quot;&lt;target-path&gt;&quot; &quot;&lt;commit-hash&gt;&quot;
                </code>
              </div>
            </div>
          </div>

          <aside className="grid gap-5">
            <section className="rounded-[2rem] border border-black/10 bg-stone-950 p-6 text-stone-50 shadow-[0_28px_80px_-38px_rgba(15,23,42,0.7)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-stone-400">
                Non-negotiable
              </p>
              <p className="mt-4 text-xl font-semibold tracking-[-0.04em]">
                The source becomes the only visual system still alive at runtime.
              </p>
              <p className="mt-4 text-sm leading-7 text-stone-300">
                No merged identity, no legacy target token system, no leftover decorative assets,
                and no silent styling compromises.
              </p>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.4)] backdrop-blur">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Final artifacts
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground">
                <li>`extraction-report.md`</li>
                <li>`protected-surface-map.md`</li>
                <li>`source-asset-inventory.md`</li>
                <li>`legacy-visual-purge.md`</li>
                <li>`asset-manifest.md`</li>
                <li>`modified-files.md`</li>
                <li>`assets-reemplazo-ia.md`</li>
              </ul>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-orange-50 p-6 shadow-[0_20px_60px_-40px_rgba(234,88,12,0.45)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-700">
                AI asset follow-up
              </p>
              <p className="mt-4 text-sm leading-7 text-orange-950">
                Every key copied asset must receive a business-adapted replacement brief, including
                cinematic prompts for Flux, Kling, or Runway and implementation notes for swapping
                the final asset without disturbing source fidelity.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
