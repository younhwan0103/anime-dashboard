import { getStats } from "@/lib/data";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

// "use client" 없음 — 서버 컴포넌트다. 여기서 await해야 이 지점만 서스펜드된다.
export async function StatsRow() {
  const stats = await getStats();

  return (
    <>
      {stats.map((stat, i) => (
        <StatCard key={stat.title} {...stat} delay={i * 120} />
      ))}
    </>
  );
}

export function StatsRowSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }, (_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-5 w-14" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
