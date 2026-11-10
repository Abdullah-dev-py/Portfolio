"use client";

import { useState } from "react";
import {
  Buildings,
  CalendarCheck,
  GraduationCap,
  Megaphone,
  Plus,
  ShoppingBag,
  User,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import {
  Marquee,
  Parallax,
  ScrollProgress,
  Tilt,
} from "./work-visuals";
import { groupArts, ServicesHeroArt } from "./services-visuals";
import { pricingTiers, serviceGroups } from "@/lib/services-data";

const groupIcons: Record<string, typeof Buildings> = {
  agencies: Buildings,
  freelancers: User,
  ecommerce: ShoppingBag,
  services: CalendarCheck,
  schools: GraduationCap,
  marketing: Megaphone,
  ops: UsersThree,
};

const dotted = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

function ServiceCard({
  gId,
  i,
  title,
  get,
  build,
  freq,
  open,
  onToggle,
}: {
  gId: string;
  i: number;
  title: string;
  get: string;
  build: string;
  freq: string;
  open: boolean;
  onToggle: () => void;
}) {
  const key = `${gId}-${i}`;
  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
        open
          ? "border-accent-ink/40 shadow-[0_20px_45px_-24px_rgba(60,110,113,0.35)]"
          : "border-black/10 hover:border-black/25"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${key}-body`}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        <span className="mt-0.5 font-mono text-[11px] text-accent-ink">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold tracking-tight text-stone-950">
            {title}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-stone-600">
            {get}
          </span>
        </span>
        <span
          aria-hidden
          className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
            open ? "rotate-45 border-accent bg-accent text-white" : "border-black/15 text-stone-600"
          }`}
        >
          <Plus size={13} weight="bold" />
        </span>
      </button>
      <div
        id={`${key}-body`}
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 px-4 pb-4 pl-10">
            <p className="w-full text-[13px] leading-relaxed text-stone-600">{build}</p>
            <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-ink">
              {freq}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [openKey, setOpenKey] = useState<string | null>("agencies-0");

  return (
    <section id="services" aria-labelledby="services-h" className="relative overflow-hidden border-t border-black/10">
      <ScrollProgress />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(60,110,113,0.18),transparent_70%)]"
      />

      {/* Hero */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:pt-24">
        <div className="relative z-10 rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.08)] sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
                What I build &amp; maintain
              </p>
              <h1
                id="services-h"
                className="mt-3 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tighter text-stone-950 sm:text-6xl lg:text-7xl"
              >
                Bottleneck in.
                <br />
                System out.
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-stone-600">
                I automate repetitive work that doesn&apos;t need creativity — admin, tracking,
                follow-ups, data shuffling. Revenue + relationships stay with your team.
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Principles">
                {["Simple + on your tools", "Tested before your data", "No hidden API costs"].map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-black/10 bg-black/[0.04] px-3 py-1.5 font-mono text-[11px] text-stone-600"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-l-2 border-accent pl-4 text-xl font-semibold tracking-tight text-stone-950">
                Simplicity &gt; Features
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <Parallax amount={18}>
                <ServicesHeroArt />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 lg:mt-12">
        <Marquee items={serviceGroups.map((g) => g.title)} duration="48s" />
      </div>

      {/* Groups */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="pt-10 lg:pt-14">
            <h2 className="text-3xl font-semibold tracking-tighter text-stone-950 sm:text-4xl">
              A few examples
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-stone-600">
              A sample of the systems I build and look after.
            </p>
          </div>
        </Reveal>
        <div className="flex flex-col gap-5 pt-8 lg:pt-10">
          {serviceGroups.map((g, gi) => {
            const Art = groupArts[g.id];
            const Icon = groupIcons[g.id] ?? Buildings;
            const flip = gi % 2 === 1;
            return (
              <div key={g.id} id={`svc-${g.id}`} className="scroll-mt-32">
                <Reveal>
                  <article className="group grid overflow-hidden rounded-2xl border border-black/10 bg-white transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] lg:grid-cols-[0.9fr_1.1fr]">
                    {/* Visual */}
                    <Tilt
                      className={`relative min-h-[280px] border-black/10 bg-white/[0.02] max-lg:border-b lg:min-h-[420px] ${flip ? "lg:order-2 lg:border-l" : "lg:border-r"}`}
                    >
                      <div className="absolute inset-0" style={dotted} aria-hidden="true" />
                      <div className="relative flex h-full min-h-[280px] flex-col lg:min-h-[420px]">
                        <div className="flex items-center gap-2 p-5 pb-0">
                          <span className="flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent-ink">
                            <Icon size={19} aria-hidden />
                          </span>
                          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
                            {g.index}
                          </p>
                          <span className="wv-blink ml-auto size-2 rounded-full bg-accent" />
                        </div>
                        <div className="flex-1 scale-[1.14]">
                          <Art />
                        </div>
                      </div>
                    </Tilt>
                    {/* List */}
                    <div className="flex flex-col justify-center p-5 sm:p-7">
                      <h3 className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
                        {g.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-stone-600">{g.line}</p>
                      <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {g.services.map((s, i) => {
                          const k = `${g.id}-${i}`;
                          return (
                            <ServiceCard
                              key={s.title}
                              gId={g.id}
                              i={i}
                              title={s.title}
                              get={s.get}
                              build={s.build}
                              freq={s.freq}
                              open={openKey === k}
                              onToggle={() => setOpenKey(openKey === k ? null : k)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Pricing */}
        <div className="relative z-10 py-14 lg:py-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
              Pricing · pay once, then maintain
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tighter text-stone-950 sm:text-4xl">
              No subscriptions. No per-run fees.
            </h2>
            <p className="mt-2 max-w-xl text-[15px] text-stone-600">
              Running costs (hosting, APIs, messaging) passed at cost. No markup.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pricingTiers.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <Tilt className="h-full">
                  <article
                    className={`flex h-full flex-col rounded-2xl border p-6 transition-shadow hover:shadow-[0_24px_45px_-24px_rgba(0,0,0,0.35)] ${
                      p.featured
                        ? "border-accent-ink/40 bg-[#284B63] text-white"
                        : "border-black/10 bg-white"
                    }`}
                  >
                    <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${p.featured ? "text-white/70" : "text-accent-ink"}`}>
                      {p.name}
                    </p>
                    <p className={`mt-2 text-[14px] leading-snug ${p.featured ? "text-white/80" : "text-stone-600"}`}>
                      {p.desc}
                    </p>
                    <p className="mt-4 text-2xl font-semibold tracking-tight">{p.build}</p>
                    <p className={`font-mono text-[12px] ${p.featured ? "text-white/70" : "text-stone-600"}`}>
                      Maintenance discussed separately
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Includes">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${
                            p.featured ? "border-white/20 bg-white/10 text-white/85" : "border-black/10 bg-black/[0.04] text-stone-600"
                          }`}
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>

        {/* One rule */}
        <Reveal>
          <div className="relative z-10 mb-16 overflow-hidden rounded-[28px] border border-black/10 bg-white p-8 text-center shadow-[0_30px_60px_-30px_rgba(0,0,0,0.12)] sm:p-12 lg:mb-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(50%_80%_at_50%_0%,rgba(60,110,113,0.14),transparent_70%)]"
            />
            <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
              One rule
            </p>
            <p className="relative mx-auto mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tighter text-stone-950 sm:text-4xl">
              If a human can do it in under 3 minutes, don&apos;t automate it.
            </p>
            <div className="wv-flow-x relative mx-auto mt-6 h-[3px] w-40" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
