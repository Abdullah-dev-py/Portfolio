import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { serviceGroups } from "@/lib/services-data";
import { Reveal } from "./Reveal";

const homeIds = ["agencies", "freelancers", "ecommerce", "services", "marketing"];
const rows = homeIds
  .map((id) => serviceGroups.find((g) => g.id === id))
  .filter((g): g is (typeof serviceGroups)[number] => Boolean(g));

export function ServicesPreview() {
  return (
    <section aria-labelledby="preview-h" className="border-t border-black/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
                Services
              </p>
              <h2
                id="preview-h"
                className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tighter text-stone-950 sm:text-5xl"
              >
                What I take off your plate
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden items-center gap-1.5 text-sm font-medium text-stone-900 underline-offset-4 hover:text-accent-ink hover:underline sm:inline-flex"
            >
              Services
            </Link>
          </div>
        </Reveal>
        <div className="mt-10">
          {rows.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.04}>
              <Link
                href={`/services#svc-${g.id}`}
                className="group grid gap-2 border-t border-black/10 py-5 last:border-b sm:grid-cols-12 sm:gap-6"
              >
                <span className="flex items-baseline gap-4 sm:col-span-5">
                  <span aria-hidden="true" className="font-mono text-xs text-accent-ink">
                    {g.index}
                  </span>
                  <span className="text-xl font-semibold tracking-tight text-stone-950 transition-colors group-hover:text-accent-ink sm:text-2xl">
                    {g.title}
                  </span>
                </span>
                <span className="flex items-center gap-4 sm:col-span-7 sm:justify-between sm:gap-6">
                  <span className="text-[15px] leading-relaxed text-stone-600">
                    {g.line}
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 text-stone-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Link
          href="/services"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline-offset-4 hover:text-accent-ink hover:underline sm:hidden"
        >
          Services
        </Link>
      </div>
    </section>
  );
}
