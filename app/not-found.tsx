import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-16">
      <section
        aria-labelledby="notfound-h"
        className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
          Error 404
        </p>
        <h1
          id="notfound-h"
          className="mt-3 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tighter text-stone-950 sm:text-6xl lg:text-7xl"
        >
          Nothing lives here
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-stone-600">
          The page you're after doesn't exist — it may have moved, or the address
          is off by a letter.
        </p>
        <p className="mt-8 text-[15px] text-stone-600">
          Take me{" "}
          <Link
            href="/"
            className="font-medium text-stone-900 underline underline-offset-4 hover:text-accent-ink"
          >
            home
          </Link>
          , or see the{" "}
          <Link
            href="/work"
            className="font-medium text-stone-900 underline underline-offset-4 hover:text-accent-ink"
          >
            case studies
          </Link>{" "}
          instead.
        </p>
      </section>
    </div>
  );
}
