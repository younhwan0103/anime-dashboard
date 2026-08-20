import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaggerDemo } from "./stagger-demo";
import { ScrollDemo } from "./scroll-demo";
import { NumberDemo } from "./number-demo";
import { TimelineDemo } from "./timeline-demo";

export const metadata: Metadata = {
  title: "실험실 | 애니메이션 대시보드",
  description: "shadcn/ui · Bklit UI · Anime.js 실험 공간",
};

// 데이터도 searchParams도 없다 → 빌드 시 정적 생성(○)된다.
export default function LabPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-16">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">실험실</h1>
          <p className="text-sm text-muted-foreground">
            컴포넌트와 애니메이션을 하나씩 붙여보는 공간.
          </p>
        </header>

        <div className="space-y-6">
          <LabSection
            title="스태거"
            description="수동 delay 계산 vs Anime.js stagger()"
          >
            <StaggerDemo />
          </LabSection>

          <LabSection
            title="스크롤 트리거"
            description="직접 만든 use-in-view vs Anime.js onScroll()"
          >
            <ScrollDemo />
          </LabSection>

          <LabSection
            title="숫자 트위닝"
            description="Anime.js(명령형) / NumberFlow(선언형) / CSS @property(네이티브)"
          >
            <NumberDemo />
          </LabSection>

          <LabSection
            title="타임라인"
            description="animate() 두 개 vs createTimeline() 하나의 시간축"
          >
            <TimelineDemo />
          </LabSection>
        </div>
      </div>
    </main>
  );
}

function LabSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children ?? (
          <p className="text-sm text-muted-foreground">아직 비어 있음</p>
        )}
      </CardContent>
    </Card>
  );
}
