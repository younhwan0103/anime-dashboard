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

/**
 * 표시용 비중(%). 소수 첫째 자리로 반올림하되,
 * 합이 정확히 100.0이 되도록 가장 큰 항목이 오차를 흡수한다.
 *
 * 그냥 반올림하면 35.1 + 25.8 + 17.4 + 13.1 + 8.7 = 100.1이라
 * 열을 손으로 더해보는 사람에게 틀린 표로 보인다.
 */
export function channelSharesRounded(): number[] {
  const raw = CHANNELS.map((c) => channelShare(c.value));
  const rounded = raw.map((v) => Math.round(v * 10) / 10);

  const sum = rounded.reduce((a, b) => a + b, 0);
  const drift = Math.round((100 - sum) * 10) / 10;

  // 가장 큰 항목이 흡수한다. 같은 오차라도 상대 비중이 가장 작기 때문.
  const maxIndex = raw.indexOf(Math.max(...raw));
  rounded[maxIndex] = Math.round((rounded[maxIndex] + drift) * 10) / 10;

  return rounded;
}
