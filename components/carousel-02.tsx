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
      "Monthly SEO and client reports pulled by hand. I replace that with scheduled pulls, month-over-month math, and client-ready output.",
    tags: ["Scheduled pulls", "MoM math", "Client-ready"],
  },
  {
    icon: ChatsCircle,
    title: "Support repeats the same answers",
    description:
      "Order status, stock, claims — asked all day. I build chat agents that handle the full flow and bring a human in only when needed.",
    tags: ["24/7 replies", "Orders + claims", "Human handoff"],
  },
  {
    icon: Scales,
    title: "Retainers leak on small extras",
    description:
      "Five-minute requests that add up to unpaid days. I track work against scope so out-of-scope is visible before margin is gone.",
    tags: ["Scope log", "Overrun flags"],
  },
  {
    icon: Eye,
    title: "Owners fly blind day to day",
    description:
      "Sales, inventory and claims live in three places. I send one morning summary with what changed and what to do next.",
    tags: ["One summary", "Next actions"],
  },
  {
    icon: Lightning,
    title: "Leads go cold in minutes",
    description:
      "Ad leads get a WhatsApp message with two qualifying questions the moment they arrive. Hot ones go straight to sales.",
    tags: ["Instant outreach", "Lead scoring", "Sales handoff"],
  },
  {
    icon: Receipt,
    title: "Payment proof, matched by hand",
    description:
      "Clients send payment screenshots on WhatsApp. The amounts get read, matched to open invoices, and marked for verify.",
    tags: ["Screenshot reading", "Auto-match", "Verify"],
  },
  {
    icon: CalendarCheck,
    title: "No-shows leave paid slots empty",
    description:
      "Confirmations go out morning and evening, reschedules happen on WhatsApp, and freed slots go straight to a waitlist.",
    tags: ["Confirmations", "Rescheduling", "Waitlist fill"],
  },
  {
    icon: Package,
    title: "Cash orders come back unopened",
    description:
      "Every cash-on-delivery order gets a WhatsApp confirmation before dispatch. Unconfirmed parcels never ship.",
    tags: ["COD confirm", "Address check", "Dispatch list"],
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
            <Card className={`h-full w-full gap-0 overflow-hidden border-black/10 bg-[#F8F4EB] py-0 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_16px_40px_-16px_rgba(0,0,0,0.08),0_40px_80px_-40px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1 ${isActive ? "border-accent/50" : ""} min-h-[300px] sm:aspect-video sm:min-h-0`}>
              <CardContent className={`@container flex h-full min-h-0 flex-col p-[3.5cqw] transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-70"}`}>
                <div className="flex items-center justify-between gap-[2cqw]">
                  <p
                    aria-hidden="true"
                    className="font-mono text-[max(3.4cqw,13px)] text-accent-ink"
                  >
                    {pad(index + 1)}
                  </p>
                  <span
                    aria-hidden="true"
                    className="flex size-[max(8.5cqw,40px)] items-center justify-center rounded-[max(2.5cqw,10px)] bg-accent/10 text-accent-ink"
                  >
                    <item.icon size={24} className="h-[58%] w-[58%]" />
                  </span>
                </div>
                <h3 className="mt-[2cqw] min-h-[2.4em] text-[max(5.2cqw,19px)] font-semibold leading-[1.18] tracking-tight text-stone-900 sm:line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-[1.5cqw] min-h-[3em] text-[max(4.1cqw,15px)] leading-[1.5] text-stone-600 sm:line-clamp-2">
                  {item.description}
                </p>
                <ul
                  aria-label="What you get"
                  className="mt-auto flex flex-wrap gap-[1.5cqw] overflow-hidden pt-[2cqw]"
                >
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-black/10 bg-black/[0.04] px-[2.5cqw] py-[0.9cqw] font-mono text-[max(3.2cqw,12px)] leading-snug text-stone-600"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            </div>
          </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="mt-1 flex items-center justify-center gap-3">
        <CarouselPrevious className="static top-auto left-auto size-11 translate-x-0 translate-y-0" />
        <p aria-live="polite" className="font-mono text-xs text-stone-600">
          {pad(current + 1)} / {pad(details.length)}
        </p>
        <CarouselNext className="static top-auto right-auto size-11 translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  );
}
