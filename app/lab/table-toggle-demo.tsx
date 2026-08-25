"use client";

import { PieChart } from "@/components/charts/pie-chart";
import { PieSlice } from "@/components/charts/pie-slice";
import { PieCenter } from "@/components/charts/pie-center";
import { ClientOnly } from "@/components/client-only";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Channel } from "@/lib/channels";

const nf = new Intl.NumberFormat("ko-KR");

const pf = new Intl.NumberFormat("ko-KR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function TableToggleDemo({ channels }: { channels: Channel[] }) {
  const total = channels.reduce((sum, channel) => sum + channel.value, 0);

  const shares = channels.map((channel) =>
    total === 0 ? 0 : (channel.value / total) * 100
  );

  return (
    <Tabs defaultValue="chart">
      <TabsList>
        <TabsTrigger value="chart">차트</TabsTrigger>
        <TabsTrigger value="table">표</TabsTrigger>
      </TabsList>

      <TabsContent value="chart">
        <ClientOnly fallback={<div className="h-65" />}>
          <div className="flex h-65 items-center justify-center">
            <PieChart
              data={channels}
              size={220}
              innerRadius={60}
              padAngle={0.02}
            >
              {channels.map((_, i) => (
                <PieSlice key={i} index={i} />
              ))}

              <PieCenter defaultLabel="총 유입" />
            </PieChart>
          </div>
        </ClientOnly>
      </TabsContent>

      <TabsContent value="table">
        <Table>
          <TableCaption>채널별 유입 — 최근 30일</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>채널</TableHead>
              <TableHead className="text-right">유입</TableHead>
              <TableHead className="text-right">비중</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {channels.map((c, i) => (
              <TableRow key={c.label}>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="size-2.5 shrink-0 rounded-xs"
                      style={{ background: c.color }}
                    />
                    {c.label}
                  </span>
                </TableCell>

                <TableCell className="text-right tabular-nums">
                  {nf.format(c.value)}
                </TableCell>

                <TableCell className="text-right tabular-nums">
                  {pf.format(shares[i])}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell>합계</TableCell>

              <TableCell className="text-right tabular-nums">
                {nf.format(total)}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {total === 0 ? "0.0%" : "100.0%"}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
