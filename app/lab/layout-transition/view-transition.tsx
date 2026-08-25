"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import {
  CardFace,
  ITEMS,
  PanelFace,
  Stage,
  cardClass,
  gridClass,
  panelClass,
} from "./shared";

// startViewTransition은 TS 기본 lib에 없을 수 있다.
// 있으면 쓰고 없으면 그냥 상태만 바꾼다 (점진적 향상).
function withViewTransition(update: () => void) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => unknown;
  };

  if (typeof doc.startViewTransition !== "function") {
    update();
    return;
  }

  doc.startViewTransition(() => {
    // React는 기본이 비동기 배칭이다.
    // 콜백 안에서 DOM이 실제로 바뀌어 있어야 하므로 동기 커밋을 강제한다.
    flushSync(update);
  });
}

export function ViewTransition() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = ITEMS.find((i) => i.id === selected);

  return (
    <Stage>
      <div className={gridClass}>
        {ITEMS.map((it) =>
          it.id === selected ? (
            <div key={it.id} className="invisible" />
          ) : (
            <button
              key={it.id}
              // 같은 이름을 가진 요소가 동시에 둘이면 전환이 취소된다.
              // 선택된 카드를 감추는 이유가 이것이다.
              style={{ viewTransitionName: `vt-card-${it.id}` }}
              className={cardClass}
              onClick={() => withViewTransition(() => setSelected(it.id))}
            >
              <CardFace item={it} />
            </button>
          )
        )}
      </div>

      {item && (
        <div
          style={{ viewTransitionName: `vt-card-${item.id}` }}
          className={panelClass}
          onClick={() => withViewTransition(() => setSelected(null))}
        >
          <PanelFace item={item} />
        </div>
      )}
    </Stage>
  );
}
