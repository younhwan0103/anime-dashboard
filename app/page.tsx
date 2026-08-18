import { StatCard } from "@/components/stat-card";
import { VisitorsChart } from "@/components/visitors-chart";
import { ChannelChart } from "@/components/channel-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Reveal } from "@/components/reveal";

const stats = [
  { title: "총 방문자", value: 12480, change: 12.5 },
  { title: "신규 가입", value: 1024, change: 8.2 },
  { title: "이탈률", value: 24.1, suffix: "%", decimals: 1, change: -3.4 },
  { title: "평균 체류시간", value: 3.7, suffix: "분", decimals: 1, change: 5.1 },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
            <p className="text-sm text-muted-foreground">
              최근 30일 지표를 확인하세요.
            </p>
          </div>
          <Button variant="outline">기간 변경</Button>
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
                <VisitorsChart />
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