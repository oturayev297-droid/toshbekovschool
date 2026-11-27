"use client";

import { useMemo, useState } from "react";
import { Check, Moon, MoonStar, Send, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/form";
import { PrivateBadge } from "@/components/ui/private-badge";
import { tashkentTime } from "@/lib/date";
import { dormBadge } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { DormStatus } from "@/mock/data";
import { addMinutes, type DormStudent, notSleptReasons } from "@/mock/dorm";

type Filter = "all" | DormStatus;
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Hammasi" },
  { value: "belgilanmagan", label: "Belgilanmagan" },
  { value: "uxladi", label: "Uxladi" },
  { value: "uxlamadi", label: "Uxlamadi" },
];

/**
 * Tarbiyachi smena ko'rinishi (mobil-birinchi).
 * Maket: belgilash faqat sahifa holatida saqlanadi. 6-bosqichda "Uxladi/Uxlamadi"
 * bosilishi bilan BullMQ orqali ota-onaga darhol Telegram xabari ketadi.
 */
export function TutorShift({ initial }: { initial: DormStudent[] }) {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: rows.length,
      uxladi: rows.filter((r) => r.status === "uxladi").length,
      uxlamadi: rows.filter((r) => r.status === "uxlamadi").length,
      belgilanmagan: rows.filter((r) => r.status === "belgilanmagan").length,
    }),
    [rows],
  );
  const marked = counts.uxladi + counts.uxlamadi;
  const visible = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  const update = (id: string, patch: Partial<DormStudent>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  // Bosilganda vaqt avtomatik "hozir" bilan to'ladi (keyin tahrirlash mumkin).
  // Uxladi → uxlash vaqti; Uxlamadi → tekshirilgan vaqt. Xabar 1 daqiqa ichida ketadi.
  const mark = (r: DormStudent, status: "uxladi" | "uxlamadi") => {
    const now = tashkentTime(new Date());
    update(
      r.id,
      status === "uxladi"
        ? {
            status,
            sleep: now,
            checkedAt: undefined,
            reason: undefined,
            reasonNote: undefined,
            notifiedAt: addMinutes(now, 1),
          }
        : { status, sleep: "", checkedAt: now, notifiedAt: addMinutes(now, 1) },
    );
  };

  return (
    <div>
      {/* Jarayon */}
      <Card className="sticky top-[4.5rem] z-10 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-semibold">
            Belgilandi:{" "}
            <span className="tabular-nums">
              {marked} / {counts.all}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            {counts.belgilanmagan > 0 ? `${counts.belgilanmagan} ta qoldi` : "Hammasi belgilandi"}
          </p>
        </div>
        <div
          className="mt-2 h-2 rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={counts.all}
          aria-valuenow={marked}
          aria-label="Belgilash jarayoni"
        >
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${(marked / counts.all) * 100}%` }}
          />
        </div>
        <div
          role="radiogroup"
          aria-label="Filtr"
          className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 [scrollbar-width:none]"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              role="radio"
              aria-checked={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors",
                "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                filter === f.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
              <span className="tabular-nums opacity-80">{counts[f.value]}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* O'quvchi kartalari */}
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {visible.map((r) => (
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
                    {r.room}-xona · {r.grade} sinf
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
                  Uxladi
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
                  Uxlamadi
                </button>
              </div>

              {r.status === "uxlamadi" && (
                <fieldset className="mt-3 rounded-md border border-dashed border-accent/40 bg-accent-soft/15 p-3">
                  <legend className="flex flex-wrap items-center gap-2 px-1 text-xs font-semibold">
                    Sabab <PrivateBadge />
                  </legend>
                  <div
                    role="radiogroup"
                    aria-label="Uxlamaslik sababi"
                    className="grid grid-cols-2 gap-1.5"
                  >
                    {notSleptReasons.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        role="radio"
                        aria-checked={r.reason === o.value}
                        onClick={() => update(r.id, { reason: o.value })}
                        className={cn(
                          "h-10 rounded-md border text-sm font-medium transition-colors",
                          "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                          r.reason === o.value
                            ? "border-accent bg-accent text-accent-foreground"
                            : "bg-card hover:bg-secondary",
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  {(r.reason === "boshqa" || r.reasonNote) && (
                    <Input
                      aria-label="Izoh"
                      value={r.reasonNote ?? ""}
                      onChange={(e) => update(r.id, { reasonNote: e.target.value })}
                      placeholder="Qisqa izoh (ota-onaga ketmaydi)"
                      className="mt-2"
                    />
                  )}
                </fieldset>
              )}

              <div className="mt-3 grid grid-cols-3 gap-2 [&>*]:min-w-0">
                {[
                  r.status === "uxlamadi"
                    ? (["checkedAt", "Tekshirildi"] as const)
                    : (["sleep", "Uxlash"] as const),
                  ["wake", "Turish"] as const,
                  ["lesson", "Darsga"] as const,
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

              <p
                className={cn(
                  "mt-3 flex items-center gap-1.5 text-xs",
                  r.notifiedAt ? "text-success" : "text-muted-foreground",
                )}
              >
                <Send className="size-3.5" aria-hidden />
                {r.notifiedAt
                  ? `Ota-onaga ${r.status === "uxlamadi" ? "neytral " : ""}xabar yuborildi · ${r.notifiedAt}`
                  : "Belgilangach ota-onaga darhol xabar ketadi"}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
