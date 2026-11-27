import type { ReactNode } from "react";

/** O'quvchi ko'rinishi (maket): direktor sidebar'isiz */
export default function StudentLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
