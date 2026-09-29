import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { WorkTypes } from "@/components/WorkTypes";
import { Connect } from "@/components/Connect";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <WorkTypes />
      <Connect />
    </>
  );
}
