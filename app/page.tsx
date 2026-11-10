import { Hero } from "@/components/Hero";
import { WorkTypes } from "@/components/WorkTypes";
import { ServicesPreview } from "@/components/ServicesPreview";
import { EngagementBar } from "@/components/EngagementBar";
import { Statement } from "@/components/Statement";
import { Connect } from "@/components/Connect";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkTypes />
      <ServicesPreview />
      <EngagementBar />
      <Statement />
      <Connect />
    </>
  );
}
