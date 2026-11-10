"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { links } from "@/lib/links";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function RiseLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className="block">{children}</span>;
  return (
    <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <FluidParticlesBackground
        particleCount={550}
        className="h-auto min-h-[54dvh]"
      >
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-20 text-center sm:px-6 md:pb-14 md:pt-24">
          <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tighter sm:text-6xl lg:text-7xl">
             <RiseLine delay={0.1}>I build simple, reliable</RiseLine>
             <RiseLine delay={0.22}>automation systems that remove real business bottlenecks.</RiseLine>
           </h1>
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          >
            <Link
              href="/work"
              className="inline-flex items-center rounded-md bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 active:translate-y-[1px]"
            >
              See the work
            </Link>
            <a
              href={links.emailHref}
              className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white/60 px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:border-black/30 hover:bg-black/5 active:translate-y-[1px]"
            >
              <EnvelopeSimple size={16} aria-hidden /> Email me
            </a>
          </motion.div>
        </div>
      </FluidParticlesBackground>
    </section>
  );
}
