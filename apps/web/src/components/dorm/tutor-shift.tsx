"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Moon, MoonStar, Send, Undo2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/form";
import { PrivateBadge } from "@/components/ui/private-badge";
import { type DormGroup, schoolConfig } from "@/config/school";
import { t } from "@/i18n";
import { tashkentTime } from "@/lib/date";
import { dormBadge } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { DormStatus } from "@/mock/data";
import { type DormStudent, notSleptReasons, shift } from "@/mock/dorm";

type Filter = "all" | DormStatus;
const filterKeys: Filter[] = ["all", "belgilanmagan", "uxladi", "uxlamadi"];
const UNDO_MS = schoolConfig.dorm.undoSeconds * 1000;

/** Bekor qilish oynasidagi belgi: qachon yuboriladi va bosishdan oldingi holat */
type Pending = { until: number; prev: DormStudent };

/**
 * Tarbiyachi smena ko'rinishi (mobil-birinchi). Har tarbiyachi faqat o'z guruhini ko'radi.
 * "Uxladi/Uxlamadi" bosilgach `undoSeconds` soniyalik bekor qilish oynasi; shundan keyin
 * ota-onaga xabar ketadi (6-bosqichda BullMQ delayed job). Bekor qilinsa hech narsa yuborilmaydi.
 */
export function TutorShift({ initial }: { initial: DormStudent[] }) {
  const [group, setGroup] = useState<DormGroup>("qiz");
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");
  const [pending, setPending] = useState<Record<string, Pending>>({});
  const [now, setNow] = useState(() => Date.now());
  /** Bekor qilingan belgilar: id → vaqt (jurnaldagi "Bekor qilindi" holati) */
  const [cancelled, setCancelled] = useState<Record<string, string>>({});

  const hasPending = Object.keys(pending).length > 0;

  // Teskari sanoq va muddati o'tganlarini yuborish
  useEffect(() => {
    if (!hasPending) return;
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [hasPending]);

  useEffect(() => {
    const due = Object.entries(pending).filter(([, p]) => p.until <= now);
    if (!due.length) return;
    const sentAt = tashkentTime(new Date());
    setRows((rs) =>
      rs.map((r) => (due.some(([id]) => id === r.id) ? { ...r, notifiedAt: sentAt } : r)),
    );
    setPending((ps) => {
      const next = { ...ps };
      for (const [id] of due) delete next[id];
      return next;
    });
  }, [now, pending]);

  const groupRows = useMemo(() => rows.filter((r) => r.group === group), [rows, group]);
  const counts = useMemo(
    () => ({
      all: groupRows.length,
      uxladi: groupRows.filter((r) => r.status === "uxladi").length,
      uxlamadi: groupRows.filter((r) => r.status === "uxlamadi").length,
      belgilanmagan: groupRows.filter((r) => r.status === "belgilanmagan").length,
    }),
    [groupRows],
  );
  const marked = counts.uxladi + counts.uxlamadi;
  // Bekor qilish oynasidagi karta filtrdan qat'i nazar ko'rinib turadi (tugma yo'qolmasin)
  const visible =
    filter === "all" ? groupRows : groupRows.filter((r) => r.status === filter || pending[r.id]);
  const tutors = shift.tutors[group];

  const update = (id: string, patch: Partial<DormStudent>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  // Vaqt avtomatik "hozir" (keyin tahrirlanadi). Uxladi → uxlash vaqti; Uxlamadi → tekshirilgan vaqt.
  const mark = (r: DormStudent, status: "uxladi" | "uxlamadi") => {
    const time = tashkentTime(new Date());
    setCancelled((c) => {
      const next = { ...c };
      delete next[r.id];
      return next;
    });
    setPending((ps) => ({
      ...ps,
      // Oyna ichida qayta bosilsa — sanoq yangilanadi, asl (bosishdan oldingi) holat saqlanadi
      [r.id]: { until: Date.now() + UNDO_MS, prev: ps[r.id]?.prev ?? r },
    }));
    setNow(Date.now());
    update(
      r.id,
      status === "uxladi"
        ? {
            status,
            sleep: time,
            checkedAt: undefined,
            reason: undefined,
            reasonNote: undefined,
            notifiedAt: undefined,
          }
        : { status, sleep: "", checkedAt: time, notifiedAt: undefined },
    );
  };

  const undo = (id: string) => {
    const p = pending[id];
    if (!p) return;
    setRows((rs) => rs.map((r) => (r.id === id ? p.prev : r)));
    setCancelled((c) => ({ ...c, [id]: tashkentTime(new Date()) }));
    setPending((ps) => {
      const next = { ...ps };
      delete next[id];
      return next;
    });
  };

  return (
    <div>
      {/* Maket: guruh tanlash (haqiqiy tizimda tarbiyachi faqat o'z guruhini ko'radi) */}
      <div
        role="radiogroup"
        aria-label={t.dorm.groupPicker}
        className="mb-3 grid grid-cols-2 gap-1 rounded-lg border bg-card p-1"
      >
        {schoolConfig.dorm.groups.map(({ key, floor }) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={group === key}
            onClick={() => {
              setGroup(key);
              setFilter("all");
            }}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
              "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
              group === key ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
            )}
          >
            {t.dorm.groups[key]}
            <span className="block text-xs font-normal opacity-80">{t.dorm.floor(floor)}</span>
          </button>
        ))}
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        {t.dorm.duty}: <span className="font-semibold text-foreground">{tutors.duty}</span> ·{" "}
        {t.dorm.assistant}:{" "}
        <span className="font-semibold text-foreground">{tutors.assistant}</span>
      </p>

      {/* Jarayon */}
      <Card className="sticky top-[4.5rem] z-10 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-semibold">
            {t.dorm.marked}:{" "}
            <span className="tabular-nums">
              {marked} / {counts.all}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            {counts.belgilanmagan > 0 ? t.dorm.left(counts.belgilanmagan) : t.dorm.allMarked}
          </p>
        </div>
        <div
          className="mt-2 h-2 rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={counts.all}
          aria-valuenow={marked}
          aria-label={t.dorm.progress}
        >
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${counts.all ? (marked / counts.all) * 100 : 0}%` }}
          />
        </div>
        <div
          role="radiogroup"
          aria-label={t.dorm.filter}
          className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 [scrollbar-width:none]"
        >
          {filterKeys.map((f) => (
            <button
              key={f}
              role="radio"
              aria-checked={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors",
                "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {t.dorm.filters[f]}
              <span className="tabular-nums opacity-80">{counts[f]}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* O'quvchi kartalari */}
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {visible.map((r) => {
          const p = pending[r.id];
          const left = p ? Math.max(0, Math.ceil((p.until - now) / 1000)) : 0;
          return (
            <li key={r.id} className="min-w-0">
              <Card
                className={cn(
                  "p-4",
                  r.status === "uxlamadi" && "border-destructive/40",
                  r.status === "belgilanmagan" && "border-dashed",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold">{r.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.dorm.room(r.room)} · {t.dorm.grade(r.grade)}
                    </p>
                  </div>
                  <Badge variant={dormBadge[r.status].variant}>{dormBadge[r.status].label}</Badge>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    aria-pressed={r.status === "uxladi"}
                    onClick={() => mark(r, "uxladi")}
                    className={cn(
                      "inline-flex h-14 items-center justify-center gap-2 rounded-md border-2 text-base font-semibold transition-colors",
                      "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                      r.status === "uxladi"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary/25 bg-surface-soft/40 text-primary hover:bg-surface-soft",
                    )}
                  >
                    {r.status === "uxladi" ? (
                      <Check className="size-5" />
                    ) : (
                      <Moon className="size-5" />
                    )}
                    {t.dorm.markSlept}
                  </button>
                  <button
                    type="button"
                    aria-pressed={r.status === "uxlamadi"}
                    onClick={() => mark(r, "uxlamadi")}
                    className={cn(
                      "inline-flex h-14 items-center justify-center gap-2 rounded-md border-2 text-base font-semibold transition-colors",
                      "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                      r.status === "uxlamadi"
                        ? "border-destructive bg-destructive text-white"
                        : "border-destructive/25 bg-destructive-soft/40 text-destructive hover:bg-destructive-soft",
                    )}
                  >
                    {r.status === "uxlamadi" ? (
                      <X className="size-5" />
                    ) : (
                      <MoonStar className="size-5" />
                    )}
                    {t.dorm.markNotSlept}
                  </button>
                </div>

                {/* Bekor qilish oynasi */}
                {p && (
                  <div
                    role="status"
                    className="mt-3 overflow-hidden rounded-md border border-primary/30 bg-surface-soft/40"
                  >
                    <div className="flex items-center justify-between gap-3 px-3 py-2">
                      <p className="text-sm font-medium">{t.dorm.undoPending(left)}</p>
                      <button
                        type="button"
                        onClick={() => undo(r.id)}
                        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
                      >
                        <Undo2 className="size-4" aria-hidden /> {t.dorm.undo}
                      </button>
                    </div>
                    <div className="h-1 bg-primary/15">
                      <div
                        className="h-1 bg-primary transition-[width] duration-200 ease-linear"
                        style={{ width: `${Math.max(0, ((p.until - now) / UNDO_MS) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {r.status === "uxlamadi" && (
                  <fieldset className="mt-3 rounded-md border border-dashed border-accent/40 bg-accent-soft/15 p-3">
                    <legend className="flex flex-wrap items-center gap-2 px-1 text-xs font-semibold">
                      {t.dorm.reason} <PrivateBadge label={t.privacy.directorTutor} />
                    </legend>
                    <div
                      role="radiogroup"
                      aria-label={t.dorm.reasonGroup}
                      className="grid grid-cols-2 gap-1.5"
                    >
                      {notSleptReasons.map((o) => (
                        <button
                          key={o}
                          type="button"
                          role="radio"
                          aria-checked={r.reason === o}
                          onClick={() => update(r.id, { reason: o })}
                          className={cn(
                            "h-10 rounded-md border text-sm font-medium transition-colors",
                            "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                            r.reason === o
                              ? "border-accent bg-accent text-accent-foreground"
                              : "bg-card hover:bg-secondary",
                          )}
                        >
                          {t.dorm.reasons[o]}
                        </button>
                      ))}
                    </div>
                    {(r.reason === "boshqa" || r.reasonNote) && (
                      <Input
                        aria-label={t.dorm.reasonNote}
                        value={r.reasonNote ?? ""}
                        onChange={(e) => update(r.id, { reasonNote: e.target.value })}
                        placeholder={t.dorm.reasonNotePlaceholder}
                        className="mt-2"
                      />
                    )}
                  </fieldset>
                )}

                <div className="mt-3 grid grid-cols-3 gap-2 [&>*]:min-w-0">
                  {[
                    r.status === "uxlamadi"
                      ? (["checkedAt", t.dorm.times.checked] as const)
                      : (["sleep", t.dorm.times.sleep] as const),
                    ["wake", t.dorm.times.wake] as const,
                    ["lesson", t.dorm.times.lesson] as const,
                  ].map(([key, label]) => (
                    <div key={key}>
                      <Label htmlFor={`${r.id}-${key}`}>{label}</Label>
                      <Input
                        id={`${r.id}-${key}`}
                        type="time"
                        value={r[key] ?? ""}
                        onChange={(e) => update(r.id, { [key]: e.target.value })}
                        className="mt-1 h-11 min-w-0 px-1.5 text-center tabular-nums [&::-webkit-calendar-picker-indicator]:hidden"
                      />
                    </div>
                  ))}
                </div>

                {!p && cancelled[r.id] && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Undo2 className="size-3.5" aria-hidden />
                    {t.dorm.cancelled(cancelled[r.id])}
                  </p>
                )}
                {!p && (
                  <p
                    className={cn(
                      "mt-3 flex items-center gap-1.5 text-xs",
                      r.notifiedAt ? "text-success" : "text-muted-foreground",
                    )}
                  >
                    <Send className="size-3.5" aria-hidden />
                    {r.notifiedAt
                      ? t.dorm.notified(r.notifiedAt, r.status === "uxlamadi")
                      : t.dorm.willNotify(schoolConfig.dorm.undoSeconds)}
                  </p>
                )}
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
