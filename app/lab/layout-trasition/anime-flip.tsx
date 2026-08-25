"use client";

import { useRef, useState } from "react";
import { animate } from "animejs";
import {
  CardFace,
  ITEMS,
  PanelFace,
  Stage,
  cardClass,
  gridClass,
  panelClass,
} from "./shared";

export function AnimeFlip() {
  const [selected, setSelected] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // First 단계에서 잰 카드 위치를 다음 프레임까지 들고 있어야 한다
  const firstRectRef = useRef<DOMRect | null>(null);

  const item = ITEMS.find((i) => i.id === selected);

  function open(id: number, cardEl: HTMLElement) {
    // F(irst) — 바뀌기 전 위치를 잰다
    firstRectRef.current = cardEl.getBoundingClientRect();
    setSelected(id);
  }

  // L(ast) → I(nvert) → P(lay)
  // ref 콜백으로 패널이 DOM에 붙는 순간을 잡는다
  function onPanelMount(el: HTMLDivElement | null) {
    panelRef.current = el;
    const first = firstRectRef.current;
    if (!el || !first) return;

    const last = el.getBoundingClientRect();

    // I — 패널을 카드가 있던 자리·크기로 되돌려놓는다
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;

    // transform-origin이 top left여야 위 계산이 맞는다
    el.style.transformOrigin = "top left";

    // P — 그 상태에서 원래 자리로 애니메이션
    animate(el, {
      translateX: [dx, 0],
      translateY: [dy, 0],
      scaleX: [sx, 1],
      scaleY: [sy, 1],
      duration: 400,
      ease: "outQuad",
    });

    firstRectRef.current = null;
  }

  return (
    <Stage>
      <div className={gridClass}>
        {ITEMS.map((it) =>
          it.id === selected ? (
            <div key={it.id} className="invisible" />
          ) : (
            <button
              key={it.id}
              className={cardClass}
              onClick={(e) => open(it.id, e.currentTarget)}
            >
              <CardFace item={it} />
            </button>
          )
        )}
      </div>

      {item && (
        <div
          ref={onPanelMount}
          className={panelClass}
          onClick={() => setSelected(null)}
        >
          <PanelFace item={item} />
        </div>
      )}
    </Stage>
  );
}
