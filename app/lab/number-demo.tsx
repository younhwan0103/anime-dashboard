"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate } from "animejs";
import NumberFlow from "@number-flow/react";
import { Button } from "@/components/ui/button";

const TARGET = 12480;

export function NumberDemo() {
  const [value, setValue] = useState(0);

  return (
    <div className="space-y-4">
      <Button size="sm" onClick={() => setValue((v) => (v === 0 ? TARGET : 0))}>
        {value === 0 ? "올리기" : "내리기"}
      </Button>

      {/* 셋을 동시에 출발시켜야 차이가 보인다 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Cell label="Anime.js — 명령형">
          <AnimeCounter value={value} />
        </Cell>
        <Cell label="NumberFlow — 선언형">
          <NumberFlow value={value} locales="ko-KR" />
        </Cell>
        <Cell label="CSS @property — 네이티브">
          <CssCounter value={value} />
        </Cell>
      </div>
    </div>
  );
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-md border p-4">
      <p className="mb-2 text-xs text-muted-foreground">{label}</p>
      <div className="text-3xl font-bold tabular-nums">{children}</div>
    </div>
  );
}

function AnimeCounter({ value }: { value: number }) {
  const elRef = useRef<HTMLSpanElement>(null);
  // 현재 표시값을 기억한다. 0부터 다시 시작하지 않고 이어서 트윈하기 위해.
  const currentRef = useRef(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const counter = { n: currentRef.current };

    const anim = animate(counter, {
      n: value,
      duration: 1600,
      ease: "outExpo",
      onUpdate: () => {
        currentRef.current = counter.n;
        el.textContent = Math.round(counter.n).toLocaleString("ko-KR");
      },
    });

    return () => {
      anim.pause();
    };
  }, [value]);

  return <span ref={elRef}>0</span>;
}

function CssCounter({ value }: { value: number }) {
  // JS는 data 속성만 토글한다. 보간은 전부 브라우저가 한다.
  return <span className="css-counter" data-active={value > 0} />;
}
