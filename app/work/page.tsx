import type { Metadata } from "next";
import { Work } from "@/components/Work";
import { Connect } from "@/components/Connect";

export const metadata: Metadata = {
  title: "Selected work & case studies",
  description:
    "Mini case studies with concrete outcomes — hours saved, margin protected, faster replies: chat agents, business intelligence, reporting and research systems.",
  alternates: { canonical: "/work" },
  openGraph: {
    url: "/work",
    title: "Selected work & case studies — Abdullah Faisal",
    description:
      "Mini case studies with concrete outcomes — hours saved, margin protected, faster replies: chat agents, business intelligence, reporting and research systems.",
  },
};

export default function WorkPage() {
  return (
    <div className="pt-16">
      <Work />
      <Connect />
    </div>
  );
}
