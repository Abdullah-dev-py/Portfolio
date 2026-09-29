import type { Metadata } from "next";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Connect } from "@/components/Connect";

export const metadata: Metadata = {
  title: "Services — automation systems that fix real bottlenecks",
  description:
    "Agency retainers, freelancer follow-ups, WhatsApp sales agents, COD confirmation, fee tracking, speed-to-lead, team ops. Simple builds on tools you already use.",
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <Services />
      <Skills />
      <Connect />
    </div>
  );
}
