"use client";

import { useEffect, type ReactNode } from "react";
import { animate } from "animejs";
import { useInView } from "@/hooks/use-in-view";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  useEffect(() => {
    if (!inView || !ref.current) return;

    const anim = animate(ref.current, {
      opacity: [0, 1],
      y: [24, 0],
      duration: 700,
      delay,
      ease: "outQuad",
    });

    return () => {
      anim.pause();
    };
  }, [inView, delay, ref]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
