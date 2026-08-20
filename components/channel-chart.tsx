"use client";

import { PieChart } from "@/components/charts/pie-chart";
import { PieSlice } from "@/components/charts/pie-slice";
import { PieCenter } from "@/components/charts/pie-center";
import { ClientOnly } from "@/components/client-only";

// 색은 팔레트 슬롯 순서대로. 조각과 범례가 같은 배열을 참조해야
// 둘이 어긋나지 않는다. (상태 소스 하나 — 기간 선택 때와 같은 원칙)
const data = [
  { label: "검색", value: 4250, color: "var(--chart-1)" },
  { label: "직접 유입", value: 3120, color: "var(--chart-2)" },
  { label: "SNS", value: 2100, color: "var(--chart-3)" },
  { label: "레퍼럴", value: 1580, color: "var(--chart-4)" },
  { label: "기타", value: 1050, color: "var(--chart-5)" },
];

export function ChannelChart() {
  return (
    <ClientOnly fallback={<div className="h-75" />}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-65 items-center justify-center">
          <PieChart data={data} size={220} innerRadius={60} padAngle={0.02}>
            {data.map((_, i) => (
              <PieSlice key={i} index={i} />
            ))}
            <PieCenter defaultLabel="총 유입" />
          </PieChart>
        </div>

        {/* 라이트 모드에서 3색이 표면 대비 3:1 미만이라
            레이블이 보이는 범례가 필수다. 색만으로는 식별이 안 된다. */}
        <ul className="w-full space-y-1.5 text-sm">
          {data.map((d) => (
            <li key={d.label} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-xs"
                style={{ background: d.color }}
              />
              <span className="text-foreground">{d.label}</span>
              <span className="ml-auto tabular-nums text-muted-foreground">
                {d.value.toLocaleString("ko-KR")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ClientOnly>
  );
}
