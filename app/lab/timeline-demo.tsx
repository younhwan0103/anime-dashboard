"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline } from "animejs";
import { Button } from "@/components/ui/button";

const TARGET = 12480;

// 두 애니메이션의 시간 관계. 이게 이 실험의 주제다.
const OFFSETS = [
  {
    key: "seq",
    label: "순차",
    pos: undefined, // 위치를 안 주면 앞 것이 끝난 뒤
    hint: "카드가 다 나타난 뒤 숫자가 시작한다 (600ms 지점)",
  },
  {
    key: "overlap",
    label: "겹침",
    pos: "-=300",
    hint: "앞 것이 끝나기 300ms 전에 시작한다",
  },
  {
    key: "together",
    label: "동시",
    pos: 0,
    hint: "둘 다 0ms에 시작한다 — 지금 StatCard와 같다",
  },
] as const;

const SPEEDS = [0.25, 1, 2] as const;

export function TimelineDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<ReturnType<typeof createTimeline> | null>(null);

  const [offset, setOffset] = useState<(typeof OFFSETS)[number]>(OFFSETS[0]);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const cardEl = cardRef.current;
    const numEl = numRef.current;
    if (!cardEl || !numEl) return;

    const counter = { n: 0 };

    const tl = createTimeline({
      autoplay: false, // 버튼으로 제어할 것이므로 자동 재생 끔
      defaults: { ease: "outQuad" },
      onUpdate: () => {
        numEl.textContent = Math.round(counter.n).toLocaleString("ko-KR");
        // 재생 중에도 슬라이더가 따라오게 한다
        const t = tlRef.current;
        if (t) setProgress(t.currentTime);
      },
    });

    tl.add(cardEl, {
      opacity: [0, 1],
      y: [16, 0],
      duration: 600,
    });

    // 세 번째 인자가 위치 지정자. delay를 계산하는 대신 "관계"를 적는다.
    tl.add(
      counter,
      {
        n: [0, TARGET],
        duration: 1600,
        ease: "outExpo",
      },
      offset.pos
    );

    tlRef.current = tl;
    setDuration(tl.duration);
    setProgress(0);

    return () => {
      tl.revert();
      tlRef.current = null;
    };
  }, [offset]);

  const tl = () => tlRef.current;

  return (
    <div className="space-y-4">
      {/* 위치 지정자 */}
      <div className="flex flex-wrap gap-2">
        {OFFSETS.map((o) => (
          <Button
            key={o.key}
            size="sm"
            variant={o.key === offset.key ? "default" : "outline"}
            onClick={() => setOffset(o)}
          >
            {o.label}
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{offset.hint}</p>

      {/* 재생 제어 — 하나의 시간축이라 호출도 한 번씩이다 */}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => tl()?.play()}>
          재생
        </Button>
        <Button size="sm" variant="outline" onClick={() => tl()?.pause()}>
          정지
        </Button>
        <Button size="sm" variant="outline" onClick={() => tl()?.reverse()}>
          되감기
        </Button>
        <Button size="sm" variant="outline" onClick={() => tl()?.restart()}>
          처음부터
        </Button>
      </div>

      {/* 속도 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">속도</span>
        {SPEEDS.map((s) => (
          <Button
            key={s}
            size="sm"
            variant="outline"
            onClick={() => {
              const t = tl();
              if (t) t.speed = s;
            }}
          >
            {s}×
          </Button>
        ))}
      </div>

      {/* 진행률 — 시간축을 손으로 잡는다 */}
      <div className="space-y-1">
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={10}
          value={progress}
          onChange={(e) => {
            const ms = Number(e.target.value);
            setProgress(ms);
            tl()?.pause();
            tl()?.seek(ms);
          }}
          className="w-full"
        />
        <p className="text-xs tabular-nums text-muted-foreground">
          {Math.round(progress)} / {Math.round(duration)} ms
        </p>
      </div>

      {/* 대상 — StatCard의 구조를 그대로 흉내낸다 */}
      <div
        ref={cardRef}
        style={{ opacity: 0 }}
        className="rounded-md border p-4"
      >
        <p className="mb-1 text-xs text-muted-foreground">총 방문자</p>
        <span ref={numRef} className="text-3xl font-bold tabular-nums">
          0
        </span>
      </div>
    </div>
  );
}
