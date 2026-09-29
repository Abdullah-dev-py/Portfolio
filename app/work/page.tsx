import type { Metadata } from "next";
import { Work } from "@/components/Work";
import { Connect } from "@/components/Connect";

export const metadata: Metadata = {
  title: "Selected work — systems that get used every day",
  description:
    "Chat support agents, daily business intelligence, SEO reporting systems, scope trackers, websites and research pipelines. Built practical, built to last.",
};

export default function WorkPage() {
  return (
    <div className="pt-16">
      <Work />
      <Connect />
    </div>
  );
}
