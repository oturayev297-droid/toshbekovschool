"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { type DayMenu, meals, type WeekMenu } from "@/mock/kitchen";

const filled = (d: DayMenu) => meals.filter((m) => d[m.key].trim()).length;

/** Menyu kiritish formasi: kun tanlanadi, 4 ta ovqat kiritiladi. Maket — saqlash yo'q. */
export function MenuForm({ draft }: { draft: WeekMenu }) {
  const [days, setDays] = useState(draft.days);
  const [active, setActive] = useState(0);
  const day = days[active];
  const total = days.reduce((a, d) => a + filled(d), 0);
  const complete = total === days.length * meals.length;

  const set = (key: (typeof meals)[number]["key"], value: string) =>
    setDays((ds) => ds.map((d, i) => (i === active ? { ...d, [key]: value } : d)));

  return (
    <Card className="p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Yangi hafta menyusi</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {draft.range} · to&apos;ldirildi {total}/{days.length * meals.length}
          </p>
        </div>
      </div>

      {/* Kun tanlash */}
      <div role="tablist" aria-label="Hafta kuni" className="mt-4 grid grid-cols-7 gap-1.5">
        {days.map((d, i) => {
          const n = filled(d);
          return (
            <button
              key={d.date}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "flex h-14 flex-col items-center justify-center rounded-md border text-sm font-semibold transition-colors",
                "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                i === active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card hover:bg-secondary",
              )}
            >
              {d.short}
              <span
                className={cn(
                  "mt-0.5 text-[11px] font-medium",
                  i === active ? "opacity-80" : n === 4 ? "text-success" : "text-muted-foreground",
                )}
              >
                {n === 4 ? <Check className="size-3.5" aria-label="to'liq" /> : `${n}/4`}
              </span>
            </button>
          );
        })}
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold">{day.day}</legend>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {meals.map((m) => (
            <div key={m.key}>
              <Label htmlFor={`meal-${m.key}`}>
                {m.label} · {m.time}
              </Label>
              <Input
                id={`meal-${m.key}`}
                value={day[m.key]}
                onChange={(e) => set(m.key, e.target.value)}
                placeholder="Masalan: Mastava, sabzavotli salat"
                className="mt-1"
              />
            </div>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Saqlangan menyu yakshanba 20:00 da ota-onalarga avtomatik yuboriladi.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="lg">
            Qoralamani saqlash
          </Button>
          <Button size="lg" disabled={!complete}>
            <Send /> Saqlash va yuborish
          </Button>
        </div>
      </div>
    </Card>
  );
}
