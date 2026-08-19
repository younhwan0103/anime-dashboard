import "server-only";
import type { Range } from "@/lib/ranges";

export type VisitorPoint = {
  date: Date;
  users: number;
};

export type Stat = {
  title: string;
  value: number;
  change: number;
  suffix?: string;
  decimals?: number;
};

/** 실제 API 호출을 흉내내는 지연. 개발 중 pending 상태를 눈으로 보려고 */
const FAKE_LATENCY_MS = 400;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 오늘로부터 거슬러 올라간 최근 N일치 방문자 데이터.
 *
 * ⚠️ 날짜 기준은 "서버의 오늘"이다. 배포 서버가 UTC면 KST 사용자에게
 * 하루 어긋나 보인다.
 */
export async function getVisitors(days: Range): Promise<VisitorPoint[]> {
  await sleep(FAKE_LATENCY_MS);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: days }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - i));

    return {
      date,
      users: 900 + Math.round(Math.sin(i / 2) * 250 + i * 45),
    };
  });
}

export async function getStats(): Promise<Stat[]> {
  await sleep(FAKE_LATENCY_MS);

  return [
    { title: "총 방문자", value: 12480, change: 12.5 },
    { title: "신규 가입", value: 1024, change: 8.2 },
    { title: "이탈률", value: 24.1, suffix: "%", decimals: 1, change: -3.4 },
    {
      title: "평균 체류시간",
      value: 3.7,
      suffix: "분",
      decimals: 1,
      change: 5.1,
    },
  ];
}
