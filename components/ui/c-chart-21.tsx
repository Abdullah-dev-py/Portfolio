"use client";

import { Cell, Pie, PieChart } from "recharts";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { slice: "automation", value: 60, fill: "var(--color-automation)" },
  { slice: "ai", value: 30, fill: "var(--color-ai)" },
  { slice: "human", value: 10, fill: "url(#work-mix-human-pattern)" },
];

const chartConfig = {
  value: { label: "Share" },
  automation: { label: "Automation", color: "var(--chart-1)" },
  ai: { label: "AI", color: "var(--chart-2)" },
  human: { label: "Human in the loop", color: "var(--chart-3)" },
} satisfies ChartConfig;

const legend = [
  { key: "automation", label: "Automation", pct: "60%" },
  { key: "ai", label: "AI", pct: "30%" },
  { key: "human", label: "Human in the loop", pct: "10%" },
];

function LegendSwatch({ slice }: { slice: string }) {
  if (slice === "human") {
    return (
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
        style={{
          background:
            "repeating-linear-gradient(45deg, #3C6E71 0 1.5px, rgba(217, 217, 217, 0.9) 1.5px 4px)",
        }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
      style={{ background: `var(--color-${slice})` }}
    />
  );
}

export function WorkMixChart() {
  return (
    <div className="w-full">
      <CardHeader className="items-center justify-items-center pb-0 text-center">
        <CardTitle className="text-2xl tracking-tight text-stone-950">
          Agentic AI &amp; automation
        </CardTitle>
        <CardDescription className="text-[15px]">
          Where the work actually goes
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <ChartContainer
          config={chartConfig}
          className="wv-pie-in mx-auto aspect-square max-h-[340px]"
        >
          <PieChart accessibilityLayer>
            <defs>
              <pattern
                id="work-mix-human-pattern"
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
              >
                <rect
                  width="6"
                  height="6"
                  fill="#D9D9D9"
                  opacity="0.55"
                />
                <path
                  d="M0,6 L6,0 M-2,2 L2,-2 M4,8 L8,4"
                  stroke="#3C6E71"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
              </pattern>
            </defs>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="min-w-44"
                  hideLabel
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="text-muted-foreground">
                        {chartConfig[name as keyof typeof chartConfig]?.label ??
                          name}
                      </span>
                      <span className="font-semibold tabular-nums text-foreground">
                        {value}%
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="slice"
              innerRadius={52}
              cornerRadius={5}
              paddingAngle={3}
              stroke="var(--background)"
              strokeWidth={3}
              // Recharts' JS entrance animation restarts and glitches under
              // React 19 (tooltip/parent re-renders replay it). Disabled here —
              // the parent Reveal owns the entrance motion instead.
              isAnimationActive={false}
            >
              {chartData.map((entry) => (
                <Cell key={entry.slice} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <ul className="mx-auto mt-2 flex max-w-[280px] flex-col gap-2">
          {legend.map((item, i) => (
            <li
              key={item.key}
              className="wv-rise flex items-center justify-between gap-2 text-[15px]"
              style={{ animationDelay: `${0.55 + i * 0.12}s` }}
            >
              <span className="flex items-center gap-2 text-stone-600">
                <LegendSwatch slice={item.key} />
                {item.label}
              </span>
              <span className="font-mono font-medium tabular-nums text-stone-900">
                {item.pct}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </div>
  );
}

export default WorkMixChart;
