"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CHANNELS } from "./channels";
import { COOKIE_NAME, MAX_AGE, parseOverrides } from "./channel-store";

const MAX_VALUE = 100_000;
const FAKE_LATENCY_MS = 700;

export type ActionResult = { ok: true } | { ok: false; message: string };

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function updateChannel(
  label: string,
  value: number
): Promise<ActionResult> {
  // 낙관적 업데이트의 효과를 눈으로 보려고 넣은 지연. 개발용.
  await sleep(FAKE_LATENCY_MS);

  // 검증은 서버에서. 클라이언트를 믿지 않는다.
  if (!CHANNELS.some((c) => c.label === label)) {
    return { ok: false, message: "알 수 없는 채널입니다" };
  }
  if (!Number.isFinite(value) || value < 0 || value > MAX_VALUE) {
    return {
      ok: false,
      message: `0 이상 ${MAX_VALUE.toLocaleString("ko-KR")} 이하만 가능합니다`,
    };
  }

  const store = await cookies();
  const overrides = parseOverrides(store.get(COOKIE_NAME)?.value);
  overrides[label] = value;

  // 쿠키 쓰기는 Server Action이나 Route Handler에서만 된다.
  // 서버 컴포넌트가 렌더 중에 쓰려고 하면 에러가 난다.
  store.set(COOKIE_NAME, JSON.stringify(overrides), {
    path: "/",
    maxAge: MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
  });

  // 이 경로의 캐시를 무효화해 서버 컴포넌트를 다시 렌더한다
  revalidatePath("/lab");

  return { ok: true };
}

export async function resetChannels(): Promise<ActionResult> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  revalidatePath("/lab");
  return { ok: true };
}
