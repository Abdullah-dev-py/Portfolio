"use client";

import dynamic from "next/dynamic";

// Recharts ships its own chunk and hydrates only on the client,
// keeping it out of the Work page's initial JavaScript.
export const WorkMixChart = dynamic(
  () => import("@/components/ui/c-chart-21").then((m) => m.WorkMixChart),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="mx-auto aspect-square w-full max-w-md animate-pulse rounded-2xl bg-black/[0.04]"
      />
    ),
  },
);
