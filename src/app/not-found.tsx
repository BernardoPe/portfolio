import Link from 'next/link';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8 py-24 text-center">
      <div className="text-sm uppercase tracking-[0.18em] text-primary mb-3 font-medium">404</div>
      <h1 className="font-display text-5xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-base text-muted-foreground">That page does not exist.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        ← Back home
      </Link>
    </div>
  );
}
