import { AlertCircle } from "lucide-react";

interface SectionErrorProps {
  title?: string;
  message?: string;
}

export function SectionError({
  title = "오류",
  message = "데이터를 불러올 수 없습니다.",
}: SectionErrorProps) {
  return (
    <div className="rounded-xl border bg-card p-6 sm:col-span-2 lg:col-span-4">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <AlertCircle className="size-8 text-destructive" />
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
