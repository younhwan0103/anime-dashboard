"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type StatCardProps = {
  title: string;
  value: number;
  change: number;
  suffix?: string;
  decimals?: number;
  delay?: number;
};

export function StatCard({
  title,
  value,
  change,
  suffix = "",
  decimals = 0,
  delay = 0,
}: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const isUp = change >= 0;

  useEffect(() => {
    const numberEl = numberRef.current;
    const cardEl = cardRef.current;
    if (!numberEl || !cardEl) return;

    // ① 카드 등장 애니메이션
    const enter = animate(cardEl, {
      opacity: [0, 1],
      y: [16, 0],
      duration: 600,
      delay,
      ease: "outQuad",
    });

    // ② 숫자 카운트업 — 일반 JS 객체를 애니메이션한다
    const counter = { n: 0 };
    const countUp = animate(counter, {
      n: value,
      duration: 1600,
      delay,
      ease: "outExpo",
      onUpdate: () => {
        numberEl.textContent =
          counter.n.toLocaleString("ko-KR", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + suffix;
      },
    });

    // ③ 정리 — 컴포넌트가 사라지면 애니메이션도 중단
    return () => {
      enter.pause();
      countUp.pause();
    };
  }, [value, delay, decimals, suffix]);

  return (
    <Card ref={cardRef} style={{ opacity: 0 }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <span
            ref={numberRef}
            className="text-3xl font-bold tabular-nums tracking-tight"
          >
            0
          </span>
          <Badge variant={isUp ? "default" : "destructive"}>
            {isUp ? "▲" : "▼"} {Math.abs(change)}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
