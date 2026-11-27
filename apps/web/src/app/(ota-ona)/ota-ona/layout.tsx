import type { ReactNode } from "react";
import { ParentShell } from "@/components/parent/parent-shell";

export const metadata = { title: { default: "Ota-ona kabineti", template: "%s · Ota-ona" } };

/** Ota-ona kabineti — mobil-birinchi, pastki navigatsiya (PLAN 5-bo'lim) */
export default function ParentLayout({ children }: { children: ReactNode }) {
  return <ParentShell>{children}</ParentShell>;
}
