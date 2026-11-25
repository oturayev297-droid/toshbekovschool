"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { directorNav } from "@/config/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Asosiy menyu" className="flex flex-col gap-0.5">
      {directorNav.map(({ label, href, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-sidebar-foreground transition-colors",
              "hover:bg-sidebar-active hover:text-sidebar-active-foreground",
              "focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:outline-none",
              active && "bg-sidebar-active text-sidebar-active-foreground",
            )}
          >
            {active && (
              <span
                aria-hidden
                className="absolute top-2 bottom-2 left-0 w-1 rounded-r-full bg-accent-soft"
              />
            )}
            <Icon className="size-[18px] shrink-0" aria-hidden />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
