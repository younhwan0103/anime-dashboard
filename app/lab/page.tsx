import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
            {/* 여기에 실험을 붙인다 */}
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
