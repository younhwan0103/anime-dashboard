import { Suspense } from "react";
import { ChannelChart } from "@/components/channel-chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { parseRange } from "@/lib/ranges";
import { StatsRow, StatsRowSkeleton } from "@/components/stats-row";
import {
  VisitorsSection,
  VisitorsSectionSkeleton,
} from "@/components/visitors-section";
import { ErrorBoundary } from "@/components/error-boundary";
import { SectionError } from "@/components/section-error";

// searchParams는 Promise라 async는 유지. 하지만 데이터는 여기서 await하지 않는다.
// await를 여기 두면 페이지 전체가 그만큼 기다린다.
export default async function Home(props: PageProps<"/">) {
  const { range } = await props.searchParams;
  const days = parseRange(range);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
            <p className="text-sm text-muted-foreground">
              최근 {days}일 지표를 확인하세요.
            </p>
          </div>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ErrorBoundary
            fallback={<SectionError message="지표를 불러오지 못했습니다" />}
          >
            <Suspense fallback={<StatsRowSkeleton />}>
              <StatsRow />
            </Suspense>
          </ErrorBoundary>
        </section>

        <section className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>방문자 추이</CardTitle>
                <CardDescription>일별 순 방문자 수</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<VisitorsSectionSkeleton />}>
                  <VisitorsSection days={days} />
                </Suspense>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={150}>
            <Card>
              <CardHeader>
                <CardTitle>유입 경로</CardTitle>
                <CardDescription>채널별 비중</CardDescription>
              </CardHeader>
              <CardContent>
                <ChannelChart />
              </CardContent>
            </Card>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
