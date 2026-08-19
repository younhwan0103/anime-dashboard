/**
 * 대시보드 기간 선택 범위.
 *
 * 서버(page.tsx)와 클라이언트(visitors-chart.tsx)가 함께 쓰므로
 * "use client" 없는 순수 모듈로 둔다.
 */
export const RANGES = [7, 14, 30] as const;

export type Range = (typeof RANGES)[number];

export const DEFAULT_RANGE: Range = 14;

/**
 * URL 쿼리값을 Range로 좁힌다.
 *
 * searchParams의 값 타입은 `string | string[] | undefined`다.
 * - `?range=30`      → "30"
 * - `?range=7&range=30` → ["7", "30"]  (배열!)
 * - `?range=abc`     → 숫자가 아님
 * - 없음             → undefined
 *
 * 어느 경우든 허용된 값이 아니면 조용히 기본값으로 되돌린다.
 * (throw하면 잘못된 링크 하나가 페이지 전체를 죽인다)
 */
export function parseRange(value: string | string[] | undefined): Range {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return RANGES.includes(parsed as Range) ? (parsed as Range) : DEFAULT_RANGE;
}
