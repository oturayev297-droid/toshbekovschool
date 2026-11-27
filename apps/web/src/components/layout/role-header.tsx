import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";

/**
 * O'quvchi / ota-ona ko'rinishlari uchun yengil sarlavha (direktor sidebar'isiz).
 * Maket: "Direktor paneli" havolasi faqat dizayn bosqichida — 2-bosqichda rol almashtirish bilan almashtiriladi.
 */
export function RoleHeader({ role, children }: { role: string; children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-3 px-4">
        <Link
          href="/"
          className="shrink-0 rounded-md focus-visible:outline-2"
          aria-label="Bosh sahifa"
        >
          <Logo size={28} withText={false} />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm leading-tight font-bold text-primary">ToshbekovSchool</p>
          <p className="truncate text-xs text-muted-foreground">{role}</p>
        </div>
        {children}
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          <span className="hidden sm:inline">Direktor paneli</span>
          <span className="sm:hidden">Panel</span>
        </Link>
      </div>
    </header>
  );
}
