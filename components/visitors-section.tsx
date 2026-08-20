import { getVisitors } from "@/lib/data";
import { VisitorsChart } from "@/components/visitors-chart";
import { Skeleton } from "@/components/ui/skeleton";
import type { Range } from "@/lib/ranges";

export async function VisitorsSection({ days }: { days: Range }) {
  const data = await getVisitors(days);
  return <VisitorsChart days={days} data={data} />;
}

export function VisitorsSectionSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[7, 14, 30].map((r) => (
          <Skeleton key={r} className="h-7 w-14" />
        ))}
      </div>
      <Skeleton className="aspect-2/1 w-full" />
    </div>
  );
}