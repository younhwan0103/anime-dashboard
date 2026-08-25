import "server-only";
import { cookies } from "next/headers";
import { CHANNELS, type Channel } from "./channels";

const COOKIE_NAME = "channel-overrides";
const MAX_AGE = 60 * 60 * 24 * 30; // 30일

/** { "검색": 5000, "SNS": 1200 } 형태 */
type Overrides = Record<string, number>;

function parseOverrides(raw: string | undefined): Overrides {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};

    // 쿠키는 사용자가 조작할 수 있다. 숫자만 통과시킨다.
    const result: Overrides = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
        result[key] = value;
      }
    }
    return result;
  } catch {
    // 망가진 쿠키 하나가 페이지를 죽이면 안 된다. parseRange와 같은 방침.
    return {};
  }
}

/** 기본값에 쿠키의 덮어쓰기를 얹어 돌려준다. */
export async function readChannels(): Promise<Channel[]> {
  const store = await cookies();
  const overrides = parseOverrides(store.get(COOKIE_NAME)?.value);

  return CHANNELS.map((c) =>
    c.label in overrides ? { ...c, value: overrides[c.label] } : c
  );
}

export { COOKIE_NAME, MAX_AGE, parseOverrides };
