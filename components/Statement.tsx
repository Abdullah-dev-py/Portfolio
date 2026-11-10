import { Reveal } from "./Reveal";

export function Statement() {
  return (
    <section aria-label="Positioning" className="border-t border-black/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 text-center sm:px-6 lg:py-16">
        <Reveal>
          <p className="font-mono text-sm text-accent-ink">
            Real systems. Real outcomes.
          </p>
          <p className="text-balance mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tighter sm:text-4xl">
            Less friction. More business.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
