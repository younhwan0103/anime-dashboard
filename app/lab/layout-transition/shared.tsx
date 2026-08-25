"use client";

import type { ReactNode } from "react";

export type Item = {
  id: number;
  title: string;
  value: string;
  detail: string;
};

export const ITEMS: Item[] = [
  {
    id: 1,
    title: "총 방문자",
    value: "12,480",
    detail: "지난 30일 대비 12.5% 증가. 검색 유입이 성장을 이끌었다.",
  },
  {
    id: 2,
    title: "신규 가입",
    value: "1,024",
    detail: "8.2% 증가. 랜딩 페이지 개편 이후 전환율이 올랐다.",
  },
  {
    id: 3,
    title: "이탈률",
    value: "24.1%",
    detail: "3.4%p 감소. 첫 화면 로딩 개선이 영향을 준 것으로 보인다.",
  },
];

/** 격자 안의 작은 카드 내용 */
export function CardFace({ item }: { item: Item }) {
  return (
    <>
      <p className="text-xs text-muted-foreground">{item.title}</p>
      <p className="text-2xl font-bold tabular-nums">{item.value}</p>
    </>
  );
}

/** 펼쳐진 패널 내용 */
export function PanelFace({ item }: { item: Item }) {
  return (
    <>
      <p className="text-xs text-muted-foreground">{item.title}</p>
      <p className="text-4xl font-bold tabular-nums">{item.value}</p>
      <p className="mt-3 text-sm text-muted-foreground">{item.detail}</p>
      <p className="mt-4 text-xs text-muted-foreground">
        아무 곳이나 클릭하면 닫힙니다
      </p>
    </>
  );
}

/** 세 방식이 같은 무대를 쓰도록 하는 컨테이너 */
export function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-64 rounded-md border bg-muted/20 p-4">
      {children}
    </div>
  );
}

export const gridClass = "grid grid-cols-3 gap-3";
export const cardClass =
  "flex flex-col items-start rounded-md border bg-card p-3 text-left";
export const panelClass =
  "absolute inset-4 flex flex-col items-start rounded-md border bg-card p-5 text-left";
