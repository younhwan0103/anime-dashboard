"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CardFace,
  ITEMS,
  PanelFace,
  Stage,
  cardClass,
  gridClass,
  panelClass,
} from "./shared";

export function MotionLayout() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = ITEMS.find((i) => i.id === selected);

  return (
    <Stage>
      <div className={gridClass}>
        {ITEMS.map((it) =>
          it.id === selected ? (
            // 선택된 카드는 자리만 남긴다 — layoutId가 중복되면 안 된다
            <div key={it.id} className="invisible" />
          ) : (
            <motion.button
              key={it.id}
              layoutId={`motion-card-${it.id}`}
              className={cardClass}
              onClick={() => setSelected(it.id)}
            >
              <CardFace item={it} />
            </motion.button>
          )
        )}
      </div>

      <AnimatePresence>
        {item && (
          <motion.div
            key={item.id}
            // 카드와 같은 layoutId — motion이 두 위치를 이어준다
            layoutId={`motion-card-${item.id}`}
            className={panelClass}
            onClick={() => setSelected(null)}
          >
            <PanelFace item={item} />
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}
