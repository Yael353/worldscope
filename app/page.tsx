export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col gap-6">
      <h1 className="font-display text-4xl text-primary">Worldscope</h1>
      <div className="glass rounded-card p-6 glow-primary max-w-md">
        <p className="text-muted">Glaspanel med teal-glöd</p>
        <p className="font-mono text-2xl text-accent mt-2">10 542 318</p>
      </div>
      <div className="flex gap-4 font-mono text-sm">
        <span className="text-positive">↑ 2,3%</span>
        <span className="text-negative">↓ 1,1%</span>
        <span className="text-secondary">Sekundär</span>
      </div>
    </main>
  );
}
