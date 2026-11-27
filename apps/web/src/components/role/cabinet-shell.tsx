"use client";

import { type ReactNode, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { RoleHeader } from "@/components/layout/role-header";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";

export type CabinetNavItem<K extends string> = { key: K; label: string; icon: LucideIcon };

/**
 * Rol kabineti qobig'i (o'qituvchi, o'quvchi, zavuch): mobilda pastki navigatsiya,
 * planshet/desktopda yuqori tablar. Maket: bo'limlar sahifa holatida almashadi
 * (2-bosqichda alohida route'lar + RBAC).
 */
export function CabinetShell<K extends string>({
  role,
  nav,
  children,
}: {
  role: string;
  nav: CabinetNavItem<K>[];
  children: (active: K, go: (k: K) => void) => ReactNode;
}) {
  const [active, setActive] = useState<K>(nav[0].key);
  const go = (k: K) => {
    setActive(k);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <RoleHeader role={role} />
      <div className="mx-auto w-full max-w-5xl px-4">
        <nav aria-label={t.cabinet.sections} className="mt-3 hidden gap-1 border-b md:flex">
          {nav.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-current={active === key ? "page" : undefined}
              onClick={() => go(key)}
              className={cn(
                "-mb-px inline-flex h-11 items-center gap-2 border-b-2 border-transparent px-3 text-sm font-medium text-muted-foreground hover:text-foreground",
                "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                active === key && "border-accent text-primary",
              )}
            >
              <Icon className="size-4" aria-hidden /> {label}
            </button>
          ))}
        </nav>
        <main id="main" className="py-4 md:py-6">
          {children(active, go)}
        </main>
      </div>

      <nav
        aria-label={t.cabinet.sections}
        className="fixed inset-x-0 bottom-0 z-30 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul
          className="mx-auto grid max-w-md"
          style={{ gridTemplateColumns: `repeat(${nav.length}, minmax(0, 1fr))` }}
        >
          {nav.map(({ key, label, icon: Icon }) => {
            const on = active === key;
            return (
              <li key={key}>
                <button
                  type="button"
                  aria-current={on ? "page" : undefined}
                  onClick={() => go(key)}
                  className={cn(
                    "flex h-16 w-full flex-col items-center justify-center gap-1 text-[11px] font-medium",
                    on ? "text-accent" : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-12 place-items-center rounded-full transition-colors",
                      on && "bg-accent-soft",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
