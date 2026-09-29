"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Gear,
  MagnifyingGlass,
  Play,
  Robot,
} from "@phosphor-icons/react";

/* ---------------- 3D pointer tilt (fine pointers, motion-safe) ---------------- */

export function Tilt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22 });
  const on = !reduce && fine;

  return (
    <motion.div
      className={className}
      style={
        on
          ? { rotateX: srx, rotateY: sry, transformPerspective: 900 }
          : undefined
      }
      onMouseMove={(e) => {
        if (!on) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- capability marquee (single, slow) ---------------- */

export function Marquee({ items, duration = "24s" }: { items: string[]; duration?: string }) {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-black/10 py-3 select-none">
      <div
        className="wv-marquee flex w-max will-change-transform"
        style={{ animationDuration: duration }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {items.map((t) => (
              <span
                key={`${half}-${t}`}
                className="flex items-center px-4 font-mono text-xs tracking-wide whitespace-nowrap text-stone-600"
              >
                <span className="mr-4 size-1.5 shrink-0 rounded-full bg-accent" />
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- mini system diagrams (pure SVG/CSS, looping) ---------------- */

export function ChatArt() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col justify-center gap-2.5 p-5">
      <div className="w-2/3 space-y-1.5 rounded-xl rounded-bl-sm bg-[#284B63] p-3">
        <div className="h-1.5 w-4/5 rounded bg-white/70" />
        <div className="h-1.5 w-3/5 rounded bg-white/40" />
      </div>
      <div className="ml-auto flex w-1/2 items-center gap-1.5 rounded-xl rounded-br-sm bg-accent px-3 py-3">
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="wv-blink size-1.5 rounded-full bg-white"
            style={{ animationDelay: `${d * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export function BarsArt() {
  const bars = [38, 62, 48, 80, 58, 92, 70];
  return (
    <div aria-hidden="true" className="flex h-full items-end justify-center gap-2 p-5">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`wv-bar w-5 rounded-sm ${i === 5 ? "bg-accent" : "bg-[#284B63]"}`}
          style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function TrendArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 120" className="h-full w-full p-4">
      <polyline
        points="8,100 45,84 80,88 115,60 150,64 192,28"
        fill="none"
        stroke="#3C6E71"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="192" cy="28" r="6" fill="#284B63" className="wv-pingdot" />
    </svg>
  );
}

export function RingArt() {
  const c = 2 * Math.PI * 46;
  return (
    <svg aria-hidden="true" viewBox="0 0 120 120" className="mx-auto h-full p-4">
      <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke="#3C6E71"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${0.78 * c} ${c}`}
        transform="rotate(-90 60 60)"
      />
      <g className="wv-orbit" style={{ transformOrigin: "60px 60px" }}>
        <circle cx="60" cy="14" r="5" fill="#ffffff" stroke="#3C6E71" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function BrowserArt() {
  const rows = [80, 60, 72];
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden p-5">
      <div className="h-full rounded-lg border border-black/10 bg-white/80 p-3">
        <div className="mb-2.5 flex gap-1">
          <span className="size-1.5 rounded-full bg-black/15" />
          <span className="size-1.5 rounded-full bg-black/15" />
          <span className="size-1.5 rounded-full bg-black/15" />
        </div>
        {rows.map((w, i) => (
          <div key={i} className="mb-2 flex items-center gap-2">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
              ✓
            </span>
            <div className="h-1.5 rounded bg-black/15" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <div className="wv-scan pointer-events-none absolute inset-x-5 top-5 h-8 bg-gradient-to-b from-transparent via-accent/25 to-transparent" />
    </div>
  );
}

export function PipeArt() {
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center gap-3 p-5">
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="wv-blink size-2 rounded-full bg-[#284B63]"
            style={{ animationDelay: `${d * 0.25}s` }}
          />
        ))}
      </div>
      <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
        <path d="M2 8 L42 26 M2 26 H42 M2 44 L42 26" stroke="#3C6E71" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="w-14 space-y-1.5 rounded-md border border-black/10 bg-white/80 p-2">
        <div className="h-1.5 w-full rounded bg-black/20" />
        <div className="h-1.5 w-4/5 rounded bg-black/15" />
        <div className="h-1.5 w-3/5 rounded bg-accent" />
      </div>
    </div>
  );
}

/* ---------------- animated pipeline: bottleneck → report ---------------- */

const flowNodes = [
  { icon: MagnifyingGlass, label: "Spot the bottleneck" },
  { icon: Robot, label: "Agent does the work" },
  { icon: Gear, label: "Wired into your tools" },
  { icon: Play, label: "The system executes" },
];

export function FlowDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-1 md:flex-row md:items-center">
      {flowNodes.map((n, i) => (
        <Fragment key={n.label}>
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-black/10 bg-white/70 p-4">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-ink"
            >
              <n.icon size={20} />
            </span>
            <p className="text-sm font-medium text-stone-900">{n.label}</p>
            <span
              aria-hidden="true"
              className="wv-blink ml-auto size-2 shrink-0 rounded-full bg-accent"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </div>
          {i < flowNodes.length - 1 && (
            <Fragment>
              <div aria-hidden="true" className="wv-flow-y mx-auto h-7 w-[3px] md:hidden" />
              <div aria-hidden="true" className="wv-flow-x hidden h-[3px] w-10 shrink-0 md:block" />
            </Fragment>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ---------------- 3D process deck (true loop, canted, motion-safe) ---------------- */

export type DeckStep = { n: string; t: string; d: string };

export function ProcessDeck({ steps }: { steps: DeckStep[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const goTo = (i: number) => {
    setExiting(active);
    setActive(((i % steps.length) + steps.length) % steps.length);
  };

  useEffect(() => {
    if (exiting === null) return;
    const t = window.setTimeout(() => setExiting(null), 800);
    return () => window.clearTimeout(t);
  }, [exiting]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      goTo(active + 1);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduce, paused, steps.length, active]);

  if (reduce) {
    return (
      <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
        {steps.map((s) => (
          <li key={s.n} className="border-t-2 border-stone-900/80 pt-4">
            <p aria-hidden="true" className="font-mono text-xs text-accent-ink">
              {s.n}
            </p>
            <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-stone-950">
              {s.t}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-stone-600">{s.d}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div style={{ perspective: 1600 }}>
      <div
        className="[transform:rotateX(9deg)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="grid" style={{ perspective: 1400 }}>
          {steps.map((s, i) => {
            const offset = (i - active + steps.length) % steps.length;
            const leaving = i === exiting && offset !== 0;
            return (
              <motion.article
                key={s.n}
                aria-hidden={offset !== 0}
                className="col-start-1 row-start-1 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_24px_45px_-28px_rgba(0,0,0,0.10)] [backface-visibility:hidden] sm:p-8"
                initial={false}
                animate={
                  offset === 0
                    ? { z: 0, y: 0, scale: 1, opacity: 1, zIndex: 3 }
                    : leaving
                      ? {
                          z: [0, -120, -240],
                          y: [0, 84, 48],
                          scale: [1, 0.9, 0.88],
                          opacity: [1, 0.85, 0.6],
                          zIndex: 1,
                        }
                      : offset === 1
                        ? { z: -120, y: 24, scale: 0.94, opacity: 0.85, zIndex: 2 }
                        : { z: -240, y: 48, scale: 0.88, opacity: 0.6, zIndex: 1 }
                }
                transition={
                  leaving
                    ? { duration: 0.85, times: [0, 0.55, 1], ease: "easeInOut" }
                    : { type: "spring", stiffness: 160, damping: 22 }
                }
              >
                <p aria-hidden="true" className="font-mono text-xs text-accent-ink">
                  {s.n}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl">
                  {s.t}
                </h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-stone-600">
                  {s.d}
                </p>
              </motion.article>
            );
          })}
        </div>
      <div className="relative z-10 mt-8 flex items-center gap-2" role="group" aria-label="Process steps">
        {steps.map((s, i) => (
          <button
            key={s.n}
            type="button"
            onClick={() => goTo(i)}
            aria-pressed={i === active}
            aria-label={`Show step ${s.n}: ${s.t}`}
            className={`flex h-11 min-w-11 items-center justify-center rounded-lg border font-mono text-xs transition-colors duration-300 ${
              i === active
                ? "border-[#353535] bg-[#353535] text-white"
                : "border-black/15 bg-white/60 text-stone-600 hover:border-black/30"
            }`}
            >
              {s.n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- scroll-linked motion (transform-only, motion-safe) ---------------- */

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

export function Parallax({
  children,
  className,
  amount = 28,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}
