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
import { TableToggleDemo } from "./table-toggle-demo";
import { LegendHoverDemo } from "./legend-hover-demo";
import { LayoutTransitionDemo } from "./layout-transition";
import { ChannelEditor } from "./channel-editor";
import { readChannels } from "@/lib/channel-store";

export const metadata: Metadata = {
  title: "실험실 | 애니메이션 대시보드",
  description: "shadcn/ui · Bklit UI · Anime.js 실험 공간",
};

// readChannels()가 쿠키를 읽으므로 요청별로 channels를 읽는다.
export default async function LabPage() {
  // 페이지가 한 번 읽어 세 실험에 같은 배열을 넘긴다.
  // 실험실 안에서 진실은 하나여야 한다.
  const channels = await readChannels();

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

          <LabSection
            title="차트 ↔ 표"
            description="shadcn Tabs + Table. 색을 못 읽는 사람에게도 같은 데이터를"
          >
            <TableToggleDemo channels={channels} />
          </LabSection>

          <LabSection
            title="범례 hover 연동"
            description="controlled hover — 범례와 조각이 같은 상태를 본다"
          >
            <LegendHoverDemo channels={channels} />
          </LabSection>

          <LabSection
            title="레이아웃 전환 3종"
            description="수동 FLIP / motion layoutId / View Transitions"
          >
            <LayoutTransitionDemo />
          </LabSection>

          <LabSection
            title="Server Actions + useOptimistic"
            description="쿠키에 저장하는 쓰기 경로. 낙관적 업데이트 on/off 비교"
          >
            <ChannelEditor channels={channels} />
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
