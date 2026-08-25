"use client";

import { PieChart } from "@/components/charts/pie-chart";
import { PieSlice } from "@/components/charts/pie-slice";
import { PieCenter } from "@/components/charts/pie-center";
import { ClientOnly } from "@/components/client-only";
import type { Channel } from "@/lib/channels";

export function ChannelChart({ channels }: { channels: Channel[] }) {
  return (
    <ClientOnly fallback={<div className="h-75" />}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-65 items-center justify-center">
          <PieChart data={channels} size={220} innerRadius={60} padAngle={0.02}>
            {channels.map((_, i) => (
              <PieSlice key={i} index={i} />
            ))}
            <PieCenter defaultLabel="총 유입" />
          </PieChart>
        </div>

        <ul className="w-full space-y-1.5 text-sm">
          {channels.map((c) => (
            <li key={c.label} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-xs"
                style={{ background: c.color }}
              />
              <span className="text-foreground">{c.label}</span>
              <span className="ml-auto tabular-nums text-muted-foreground">
                {c.value.toLocaleString("ko-KR")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ClientOnly>
  );
}
