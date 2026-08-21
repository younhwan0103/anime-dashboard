"use client";

import { useState } from "react";
import { PieChart } from "@/components/charts/pie-chart";
import {
  PieSlice,
  type PieSliceHoverEffect,
} from "@/components/charts/pie-slice";
import { PieCenter } from "@/components/charts/pie-center";
import { ClientOnly } from "@/components/client-only";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CHANNELS, channelSharesRounded } from "@/lib/channels";

const EFFECTS = [
  { key: "translate", label: "밀어내기" },
  { key: "grow", label: "키우기" },
  { key: "none", label: "없음" },
] as const;

const pf = new Intl.NumberFormat("ko-KR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function LegendHoverDemo() {
  // 상태를 여기로 끌어올려야 범례와 조각이 같은 것을 본다.
  // PieChart 안에 두면 범례가 접근할 방법이 없다.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [effect, setEffect] = useState<PieSliceHoverEffect>("translate");
  const [showGlow, setShowGlow] = useState(true);

  const shares = channelSharesRounded();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {EFFECTS.map((e) => (
          <Button
            key={e.key}
            size="sm"
            variant={e.key === effect ? "default" : "outline"}
            onClick={() => setEffect(e.key)}
          >
            {e.label}
          </Button>
        ))}
        <Button
          size="sm"
          variant={showGlow ? "default" : "ghost"}
          onClick={() => setShowGlow((g) => !g)}
        >
          글로우
        </Button>
      </div>

      <ClientOnly fallback={<div className="h-65" />}>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
          <div className="flex h-65 shrink-0 items-center justify-center">
            <PieChart
              data={CHANNELS}
              size={220}
              innerRadius={60}
              padAngle={0.02}
              hoverOffset={10}
              // 이 두 줄이 controlled로 만든다. 주지 않으면 내부 상태로 동작.
              hoveredIndex={hoveredIndex}
              onHoverChange={setHoveredIndex}
            >
              {CHANNELS.map((_, i) => (
                <PieSlice
                  key={i}
                  index={i}
                  hoverEffect={effect}
                  showGlow={showGlow}
                />
              ))}
              <PieCenter defaultLabel="총 유입" />
            </PieChart>
          </div>

          {/* 범례 — hover만이 아니라 focus에도 반응해야 키보드로 쓸 수 있다 */}
          <ul className="w-full max-w-56 space-y-0.5 text-sm">
            {CHANNELS.map((c, i) => (
              <li key={c.label}>
                <button
                  type="button"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(i)}
                  onBlur={() => setHoveredIndex(null)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1 text-left transition-opacity",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    hoveredIndex === i
                      ? "bg-secondary"
                      : "hover:bg-secondary/50",
                    hoveredIndex !== null && hoveredIndex !== i && "opacity-50"
                  )}
                >
                  <span
                    aria-hidden
                    className="size-2.5 shrink-0 rounded-xs"
                    style={{ background: c.color }}
                  />
                  <span>{c.label}</span>
                  <span className="ml-auto tabular-nums text-muted-foreground">
                    {pf.format(shares[i])}%
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </ClientOnly>
    </div>
  );
}
