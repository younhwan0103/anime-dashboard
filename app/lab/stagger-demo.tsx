"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Button } from "@/components/ui/button";

const BOX_COUNT = 8;

const MODES = [
  { key: "first", label: "처음부터", from: 0 },
  { key: "center", label: "가운데부터", from: "center" },
  { key: "last", label: "끝부터", from: "last" },
] as const;

export function StaggerDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<(typeof MODES)[number]>(MODES[0]);
  // 같은 모드를 다시 눌러도 재생되도록 하는 카운터.
  // 값이 실제로 바뀌어야 useEffect가 다시 돈다.
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 셀렉터 대신 자식 요소를 직접 잡는다. 클래스·속성 변경에 영향받지 않는다.
    const targets = Array.from(el.children);
    if (targets.length === 0) return;

    const anim = animate(targets, {
      opacity: [0, 1],
      scale: [0.6, 1],
      y: [20, 0],
      duration: 600,
      ease: "outBack",
      delay: stagger(80, { from: mode.from }),
    });

    return () => {
      anim.pause();
    };
  }, [mode, runId]);

  function play(next: (typeof MODES)[number]) {
    setMode(next);
    setRunId((n) => n + 1); // 같은 모드여도 재생
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <Button
            key={m.key}
            size="sm"
            variant={m.key === mode.key ? "default" : "outline"}
            onClick={() => play(m)}
          >
            {m.label}
          </Button>
        ))}
        <Button size="sm" variant="ghost" onClick={() => play(mode)}>
          다시 재생
        </Button>
      </div>

      <div ref={containerRef} className="flex flex-wrap gap-2">
        {Array.from({ length: BOX_COUNT }, (_, i) => (
          <div
            key={i}
            style={{ opacity: 0 }}
            className="flex size-12 items-center justify-center rounded-md bg-secondary text-sm font-medium tabular-nums"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
