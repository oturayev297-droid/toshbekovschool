import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { SidebarNav } from "./sidebar-nav";

export function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center px-5">
        <Link href="/" onClick={onNavigate} className="rounded-md focus-visible:outline-2">
          <Logo tone="light" size={34} />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <SidebarNav onNavigate={onNavigate} />
      </div>
      <div className="m-3 rounded-md bg-white/8 p-3 text-xs text-sidebar-foreground">
        <p className="font-semibold text-white">2026–2027 o&apos;quv yili</p>
        <p className="mt-0.5">2-chorak · 13-hafta</p>
      </div>
    </div>
  );
}

/** Desktop (≥1024px) uchun doimiy sidebar */
export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
      <SidebarBody />
    </aside>
  );
}
