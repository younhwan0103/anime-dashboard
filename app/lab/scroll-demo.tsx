"use client";

import { useEffect, useRef, useState } from "react";
import { animate, onScroll, stagger } from "animejs";
import { Button } from "@/components/ui/button";

const MODES = [
  {
    key: "once",
    label: "한 번만",
    hint: "지금 Reveal과 같은 동작. 올라가도 되돌아가지 않는다.",
  },
  {
    key: "replay",
    label: "들어올 때마다",
    hint: "나가면 되감기고 다시 들어오면 재생.",
  },
  {
    key: "sync",
    label: "스크롤에 동기화",
    hint: "스크롤 위치 = 애니메이션 진행률. 손으로 감듯 움직인다.",
  },
] as const;

type Mode = (typeof MODES)[number];

export function ScrollDemo() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>(MODES[0]);
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const boxes = boxesRef.current;
    if (!scroller || !boxes) return;

    const targets = Array.from(boxes.children);
    if (targets.length === 0) return;

    // 모드를 바꾸면 스크롤 위치를 처음으로 되돌린다.
    // 안 그러면 이미 지나간 위치에서 시작해 차이가 안 보인다.
    scroller.scrollTop = 0;

    // ⚠️ 0단계에서 확인한 옵션 이름으로 맞추세요.
    const scrollSettings = {
      container: scroller,
      enter: "bottom top", // 대상의 아래가 컨테이너 위에 닿을 때
      leave: "top bottom",
      debug,
      ...(mode.key === "once" && {}),
      ...(mode.key === "replay" && { sync: "play reverse" }),
      ...(mode.key === "sync" && { sync: true }),
    };

    const scroll = onScroll(scrollSettings);

    const anim = animate(targets, {
      opacity: [0, 1],
      y: [40, 0],
      scale: [0.9, 1],
      duration: 700,
      ease: "outQuad",
      delay: stagger(100),
      autoplay: scroll,
    });

    return () => {
      // revert()는 애니메이션이 건드린 스타일을 되돌린다.
      anim.revert();
      scroll.revert();
    };
  }, [mode, debug]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <Button
            key={m.key}
            size="sm"
            variant={m.key === mode.key ? "default" : "outline"}
            onClick={() => setMode(m)}
          >
            {m.label}
          </Button>
        ))}
        <Button
          size="sm"
          variant={debug ? "default" : "ghost"}
          onClick={() => setDebug((d) => !d)}
        >
          디버그 마커
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">{mode.hint}</p>

      {/* 페이지 전체가 아니라 이 안에서만 스크롤한다.
          container 옵션을 쓰는 이유이자, 카드 안에서 실험이 끝나는 이유. */}
      <div
        ref={scrollerRef}
        className="h-80 overflow-y-auto rounded-md border bg-muted/30 p-4"
      >
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          ↓ 스크롤하세요
        </div>

        <div ref={boxesRef} className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{ opacity: 0 }}
              className="flex h-24 items-center justify-center rounded-md bg-secondary text-lg font-medium"
            >
              박스 {n}
            </div>
          ))}
        </div>

        <div className="h-64" />
      </div>
    </div>
  );
}
