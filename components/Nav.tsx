"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const items = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Short frosted header: no feather, just the nav height. Scrolled content
  // stays slightly visible through a strong blur and tint. Motion values
  // only: no scroll listeners, no per-frame re-renders. Static fallback
  // under reduced motion.
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.72]);
  const blurPx = useTransform(scrollY, [0, 120], [0, 24]);
  const backgroundColor = useMotionTemplate`rgba(250, 247, 240, ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;
  const veilStyle = reduceMotion
    ? undefined
    : { backgroundColor, backdropFilter };

  return (
    <motion.header className="fixed inset-x-0 top-0 z-50">
      {/* frosted bar exactly the nav height; content behind stays blurred but visible */}
      <motion.div
        aria-hidden="true"
        style={veilStyle}
        className="pointer-events-none absolute inset-x-0 top-0 h-16 border-b border-black/10 bg-[#FAF7F0]/72 backdrop-blur-2xl"
      />
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" className="leading-tight" aria-label="Abdullah — home">
          <span className="block text-[15px] font-semibold tracking-tight text-stone-950">
            Abdullah
          </span>
          <span className="block text-[11px] text-stone-600">Agentic AI Engineer</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <p className="mr-3 flex items-center gap-2 text-[13px] text-stone-600">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-emerald-500" />
            Available for new projects
          </p>
          {items.map((i) => {
            const active = pathname === i.href;
            return (
              <Link
                key={i.href}
                href={i.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors active:translate-y-[1px] ${
                  active
                    ? "font-semibold text-stone-900"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {active &&
                  (reduceMotion ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-md bg-black/[0.06]"
                    />
                  ) : (
                    <motion.span
                      aria-hidden="true"
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-black/[0.06]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ))}
                <span className="relative">{i.label}</span>
              </Link>
            );
          })}
        </div>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-stone-800 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>
      {open ? (
        <div className="relative border-t border-black/10 bg-[#FAF7F0] px-4 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            {items.map((i) => {
              const active = pathname === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-2 py-2.5 text-[15px] hover:bg-black/5 ${
                    active
                      ? "bg-black/5 font-semibold text-stone-900"
                      : "text-stone-800"
                  }`}
                >
                  {i.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}
