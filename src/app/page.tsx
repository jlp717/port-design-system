export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-16">
      <section className="w-full rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Single-skill repository
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            /port-design-system-from-local-clone
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Full visual replacement for an existing Next.js target using a local source clone as
            the only visual source of truth. Preserve target text, content data, routes, and
            business logic.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <p className="text-sm font-medium text-foreground">Command</p>
          <code className="block overflow-x-auto rounded-2xl bg-muted px-4 py-3 font-mono text-sm text-foreground">
            /port-design-system-from-local-clone &quot;&lt;source-path&gt;&quot; &quot;&lt;target-path&gt;&quot;
          </code>
          <code className="block overflow-x-auto rounded-2xl bg-muted px-4 py-3 font-mono text-sm text-foreground">
            /port-design-system-from-local-clone &quot;&lt;source-path&gt;&quot; &quot;&lt;target-path&gt;&quot; &quot;&lt;commit-hash&gt;&quot;
          </code>
        </div>
      </section>
    </main>
  );
}
