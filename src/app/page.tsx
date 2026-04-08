export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">
        No migration running yet. Run{' '}
        <code className="font-mono text-foreground">/port-design-system-from-local-clone</code>{' '}
        with source path, target path, and commit hash.
      </p>
    </main>
  );
}