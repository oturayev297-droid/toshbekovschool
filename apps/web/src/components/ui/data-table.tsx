import * as React from "react";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  align?: "left" | "right";
  /** Mobilda yashirish */
  hideOnMobile?: boolean;
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  empty,
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: React.ReactNode;
}) {
  if (rows.length === 0 && empty) return <>{empty}</>;
  return (
    <div className="overflow-x-auto">
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
  );
}
