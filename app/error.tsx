"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

// error.tsx는 반드시 클라이언트 컴포넌트여야 한다.
// 서버 렌더 중 발생한 에러를 브라우저에서 받아 그리고, reset()으로
// 다시 시도하려면 이벤트 핸들러가 필요하기 때문이다.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 실제 서비스라면 여기서 에러 리포팅 서비스로 보낸다
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-md space-y-4 px-6 text-center">
        <h1 className="text-xl font-semibold">데이터를 불러오지 못했습니다</h1>
        <p className="text-sm text-muted-foreground">
          잠시 후 다시 시도해 주세요.
        </p>
        {error.digest && (
          <p className="font-mono text-xs text-muted-foreground">
            오류 코드: {error.digest}
          </p>
        )}
        <Button onClick={reset}>다시 시도</Button>
      </div>
    </main>
  );
}
