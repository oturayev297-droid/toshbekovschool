"use client";

import { useEffect, useState } from "react";
import { tashkentISODate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { meals, type WeekMenu } from "@/mock/kitchen";

/** Haftalik menyu: desktopda kun × ovqat jadvali, mobilda kun kartalari. Bugungi kun belgilanadi. */
export function WeekMenuView({ week }: { week: WeekMenu }) {
  const [today, setToday] = useState<string>();
  useEffect(() => setToday(tashkentISODate(new Date())), []);

  return (
    <>
      {/* Mobil: kun kartalari */}
      <ul className="space-y-3 md:hidden">
        {week.days.map((d) => {
          const isToday = d.date === today;
          return (
            <li
              key={d.date}
              className={cn(
                "rounded-lg border bg-card p-4",
                isToday && "border-accent ring-2 ring-accent-soft",
              )}
            >
              <p className="flex items-center justify-between text-sm font-semibold">
                {d.day}
                {isToday && (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">
                    Bugun
                  </span>
                )}
              </p>
              <dl className="mt-2 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
                {meals.map((m) => (
                  <div key={m.key} className="contents">
                    <dt className="text-xs leading-5 text-muted-foreground">{m.label}</dt>
                    <dd>{d[m.key] || "—"}</dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>

      {/* Planshet/desktop: jadval */}
      <div className="hidden overflow-x-auto rounded-lg border bg-card md:block">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b text-left text-xs tracking-wide text-muted-foreground uppercase">
              <th scope="col" className="w-32 px-4 py-3 font-semibold">
                Kun
              </th>
              {meals.map((m) => (
                <th key={m.key} scope="col" className="px-4 py-3 font-semibold">
                  {m.label} <span className="font-normal normal-case">· {m.time}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {week.days.map((d) => {
              const isToday = d.date === today;
              return (
                <tr
                  key={d.date}
                  className={cn("border-b align-top last:border-0", isToday && "bg-accent-soft/30")}
                >
                  <th scope="row" className="px-4 py-3 text-left font-semibold">
                    {d.day}
                    {isToday && (
                      <span className="block text-xs font-medium text-accent">Bugun</span>
                    )}
                  </th>
                  {meals.map((m) => (
                    <td key={m.key} className="px-4 py-3">
                      {d[m.key] || <span className="text-muted-foreground">—</span>}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
