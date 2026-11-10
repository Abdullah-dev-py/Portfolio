import type { Metadata } from "next";
import { Services } from "@/components/Services";
import { Connect } from "@/components/Connect";

export const metadata: Metadata = {
  title: "Automation & AI services",
  description:
    "Agency retainers, freelancer follow-ups, chat agents, order confirmations, invoice tracking and team ops — practical builds on the tools you already use.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title: "Automation & AI services — Abdullah Faisal",
    description:
      "Agency retainers, freelancer follow-ups, chat agents, order confirmations, invoice tracking and team ops — practical builds on the tools you already use.",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <Services />
      <Connect />
    </div>
  );
}
