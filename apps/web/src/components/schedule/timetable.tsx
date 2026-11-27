"use client";

import { useEffect, useState } from "react";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import { type Lesson, lessonTimes, weekDays } from "@/mock/schedule";

/** Toshkent vaqti bo'yicha hafta kuni indeksi: 0 = Dushanba … 5 = Shanba, yakshanba → null */
function todayIndex(): number | null {
  const d = new Date(Date.now() + 5 * 60 * 60 * 1000).getUTCDay(); // 0 = yakshanba
  return d === 0 ? null : d - 1;
}

/**
 * Haftalik dars jadvali. Desktop: kun × dars jadvali; mobil: kun tanlash + darslar ro'yxati.
 * `detail` — fan ostida nima ko'rsatiladi (o'qituvchi, sinf, xona).
 */
export function Timetable({
  lessons,
  detail,
}: {
  lessons: Lesson[];
  detail: (l: Lesson) => string;
}) {
  const [today, setToday] = useState<number | null>(null);
  const [day, setDay] = useState(0);
  useEffect(() => {
    const ti = todayIndex();
    setToday(ti);
    if (ti !== null) setDay(ti);
  }, []);

  const rows = lessonTimes.filter((lt) => lessons.some((l) => l.lesson === lt.n));
  const at = (d: number, n: number) => lessons.find((l) => l.day === d && l.lesson === n);

  const Cell = ({ l }: { l?: Lesson }) =>
    l ? (
      <div className="rounded-md bg-surface-soft/40 px-2.5 py-2">
        <p className="truncate text-sm font-semibold">{l.subject}</p>
        <p className="line-clamp-2 text-xs text-muted-foreground">{detail(l)}</p>
      </div>
    ) : (
      <p className="px-2.5 py-2 text-xs text-muted-foreground/70">{t.schedule.free}</p>
    );

  return (
    <>
      {/* Mobil */}
      <div className="md:hidden">
        <div role="tablist" aria-label={t.schedule.view} className="grid grid-cols-6 gap-1">
          {weekDays.map((w, i) => (
            <button
              key={w.short}
              role="tab"
              aria-selected={day === i}
              onClick={() => setDay(i)}
              className={cn(
                "flex h-12 flex-col items-center justify-center rounded-md border text-sm font-semibold",
                "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                day === i ? "border-primary bg-primary text-primary-foreground" : "bg-card",
              )}
            >
              {w.short}
              {today === i && (
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    day === i ? "opacity-80" : "text-accent",
                  )}
                >
                  {t.schedule.today}
                </span>
              )}
            </button>
          ))}
        </div>
        <ul className="mt-3 space-y-2">
          {rows.map((lt) => (
            <li key={lt.n} className="flex items-stretch gap-3 rounded-lg border bg-card p-2">
              <div className="w-14 shrink-0 py-1 text-center">
                <p className="text-xs font-semibold">{t.schedule.lesson(lt.n)}</p>
                <p className="text-[11px] text-muted-foreground tabular-nums">{lt.start}</p>
              </div>
              <div className="min-w-0 flex-1">
                <Cell l={at(day, lt.n)} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Planshet / desktop */}
      <div className="hidden overflow-x-auto rounded-lg border bg-card md:block">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th scope="col" className="w-24 px-3 py-2.5 font-semibold" />
              {weekDays.map((w, i) => (
                <th
                  key={w.short}
                  scope="col"
                  className={cn("px-2 py-2.5 font-semibold", today === i && "text-accent")}
                >
                  {w.name}
                  {today === i && ` · ${t.schedule.today}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((lt) => (
              <tr key={lt.n} className="border-b align-top last:border-0">
                <th scope="row" className="px-3 py-2 text-left">
                  <p className="text-xs font-semibold">{t.schedule.lesson(lt.n)}</p>
                  <p className="text-[11px] font-normal text-muted-foreground tabular-nums">
                    {lt.start}–{lt.end}
                  </p>
                </th>
                {weekDays.map((w, i) => (
                  <td
                    key={w.short}
                    className={cn("px-1.5 py-1.5", today === i && "bg-accent-soft/20")}
                  >
                    <Cell l={at(i, lt.n)} />
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
