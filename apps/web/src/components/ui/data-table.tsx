import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  align?: "left" | "right";
  /** md (<768px) dan kichik ekranda yashirish */
  hideOnMobile?: boolean;
};

/**
 * Jadval. `mobileCard` berilsa, <640px da jadval o'rniga kartalar ro'yxati chiqadi.
 */
export function DataTable<T extends { id: string }>({
  columns,
  rows,
  empty,
  mobileCard,
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: React.ReactNode;
  mobileCard?: (row: T) => React.ReactNode;
}) {
  if (rows.length === 0 && empty) return <>{empty}</>;
  return (
    <>
      {mobileCard && (
        <ul className="divide-y sm:hidden">
          {rows.map((row) => (
            <li key={row.id}>{mobileCard(row)}</li>
          ))}
        </ul>
      )}
      <div className={cn("overflow-x-auto", mobileCard && "hidden sm:block")}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs tracking-wide text-muted-foreground uppercase">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={cn(
                    "px-3 py-3 font-semibold whitespace-nowrap first:pl-5 last:pr-5 sm:px-5",
                    c.align === "right" && "text-right",
                    c.hideOnMobile && "hidden md:table-cell",
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-3 py-3 align-middle whitespace-nowrap first:pl-5 last:pr-5 sm:px-5",
                      c.align === "right" && "text-right tabular-nums",
                      c.hideOnMobile && "hidden md:table-cell",
                    )}
                  >
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** Mobil karta qatori uchun umumiy shakl: chapda asosiy matn, o'ngda belgi */
export function MobileRow({
  href,
  leading,
  title,
  subtitle,
  trailing,
}: {
  href?: string;
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  const body = (
    <div className="flex items-center gap-3 px-5 py-3">
      {leading}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{title}</p>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
  return href ? (
    <Link
      href={href}
      className="block hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
    >
      {body}
    </Link>
  ) : (
    body
  );
}
