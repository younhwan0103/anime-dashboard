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

export function channelTotal(channels: Channel[]): number {
  return channels.reduce((sum, c) => sum + c.value, 0);
}

/** 비중(%). 반올림하지 않은 원값. */
export function channelShare(value: number, total: number): number {
  return total === 0 ? 0 : (value / total) * 100;
}

/**
 * 표시용 비중(%). 소수 첫째 자리로 반올림하되,
 * 합이 정확히 100.0이 되도록 가장 큰 항목이 오차를 흡수한다.
 */
export function channelSharesRounded(channels: Channel[]): number[] {
  const total = channelTotal(channels);
  const raw = channels.map((c) => channelShare(c.value, total));
  const rounded = raw.map((v) => Math.round(v * 10) / 10);

  const sum = rounded.reduce((a, b) => a + b, 0);
  const drift = Math.round((100 - sum) * 10) / 10;

  const maxIndex = raw.indexOf(Math.max(...raw));
  rounded[maxIndex] = Math.round((rounded[maxIndex] + drift) * 10) / 10;

  return rounded;
}
