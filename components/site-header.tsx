"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ClientOnly } from "./client-only";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/", label: "대시보드" },
  { href: "/lab", label: "실험실" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        <span className="text-sm font-semibold">anime-dashboard</span>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            // "/"는 정확히 일치해야 한다. startsWith로 하면 모든 경로에 걸린다.
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto">
          <ClientOnly fallback={<div className="size-8" />}>
            <ThemeToggle />
          </ClientOnly>
        </div>
      </div>
    </header>
  );
}
