"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  FileText,
  House,
  type LucideIcon,
  NotebookPen,
  UtensilsCrossed,
} from "lucide-react";
import { RoleHeader } from "@/components/layout/role-header";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { type ChildBundle, children as allChildren, parentAccount } from "@/mock/parent";

const ChildContext = createContext<ChildBundle>(allChildren[0]);
/** Tanlangan farzand — ota-ona faqat o'z farzandlarini ko'radi */
export const useChild = () => useContext(ChildContext);

const nav: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/ota-ona", label: "Bosh", icon: House },
  { href: "/ota-ona/hisobot", label: "Hisobot", icon: FileText },
  { href: "/ota-ona/tolov", label: "To'lov", icon: CreditCard },
  { href: "/ota-ona/menyu", label: "Menyu", icon: UtensilsCrossed },
  { href: "/ota-ona/testlar", label: "Testlar", icon: NotebookPen },
];

export function ParentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [childId, setChildId] = useState(parentAccount.childIds[0]);
  const child = allChildren.find((c) => c.student.id === childId) ?? allChildren[0];
  const isActive = (href: string) =>
    href === "/ota-ona"
      ? pathname === href || pathname === "/ota-ona/yotoqxona"
      : pathname.startsWith(href);

  return (
    <ChildContext.Provider value={child}>
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        <RoleHeader role={`Ota-ona · ${parentAccount.fullName}`} />

        <div className="mx-auto w-full max-w-3xl px-4">
          {/* Farzand tanlash */}
          <div
            role="radiogroup"
            aria-label="Farzand"
            className="flex gap-2 overflow-x-auto pt-4 pb-1"
          >
            {allChildren.map((c) => {
              const on = c.student.id === childId;
              return (
                <button
                  key={c.student.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setChildId(c.student.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-1.5 text-sm transition-colors",
                    "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card hover:bg-secondary",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-xs font-bold",
                      on ? "bg-white/15" : "bg-surface-soft text-primary",
                    )}
                  >
                    {initials(c.student.fullName)}
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block font-semibold">{c.student.fullName.split(" ")[0]}</span>
                    <span
                      className={cn("block text-xs", on ? "opacity-80" : "text-muted-foreground")}
                    >
                      {c.student.grade} sinf
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Planshet/desktop: yuqori navigatsiya */}
          <nav aria-label="Ota-ona bo'limlari" className="mt-3 hidden gap-1 border-b md:flex">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "-mb-px inline-flex h-11 items-center gap-2 border-b-2 border-transparent px-3 text-sm font-medium text-muted-foreground hover:text-foreground",
                  isActive(href) && "border-accent text-primary",
                )}
              >
                <Icon className="size-4" aria-hidden /> {label}
              </Link>
            ))}
          </nav>

          <main id="main" className="py-4 md:py-6">
            {children}
          </main>
        </div>

        {/* Mobil: pastki navigatsiya */}
        <nav
          aria-label="Ota-ona bo'limlari"
          className="fixed inset-x-0 bottom-0 z-30 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
        >
          <ul className="mx-auto grid max-w-md grid-cols-5">
            {nav.map(({ href, label, icon: Icon }) => {
              const on = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium",
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
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </ChildContext.Provider>
  );
}
