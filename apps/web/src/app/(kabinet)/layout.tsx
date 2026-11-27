import type { ReactNode } from "react";

/** Xodim kabinetlari (o'qituvchi, zavuch) — maket: direktor sidebar'isiz */
export default function CabinetLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
