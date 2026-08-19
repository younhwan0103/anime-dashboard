"use client";

import { curveMonotoneX } from "@visx/curve";
import { useState } from "react";
import { LineChart } from "@/components/charts/line-chart";
import { Line } from "@/components/charts/line";
import { Grid } from "@/components/charts/grid";
import { XAxis } from "@/components/charts/x-axis";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { ClientOnly } from "@/components/client-only";
import { Button } from "@/components/ui/button";
import { RANGES, type Range } from "@/lib/ranges";

function makeData(days: number) {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(2026, 7, i + 1),
    users: 900 + Math.round(Math.sin(i / 2) * 250 + i * 45),
  }));
}

export function VisitorsChart({ days: initialDays }: { days: Range }) {
  // ⚠️ 1단계 한정: URL에서 온 값을 "초기값"으로만 쓴다.
  // prop이 바뀌어도 useState는 다시 초기화되지 않으므로 상태 소스가 둘이다.
  // 2단계에서 이 useState를 걷어내고 URL 하나로 합친다.
  const [days, setDays] = useState<Range>(initialDays);
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
            <Line
              animate={false}
              curve={curveMonotoneX}
              dataKey="users"
              fadeEdges={false}
            />
            <XAxis />
            <ChartTooltip />
          </LineChart>
        </div>
      </ClientOnly>
    </div>
  );
}