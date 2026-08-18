"use client";

import { useState } from "react";
import { LineChart } from "@/components/charts/line-chart";
import { Line } from "@/components/charts/line";
import { Grid } from "@/components/charts/grid";
import { XAxis } from "@/components/charts/x-axis";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { ClientOnly } from "@/components/client-only";
import { Button } from "@/components/ui/button";

const RANGES = [7, 14, 30] as const;

function makeData(days: number) {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(2026, 7, i + 1),
    users: 900 + Math.round(Math.sin(i / 2) * 250 + i * 45),
  }));
}

export function VisitorsChart() {
  const [days, setDays] = useState<number>(14);
  const data = makeData(days);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {RANGES.map((r) => (
          <Button
            key={r}
            size="sm"
            variant={r === days ? "default" : "outline"}
            onClick={() => setDays(r)}
          >
            {r}일
          </Button>
        ))}
      </div>

      <ClientOnly fallback={<div className="aspect-[2/1] w-full" />}>
        <div className="w-full">
          <LineChart data={data}>
            <Grid horizontal />
            <Line dataKey="users" animate={false} fadeEdges={false} />
            <XAxis />
            <ChartTooltip />
          </LineChart>
        </div>
      </ClientOnly>
    </div>
  );
}