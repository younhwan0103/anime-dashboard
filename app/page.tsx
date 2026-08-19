import { StatCard } from "@/components/stat-card";
import { VisitorsChart } from "@/components/visitors-chart";
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
import { getVisitors, getStats } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { ClientOnly } from "@/components/client-only";

export default async function Home(props: PageProps<"/">) {
  const { range } = await props.searchParams;
  const days = parseRange(range);

  // 두 요청을 병렬로. 순차 await하면 워터폴이 생긴다.
  const [visitors, stats] = await Promise.all([
    getVisitors(days),
    getStats(),
  ]);

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
          <ClientOnly fallback={<div className="size-8" />}>
            <ThemeToggle />
          </ClientOnly>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.title} {...stat} delay={i * 120} />
          ))}
        </section>

        <section className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>방문자 추이</CardTitle>
                <CardDescription>일별 순 방문자 수</CardDescription>
              </CardHeader>
              <CardContent>
                <VisitorsChart days={days} data={visitors} />
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
