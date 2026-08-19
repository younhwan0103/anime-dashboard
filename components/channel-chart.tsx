"use client";

import { PieChart } from "@/components/charts/pie-chart";
import { PieSlice } from "@/components/charts/pie-slice";
import { PieCenter } from "@/components/charts/pie-center";
import { ClientOnly } from "@/components/client-only";

const data = [
  { label: "검색", value: 4250, color: "#0ea5e9" },
  { label: "직접 유입", value: 3120, color: "#a855f7" },
  { label: "SNS", value: 2100, color: "#f59e0b" },
  { label: "레퍼럴", value: 1580, color: "#ec4899" },
  { label: "기타", value: 1050, color: "#14b8a6" },
];

export function ChannelChart() {
  return (
    <ClientOnly fallback={<div className="h-[300px]" />}>
      <div className="flex h-[300px] items-center justify-center">
        <PieChart data={data} size={260} innerRadius={70} padAngle={0.02}>
          {data.map((_, i) => (
            <PieSlice key={i} index={i} />
          ))}
          <PieCenter defaultLabel="총 유입" />
        </PieChart>
      </div>
    </ClientOnly>
  );
}
