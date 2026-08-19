"use client";

import { curveMonotoneX } from "@visx/curve";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LineChart } from "@/components/charts/line-chart";
import { Line } from "@/components/charts/line";
import { Grid } from "@/components/charts/grid";
import { XAxis } from "@/components/charts/x-axis";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { ClientOnly } from "@/components/client-only";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RANGES, type Range } from "@/lib/ranges";

function makeData(days: number) {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(2026, 7, i + 1),
    users: 900 + Math.round(Math.sin(i / 2) * 250 + i * 45),
  }));
}

export function VisitorsChart({ days }: { days: Range }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // day는 이제 순수한 prop. 상태 소스는 URL 하나 !
  const data = makeData(days);

  function selectRange(next: Range) {
    // 같은 기간 재클릭 시 불필요한 왕복 차단!
    if (next === days) return;

    startTransition(() => {
      router.push(`/?range=${next}`, { scroll: false });
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {RANGES.map((r) => (
          <Button
            key={r}
            size="sm"
            variant={r === days ? "default" : "outline"}
            onClick={() => selectRange(r)}
          >
            {r}일
          </Button>
        ))}
      </div>

      <ClientOnly fallback={<div className="aspect-2/1 w-full" />}>
        <div
          aria-busy={isPending}
          className={cn(
            "w-full transition-opacity duration-200",
            isPending && "opacity-50"
          )}
        >
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
