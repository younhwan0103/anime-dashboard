/**
 * 채널별 유입 데이터.
 *
 * 도넛 차트와 표가 같은 배열을 봐야 하므로 공용 모듈로 둔다.
 * `data.ts`에 두지 않은 이유 — 그쪽은 `server-only`라
 * 클라이언트 컴포넌트에서 import할 수 없다. `ranges.ts`와 같은 부류다.
 */
export type Channel = {
  label: string;
  value: number;
  /** 팔레트 슬롯. 조각·범례·표가 같은 색을 쓰게 한다. */
  color: string;
};

export const CHANNELS: Channel[] = [
  { label: "검색", value: 4250, color: "var(--chart-1)" },
  { label: "직접 유입", value: 3120, color: "var(--chart-2)" },
  { label: "SNS", value: 2100, color: "var(--chart-3)" },
  { label: "레퍼럴", value: 1580, color: "var(--chart-4)" },
  { label: "기타", value: 1050, color: "var(--chart-5)" },
];

export const CHANNEL_TOTAL = CHANNELS.reduce((sum, c) => sum + c.value, 0);

/** 비중(%). 반올림하지 않은 원값을 돌려준다. */
export function channelShare(value: number): number {
  return (value / CHANNEL_TOTAL) * 100;
}
