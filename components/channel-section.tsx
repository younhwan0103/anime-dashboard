import { readChannels } from "@/lib/channel-store";
import { ChannelChart } from "@/components/channel-chart";
import { Skeleton } from "@/components/ui/skeleton";

// 서버. 쿠키를 읽어 도넛에 넘긴다.
export async function ChannelSection() {
  const channels = await readChannels();
  return <ChannelChart channels={channels} />;
}

export function ChannelSectionSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="size-55 rounded-full" />
      <div className="w-full space-y-1.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>
    </div>
  );
}
