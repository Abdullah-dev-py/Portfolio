"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  CalendarCheck,
  ChartBar,
  ChatsCircle,
  Eye,
  Lightning,
  Package,
  Receipt,
  Scales,
} from "@phosphor-icons/react/dist/ssr";

const details = [
  {
    icon: ChartBar,
    title: "Manual reporting eats the week",
    description:
      "Monthly SEO and client reports pulled by hand become scheduled pulls with month-over-month math, sent on schedule.",
    flow: ["Client sheets", "scheduled pull", "delivered report"],
  },
  {
    icon: ChatsCircle,
    title: "Support repeats the same answers",
    description:
      "Order status, stock, claims: chat agents answer all day and bring a human in only when needed.",
    flow: ["Customer asks", "agent replies", "human if needed"],
  },
  {
    icon: Scales,
    title: "Retainers leak on small extras",
    description:
      "Five-minute extras add up to unpaid days. Work is tracked against scope so overruns surface early.",
    flow: ["New request", "scope check", "flag to client"],
  },
  {
    icon: Eye,
    title: "Owners fly blind day to day",
    description:
      "Sales, stock and claims live in three places. One morning summary: what changed, what to do next.",
    flow: ["Daily numbers", "morning digest", "next actions"],
  },
  {
    icon: Lightning,
    title: "Leads go cold in minutes",
    description:
      "Ad leads get two qualifying questions the minute they arrive. Hot ones go straight to sales.",
    flow: ["Lead lands", "auto qualifier", "sales alert"],
  },
  {
    icon: Receipt,
    title: "Invoice payments verified automatically",
    description:
      "Transfer proofs are read and matched to open invoices automatically. Unclear ones get flagged.",
    flow: ["Payment proof", "auto match", "flag if unclear"],
  },
  {
    icon: CalendarCheck,
    title: "No-shows leave paid slots empty",
    description:
      "Confirmations go out twice daily, reschedules stay in one thread, freed slots go to a waitlist.",
    flow: ["Booking", "confirmations", "waitlist refill"],
  },
  {
    icon: Package,
    title: "Unconfirmed orders never ship",
    description:
      "Every order gets a pre-dispatch confirmation. Unconfirmed orders are held, not shipped.",
    flow: ["New order", "confirmation", "ship or hold"],
  },
];

const pad = (v: number) => String(v).padStart(2, "0");

export default function Component() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Shallow convex arc: the centered card sits forward while the outer cards
  // drop slightly and angle inward. The transform is written to an inner
  // wrapper so Embla keeps full control of the slide nodes used for looping.
  // Skipped under reduced motion.
  React.useEffect(() => {
    if (!api) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const view = api.rootNode().getBoundingClientRect();
      const mid = view.left + view.width / 2;
      api.slideNodes().forEach((node) => {
        const inner = node.querySelector<HTMLElement>("[data-curve]");
        if (!inner) return;
        const r = node.getBoundingClientRect();
        const d = (r.left + r.width / 2 - mid) / view.width;
        const c = Math.max(-1, Math.min(1, d * 1.5));
        const a = Math.abs(c);
        inner.style.transformOrigin = "50% 50%";
        inner.style.transform = `perspective(900px) rotateY(${(c * 8).toFixed(2)}deg) translateY(${(a * a * 16).toFixed(1)}px) scale(${(1 - a * 0.05).toFixed(3)})`;
      });
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    schedule();
    api.on("scroll", schedule).on("settle", schedule).on("reInit", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      api.off("scroll", schedule).off("settle", schedule).off("reInit", schedule);
      api.slideNodes().forEach((node) => {
        const inner = node.querySelector<HTMLElement>("[data-curve]");
        if (!inner) return;
        inner.style.transform = "";
        inner.style.transformOrigin = "";
      });
    };
  }, [api]);

  // Keep one canonical copy per card. Embla’s native loop repositions the
  // edge slides themselves, so card 01 can move into view after card 08.
  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, align: "center", slidesToScroll: 1, startIndex: 0 }}
      aria-label="Kinds of work carousel"
      className="w-full [mask-image:linear-gradient(to_right,transparent,black_36px,black_calc(100%_-_36px),transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_120px,black_calc(100%_-_120px),transparent)]"
    >
      <CarouselContent className="-ml-4 pt-6 pb-10">
        {details.map((item, index) => {
          const isActive = index === current;
          return (
          <CarouselItem
            key={item.title}
            className={cn("h-full pl-4 basis-[92%] sm:basis-[68%] lg:basis-[46%]")}
          >
            <div data-curve className="h-full will-change-transform">
            <Card className={`h-full w-full gap-0 overflow-hidden border-black/10 bg-[#F8F4EB] py-0 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_16px_40px_-16px_rgba(0,0,0,0.08),0_40px_80px_-40px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1 ${isActive ? "border-accent/50" : ""} min-h-[320px] sm:aspect-video sm:min-h-0`}>
              <CardContent className={`@container flex h-full min-h-0 flex-col p-[3.5cqw] transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-50"}`}>
                <div className="flex items-center justify-between gap-[2cqw]">
                  <p
                    aria-hidden="true"
                    className="font-mono text-[max(3.6cqw,13px)] text-accent-ink"
                  >
                    {pad(index + 1)}
                  </p>
                  <span
                    aria-hidden="true"
                    className={`flex size-[max(8.5cqw,40px)] items-center justify-center rounded-[max(2.5cqw,10px)] transition-colors duration-500 ${
                      isActive
                        ? "bg-stone-950 text-[#FAF7F0]"
                        : "bg-accent/10 text-accent-ink"
                    }`}
                  >
                    <item.icon size={24} className="h-[58%] w-[58%]" />
                  </span>
                </div>
                <h3 className="mt-[2cqw] min-h-[2.4em] text-[max(5.2cqw,20px)] font-semibold leading-[1.18] tracking-tight text-stone-900 sm:line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-[1.5cqw] min-h-[3em] text-[max(4.1cqw,15px)] leading-[1.5] text-stone-600 sm:line-clamp-2">
                  {item.description}
                </p>
                <ol
                  aria-label="How the build flows"
                  className="mt-auto flex flex-wrap items-center gap-x-[1.5cqw] gap-y-[1cqw] pt-[2.5cqw] font-mono text-[max(2.9cqw,11px)] leading-snug text-accent-ink"
                >
                  {item.flow.map((step, si) => (
                    <React.Fragment key={step}>
                      {si > 0 && (
                        <span aria-hidden="true" className="text-stone-400">
                          →
                        </span>
                      )}
                      <li className="whitespace-nowrap">{step}</li>
                    </React.Fragment>
                  ))}
                </ol>
              </CardContent>
            </Card>
            </div>
          </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="mt-1 flex items-center justify-center gap-4">
        <CarouselPrevious className="static top-auto left-auto size-11 translate-x-0 translate-y-0" />
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="h-1 w-20 overflow-hidden rounded-full bg-black/10 sm:w-28"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${((current + 1) / details.length) * 100}%` }}
            />
          </div>
          <p aria-live="polite" className="font-mono text-xs text-stone-600">
            {pad(current + 1)} / {pad(details.length)}
          </p>
        </div>
        <CarouselNext className="static top-auto right-auto size-11 translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  );
}
