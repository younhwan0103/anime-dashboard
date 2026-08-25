"use client";

import { useOptimistic, useState, useTransition } from "react";
import { updateChannel, resetChannels } from "@/lib/actions";
import type { Channel } from "@/lib/channels";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Patch = { label: string; value: number };

export function ChannelEditorForm({ channels }: { channels: Channel[] }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [optimisticOn, setOptimisticOn] = useState(true);

  // 서버가 준 channels를 기준으로, 아직 확정 안 된 변경을 얹어 보여준다.
  const [optimistic, applyOptimistic] = useOptimistic(
    channels,
    (state: Channel[], patch: Patch) =>
      state.map((c) =>
        c.label === patch.label ? { ...c, value: patch.value } : c
      )
  );

  // 토글로 두 방식을 같은 화면에서 비교한다
  const shown = optimisticOn ? optimistic : channels;

  function submit(label: string, value: number) {
    setError(null);

    startTransition(async () => {
      // ⚠️ 반드시 transition 안에서, await 앞에서 호출해야 한다
      if (optimisticOn) applyOptimistic({ label, value });

      const result = await updateChannel(label, value);
      if (!result.ok) setError(result.message);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={optimisticOn ? "default" : "outline"}
          onClick={() => setOptimisticOn((v) => !v)}
        >
          낙관적 업데이트 {optimisticOn ? "켬" : "끔"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => startTransition(() => void resetChannels())}
        >
          초기화
        </Button>
        {isPending && (
          <span className="text-xs text-muted-foreground">저장 중…</span>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <ul
        className={cn(
          "space-y-2 transition-opacity",
          isPending && !optimisticOn && "opacity-50"
        )}
      >
        {shown.map((c) => (
          <li key={c.label} className="flex items-center gap-3">
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-xs"
              style={{ background: c.color }}
            />
            <span className="w-20 text-sm">{c.label}</span>

            <input
              type="range"
              min={0}
              max={8000}
              step={50}
              value={c.value}
              onChange={(e) => submit(c.label, Number(e.target.value))}
              className="flex-1"
              aria-label={`${c.label} 유입 값`}
            />

            <span className="w-16 text-right text-sm tabular-nums">
              {c.value.toLocaleString("ko-KR")}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground">
        슬라이더를 움직이면 서버에 저장됩니다 (지연 700ms). 새로고침해도
        유지되고, 대시보드의 도넛에도 반영됩니다.
      </p>
    </div>
  );
}
